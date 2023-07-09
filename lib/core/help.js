/**
 * 自定义options
 */
const program = require("commander");

const helpOptions = () => {
  // 使用 option 实现：
  program.option("-f --framework <framework>", "选择框架"); //选择框架
  program.option("-d --dest <dest>", "示例：-d /src/components"); //自定义目标路径

  // 使用 on() 实现：
  program.on("--help", () => {
    console.log(""); // 可以有空行的效果
    console.log("Other");
    console.log("  other options");
  });
};

module.exports = helpOptions;
