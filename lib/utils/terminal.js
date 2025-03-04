/**
 * 用于封装实现终端执行命令行的代码
 */

// 1. 使用child_process模块的spawn开启进程（或exec）
const { spawn } = require("child_process");

const commandSpawn = (...args) => {
  /**
   * 获取子进程：
   * - 子进程中有很多执行命令过程中的打印信息
   * - 子进程对象中有个stdout属性（标准输出流），其中有个输出流pipe
   * - (将用户的所有输出流放到我的输出流中)
   * - 监听事件on =》执行完提示/下一步操作：
   * -- 两种写法：
   *  --- 1.commandSpawn第二个参数为callback（容易回调地狱）；
   *  --- 2.整个用new Promise 给return出去。
   */
  return new Promise((resolve, rejects) => {
    const childProcess = spawn(...args);
    childProcess.stdout.pipe(process.stdout); // 将用户的所有输出流放到当前进程的输出流中
    childProcess.stderr.pipe(process.stderr); // 将用户的错误信息放到当前进程的错误信息中
    // 监听事件on：监听到close =》弹出提示
    childProcess.on("close", () => {
      // 这样就可以使用 resolve：
      resolve();
    });
  });
};

module.exports = { commandSpawn };
