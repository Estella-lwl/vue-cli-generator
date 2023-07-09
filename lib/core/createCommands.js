/**
 * 本文件用于创建自定义指令
 */
const program = require("commander");
const { createProjectAction, createCpnAction, createPageAction, createStoreAction } = require("./actions");

const createCommands = () => {
  /**
   * 新建项目:
   * - command()：规则：指令名 项目名 可选参数
   *   - PS:不用加自定义指令的名称，默认。
   * - description()：指令描述
   * - action((project, others) =>{...})：由于这里会写很多指令，所以直接封装。👇🏻
   */
  program
    .command("create <project> [others...]")
    .description("clone a repo to local folder")
    // .action((project, others) => {
    //   // 这里已经拿到了指定的项目名 =》将远程仓库代码clone =》放进指定文件夹中。
    //   console.log("callback:", project, others);
    // })
    .action(createProjectAction); //封装的方式；参数是Promise（也可以是函数）

  /**
   * 新建项目组件：
   * - 1.command参数： 命令名；组件名；可选参数。
   * - 2.description：命令的描述说明
   */
  program
    .command("addcpn <name>")
    .description("add vue project component, e.g. custom addcpn HelloWorld [-d src/components]")
    .action((name) => {
      // 用户输入指定目录则通过program.opts().dest获取
      createCpnAction(name, program.opts().dest || "src/components");
    });

  /**
   * 新建vue页面 & 路由：
   * - 创建页面
   * - 创建路由映射
   */
  program
    .command("addpage <page>")
    .description("add vue page, e.g. custom addpage homePage [-d src/pages/list/index]")
    .action((page) => {
      createPageAction(page, program.opts().dest || "src/pages");
    });

  /**
   * 新建store模块
   */
  program
    .command("addStore <store>")
    .description("add vue store, e.g. custom addStore homeStore [-d src/store/cate]")
    .action((page) => {
      createStoreAction(page, program.opts().dest || "src/store/modules");
    });
};

module.exports = createCommands;
