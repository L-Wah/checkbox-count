// publish.js
const { exec } = require("child_process");
const path = require("path");

// 指定要切换到的目录
const targetDirectory = path.resolve(__dirname, "../dist/vue-checkbox-count");

// 构建npm publish命令
const publishCommand = "npm publish";

console.log(`尝试在目录"${targetDirectory}"中执行: ${publishCommand}`);

// 使用child_process的exec方法执行命令
exec(publishCommand, { cwd: targetDirectory }, (error, stdout, stderr) => {
  if (error) {
    console.error(`执行出错: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
