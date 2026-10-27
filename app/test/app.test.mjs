import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createApp } from "../server.mjs";
import { advanceReview, writeJSON } from "../store.mjs";
import { validateLesson, validateFeedback } from "../schemas.mjs";
const lesson = {
  id: "day-026",
  date: "2026-10-27",
  title: "If",
  unit: "16",
  rationale: "测试",
  notes: [],
  vocabulary: [],
  sections: ["review", "practice", "listening", "output"].map((id) => ({
    id,
    title: id,
    instruction: "",
    questions: [
      { id: id + "-1", prompt: "如果她有空，她会参加会议。", target: "if" },
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
    evidence: "条件关系",
    checkedAt: "2026-10-27",
    instructions: "先听",
  },
};
async function setup(t, runner) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "english-test-"));
  fs.mkdirSync(path.join(root, "days"));
  fs.writeFileSync(
    path.join(root, "days/day-025.md"),
    "# 原始课程\n我的答案，不可修改。",
  );
  fs.mkdirSync(path.join(root, "vocabulary"));
  fs.writeFileSync(path.join(root, "vocabulary/learned.md"), "");
  fs.writeFileSync(path.join(root, "PLAN.md"), "测试计划");
  writeJSON(path.join(root, "lessons/day-026.json"), lesson);
  const server = createApp({
    root,
    runner,
    status: async () => ({ ready: true, message: "test" }),
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(async () => {
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(root, { recursive: true, force: true });
  });
  const base = `http://127.0.0.1:${server.address().port}`;
  const boot = await (await fetch(base + "/api/bootstrap")).json();
  const request = async (url, method = "GET", data, headers = {}) => {
    const res = await fetch(base + url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "X-Study-Token": boot.token,
        ...headers,
      },
      body: data === undefined ? undefined : JSON.stringify(data),
    });
    return { code: res.status, data: await res.json() };
  };
  const wait = async (id) => {
    for (let i = 0; i < 100; i++) {
      const j = (await request("/api/jobs/" + id)).data;
      if (j.status !== "running") return j;
      await new Promise((r) => setTimeout(r, 10));
    }
    throw Error("timeout");
  };
  return { request, wait, root, boot };
}
test("schema rejects duplicate questions, mismatched video and missing grading rows", () => {
  assert.equal(validateLesson(structuredClone(lesson)).id, "day-026");
  const bad = structuredClone(lesson);
  bad.sections[1].questions[0].id = "review-1";
  assert.throws(() => validateLesson(bad));
  const video = structuredClone(lesson);
  video.listening.sourceUrl = "https://youtube.com/watch?v=xxxxxxxxxxx";
  assert.throws(() => validateLesson(video));
  assert.throws(() =>
    validateFeedback({ summary: "", grammar: "", nextStep: "", results: [] }, [
      "review-1",
    ]),
  );
});
test("autosave, immutable submissions, grading, review and export preserve records", async (t) => {
  const ctx = await setup(t, async (prompt) => {
    const input = JSON.parse(prompt.slice(prompt.indexOf("\n") + 1));
    return {
      summary: "完成",
      grammar: "if 待巩固",
      nextStep: "复查",
      results: input.questions.map((q) => ({
        id: q.id,
        status: "incorrect",
        correction: "If she is free, she will join the meeting.",
        explanation: "if 从句用一般现在时",
        tags: ["时态"],
      })),
    };
  });
  const { request, wait, root } = ctx;
  assert.equal(ctx.boot.archive.length, 1);
  const draft = await request("/api/drafts/day-026", "PUT", {
    revision: 0,
    answers: { "practice-1": "If she will free, she join meeting." },
  });
  assert.equal(draft.code, 200);
  assert.equal(
    (await request("/api/drafts/day-026", "PUT", { revision: 0, answers: {} }))
      .code,
    409,
  );
  const job = (await request("/api/grade", "POST", { lessonId: "day-026" }))
    .data;
  assert.equal((await wait(job.id)).status, "completed");
  const data = (await request("/api/lessons/day-026")).data;
  assert.equal(data.attempts.length, 1);
  assert.equal(data.attempts[0].feedback.results.length, 1);
  await request("/api/drafts/day-026", "PUT", {
    revision: 1,
    answers: { "practice-1": "If she is free, she will join the meeting." },
  });
  const after = (await request("/api/lessons/day-026")).data;
  assert.equal(
    after.attempts[0].answers["practice-1"],
    "If she will free, she join meeting.",
  );
  const cards = (await request("/api/reviews")).data.cards;
  assert.equal(cards.length, 1);
  assert.equal(cards[0].wasIncorrect, true);
  assert.equal((await request("/api/export")).data.submissions.length, 1);
  assert.equal(
    fs.readFileSync(path.join(root, "days/day-025.md"), "utf8"),
    "# 原始课程\n我的答案，不可修改。",
  );
});
test("reject foreign origins and invalid answers, and preserve failed submissions", async (t) => {
  const { request, wait } = await setup(t, async () => {
    throw Error("额度暂时不可用");
  });
  assert.equal(
    (
      await request(
        "/api/generate",
        "POST",
        {},
        { Origin: "https://evil.test" },
      )
    ).code,
    403,
  );
  assert.equal(
    (await request("/api/generate", "POST", {}, { "X-Study-Token": "bad" }))
      .code,
    403,
  );
  assert.equal(
    (
      await request("/api/drafts/day-026", "PUT", {
        revision: 0,
        answers: { unknown: "bad" },
      })
    ).code,
    400,
  );
  assert.equal(
    (await request("/api/grade", "POST", { lessonId: "day-026" })).code,
    400,
  );
  await request("/api/drafts/day-026", "PUT", {
    revision: 0,
    answers: { "practice-1": "Answer" },
  });
  const job = (await request("/api/grade", "POST", { lessonId: "day-026" }))
    .data;
  assert.equal((await wait(job.id)).status, "failed");
  assert.equal(
    (await request("/api/lessons/day-026")).data.draft.answers["practice-1"],
    "Answer",
  );
  assert.equal((await request("/api/export")).data.submissions.length, 1);
});
test("generation writes a validated new lesson and keeps archive intact", async (t) => {
  const { request, wait } = await setup(t, async (prompt) => {
    const next = structuredClone(lesson);
    next.id = "day-027";
    next.date = prompt.match(/日期 (\d{4}-\d{2}-\d{2})/)[1];
    return next;
  });
  const job = (await request("/api/generate", "POST", {})).data;
  assert.equal((await wait(job.id)).status, "completed");
  assert.equal(
    (await request("/api/lessons/day-027")).data.lesson.id,
    "day-027",
  );
});
test("same-day corrections do not advance spaced recall", () => {
  const card = { step: 0, lastReviewed: "2026-10-27" };
  assert.equal(advanceReview(card, true, "2026-10-27").step, 0);
  assert.equal(advanceReview(card, true, "2026-10-28").step, 1);
  assert.equal(
    advanceReview({ ...card, step: 3 }, false, "2026-10-28").step,
    0,
  );
});
test("concurrent jobs are rejected and invalid model output cannot enter lessons", async (t) => {
  let finish;
  const pending = new Promise((resolve) => (finish = resolve));
  const { request, wait } = await setup(t, () => pending);
  const first = (await request("/api/generate", "POST", {})).data;
  assert.equal((await request("/api/generate", "POST", {})).code, 409);
  finish({ id: "day-027" });
  assert.equal((await wait(first.id)).status, "failed");
  assert.equal((await request("/api/lessons/day-027")).code, 400);
});
test("restart marks interrupted jobs as failed without discarding saved drafts", async (t) => {
  const { request, root } = await setup(t, async () => {});
  await request("/api/drafts/day-026", "PUT", {
    revision: 0,
    answers: { "review-1": "Saved answer" },
  });
  const jobPath = path.join(root, "study-data/jobs/interrupted.json");
  writeJSON(jobPath, { id: "interrupted", status: "running" });
  const recovered = createApp({ root, status: async () => ({ ready: true }) });
  assert.equal(JSON.parse(fs.readFileSync(jobPath)).status, "failed");
  assert.equal(
    (await request("/api/lessons/day-026")).data.draft.answers["review-1"],
    "Saved answer",
  );
  recovered.close();
});

