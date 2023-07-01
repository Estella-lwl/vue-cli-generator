#!/usr/bin/env node

const program = require("commander");
const helpOptions = require("./lib/core/help");
const createCommands = require("./lib/core/createCommands");

// program.version("1.0.0");
program.version(require("./package.json").version); // 设置后可使用 --version查看版本号

helpOptions(); // 调用
createCommands(); // 创建其他指令

program.parse(process.argv); // 解析
