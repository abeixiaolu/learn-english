# 语法学习路线图（GRAMMAR ROADMAP）

> 版本：2026-10-28 修订　|　产品：英语学习仓库　|　范围：入门 → 扎实中级（约 B2 常用语法）
>
> 本文只定义**语法知识点的强制线性顺序**；不含具体习题、词汇表或多用户架构。

---

## 1. 原则与编排规则

### 1.1 产品原则

- **主线是语法**：按知识点顺序学完；单词、场景、听力只服务当日句子，不另开词书进度条。
- **一天一个语法知识点**：例如「一般现在三单 -s」与「一般现在疑问 Do/Does」分两天，不塞进同一天的「大单元」。
- **不做两年上限**：路线有多长就排多长；用户按个人进度指针推进（日后多人时：共享 Day N 内容，每人仍从 Day 1 起）。
- **强制线性**：参考书可跳着查；本产品要求学完 A 再开 B，保证依赖（如先有过去式再有现在完成对比）。
- **对照 CEFR / 教材清单，不照搬其顺序**：Murphy 系列写明单元**不是**难度顺序（适合自查）；本路线把专题清单重排成教学顺序。
- **不设独立复习日**：复习穿插在**每一天的学习流程**里（例如课前闭卷混合复习、回译中夹旧点、间隔队列），不占用单独的 D 编号、也不新开语法点。
- **巩固由用户主动发起**：系统不自动插入「同点巩固日」或强制加练日；用户明确要求巩固某点时再安排。
- **听力用选择题**：需要听力时，题型为选择题（听后选义 / 选正确句子等），不以开放听写或口语流利度作为默认评分。
- **旧内容完全无关**：既有 Day / PLAN / `grammar/*.md` 等历史材料**不做**本路线或正式课包的参考；正式轨只按本文件 D 表生成。

### 1.2 编号方案

- 使用连续编号 **D001、D002、…**：每个 D **只对应一个新语法点**（教学日）。
- 不再有「复」类型的日程行；阶段末 / 里程碑也不再插入空白复习日。
- 个人错题与间隔复习（如 `study-data/reviews.json`，约 1/3/7/14/30 天）由每日课包的复习区消化，与本表 D 编号解耦。

### 1.3 每日课内复习（替代独立复习日）

每个教学日建议固定包含（具体题量仍由学习方式文档约定，例如约 45 分钟日程）：

1. **课前闭卷混合复习**（短）：抽近期错题 + 到期间隔项 + 少量已做对过的旧点，换场景检验；**不教新语法**。
2. **新点讲解与当日练习**（主）：仅本 D 的一个知识点。
3. **回译 / 表达中的旧点穿插**：约一小部分题目故意带回已学连接词、时态或搭配，服务迁移，仍以新点为主。
4. **阶段转换时**（进入下一阶段的前几天）：可略加重课前复习比例，但仍挂在当天的教学 D 上，不另开复习日。

**巩固**：不在本路线预留巩固日，也不由系统根据错题自动加天。仅当用户主动发起（例如「再练现在完成」）时，再临时出巩固练习；巩固不推进 D 编号，可复用同一 `grammarPointId`。

### 1.4 覆盖边界

- **纳入**：出国生活/工作高频的语法——时态对比、情态、被动、真实与非真实条件、关系从句、间接引语、动词 + -ing/to、冠词与限定词、常用介词与短语动词入门等。
- **暂不纳入**（除非日后明确要考学术写作）：极少用的倒装修辞、复杂名义化、文学虚拟语气变体、冷门限定词细枝等。
- **词汇**：路线中不设单词关卡；练习句使用受控词汇即可。

### 1.5 规模一览（本版）

| 项目 | 数量 |
|------|------|
| 教学日（新语法点） | **168** |
| 独立复习日 | **0**（复习在每日课内） |
| 日程总天数 D001–D168 | **168** |
| 阶段数 | **12** |

---

## 2. 参考来源

下列来源用于**专题清单与覆盖范围**；教学顺序为本项目重排，不复制教材正文或练习。

