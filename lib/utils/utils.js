/**
 * 本文件用于封装创建组件的第二步操作：编译ejs模板
 * @param {*} template ejs模板(传入路径或名字，相应的处理不同)
 * @param {*} data 模板中的数据
 */
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

// 使用传入ejs名字的方式：
const compile = (template, data) => {
  //为方便将结果返回去，直接用 return new Promise（也可以传入第三个参数callback的形式）
  return new Promise((resolve, reject) => {
    const templatePosition = `../templates/${template}`; // 拿到ejs文件路径
    // 渲染ejs文件，renderFile参数：路径；data；可选对象；回调（现已不支持）。
    ejs
      .renderFile(path.resolve(__dirname, templatePosition), { data })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

/**
 * 文件写入：
 * - writeFile参数：文件名；写入数据；可选对象。
 * @param {*} path 写入的路径
 * @param {*} content 写入的内容
 */
const writeToFile = (path, content) => {
  // 使用fs.promises使其支持.then()
  return fs.promises.writeFile(path, content);
};

/**
 * 递归生成文件层级；
 * - 若路径完全存在 =》return
 * - 不存在 =》递归父级目录至完全符合
 * -- 创建目录
 * @param {*} folder 指定的文件路径
 * @returns
 */
const generateDir = (folder) => {
  // 1.判断当前路径是否完整存在 =》存在即return
  if (fs.existsSync(folder)) {
    return true; // 路径存在即返回标识
  } else {
    // 2.查找其父级是否存在 =》继续递归
    if (generateDir(path.dirname(folder))) {
      // 3.生成目录
      fs.mkdirSync(folder);
      return true; // 同理，这里也应返回true
    }
  }
};

module.exports = { compile, writeToFile, generateDir };
