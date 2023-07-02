const { promisify } = require("util");
const path = require("path");

// 借助node中util的promisify将该库变为可使用Promise：
const download = promisify(require("download-git-repo"));
// const open = require("open"); //这里报错先注了，可能因为远程代码有过变更。

const { commandSpawn } = require("../utils/terminal");
const { compile, writeToFile } = require("../utils/utils");
const { vueRepo } = require("../config/repo-config");

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
 * @param {*} name 命令指定的组件名（形参名和command方法中保持一致）
 * @param {*} dest destination目标目录
 * - 大致思路：
 *  1. 使用ejs编写模板
 *  2. 编译（模板的.vue文件；router的.js文件）
 *  3. 编译结果写入vue文件
 */
// TODO: 测试中。。
// const dest = program.dest;
// console.log("目录2：", program, program.dest);

const createCpnAction = async (name, dest) => {
  console.log("result2:", name, dest);
  // S2.拿到ejs编译结果：  （compile参数：模板名；data:{命令中输入的组件名，小写组件名}）
  const result = await compile("component.ejs", { name, lowercaseName: name.toLowerCase() });

  // S3.写入文件：  （router、store模块、types =》所以继续抽到utils中）
  //当用户指定目录，将用户传入的dest目标文件夹和文件名（注意.vue后缀）拼接：
  const targetPath = path.resolve(dest, `${name}.vue`);
  writeToFile(targetPath, result);
};

module.exports = {
  createProjectAction,
  createCpnAction,
};
