/**
 * 本文件用于创建其他指令
 */
const program = require("commander");
const { createProjectAction, createCpnAction } = require("./actions");

const createCommands = () => {
  /**
   * 设置可选参数:
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
   * 新建项目组件的命令：
   * - 1.command参数： 命令名；组件名；可选参数。
   * - 2.description：命令的描述说明
   */
  program
    .command("addcpn <name>")
    .description("add vue project component, e.g. custom addcpn HelloWorld [-d src/components]")
    .action((name) => {
      // 当用户输入了指定目录则通过program.dest获取；否则默认src/components。
      console.log("目录：", program.dest);
      createCpnAction(name, program.dest || "src/components");
    });
};

module.exports = createCommands;
