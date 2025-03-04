#!/usr/bin/env node

const program = require("commander");
const helpOptions = require("./lib/core/help");
const createCommands = require("./lib/core/createCommands");

program.version(require("./package.json").version); // 使其可通过--version查看版本号

helpOptions(); // 增加其他选项
createCommands(); // 创建其他指令

program.parse(process.argv);