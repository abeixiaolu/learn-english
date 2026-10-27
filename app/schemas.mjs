const str = { type: "string" };
const obj = (properties) => ({
  type: "object",
  properties,
  required: Object.keys(properties),
  additionalProperties: false,
});
const arr = (items) => ({ type: "array", items });
export const questionSchema = obj({ id: str, prompt: str, target: str });
export const lessonSchema = obj({
  id: str,
  date: str,
  title: str,
  unit: str,
  rationale: str,
  notes: arr(obj({ title: str, body: str })),
  vocabulary: arr(obj({ word: str, meaning: str, example: str })),
  sections: arr(
    obj({
      id: str,
      title: str,
      instruction: str,
      questions: arr(questionSchema),
    }),
  ),
  listening: obj({
    videoId: str,
    title: str,
    channel: str,
    start: { type: "integer" },
    end: { type: "integer" },
    sourceUrl: str,
    evidenceUrl: str,
    evidence: str,
    checkedAt: str,
    instructions: str,
  }),
});
export const feedbackSchema = obj({
  summary: str,
  grammar: str,
  nextStep: str,
  results: arr(
    obj({
      id: str,
      status: {
        type: "string",
        enum: ["correct", "incorrect", "suggestion", "ungraded"],
      },
      correction: str,
      explanation: str,
      tags: arr(str),
    }),
  ),
});
export function validateSchema(value, schema, path = "结果") {
  if (schema.type === "object") {
    if (!value || typeof value !== "object" || Array.isArray(value))
      throw Error(`${path} 格式错误`);
    for (const key of schema.required)
      if (!(key in value)) throw Error(`${path} 缺少 ${key}`);
    for (const key of Object.keys(value)) {
      if (!(key in schema.properties))
        throw Error(`${path} 出现未知字段 ${key}`);
      validateSchema(value[key], schema.properties[key], `${path}.${key}`);
    }
  } else if (schema.type === "array") {
    if (!Array.isArray(value)) throw Error(`${path} 必须是数组`);
    value.forEach((v, i) => validateSchema(v, schema.items, `${path}[${i}]`));
  } else if (
    schema.type === "integer"
      ? !Number.isInteger(value)
      : typeof value !== schema.type
  )
    throw Error(`${path} 类型错误`);
  if (schema.enum && !schema.enum.includes(value))
    throw Error(`${path} 取值无效`);
}
export function validateLesson(lesson) {
  validateSchema(lesson, lessonSchema);
  if (!/^day-\d{3}$/.test(lesson.id)) throw Error("课程编号无效");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(lesson.date)) throw Error("课程日期无效");
  const ids = new Set();
  for (const section of lesson.sections) {
    if (!/^[a-z][a-z0-9-]*$/.test(section.id) || ids.has(section.id))
      throw Error("区块编号重复或无效");
    ids.add(section.id);
    for (const q of section.questions) {
      if (!/^[a-z][a-z0-9-]*$/.test(q.id) || ids.has(q.id) || !q.prompt.trim())
        throw Error("题号重复或无效");
      ids.add(q.id);
    }
  }
  for (const id of ["review", "practice", "listening", "output"])
    if (!lesson.sections.some((s) => s.id === id && s.questions.length))
      throw Error(`课程缺少 ${id}`);
  const l = lesson.listening;
  if (
    !/^[\w-]{11}$/.test(l.videoId) ||
    l.start < 0 ||
    l.end <= l.start ||
    l.end - l.start > 180
  )
    throw Error("听力片段无效");
  const source = new URL(l.sourceUrl);
  if (
    !["www.youtube.com", "youtube.com"].includes(source.hostname) ||
    source.searchParams.get("v") !== l.videoId ||
    source.protocol !== "https:"
  )
    throw Error("YouTube 来源与视频不一致");
  if (new URL(l.evidenceUrl).protocol !== "https:" || !l.evidence.trim())
    throw Error("缺少听力内容核验依据");
  return lesson;
}
export const questions = (lesson) =>
  lesson.sections.flatMap((s) =>
    s.questions.map((q) => ({ ...q, section: s.id })),
  );
export function validateFeedback(result, submittedIds) {
  validateSchema(result, feedbackSchema);
  const ids = result.results.map((r) => r.id);
  if (
    ids.length !== submittedIds.length ||
    new Set(ids).size !== ids.length ||
    submittedIds.some((id) => !ids.includes(id))
  )
    throw Error("批改题号与提交不一致，请重试");
  return result;
}