| 来源 | 用途 |
|------|------|
| Raymond Murphy,《Essential Grammar in Use》(elementary, 约 115 units；Cambridge 官方 TOC) | A1–B1 专题原子化参考（be、现在/过去、完成入门、情态、冠词、介词、关系从句入门、真实/非真实 if 等） |
| Raymond Murphy,《English Grammar in Use》(intermediate, 145 units；Cambridge frontmatter/contents) | B1–B2 专题：完成对比、情态细分、条件与 wish、被动、转述、动词模式、-ing/to、关系从句、限定词等；书中说明**单元非难度顺序**，故只借清单 |
| Betty Azar / Stacy Hagen,《Basic English Grammar》《Fundamentals of English Grammar》章节目录 | 课堂式章节顺序参考（现在→过去→将来→完成→问句→情态→连接→比较→被动→冠词→形容词从句→动名词不定式→名词从句） |
| British Council LearnEnglish：[A1–A2 grammar](https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2)、[B1–B2 grammar](https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2) | CEFR 分层语法课清单校验（条件、完成、被动、转述、关系从句、used to 等） |

官方 TOC 示例（Essential）：https://assets.cambridge.org/97811074/80551/toc/9781107480551_toc.pdf

Murphy intermediate 使用说明摘要：书面向中级、可按需查阅；**不适合**当作本产品的 Day 顺序原文照搬。

---

## 3. 阶段总览

| 阶段 | 标题 | 约 CEFR | 教学日数 | 核心产出 |
|------|------|---------|----------|----------|
| 01 | 起步：be、人称与存在 | A1 | 18 | 能用 be / there is 描述人与场景 |
| 02 | 一般现在时 | A1–A2 | 12 | 能谈习惯、事实，并提问 |
| 03 | 现在进行与对比 | A2 | 10 | 能区分正在做与习惯；简单描述 |
| 04 | 一般过去与过去进行 | A2 | 14 | 能叙述过去事件与背景 |
| 05 | 数量、冠词与比较 | A2 | 14 | 能量化、特指、简单比较 |
| 06 | 将来表达与基础情态 | A2–B1 | 14 | 能谈计划/预测与义务建议 |
| 07 | 连接词与真实条件 | B1 | 14 | 能组织因果转折与真实条件安排 |
| 08 | 现在完成与过去对比 | B1 | 12 | 能谈经历、持续与对现在的影响 |
| 09 | 被动、过去完成与将来进阶 | B1–B2 | 12 | 能用被动与更细时间关系 |
| 10 | 情态深化与动词模式 | B1–B2 | 16 | 能更准地推测、建议与动词搭配 |
| 11 | 关系从句、转述与非真实条件 | B2 | 14 | 能扩展信息、转述、谈假想与后悔 |
| 12 | 限定词深化、介词与生活结构 | B2 | 18 | 限定词/介词/短语动词支撑流利日常 |

---

## 4. 完整日程表

说明：下列每一天均为**教学日**（恰好一个新语法点）。复习不单独占行，见 §1.3。英文标签供课程 JSON / 生成提示使用。


### 阶段 01 — 起步：be、人称与存在

| D | 知识点（中文） | 英文标签 |
|---|--------------|----------|
| D001 | be 动词肯定：am / is / are | `be affirmative` |
| D002 | be 动词否定：am not / isn't / aren't | `be negative` |
| D003 | be 动词疑问与简短回答 | `be questions & short answers` |
| D004 | 主系表：名词 / 形容词 / 介词短语作表语 | `SVC: noun/adj/prep complement` |
| D005 | 主语代词：I you he she it we they | `subject pronouns` |
| D006 | 物主形容词：my your his her its our their | `possessive adjectives` |
| D007 | 指示词：this that these those | `demonstratives` |
| D008 | 名词单复数基础与规则变化 | `noun singular/plural basics` |
| D009 | 不定冠词 a / an（按发音） | `a/an by sound` |
| D010 | There is / There are 肯定 | `there is/are affirmative` |
| D011 | There is/are 否定与疑问 | `there is/are neg & questions` |
| D012 | have / have got 表示拥有（肯定） | `have / have got affirmative` |
| D013 | have / have got 否定与疑问 | `have / have got neg & questions` |
| D014 | 祈使句：Do / Don't / Let's | `imperatives` |
| D015 | 简单并列：and / but / or | `and/but/or` |
| D016 | 基本词序：主谓宾；地点与时间位置 | `basic word order SVO + place/time` |
| D017 | 地点介词入门：in / on / at | `prepositions of place in/on/at` |
| D018 | 时间介词入门：in / on / at | `prepositions of time in/on/at` |

### 阶段 02 — 一般现在时

