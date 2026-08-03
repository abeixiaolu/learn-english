# Mistake Feedback Loop Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a lightweight mistake-tag feedback loop so `review-answer` labels recurring error patterns and `daily-study` uses recent labels to generate targeted review.

**Architecture:** This is a Markdown skill update only. `review-answer` becomes the producer of stable mistake tags in each day's `## 错题回顾`; `daily-study` becomes the consumer that reads recent tags and injects a controlled amount of targeted review into future lessons.

**Tech Stack:** Cursor skill Markdown files, existing `PLAN.md`, existing `days/day-XXX.md` Markdown lesson files, no new runtime dependencies.

## Global Constraints

- Do not change `PLAN.md` grammar order.
- Do not change `templates/day-template.md` four-part structure.
- Do not create a separate mistake database or long-term report.
- Do not backfill historical day files unless the user explicitly asks.
- Keep ordinary days around 70% current grammar and 30% mistake feedback.
- Use only these initial tags: `冠词-特指`, `冠词-a-an`, `时态-过去式`, `时态-三单`, `句式-逗号连接`, `搭配-介词`, `表达-中式直译`, `信息-漏译`, `拼写-专有名词`.
- Do not create git commits unless the user explicitly asks.

---

## File Structure

- Modify `.cursor/skills/review-answer/SKILL.md`: add tag generation rules, fixed tag table, mistake-review format, and summary output requirement.
- Modify `.cursor/skills/daily-study/SKILL.md`: add recent mistake tag reading, tag weighting, injection ratios, anti-repetition rules, and review-day behavior.
- Read-only verification file `days/day-007.md`: use existing tagged and untagged examples to sanity-check the written instructions.

---

### Task 1: Add Mistake Tags To `review-answer`

**Files:**
- Modify: `.cursor/skills/review-answer/SKILL.md`

**Interfaces:**
- Consumes: User answers in `days/day-XXX.md` and existing `## 错题回顾` structure.
- Produces: `标签：...` lines under each mistake pattern in `## 错题回顾`, plus “高频标签” in the chat summary.

- [ ] **Step 1: Update the goal**

In `.cursor/skills/review-answer/SKILL.md`, change the goal paragraph so it explicitly says the skill adds stable mistake tags to the mistake review.

Expected text:

```markdown
批改用户在某天文件中的作答。**直接修改** `days/day-XXX.md`：保留用户原答案，在错题下方追加「正确答案」和「解析」，并在文件末尾追加带稳定标签的 `## 错题回顾`。对话中输出今日小结和高频标签。
```

- [ ] **Step 2: Add the fixed tag table**

After “## 目标”, add a new section:

```markdown
## 错题标签

错题回顾必须优先使用下面的固定标签，避免临时发明同义标签：

- `冠词-特指`：the / Ø / 特指对象遗漏或误用
- `冠词-a-an`：a / an 选择错误，或单数可数名词首次提到漏冠词
- `时态-过去式`：明确过去时间下动词或 be 动词未用过去式
- `时态-三单`：一般现在时第三人称单数动词形式错误
- `句式-逗号连接`：两个完整句子只用逗号连接
- `搭配-介词`：固定搭配中的介词缺失或误用
- `表达-中式直译`：英文表达受中文直译影响，不自然
- `信息-漏译`：中文里的时间、地点、主语、限定词等信息漏掉
- `拼写-专有名词`：专有名词大小写或固定拼写错误

每个错误模式使用 1–3 个标签；同一道错题涉及多个问题时可以打多个标签。
```

- [ ] **Step 3: Update the mistake review instructions**

In the “追加错题回顾” step, update the example format so every error type includes a tag line.

Expected format:

```markdown
---

## 错题回顾

### {错误类型}

标签：`标签一`、`标签二`

- Part X-N「{题干}」：❌ {你的答案} → ✅ {正确答案}

**规则**：{一句话}
```

- [ ] **Step 4: Add tag-selection rules to the grading principles**

Append these bullets under “## 批改原则”:

```markdown
- 错题回顾的每个错误模式都要写 `标签：...`，标签放在三级标题和错题列表之间。
- 标签必须优先来自固定标签表；确实无法归类时才新增标签，并保持短小稳定。
- 对话小结增加「高频标签」，列出本次最值得复习的 2–3 个标签。
```

- [ ] **Step 5: Verify `review-answer` instructions**

Read `.cursor/skills/review-answer/SKILL.md` and confirm:

- The fixed tag table exists.
- The example `## 错题回顾` includes `标签：...`.
- The final chat summary requires “高频标签”.
- No historical day file is modified by this task.