test("resubmitting retained answers does not count as spaced recall", async (t) => {
  const { request, wait, root } = await setup(t, async (prompt) => {
    const input = JSON.parse(prompt.slice(prompt.indexOf("\n") + 1));
    return {
      summary: "正确",
      grammar: "正确",
      nextStep: "继续",
      results: input.questions.map((q) => ({
        id: q.id,
        status: "correct",
        correction: "",
        explanation: "正确",
        tags: [],
      })),
    };
  });
  await request("/api/drafts/day-026", "PUT", {
    revision: 0,
    answers: { "review-1": "She is busy." },
  });
  await wait(
    (await request("/api/grade", "POST", { lessonId: "day-026" })).data.id,
  );
  const cardsPath = path.join(root, "study-data/reviews.json");
  const cards = JSON.parse(fs.readFileSync(cardsPath));
  cards[0].lastReviewed = "2026-01-01";
  cards[0].due = "2026-01-02";
  writeJSON(cardsPath, cards);
  await wait(
    (await request("/api/grade", "POST", { lessonId: "day-026" })).data.id,
  );
  assert.equal((await request("/api/reviews")).data.cards[0].step, 0);
  await wait(
    (
      await request("/api/grade", "POST", {
        lessonId: "day-026",
        reviewIds: ["review-1"],
      })
    ).data.id,
  );
  assert.equal((await request("/api/reviews")).data.cards[0].step, 1);
});
