import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

from validate_lesson import question_blocks, validate


ROOT = Path(__file__).resolve().parents[4]
SCRIPT = Path(__file__).with_name("validate_lesson.py")
LESSON = """# Day 028 — 日常安排

## Part 1 复习抽查

1. 昨天我在公园里散步。

答案：

```

```

## Part 2 语法复盘

解释与示例。

### 练习

1. 把这个句子改成疑问句。

答案：

```

```

## Part 3 词汇

| 词 | 意思 |
| --- | --- |
| park | 公园 |

## Part 4 回译练习

1. 她明天要去买水果。

答案：

```

```
"""


class LessonValidationTests(unittest.TestCase):
    def test_valid_lesson(self):
        self.assertEqual(validate(LESSON, []), [])

    def test_missing_and_filled_answers_fail(self):
        filled = LESSON.replace("```\n\n```", "```\nI walked.\n```", 1)
        self.assertTrue(any("不是空的" in e for e in validate(filled, [])))
        missing = LESSON.replace("答案：\n\n```\n\n```", "", 1)
        self.assertTrue(any("缺少答案" in e for e in validate(missing, [])))

    def test_missing_section_and_repeated_question_fail(self):
        self.assertTrue(any("Part 1、2、3、4" in e for e in validate(LESSON.replace("## Part 3", "## 词汇"), [])))
        repeated = LESSON.replace("她明天要去买水果。", "昨天我在公园里散步。")
        self.assertTrue(any("课程内重复" in e for e in validate(repeated, [])))

    def test_real_historical_question_is_detected(self):
        path = ROOT / "days/day-025.md"
        original = path.read_text(encoding="utf-8")
        prompts = list(question_blocks(original))
        self.assertGreater(len(prompts), 20)
        self.assertTrue(any("不是空的" in e for e in validate(original, [])))
        candidate = LESSON.replace("昨天我在公园里散步。", prompts[0][1])
        self.assertTrue(any("day-025.md" in e for e in validate(candidate, [(path, original)])))
        self.assertFalse(any("day-025.md" in e for e in validate(LESSON, [(path, original)])))

    def test_cli_checks_candidate_against_real_history(self):
        with tempfile.TemporaryDirectory() as directory:
            candidate = Path(directory) / "day-028.md"
            candidate.write_text(LESSON, encoding="utf-8")
            result = subprocess.run([sys.executable, str(SCRIPT), str(candidate), "--history-dir", str(ROOT / "days")], capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
            self.assertIn("day-025.md", result.stdout)
            self.assertIn("SHA-256", result.stdout)

    def test_cli_rejects_missing_history(self):
        with tempfile.TemporaryDirectory() as directory:
            candidate = Path(directory) / "day-028.md"
            candidate.write_text(LESSON, encoding="utf-8")
            result = subprocess.run([sys.executable, str(SCRIPT), str(candidate), "--history-dir", str(candidate / "missing")], capture_output=True, text=True)
            self.assertEqual(result.returncode, 2)
            self.assertIn("历史目录不存在", result.stderr)


if __name__ == "__main__":
    unittest.main()
