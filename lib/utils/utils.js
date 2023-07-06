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
 * @param {*} path 写入的路径
 * @param {*} content 写入的内容
 * writeFile参数：文件名；写入数据；可选对象。
 */
const writeToFile = (path, content) => {
  // writeFile本身返回的就是Promise =》所以可以直接返回出去；此处使用fs.promises使其支持.then()写法。
  return fs.promises.writeFile(path, content);

  // return new Promise((resolve, reject) => {
  // // 用回调的方式会报错：
  //   // fs.writeFile(path, content, {})
  //   //   .then((data) => {
  //   //     resolve(data);
  //   //   })
  //   //   .catch((err) => {
  //   //     return reject(err);
  //   //   });

  //   // 用callback的方式不会报错：
  //   fs.writeFile(path, content, {}, (err, data) => {
  //     if (err) {
  //       return reject(err);
  //     }
  //     resolve(data);
  //   });
  // });
};

module.exports = { compile, writeToFile };
