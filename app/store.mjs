import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
export const today = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
export function readJSON(file, fallback) {
  return fs.existsSync(file)
    ? JSON.parse(fs.readFileSync(file, "utf8"))
    : fallback;
}
export function writeJSON(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temp = `${file}.${randomUUID()}.tmp`;
  fs.writeFileSync(temp, JSON.stringify(value, null, 2) + "\n", {
    mode: 0o600,
  });
  fs.renameSync(temp, file);
}
export function addDays(date, days) {
  return new Date(Date.parse(date + "T12:00:00Z") + days * 86400000)
    .toISOString()
    .slice(0, 10);
}
export function advanceReview(card, correct, date = today()) {
  // Same-day corrections do not count as spaced recall.
  const spaced = card.lastReviewed !== date;
  const step = correct ? Math.min((card.step || 0) + (spaced ? 1 : 0), 4) : 0;
  const intervals = [1, 3, 7, 14, 30];
  return {
    ...card,
    step,
    due: addDays(date, intervals[step]),
    lastReviewed: date,
  };
}
