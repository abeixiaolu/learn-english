#!/usr/bin/env python3
"""Check an unfilled Markdown lesson and exact repetitions in recent lessons."""

import argparse
import hashlib
import re
import sys
import unicodedata
from pathlib import Path


PART = re.compile(r"^##\s+Part\s+([1-4])\b.*$", re.MULTILINE | re.IGNORECASE)
QUESTION = re.compile(r"^\s*\d+[.、]\s+(.+?)\s*$", re.MULTILINE)
ANSWER = re.compile(r"^答案：\s*\n\s*```[^\n]*\n(.*?)^```\s*$", re.MULTILINE | re.DOTALL)
EXERCISES = re.compile(r"^###\s+练习\s*$", re.MULTILINE)


def sections(text):
    headings = list(PART.finditer(text))
    return [(int(h.group(1)), text[h.end():headings[i + 1].start() if i + 1 < len(headings) else len(text)])
            for i, h in enumerate(headings)]


def question_blocks(text):
    for number, body in sections(text):
        if number == 3:
            continue
        if number == 2:
            exercises = EXERCISES.search(body)
            if not exercises:
                continue
            body = body[exercises.end():]
        matches = list(QUESTION.finditer(body))
        for index, match in enumerate(matches):
            end = matches[index + 1].start() if index + 1 < len(matches) else len(body)
            yield number, match.group(1), body[match.end():end]


def normalized(text):
    return "".join(c.lower() for c in unicodedata.normalize("NFKC", text)
                   if not c.isspace() and not unicodedata.category(c).startswith("P"))


def validate(text, history):
    errors = []
    parts = sections(text)
    if [number for number, _ in parts] != [1, 2, 3, 4]:
        errors.append("课程必须依次包含且只包含 Part 1、2、3、4")
    part2 = next((body for number, body in parts if number == 2), "")
    if not EXERCISES.search(part2):
        errors.append("Part 2 缺少 ### 练习")
    blocks = list(question_blocks(text))
    for number in (1, 2, 4):
        if not any(part == number for part, _, _ in blocks):
            errors.append(f"Part {number} 没有编号题目")
    seen = {}
    for part, prompt, body in blocks:
        answer = ANSWER.search(body)
        if not answer:
            errors.append(f"Part {part} 题目缺少答案代码块：{prompt}")
        elif answer.group(1).strip():
            errors.append(f"Part {part} 题目的答案代码块不是空的：{prompt}")
        key = normalized(prompt)
        if key in seen:
            errors.append(f"课程内重复题目（Part {seen[key]} 和 Part {part}）：{prompt}")
        seen[key] = part
    for path, previous in history:
        previous_questions = {normalized(prompt) for _, prompt, _ in question_blocks(previous)}
        for _, prompt, _ in blocks:
            if normalized(prompt) in previous_questions:
                errors.append(f"题目与 {path.name} 完全重复：{prompt}")
    return errors


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("lesson", type=Path)
    parser.add_argument("--history-dir", type=Path, required=True)
    args = parser.parse_args()
    try:
        data = args.lesson.read_bytes()
        text = data.decode("utf-8")
        if not args.history_dir.is_dir():
            raise ValueError(f"历史目录不存在：{args.history_dir}")
        paths = sorted(args.history_dir.glob("day-[0-9][0-9][0-9].md"), reverse=True)
        paths = [p for p in paths if p.resolve() != args.lesson.resolve()][:3]
        history = [(p, p.read_text(encoding="utf-8")) for p in paths]
    except (OSError, UnicodeError, ValueError) as exc:
        print(f"无法检查：{exc}", file=sys.stderr)
        return 2
    print(f"检查文件：{args.lesson}")
    print(f"SHA-256：{hashlib.sha256(data).hexdigest()}")
    print("历史对照：" + (", ".join(str(p) for p in paths) or "无"))
    errors = validate(text, history)
    if errors:
        for error in errors:
            print(f"失败：{error}")
        return 1
    print("自动检查通过；不包含语义、场景、语法正确性或学习效果判断。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
