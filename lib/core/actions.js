const { promisify } = require("util");
const path = require("path");
const chalk = require("chalk");

// 借助node中util的promisify将该库变为可使用Promise：
const download = promisify(require("download-git-repo"));
const open = require("open"); //这里报错先注了，可能因为远程代码有过变更。

const { commandSpawn } = require("../utils/terminal");
const { compile, writeToFile, generateDir } = require("../utils/utils");
const { vueRepo } = require("../config/repo-config");

/**
 * action_新建项目
 * @param {*} project
 * @param {*} others
 */
// 由callback变为async await的整个过程：callback -> 使用promisify -> Promise -> async await👇🏻
const createProjectAction = async (project, others) => {
  console.log(chalk.cyanBright("项目创建成功"));

  /**
   * 1.clone项目
   * @param {*} 目标地址
   * @param {*} 目标目录
   * @param {*} 是否clone
   * @param {*} 目标目录
   */
  await download(vueRepo, project, { clone: true });

  // 2.执行 npm install，参数: 命令；具体指令；在哪个目录。     (此处封装到了utils/terminal.js)
  // Windows下执行的是npm.cmd =》应先使用process.platform做判断：
  let sysCommand = process.platform === "win32" ? "npm.cmd" : "npm";
  console.log("sysCommand:", sysCommand);
  await commandSpawn(sysCommand, ["install"], { cwd: `./${project}` }); //第三个参数：可选项，cwd代表进入到的目录

  // 3.运行 npm run serve，参数和上一步同理
  commandSpawn(sysCommand, ["run", "serve"], { cwd: `./${project}` });

  /**
   * 4.打开浏览器：借助第三方库 npm i open
   *  - 这里的逻辑是在监听端口期间打开地址，所以上一行不能写await =》会阻塞这步的执行
   *  - 解决：1.上行不使用await；2.这一步提前至上行之前。
   */
  // open("http://localhost:8089/"); //指定打开的地址
};

/**
 * 用于创建组件的action：
 * @param {*} name 命令指定的组件名（形参名和command方法中保持一致）
 * @param {*} dest destination目标目录
 * - 大致思路：
 *  1. 使用ejs编写模板
 *  2. 编译（模板的.vue文件；router的.js文件）
 *  3. 编译结果写入vue文件
 */
const createCpnAction = async (name, dest) => {
  // S2.拿到ejs编译结果：  （compile参数：模板名；data:{命令中输入的组件名，小写组件名}）
  const result = await compile("component.ejs", {
    name,
    lowercaseName: name.toLowerCase(),
  });
  // S3.写入文件：  （router、store模块、types =》所以继续抽到utils中）
  const targetPath = path.resolve(dest, `${name}.vue`);
  writeToFile(targetPath, result);
};

/**
 * 用于创建页面的action：
 * - 添加组件 & 路由。
 * @param {*} name 文件名
 * @param {*} dest 目标文件夹
 */
const createPageAction = async (name, dest) => {
  // 1.编译ejs模板
  const pageResult = await compile("component.ejs", {
    name,
    lowercaseName: name.toLowerCase(),
  });
  const routeResult = await compile("vue-router.js.ejs", {
    name,
    lowercaseName: name.toLowerCase(),
  });
  // -- 生成目标路径 =》写入文件：
  // --- 当未指定路径 =》根据文件名生成同名文件夹：
  const customDir = path.resolve(dest, name.toLowerCase());
  if (generateDir(customDir)) {
    // 2. 分别写入文件：
    const targetPagePath = path.resolve(customDir, `${name}.vue`);
    const targetRoutePath = path.resolve(customDir, "router.js");
    writeToFile(targetPagePath, pageResult);
    writeToFile(targetRoutePath, routeResult);
  }
};

/**
 * 用于新建store模块
 * - 1.
 * @param {*} name 文件名
 * @param {*} dest 路径
 */
const createStoreAction = async (name, dest) => {
  // 1.编译store & types的ejs模板：
  const storeResult = await compile("vue-store.ejs", {
    name,
    lowercaseName: name.toLowerCase(),
  });
  const storeTypesResult = await compile("vue-store-types.ejs", {
    name,
    lowercaseName: name.toLowerCase(),
  });
  const customDir = path.resolve(dest, name.toLowerCase());
  if (generateDir(customDir)) {
    // 2. 分别写入文件：
    const targetStorePath = path.resolve(customDir, `index.js`);
    const targetStoreTypesPath = path.resolve(customDir, "types.js");
    writeToFile(targetStorePath, storeResult);
    writeToFile(targetStoreTypesPath, storeTypesResult);
  }
};

module.exports = {
  createProjectAction,
  createCpnAction,
  createPageAction,
  createStoreAction,
};
