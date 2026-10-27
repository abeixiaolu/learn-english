const icons = {"renew": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><path d=\"M12,10H6.78A11,11,0,0,1,27,16h2A13,13,0,0,0,6,7.68V4H4v8h8Z\"/><path d=\"M20,22h5.22A11,11,0,0,1,5,16H3a13,13,0,0,0,23,8.32V28h2V20H20Z\"/><g data-name=\"&lt;Transparent Rectangle&gt;\"></g></svg>", "arrow--up-right": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><polygon points=\"10 6 10 8 22.59 8 6 24.59 7.41 26 24 9.41 24 22 26 22 26 6 10 6\"/></svg>", "time": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><path d=\"M16,30A14,14,0,1,1,30,16,14,14,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12,12,0,0,0,16,4Z\"/><polygon points=\"20.59 22 15 16.41 15 7 17 7 17 15.58 22 20.59 20.59 22\"/></svg>", "book": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n  \n  <rect x=\"19\" y=\"10\" width=\"7\" height=\"2\"/>\n  <rect x=\"19\" y=\"15\" width=\"7\" height=\"2\"/>\n  <rect x=\"19\" y=\"20\" width=\"7\" height=\"2\"/>\n  <rect x=\"6\" y=\"10\" width=\"7\" height=\"2\"/>\n  <rect x=\"6\" y=\"15\" width=\"7\" height=\"2\"/>\n  <rect x=\"6\" y=\"20\" width=\"7\" height=\"2\"/>\n  <path d=\"M28,5H4A2.002,2.002,0,0,0,2,7V25a2.002,2.002,0,0,0,2,2H28a2.002,2.002,0,0,0,2-2V7A2.002,2.002,0,0,0,28,5ZM4,7H15V25H4ZM17,25V7H28V25Z\"/>\n  \n</svg>\n", "add": "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<!-- Generator: Adobe Illustrator 24.0.3, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t width=\"32px\" height=\"32px\" viewBox=\"0 0 32 32\" style=\"enable-background:new 0 0 32 32;\" xml:space=\"preserve\">\n<style type=\"text/css\">\n\t.st0{fill:none;}\n</style>\n<polygon points=\"17,15 17,8 15,8 15,15 8,15 8,17 15,17 15,24 17,24 17,17 24,17 24,15 \"/>\n<rect class=\"st0\" width=\"32\" height=\"32\"/>\n</svg>\n", "sun": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><path d=\"M16,12a4,4,0,1,1-4,4,4.0045,4.0045,0,0,1,4-4m0-2a6,6,0,1,0,6,6,6,6,0,0,0-6-6Z\" transform=\"translate(0 0.0049)\"/><rect x=\"6.8536\" y=\"5.3745\" width=\"1.9998\" height=\"4.958\" transform=\"translate(-3.253 7.8584) rotate(-45)\"/><rect x=\"2\" y=\"15.0049\" width=\"5\" height=\"2\"/><rect x=\"5.3745\" y=\"23.1466\" width=\"4.958\" height=\"1.9998\" transform=\"translate(-14.7739 12.6305) rotate(-45)\"/><rect x=\"15\" y=\"25.0049\" width=\"2\" height=\"5\"/><rect x=\"23.1466\" y=\"21.6675\" width=\"1.9998\" height=\"4.958\" transform=\"translate(-10.0018 24.1514) rotate(-45)\"/><rect x=\"25\" y=\"15.0049\" width=\"5\" height=\"2\"/><rect x=\"21.6675\" y=\"6.8536\" width=\"4.958\" height=\"1.9998\" transform=\"translate(1.5191 19.3793) rotate(-45)\"/><rect x=\"15\" y=\"2.0049\" width=\"2\" height=\"5\"/></svg>", "arrow--left": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n  \n  <polygon points=\"14 26 15.41 24.59 7.83 17 28 17 28 15 7.83 15 15.41 7.41 14 6 4 16 14 26\"/>\n  \n</svg>\n", "menu": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\"><rect x=\"4\" y=\"6\" width=\"24\" height=\"2\"/><rect x=\"4\" y=\"24\" width=\"24\" height=\"2\"/><rect x=\"4\" y=\"12\" width=\"24\" height=\"2\"/><rect x=\"4\" y=\"18\" width=\"24\" height=\"2\"/></svg>", "moon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><path d=\"M13.5025,5.4136A15.0755,15.0755,0,0,0,25.096,23.6082a11.1134,11.1134,0,0,1-7.9749,3.3893c-.1385,0-.2782.0051-.4178,0A11.0944,11.0944,0,0,1,13.5025,5.4136M14.98,3a1.0024,1.0024,0,0,0-.1746.0156A13.0959,13.0959,0,0,0,16.63,28.9973c.1641.006.3282,0,.4909,0a13.0724,13.0724,0,0,0,10.702-5.5556,1.0094,1.0094,0,0,0-.7833-1.5644A13.08,13.08,0,0,1,15.8892,4.38,1.0149,1.0149,0,0,0,14.98,3Z\"/></svg>"};
const icon = (name) => `<span class="icon" aria-hidden="true">${icons[name] || ""}</span>`;
let theme;
try { theme = localStorage.getItem("english-theme"); } catch {}
if (!theme) theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
function applyTheme() {
  document.documentElement.dataset.theme = theme;
  document.querySelector("#theme-toggle").innerHTML = icon(theme === "dark" ? "sun" : "moon");
  document.querySelector("#theme-toggle").setAttribute("aria-label", theme === "dark" ? "切换浅色主题" : "切换深色主题");
}
applyTheme();
document.querySelector("#menu-toggle").innerHTML = icon("menu");
document.querySelector("#generate").insertAdjacentHTML("afterbegin", icon("add"));
document.querySelector(".export").insertAdjacentHTML("beforeend", icon("arrow--up-right"));
for (const [view, name] of [["lesson", "book"], ["reviews", "renew"], ["archive", "time"]]) {
  document.querySelector(`[data-view="${view}"]`).insertAdjacentHTML("afterbegin", icon(name));
}
const $ = (selector) => document.querySelector(selector);
const escape = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const state = {
  bootstrap: null,
  lesson: null,
  draft: null,
  attempts: [],
  view: "lesson",
  section: "review",
  dirty: false,
  saving: Promise.resolve(),
  job: null,
  reviews: [],
  blind: new Set(),
};
let saveTimer, noticeTimer;
try {
  state.blind = new Set(
    JSON.parse(sessionStorage.getItem("english-blind") || "[]"),
  );
} catch {}
function persistBlind() {
  try {
    sessionStorage.setItem("english-blind", JSON.stringify([...state.blind]));
  } catch {}
}
function notify(message) {
  $("#notice").textContent = message;
  $("#notice").classList.add("is-open");
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => ($("#notice").classList.remove("is-open")), 6500);
}
async function api(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Study-Token": state.bootstrap?.token || "",
      ...options.headers,
    },
  });
  const data = await response.json();
  if (!response.ok) throw Error(data.error || "请求失败");
  return data;
}
const draftKey = (id) => `english-draft:${id}`;
function localDraft() {
  try {
    localStorage.setItem(
      draftKey(state.lesson.id),
      JSON.stringify({
        answers: state.draft.answers,
        updatedAt: new Date().toISOString(),
        dirty: true,
      }),
    );
  } catch {
    notify("浏览器备份不可用；正在尝试保存到本机。");
  }
}
function savedLabel(message) {
  const el = $("#save-status");
  if (el) el.textContent = message;
}
function save() {
  clearTimeout(saveTimer);
  state.saving = state.saving
    .catch(() => {})
    .then(async () => {
      if (!state.dirty || !state.lesson) return;
      const lessonId = state.lesson.id,
        snapshot = JSON.stringify(state.draft.answers);
      savedLabel("正在保存…");
      try {
        const result = await api(`/api/drafts/${lessonId}`, {
          method: "PUT",
          body: JSON.stringify({
            revision: state.draft.revision,
            answers: JSON.parse(snapshot),
          }),
        });
        state.draft.revision = result.revision;
        state.draft.updatedAt = result.updatedAt;
        if (JSON.stringify(state.draft.answers) === snapshot) {
          state.dirty = false;
          localStorage.removeItem(draftKey(lessonId));
          savedLabel("已保存到本机");
        } else {
          savedLabel("有新修改…");
          saveTimer = setTimeout(() => save().catch(() => {}), 300);
        }
      } catch (error) {
        savedLabel("未保存 · 草稿保留在浏览器");
        notify(error.message);
        throw error;
      }
    });
  return state.saving;
}
async function flush() {
  while (state.dirty) await save();
  await state.saving;
}
async function loadLesson(id) {
  await flush();
  const data = await api(`/api/lessons/${id}`);
  state.lesson = data.lesson;
  state.draft = data.draft;
  state.attempts = data.attempts;
  state.dirty = false;
  let local;
  try {
    local = JSON.parse(localStorage.getItem(draftKey(id)) || "null");
  } catch {}
  if (
    local?.dirty &&
    (!data.draft.updatedAt || local.updatedAt > data.draft.updatedAt)
  ) {
    state.draft.answers = { ...state.draft.answers, ...local.answers };
    state.dirty = true;
    notify("已恢复浏览器中尚未保存的草稿。");
    saveTimer = setTimeout(() => save().catch(() => {}), 600);
  }
  state.view = "lesson";
  render();
}
const allQuestions = () => state.lesson.sections.flatMap((s) => s.questions);
function feedbackFor(id) {
  for (const attempt of state.attempts) {
    const result = attempt.feedback.results.find((r) => r.id === id);
    if (result) return { result, attempt };
  }
  return null;
}
function feedbackHTML(id) {
  if (state.blind.has(`${state.lesson.id}:${id}`)) return "";
  const found = feedbackFor(id);
  if (!found) return "";
  const { result: r, attempt } = found,
    stale = attempt.answers[id] !== state.draft.answers[id];
  const label = {
    correct: "正确",
    incorrect: "需要订正",
    suggestion: "正确 · 表达建议",
    ungraded: "暂未评分",
  }[r.status];
  return `<div class="feedback ${stale ? "stale" : r.status}" data-feedback="${escape(id)}"><strong>${stale ? "答案已修改 · 以下为上次批改" : label}</strong><p>${escape(r.explanation)}</p>${r.correction ? `<details ${r.status === "incorrect" ? "open" : ""}><summary>参考表达</summary><p>${escape(r.correction)}</p></details>` : ""}</div>`;
}
function questionHTML(q, index) {
  return `<article class="question" id="q-${escape(q.id)}"><span class="number">${String(index + 1).padStart(2, "0")}</span><div><label class="prompt" for="answer-${escape(q.id)}">${escape(q.prompt)}</label><textarea id="answer-${escape(q.id)}" data-question="${escape(q.id)}" spellcheck="false" autocomplete="off" placeholder="在这里作答…">${escape(state.draft.answers[q.id] || "")}</textarea>${feedbackHTML(q.id)}</div></article>`;
}
function lessonHTML() {
  if (!state.lesson)
    return `<p class="eyebrow">每日学习</p><h1>从今天开始。</h1><p class="empty">点击「编写下一课」，根据已有记录生成课程。原有学习记录可在左侧查看。</p>`;
  const l = state.lesson,
    answered = allQuestions().filter((q) =>
      state.draft.answers[q.id]?.trim(),
    ).length;
  const section = l.sections.find((s) => s.id === state.section);
  const tabs = [
    ["review", "闭卷复习"],
    ["learn", "语法与词汇"],
    ["practice", "回译练习"],
    ["listening", "听力"],
    ["output", "自由表达"],
  ];
  let content = "";
  if (state.section === "learn") {
    content = `<h2>语法与词汇</h2>${l.notes.map((n) => `<article class="note"><h3>${escape(n.title)}</h3><p>${escape(n.body)}</p></article>`).join("")}<h3>用得上的表达</h3><table class="vocab"><thead><tr><th>表达</th><th>含义</th><th>例句</th></tr></thead><tbody>${l.vocabulary.map((v) => `<tr><td>${escape(v.word)}</td><td>${escape(v.meaning)}</td><td>${escape(v.example)}</td></tr>`).join("")}</tbody></table>`;
  } else if (section) {
    content = `<h2>${escape(section.title)}</h2><p class="intro">${escape(section.instruction)}</p>`;
    if (state.section === "listening") {
      const v = l.listening;
      content += `<iframe class="player" title="${escape(v.title)}" src="https://www.youtube.com/embed/${v.videoId}?start=${v.start}&end=${v.end}&rel=0&cc_load_policy=0&origin=${encodeURIComponent(location.origin)}" allow="encrypted-media; fullscreen; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe><div class="video-meta"><div><strong>${escape(v.title)}</strong>${escape(v.channel)} · ${v.start}–${v.end} 秒</div><a href="${escape(v.sourceUrl)}&t=${v.start}s" target="_blank" rel="noopener noreferrer">在 YouTube 打开 ${icon("arrow--up-right")}</a></div><p class="intro">${escape(v.instructions)} 播放失败时请使用上方原站入口；无需因此提交空答案。</p><details class="source"><summary>听后核对 · 内容依据与来源</summary><p>${escape(v.evidence)}</p><a href="${escape(v.evidenceUrl)}" target="_blank" rel="noopener noreferrer">查看来源 ${icon("arrow--up-right")}</a><p>${escape(v.checkedAt)}</p></details>`;
    }
    content += section.questions.map(questionHTML).join("");
  }
  const latest = state.attempts[0];
  const summary = latest
    ? `<details class="summary"><summary>最近批改 · ${escape(latest.feedback.summary)}</summary><p>${escape(latest.feedback.grammar)}</p><p>下一步：${escape(latest.feedback.nextStep)}</p></details>`
    : "";
  return `<div class="page-head"><div><p class="eyebrow">${escape(l.date)} / UNIT ${escape(l.unit)}</p><h1>DAY ${escape(l.id.slice(4))}<em>${escape(l.title)}</em></h1></div><select class="lesson-select" id="lesson-select" aria-label="选择课程">${state.bootstrap.lessons.map((x) => `<option value="${x.id}" ${x.id === l.id ? "selected" : ""}>${escape(x.id)} / ${escape(x.title)}</option>`).join("")}</select></div><div class="overview"><div><strong id="answer-count">${answered} / ${allQuestions().length}</strong><span>已作答</span></div><div><strong>${state.attempts.length.toString().padStart(2, "0")}</strong><span>批改记录</span></div><div><strong>45 MIN</strong><span>建议学习时间</span></div></div>${summary}<div class="tabs" aria-label="学习步骤">${tabs.map(([id, label]) => `<button data-section="${id}" class="${state.section === id ? "active" : ""}" aria-current="${state.section === id ? "step" : "false"}">${label}</button>`).join("")}</div>${content}<div class="toolbar"><span id="save-status" role="status">${state.dirty ? "有未保存修改" : state.draft.updatedAt ? "已保存到本机" : "填写后自动保存"}</span><div class="actions">${section ? `<button id="grade-section" ${state.job ? "disabled" : ""}>批改本组</button>` : ""}<button id="grade-all" class="solid" ${state.job ? "disabled" : ""}>提交全部作答 ${icon("arrow--up-right")}</button></div></div>${state.attempts.length ? `<details class="attempts"><summary>查看历次提交（${state.attempts.length}）</summary>${state.attempts.map((a) => `<article><strong>${escape(new Date(a.createdAt).toLocaleString("zh-CN"))}</strong><p>${escape(a.feedback.summary)}</p>${a.feedback.results.map((r) => `<p>${escape(allQuestions().find((q) => q.id === r.id)?.prompt || r.id)}<br>原答案：${escape(a.answers[r.id])}<br>${escape(r.explanation)}</p>`).join("")}</article>`).join("")}</details>` : ""}`;
}
function reviewsHTML() {
  const due = state.reviews.filter((c) => c.due <= state.bootstrap.today),
    wrong = state.reviews.filter((c) => c.wasIncorrect);
  return `<div class="page-head"><div><p class="eyebrow">间隔复习</p><h1>错题与复习</h1></div></div><div class="overview"><div><strong>${due.length}</strong><span>今日到期</span></div><div><strong>${wrong.length}</strong><span>曾经答错</span></div><div><strong>${state.reviews.length}</strong><span>复习题目</span></div></div><p class="intro">先闭卷回答，再提交批改。当天订正不计作一次间隔记忆；正确题也会安排复查。</p>${
    state.reviews.length
      ? state.reviews
          .slice()
          .sort((a, b) => a.due.localeCompare(b.due))
          .map(
            (c) =>
              `<article class="list-row"><div><span class="badge">${c.due <= state.bootstrap.today ? "待复习" : c.due + " 复习"} · ${c.wasIncorrect ? "错题" : "抽查"}</span><h3>${escape(c.prompt)}</h3><p>${escape(c.lessonId)} / ${escape(c.target)}</p></div><button data-review="${escape(c.id)}">闭卷重答 ${icon("arrow--up-right")}</button></article>`,
          )
          .join("")
      : '<p class="empty">完成第一组批改后，这里会出现错题与间隔复习任务。<br>Day 001–025 的原始错题解析仍保存在历史记录里。</p>'
  }`;
}
function archiveHTML() {
  return `<div class="page-head"><div><p class="eyebrow">学习记录</p><h1>历史记录</h1></div></div><p class="intro">原始 Markdown 课程、你的答案与老师批改完整保留，按原文只读展示。</p>${state.bootstrap.archive.map((a) => `<article class="list-row"><h3>${escape(a.title)}</h3><button data-archive="${a.id}">查看 ${icon("arrow--up-right")}</button></article>`).join("")}`;
}
function render() {
  document
    .querySelectorAll("[data-view]")
    .forEach((b) => {
      b.classList.toggle("active", b.dataset.view === state.view);
      if (b.dataset.view === state.view) b.setAttribute("aria-current", "page");
      else b.removeAttribute("aria-current");
    });
  $("#main").innerHTML =
    state.view === "reviews"
      ? reviewsHTML()
      : state.view === "archive"
        ? archiveHTML()
        : lessonHTML();
  $("#generate").disabled = Boolean(state.job);
}
async function refreshReviews() {
  const data = await api("/api/reviews");
  state.reviews = data.cards;
  state.bootstrap.today = data.today;
  $("#due-count").textContent =
    data.cards.filter((c) => c.due <= data.today).length || "";
}
async function watchJob(job) {
  state.job = job;
  $("#generate").disabled = true;
  document
    .querySelectorAll("#grade-section,#grade-all")
    .forEach((b) => (b.disabled = true));
  $("#job-status").textContent =
    job.kind === "grade"
      ? "正在批改，答案已保存…"
      : "正在编写课程并查找 YouTube 材料…";
  try {
    let result = job;
    while (result.status === "running") {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      result = await api(`/api/jobs/${job.id}`);
    }
    if (result.status === "failed") throw Error(result.error);
    state.job = null;
    $("#job-status").textContent = "";
    if (job.kind === "generate") {
      state.bootstrap = await api("/api/bootstrap");
      await loadLesson(result.result.lessonId);
      notify("新课程已就绪。");
    } else {
      if (state.lesson?.id === result.result.lessonId) {
        await flush();
        const data = await api(`/api/lessons/${state.lesson.id}`);
        state.attempts = data.attempts;
        const graded = data.attempts.find(
          (a) => a.id === result.result.attemptId,
        );
        graded?.feedback.results.forEach((r) =>
          state.blind.delete(`${state.lesson.id}:${r.id}`),
        );
        persistBlind();
      }
      await refreshReviews();
      render();
      notify("批改完成。原答案和订正记录均已保存。");
    }
  } catch (error) {
    state.job = null;
    $("#job-status").textContent = error.message;
    notify(error.message);
    render();
  }
}
async function grade(ids) {
  await flush();
  const reviewIds = allQuestions()
    .filter(
      (q) =>
        state.blind.has(`${state.lesson.id}:${q.id}`) &&
        (!ids || ids.includes(q.id)) &&
        state.draft.answers[q.id]?.trim(),
    )
    .map((q) => q.id);
  if (reviewIds.length) ids = reviewIds;
  const job = await api("/api/grade", {
    method: "POST",
    body: JSON.stringify({
      lessonId: state.lesson.id,
      questionIds: ids,
      reviewIds,
    }),
  });
  watchJob(job);
}
document.addEventListener("input", (event) => {
  const id = event.target.dataset.question;
  if (!id) return;
  state.draft.answers[id] = event.target.value;
  state.dirty = true;
  localDraft();
  savedLabel("正在保存…");
  const count = $("#answer-count");
  if (count)
    count.textContent = `${allQuestions().filter((q) => state.draft.answers[q.id]?.trim()).length} / ${allQuestions().length}`;
  const feedback = document.querySelector(`[data-feedback="${id}"]`);
  if (feedback) feedback.outerHTML = feedbackHTML(id);
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => save().catch(() => {}), 650);
});
document.addEventListener("change", async (event) => {
  if (event.target.id === "lesson-select") {
    try {
      state.section = "review";
      await loadLesson(event.target.value);
    } catch (e) {
      notify(e.message);
    }
  }
});
document.addEventListener("click", async (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  try {
    if (button.id === "theme-toggle") {
      theme = theme === "dark" ? "light" : "dark";
      applyTheme();
      try { localStorage.setItem("english-theme", theme); } catch {}
    } else if (button.id === "menu-toggle") {
      const open = $("#sidebar").classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(open));
    } else if (button.dataset.view) {
      await flush();
      state.view = button.dataset.view;
      if (state.view === "reviews") await refreshReviews();
      render();
      $("#sidebar").classList.remove("is-open");
      $("#menu-toggle").setAttribute("aria-expanded", "false");
      $("#main").focus();
    } else if (button.dataset.section) {
      state.section = button.dataset.section;
      render();
    } else if (button.id === "grade-section")
      await grade(
        state.lesson.sections
          .find((s) => s.id === state.section)
          .questions.map((q) => q.id),
      );
    else if (button.id === "grade-all") await grade();
    else if (button.id === "generate") {
      await flush();
      const job = await api("/api/generate", { method: "POST", body: "{}" });
      watchJob(job);
    } else if (button.dataset.archive) {
      await flush();
      const data = await api(`/api/archive/${button.dataset.archive}`);
      $("#main").innerHTML =
        `<div class="archive-toolbar"><button data-view="archive">${icon("arrow--left")}返回记录</button><span>${escape(data.id)}</span></div><pre class="archive">${escape(data.markdown)}</pre>`;
    } else if (button.dataset.review) {
      const card = state.reviews.find((c) => c.id === button.dataset.review);
      await loadLesson(card.lessonId);
      state.section = state.lesson.sections.find((s) =>
        s.questions.some((q) => q.id === card.questionId),
      ).id;
      // A review starts a fresh draft answer; original submissions remain immutable.
      state.blind.add(`${card.lessonId}:${card.questionId}`);
      persistBlind();
      state.draft.answers[card.questionId] = "";
      state.dirty = true;
      localDraft();
      render();
      const article = $(`#q-${card.questionId}`);
      article.querySelector(".feedback")?.remove();
      article.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "center" });
      article.querySelector("textarea").focus();
      saveTimer = setTimeout(() => save().catch(() => {}), 650);
    }
  } catch (error) {
    notify(error.message);
  }
});
window.addEventListener("beforeunload", (event) => {
  if (state.dirty) {
    localDraft();
    event.preventDefault();
    event.returnValue = "";
  }
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden && state.dirty) save().catch(() => {});
});
try {
  state.bootstrap = await api("/api/bootstrap");
  $("#cli").textContent = state.bootstrap.cli.message;
  await refreshReviews();
  if (state.bootstrap.lessons.length)
    await loadLesson(state.bootstrap.lessons[0].id);
  else render();
  if (state.bootstrap.jobs.length) watchJob(state.bootstrap.jobs[0]);
} catch (error) {
  $("#main").textContent =
    `无法读取课程：${error.message}。请确认本地服务正在运行后刷新页面。`;
}