| D | 知识点（中文） | 英文标签 |
|---|--------------|----------|
| D019 | 一般现在肯定（I/you/we/they + 原形） | `present simple affirmative (non-3sg)` |
| D020 | 一般现在第三人称单数 -s / -es | `present simple 3rd person -s` |
| D021 | 一般现在否定：don't / doesn't | `present simple negative` |
| D022 | 一般现在疑问：Do / Does | `present simple questions` |
| D023 | 频率副词位置：always / usually / often / never | `frequency adverbs position` |
| D024 | 一般现在用途：习惯、事实、固定时刻表 | `present simple uses` |
| D025 | 疑问词：who / what / where / when / why / how | `wh- questions basics` |
| D026 | How much / How many / How often / How long 入门 | `how-questions basics` |
| D027 | 宾语代词：me him her us them | `object pronouns` |
| D028 | 物主代词：mine yours his hers ours theirs | `possessive pronouns` |
| D029 | 名词所有格：'s 与 of | `possessive 's and of` |
| D030 | Whose…? 与所有格问答 | `whose questions` |

### 阶段 03 — 现在进行与对比

| D | 知识点（中文） | 英文标签 |
|---|--------------|----------|
| D031 | 现在进行肯定：am/is/are + -ing | `present continuous affirmative` |
| D032 | 现在进行否定与疑问 | `present continuous neg & questions` |
| D033 | -ing 拼写规则（双写、去 e、变 ie） | `-ing spelling rules` |
| D034 | 现在进行 vs 一般现在（习惯 vs 此刻/现阶段） | `present continuous vs present simple` |
| D035 | 状态动词：know / want / like / need 等不用进行 | `stative verbs` |
| D036 | still（持续）与基础位置 | `still (continuation)` |
| D037 | 形容词词序与常见描述形容词 | `adjective basics & order` |
| D038 | 副词：manner（quickly 等）与形容词区分 | `adverbs of manner vs adjectives` |
| D039 | -ed / -ing 形容词：bored vs boring | `ed/ing adjectives` |
| D040 | 形容词 + 介词：interested in / good at 等 | `adjective + preposition` |

### 阶段 04 — 一般过去与过去进行

| D | 知识点（中文） | 英文标签 |
|---|--------------|----------|
| D041 | was / were 肯定 | `was/were affirmative` |
| D042 | was / were 否定与疑问 | `was/were neg & questions` |
| D043 | 一般过去规则动词：-ed 形式与读音提醒 | `past simple regular -ed` |
| D044 | 不规则过去式：高频组（go/get/have/make/take…） | `irregular past group A` |
| D045 | 不规则过去式：高频组（come/see/say/give/find…） | `irregular past group B` |
| D046 | 一般过去否定：didn't + 原形 | `past simple negative` |
| D047 | 一般过去疑问：Did + 主语 + 原形 | `past simple questions` |
| D048 | 过去时间标记：yesterday / last / ago | `past time markers` |
| D049 | 过去进行：was/were + -ing | `past continuous form` |
| D050 | 过去进行 vs 一般过去（背景 vs 事件） | `past continuous vs past simple` |
| D051 | when / while 时间从句入门 | `when/while clauses` |
| D052 | there was / there were | `there was/were` |
| D053 | used to：过去习惯或状态 | `used to (past habits)` |
| D054 | could：过去能力与礼貌请求 | `could ability & polite requests` |

### 阶段 05 — 数量、冠词与比较

| D | 知识点（中文） | 英文标签 |
|---|--------------|----------|
| D055 | 可数名词 vs 不可数名词 | `countable vs uncountable` |
| D056 | some / any 用法 | `some/any` |
| D057 | much / many / a lot of / lots of | `much/many/a lot of` |
| D058 | a little / a few；little / few | `a little/a few vs little/few` |
| D059 | no / none / not any | `no/none/not any` |
| D060 | a/an vs the：首次提及与特指 | `a/an vs the` |
| D061 | 零冠词：复数/不可数泛指、专有名词基础 | `zero article basics` |
| D062 | the 与地点/机构：school vs the school 等 | `the with institutions/places` |
| D063 | 比较级形态：-er / more | `comparative forms` |
| D064 | 比较结构：… than … | `comparative than` |
| D065 | 同等比较：as … as；not as … as | `as...as` |
| D066 | 最高级：the -est / the most | `superlatives` |
| D067 | 修饰比较：much / a bit / far + 比较级 | `modifying comparatives` |
| D068 | both / either / neither | `both/either/neither` |

### 阶段 06 — 将来表达与基础情态

| D | 知识点（中文） | 英文标签 |
|---|--------------|----------|
| D069 | will：临时决定、承诺、预测 | `will decisions/promises/predictions` |
| D070 | be going to：计划与迹象 | `be going to plans/evidence` |
| D071 | will vs be going to 对比 | `will vs going to` |
| D072 | 现在进行表将来既定安排 | `present continuous for future` |
| D073 | 一般现在表时刻表/行程将来 | `present simple for timetable future` |
| D074 | can：能力 | `can ability` |
| D075 | can / could / may：许可与请求 | `permission & requests` |
| D076 | should / shouldn't：建议 | `should advice` |
| D077 | must / mustn't：必须与禁止 | `must/mustn't` |
| D078 | have to / don't have to：客观必要与不必 | `have to / don't have to` |
| D079 | must vs have to vs should 语气对比 | `must vs have to vs should` |
| D080 | may / might：现在/将来可能性 | `may/might possibility` |
| D081 | Would you like…? / I'd like… | `would like` |
| D082 | Shall we…? / Why don't we…? 提议 | `suggestions shall/why don't` |

