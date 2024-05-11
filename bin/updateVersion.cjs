const fs = require("fs");
const path = require("path");

// 文件路径
const configPath = path.join(__dirname, "../public/package.json");

// 读取JSON文件
fs.readFile(configPath, "utf8", (err, data) => {
  if (err) {
    console.error("读取配置文件时出错:", err);
    return;
  }

  try {
    // 将读取的JSON字符串解析成JavaScript对象
    const config = JSON.parse(data);
    // 修改配置对象
    let versionArr = config.version.split(".");

    versionArr[2] = +versionArr[2] + 1;
    config.version = versionArr.join(".");

    // 将修改后的对象序列化为JSON字符串
    const updatedData = JSON.stringify(config, null, 2); // 第三个参数是缩进量，使输出更易读

    // 将修改后的内容写回文件
    fs.writeFile(configPath, updatedData, "utf8", (err) => {
      if (err) {
        console.error("写入配置文件时出错:", err);
      } else {
        console.log(`ok！当前版本：${config.version}`);
      }
    });
  } catch (parseError) {
    console.error("解析JSON字符串时出错:", parseError);
  }
});
