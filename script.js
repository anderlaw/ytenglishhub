//读取文件内容，并复制重命名
const fs = require("fs");
fs.copyFile("./build/index.html", "./build/404.html", (err) => {
  if (err) {
    console.log(`make custom 404.html error =====> ${err}`);
  }
});