### 阶段 07 — 连接词与真实条件

| D | 知识点（中文） | 英文标签 |
|---|--------------|----------|
| D083 | because / so：原因与结果（不并用） | `because/so` |
| D084 | but / although：转折与让步（不并用） | `but/although` |
| D085 | despite / in spite of 入门（接名词/-ing） | `despite / in spite of` |
| D086 | 时间从句：when / before / after / until / as soon as | `time clauses` |
| D087 | 目的：to + 不定式；so that 入门 | `infinitive of purpose / so that` |
| D088 | 零条件：If + 现在，现在（事实规律） | `zero conditional` |
| D089 | 一条件：If + 现在，will（真实可能） | `first conditional` |
| D090 | 真实条件主句：will / can / must / should | `real conditional main-clause modals` |
| D091 | if vs when（条件 vs 时间） | `if vs when` |
| D092 | so / such … that 程度结果 | `so/such...that` |
| D093 | too / enough 与不定式 | `too/enough + to` |
| D094 | 间接疑问：Do you know where…? | `embedded questions` |
| D095 | 同意结构：so do I / neither do I；too / either | `so/neither & too/either` |
| D096 | 疑问标签入门：isn't it? / don't you? | `question tags intro` |

### 阶段 08 — 现在完成与过去对比

| D | 知识点（中文） | 英文标签 |
|---|--------------|----------|
| D097 | 现在完成形式：have/has + 过去分词 | `present perfect form` |
| D098 | 过去分词：规则与高频不规则 | `past participles common` |
| D099 | ever / never 与经历 | `ever/never` |
| D100 | just / already / yet 与现在完成 | `just/already/yet` |
| D101 | for / since 与持续到现在 | `for/since` |
| D102 | How long have you…? | `how long + present perfect` |
| D103 | 现在完成 vs 一般过去（有无具体过去时间） | `present perfect vs past simple` |
| D104 | been vs gone | `been vs gone` |
| D105 | 现在完成进行：have/has been -ing | `present perfect continuous` |
| D106 | 完成进行 vs 完成简单（持续活动 vs 结果） | `PP continuous vs simple` |
| D107 | still 与完成时（I still haven't…） | `still with perfect` |
| D108 | 现在完成用于近期消息/影响 | `present perfect recent news/result` |

### 阶段 09 — 被动、过去完成与将来进阶

| D | 知识点（中文） | 英文标签 |
|---|--------------|----------|
| D109 | 被动语态入门：is/are + 过去分词（现在） | `passive present` |
| D110 | 被动：was/were + 过去分词（过去） | `passive past` |
| D111 | 被动：will be / is going to be + pp | `passive future` |
| D112 | 被动：现在完成 has/have been + pp | `passive present perfect` |
| D113 | 被动：进行 is being + pp | `passive continuous` |
| D114 | 被动使用动机：未知/不重要施事；by 短语 | `passive use & by-agent` |
| D115 | 过去完成：had + pp（先发生的过去） | `past perfect` |
| D116 | 过去完成 vs 一般过去 | `past perfect vs past simple` |
| D117 | 过去完成进行入门：had been -ing | `past perfect continuous intro` |
| D118 | 将来进行：will be -ing | `future continuous` |
| D119 | 将来完成：will have + pp | `future perfect` |
| D120 | 时间/条件从句里不用 will（when/if + 现在） | `no will in time/if clauses` |

