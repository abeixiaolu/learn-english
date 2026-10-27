---
name: daily-study
description: 为本地学习网页编写下一课，依据真实作答推进语法并查找 YouTube 听力。
disable-model-invocation: true
argument-hint: "可选：day 编号；默认下一课"
---

# 每日课程生成

当前课程采用 `lessons/day-XXX.json`，由固定 HTML 网页展示。`days/*.md` 是历史记录，保留作答与批改。

1. 阅读 `PLAN.md` 最新规则、[语法推进规则](../learning-progression.md)、`app/schemas.mjs`、最近课程及实际批改。新网页批改在 `study-data/attempts/`，复习队列在 `study-data/reviews.json`；生成过的课程不等于学过。新词去重同时查 `vocabulary/learned.md` 与已有 `lessons/` 的 vocabulary。
2. 比较 `days/` 和 `lessons/` 的编号，选择下一个编号。已有课程包含作答时保持内容稳定；用户明确要求重写时先保存旧版本并保留所有答案。
3. 遵守 PLAN 最新学习分配：混合闭卷复习、白话语法与必要词汇、约10道逐步撤提示回译、YouTube 听力、一个不指定句型的真实表达任务。讲解例句与练习答案分开；不预置作答。
4. 每次实际搜索 YouTube 并核查来源。记录视频 ID、标题、频道、片段、原链接和内容依据。自己概括证据，避免复制完整字幕。内容未核实时不编造细节题和答案；如无法找到有效来源，明确报告，不把空听力课程当作完成。
5. 用 `app/schemas.mjs` 中的 `validateLesson` 校验数据，再写入 `lessons/`。只需课程数据，不重写页面。更新 PLAN 的课程进度时标明“已生成，未作答”。
6. 通过本地网页检查课程与播放器，报告文件和课程主题。播放器未实际播放就不能声称播放已验证。

也可以通过已运行的本地服务 `/api/generate` 发起相同流程：先 GET `/api/bootstrap` 取得本次服务令牌，再 POST，跟踪返回的 job 到终态。复用当前任务，避免重复编课。接口详情直接查看 `app/server.mjs`。
