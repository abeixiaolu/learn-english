import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { writeJSON } from "./store.mjs";
const executable = process.env.CODEX_BIN || "codex";
export function cliStatus() {
  return new Promise((resolve) => {
    const child = spawn(executable, ["login", "status"], { env: process.env });
    let output = "";
    const timer = setTimeout(() => child.kill(), 8000);
    child.stdout.on("data", (d) => (output += d));
    child.stderr.on("data", (d) => (output += d));
    child.on("error", () => {
      clearTimeout(timer);
      resolve({
        ready: false,
        message: "找不到 Codex CLI，请安装后重启服务。",
      });
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      const ready = code === 0 && /ChatGPT/i.test(output);
      resolve({
        ready,
        message: ready
          ? "ChatGPT 已登录"
          : "请在终端运行 codex login，选择 ChatGPT 登录。",
      });
    });
  });
}
export async function runCodex(
  prompt,
  schema,
  { search = false, onStart = () => {} } = {},
) {
  const status = await cliStatus();
  if (!status.ready) throw Error(status.message);
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "english-codex-"));
  const schemaPath = path.join(dir, "schema.json"),
    outputPath = path.join(dir, "result.json");
  writeJSON(schemaPath, schema);
  const args = [
    "exec",
    "--ephemeral",
    "--skip-git-repo-check",
    "--sandbox",
    "read-only",
    "-C",
    dir,
    "-c",
    'model_provider="openai"',
    "-c",
    `web_search="${search ? "live" : "disabled"}"`,
    "--output-schema",
    schemaPath,
    "--output-last-message",
    outputPath,
    "-",
  ];
  const env = { ...process.env };
  for (const key of ["OPENAI_API_KEY", "CODEX_API_KEY"]) delete env[key];
  try {
    await new Promise((resolve, reject) => {
      const child = spawn(executable, args, {
        env,
        stdio: ["pipe", "ignore", "pipe"],
      });
      onStart(child);
      let stderr = "";
      let timedOut = false;
      child.stderr.on("data", (d) => {
        stderr = (stderr + d).slice(-4000);
      });
      const timer = setTimeout(
        () => {
          timedOut = true;
          child.kill("SIGTERM");
        },
        10 * 60 * 1000,
      );
      child.stdin.on("error", () => {});
      child.on("error", (err) => {
        clearTimeout(timer);
        reject(Error(`无法启动 Codex：${err.code || "unknown"}`));
      });
      child.on("close", (code) => {
        clearTimeout(timer);
        if (timedOut)
          return reject(
            Error("Codex 等待超过 10 分钟，答案已保存，可以重试。"),
          );
        if (code !== 0) {
          const message = /usage limit|rate limit|quota/i.test(stderr)
            ? "Codex 额度暂时不可用，请稍后重试。"
            : /auth|unauthorized|login/i.test(stderr)
              ? "Codex 登录已失效，请重新运行 codex login。"
              : "Codex 未完成任务，请检查登录与网络后重试。";
          return reject(Error(message));
        }
        resolve();
      });
      child.stdin.end(prompt);
    });
    if (!fs.existsSync(outputPath))
      throw Error("Codex 没有返回结果，可以重试。");
    return JSON.parse(fs.readFileSync(outputPath, "utf8"));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}
