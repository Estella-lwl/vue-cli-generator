// 内置模块
const { promisify } = require("util");
// 第三方库
// 借助node中util的promisify将该库变为可使用Promise：
const download = promisify(require("download-git-repo"));
// const open = require("open"); //这里报错先注了，可能因为远程代码有过变更。
// 自己的模块
const { vueRepo } = require("../config/repo-config");
const { commandSpawn } = require("../utils/terminal");

/**
 * 用于新建项目的action：
 * @param {*} project
 * @param {*} others
 */
// 由callback变为async await的整个过程：callback -> 使用promisify -> Promise -> async await👇🏻
const createProjectAction = async (project, others) => {
  console.log("创建成功:", project, others);
  // 这时download方法就可以使用Promise写法：  （这里直接用了语法糖）
  // 1.clone项目，参数：目标地址；目标目录；是否clone；callback
  await download(vueRepo, project, { clone: true });

  // 2.执行 npm install，参数: 命令；具体指令；在哪个目录。     (此处封装到了utils/terminal.js)
  // Windows下执行的是npm.cmd =》应先使用process.platform做判断：
  let sysCommand = process.platform === "win32" ? "npm.cmd" : "npm";
  console.log("sysCommand:", sysCommand);
  await commandSpawn(sysCommand, ["install"], { cwd: `./${project}` }); //第三个参数：可选项，cwd代表进入到的目录

  // 3.运行 npm run serve，参数和上一步同理
  commandSpawn(sysCommand, ["run", "serve"], { cwd: `./${project}` });

  /**
   * 4.打开浏览器：借助第三方库 npm i open：
   *  - 这里的逻辑是在监听端口期间打开地址，所以上一行不能写await =》会阻塞这步的执行
   *  - 解决：1.上行不使用await；2.这一步提前至上行之前。
   */
  // open("http://localhost:8089/"); //指定打开的地址
};

/**
 * 用于创建组件的action：
 * @param {*} name 命令指定的组件名
 * @param {*} dest destination目标目录
 * - 大致思路：
 *  1. 使用ejs编写模板 =》编译；  （1.模板的.vue文件；2.router的.js文件）
 *  2. 编译结果写入vue文件。
 */
const createCpnAction = (name, dest) => {
  //
};

module.exports = {
  createProjectAction,
  createCpnAction,
};