---

### Task 2: Make `daily-study` Consume Recent Tags

**Files:**
- Modify: `.cursor/skills/daily-study/SKILL.md`

**Interfaces:**
- Consumes: `标签：...` lines under recent `days/day-XXX.md` `## 错题回顾` sections.
- Produces: New daily lessons where Part 1, Part 2, and Part 4 include controlled mistake-feedback review.

- [ ] **Step 1: Expand context reading**

In “读上下文”, add one bullet after the previous-day file reading:

```markdown
- 最近 2–3 天的 `## 错题回顾` 标签；复习日读取最近 6 天标签
```

- [ ] **Step 2: Add feedback-weighting rules**

After “确定语法单元”, add:

```markdown
4. **读取错题标签**：
   - 从最近 day 文件的 `## 错题回顾` 中提取 `标签：...`
   - 普通日读取最近 2–3 天；复习日读取最近 6 天
   - 按标签出现频次排序，优先使用高频标签
   - 若没有标签，按原流程生成
```

After adding this section, renumber later top-level steps so the sequence stays clear.

- [ ] **Step 3: Update ordinary-day generation**

In the ordinary-day rules, keep the existing structure and add:

```markdown
- Part 1：至少 1–2 题来自最近高频错题标签
- Part 2：今日新语法练习中可混入 1 道旧错点
- Part 4：18 句中保留 4–5 句错题反哺句
- 普通日整体比例约为 70% 今日新语法 + 30% 错题反哺
```

- [ ] **Step 4: Update review-day generation**

In the review-day rules, add:

```markdown
- 优先覆盖最近 6 天高频错题标签
- 仍不引入新语法、新词或新固定搭配
```

- [ ] **Step 5: Add anti-repetition constraints**

Under “硬性约束”, add:

```markdown
- ✅ 错题反哺必须换场景或换题型，不能原题复刻
- ✅ 普通日错题反哺默认不超过 30%；同一标签连续 3 次出现时可提高到 40%
- ✅ 反哺句必须服务当天语法外壳，不能打乱 PLAN 的语法推进
```

- [ ] **Step 6: Verify `daily-study` instructions**

Read `.cursor/skills/daily-study/SKILL.md` and confirm:

- Recent tag reading is part of context gathering.
- Ordinary day rules include Part 1, Part 2, and Part 4 feedback injection.
- Review day rules mention high-frequency tags.
- Anti-repetition constraints are present.

---

### Task 3: Manual End-To-End Verification

**Files:**
- Read-only: `.cursor/skills/review-answer/SKILL.md`
- Read-only: `.cursor/skills/daily-study/SKILL.md`
- Read-only: `days/day-007.md`

**Interfaces:**
- Consumes: The updated skill instructions and current `day-007` mistake review.
- Produces: A short verification note in the final response; no new lesson file is generated during this task.

- [ ] **Step 1: Check tag compatibility with `day-007`**

Use the current `day-007` mistake review as a mental sample. Confirm the new tag table can classify its existing sections:

```markdown
冠词与特指 -> `冠词-特指`, `冠词-a-an`
句子连接与自然表达 -> `句式-逗号连接`, `表达-中式直译`
时态与信息完整 -> `时态-过去式`, `信息-漏译`
```

- [ ] **Step 2: Check the next `daily-study` behavior**

Given those sample tags, confirm the next ordinary day can generate:

```markdown
Part 1: one冠词/时态复习题
Part 2: one旧错点混合小题
Part 4: four or five sentences that include recent mistake tags while still practicing present continuous vs present simple
```

- [ ] **Step 3: Run diagnostics**

Run linter diagnostics on both skill files:

```text
.cursor/skills/review-answer/SKILL.md
.cursor/skills/daily-study/SKILL.md
```

Expected: no Markdown or workspace diagnostics introduced by the edits.

- [ ] **Step 4: Final report**

Report:

- Which skill files changed.
- That no historical day files were modified.
- That no commit was created unless the user explicitly asked for one.
- That the next `/daily-study` should now use recent mistake tags.