### 阶段 10 — 情态深化与动词模式

| D | 知识点（中文） | 英文标签 |
|---|--------------|----------|
| D121 | must 推测（现在）：那一定是… | `must deduction present` |
| D122 | can't 否定推测 | `can't deduction` |
| D123 | may/might/could 推测程度 | `modal deduction degrees` |
| D124 | 情态 + have + pp：对过去的推测 | `modal + have + pp` |
| D125 | need to / needn't / don't need to | `need to / needn't` |
| D126 | had better；It's time… | `had better / it's time` |
| D127 | be able to 与 can/could 能力补充 | `be able to` |
| D128 | managed to / was able to 过去具体成功 | `managed to / was able to` |
| D129 | 动词 + to 不定式：want/decide/hope/need… | `verb + to-infinitive` |
| D130 | 动词 + -ing：enjoy/finish/avoid/mind… | `verb + -ing` |
| D131 | 动词 + 宾语 + to：want you to / tell me to | `verb + object + to` |
| D132 | remember/stop/try + -ing 或 to（意义差） | `verb + -ing or to meaning change` |
| D133 | like / would like / prefer / would rather | `like vs would like; prefer/rather` |
| D134 | 介词 + -ing；be used to + -ing | `prep + -ing; be used to` |
| D135 | see/hear + 原形 vs -ing | `perception verbs bare vs -ing` |
| D136 | make/let + 宾语 + 原形；help + (to) | `make/let/help patterns` |

### 阶段 11 — 关系从句、转述与非真实条件

| D | 知识点（中文） | 英文标签 |
|---|--------------|----------|
| D137 | 限定性关系从句：who / that / which | `defining relative who/that/which` |
| D138 | 关系代词作宾语时可省略 | `relative pronoun omission` |
| D139 | whose / where / when 关系词 | `whose/where/when relatives` |
| D140 | 非限定性关系从句：逗号 + which/who | `non-defining relative clauses` |
| D141 | 间接引语陈述：said that + 时态呼应入门 | `reported statements` |
| D142 | 间接引语：tell vs say；转述动词 | `say/tell & reporting verbs` |
| D143 | 间接疑问：语序与 if/whether | `reported questions` |
| D144 | 间接祈使：told/asked me to… | `reported imperatives` |
| D145 | 二条件：If + 过去，would（假想现在/将来） | `second conditional` |
| D146 | wish / if only + 过去（现在愿望） | `wish present` |
| D147 | 三条件：If + had pp，would have pp | `third conditional` |
| D148 | wish + 过去完成（后悔） | `wish past` |
| D149 | 混合条件入门（常见生活场景） | `mixed conditionals intro` |
| D150 | I wish / If only 与 would（抱怨习惯） | `wish + would` |

### 阶段 12 — 限定词深化、介词与生活结构

| D | 知识点（中文） | 英文标签 |
|---|--------------|----------|
| D151 | all / most / some / any + of | `quantifiers + of` |
| D152 | every / each / whole | `every/each/whole` |
| D153 | another / other / the other / others | `another/other(s)` |
| D154 | 反身代词：myself / yourself… | `reflexive pronouns` |
| D155 | by myself / on my own；a friend of mine | `by myself; of mine` |
| D156 | there vs it 作形式主语/引词 | `there vs it` |
| D157 | 地点介词扩展：under/behind/opposite/between… | `place prepositions extended` |
| D158 | 运动介词：to / into / onto / from / out of | `prepositions of movement` |
| D159 | 时间介词扩展：from…to / until / during / for / since | `time prepositions extended` |
| D160 | before / after / during / while 区分 | `before/after/during/while` |
| D161 | 动词 + 介词高频：listen to / look at / wait for… | `verb + preposition common` |
| D162 | 短语动词入门：不及物（go out / come back） | `phrasal verbs intransitive` |
| D163 | 短语动词：及物可分（turn off / put on） | `phrasal verbs separable` |
| D164 | as vs like | `as vs like` |
| D165 | although / even though / whereas 对比连接 | `contrast linkers review` |
| D166 | 冠词深化：国名、地理、独一无二事物 | `articles with names/geography` |
| D167 | 名词 + 名词组合：a bus driver / a software engineer | `noun + noun` |
| D168 | it takes… / How long does it take…? | `it takes` |
