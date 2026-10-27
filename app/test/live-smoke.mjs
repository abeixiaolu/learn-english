// Explicit opt-in: this test consumes the signed-in account's Codex allowance.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import assert from "node:assert/strict";
import { createApp } from "../server.mjs";
import { writeJSON } from "../store.mjs";
const root = fs.mkdtempSync(path.join(os.tmpdir(), "english-live-"));
for (const dir of ["days", "lessons"]) fs.mkdirSync(path.join(root, dir));
const lesson = {
  id: "day-001",
  date: "2026-10-27",
  title: "Live verification",
  unit: "01",
  rationale: "Isolated test only",
  notes: [],
  vocabulary: [],
  sections: ["review", "practice", "listening", "output"].map((id) => ({
    id,
    title: id,
    instruction: "",
    questions: [
      { id: id + "-1", prompt: "翻译：她今天很忙。", target: "be + adjective" },
    ],
  })),
  listening: {
    videoId: "tcOLyvkBc48",
    title: "First conditional",
    channel: "BBC",
    start: 0,
    end: 60,
    sourceUrl: "https://www.youtube.com/watch?v=tcOLyvkBc48",
    evidenceUrl:
      "https://downloads.bbc.co.uk/learningenglish/tgg/unit_10/le_TGG_Ep10_first_conditional.pdf",
    evidence: "测试不批改听力",
    checkedAt: "2026-10-27",
    instructions: "测试",
  },
};
writeJSON(path.join(root, "lessons/day-001.json"), lesson);
const server = createApp({ root });
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;
try {
  const boot = await (await fetch(base + "/api/bootstrap")).json();
  assert.equal(boot.cli.ready, true);
  const call = async (url, method = "GET", data) => {
    const r = await fetch(base + url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "X-Study-Token": boot.token,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    const result = await r.json();
    if (!r.ok) throw Error(result.error);
    return result;
  };
  await call("/api/drafts/day-001", "PUT", {
    revision: 0,
    answers: {
      "review-1": "She is busy today.",
      "practice-1": "She has busy today.",
    },
  });
  let job = await call("/api/grade", "POST", { lessonId: "day-001" });
  console.log(
    "Real Codex grading started; data is isolated in a temporary directory.",
  );
  while (job.status === "running") {
    await new Promise((r) => setTimeout(r, 2000));
    job = await call("/api/jobs/" + job.id);
  }
  assert.equal(job.status, "completed", job.error);
  const result = await call("/api/lessons/day-001");
  const rows = result.attempts[0].feedback.results;
  assert.ok(
    ["correct", "suggestion"].includes(
      rows.find((r) => r.id === "review-1").status,
    ),
  );
  assert.equal(rows.find((r) => r.id === "practice-1").status, "incorrect");
  assert.equal((await call("/api/reviews")).cards.length, 2);
  console.log(
    "PASS: official CLI → structured grading → saved attempts → review queue. Correct/incorrect judgments verified.",
  );
} finally {
  await new Promise((r) => server.close(r));
  fs.rmSync(root, { recursive: true, force: true });
}
