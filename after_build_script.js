/**
 * write a CNAME file to the build dir
 */

const fs = require('fs')
const targetData = fs.readFileSync('./CNAME')
fs.writeFileSync('./out/CNAME',targetData)
console.log('成功写入CNAME文件！')