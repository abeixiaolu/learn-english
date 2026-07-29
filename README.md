# Learn English — 每日 Git 学习仓库

用 **一个 Markdown 文件 = 一天** 的方式学英语。不依赖网页，全部在本地用编辑器 + Git 完成。

## 每日流程（约 45 分钟）

| 时段 | 模块 | 做什么 |
|------|------|--------|
| 5 min | 复习抽查 | 打开当天文件 Part 1，先闭卷作答 |
| 10 min | 语法复盘 | Part 2：看要点 + 做 3–5 道小题 |
| 10 min | 词汇 / 练中学 | Part 3：记词或在句子里认词（见下方策略） |
| 20 min | 回译练习 | Part 4：中译英 15–20 句，写完后用 skill 批改 |

## 词汇策略

**推荐：练中学为主，清单为辅。**

- **每天 Part 3** 列出当天回译会用到的新词和没学过的新固定搭配，带例句。
- **真正记词**发生在 Part 4 回译里——逼自己在句子里用出来。
- **每 7 天**（Day 7、14、21…）复习日 Part 3 改为词表回顾，不新增。

## 目录结构

```
learn-english/
├── README.md           # 本说明
├── PLAN.md             # 学习计划与语法单元大纲
├── .cursor/skills/     # daily-study / review-answer / weekly-review
├── grammar/            # 语法专题（按序号：01-be-verbs.md …）
├── templates/          # 新一天文件模板
├── days/               # 每日学习文件 day-001.md …
└── reviews/            # 7 天复习报告 review-007.md
```

## 怎么用

1. 打开 `days/` 里**当天**文件（从 `day-001.md` 开始）。
2. 严格按 Part 1 → 4 顺序做，答案写在每题下方的 `答案：` 代码块里。
3. **全部做完后**，用 `/review-answer` 批改（错题会自动追加解析和错题回顾）。
4. 新一天：用 `/daily-study` 按 `PLAN.md` 生成下一天的 `day-XXX.md`。
5. 每 7 天：用 `/weekly-review` 生成复习报告。

## Skills（在 Cursor 对话中调用）

| 命令 | 作用 | 何时用 |
|------|------|--------|
| `/daily-study` | 生成下一天课程 `days/day-XXX.md` | 每天开始学习前 |
| `/review-answer` | 批改当天 Part 1–4 作答，并追加错题回顾 | 练习做完后 |
| `/weekly-review` | 输出 7 天复习报告 → `reviews/review-XXX.md` | Day 7、14、21… |

### 典型一天

```
/daily-study          → 生成或打开今日课程
（自己做题，答案写在文件里）
/review-answer        → 批改 + 错题回顾
（每 7 天）/weekly-review → 7 天复习报告
```
