'use strict';
const Package = require("@bluepha-cli/package");

const SETTINGS = {
  init: "@bluepha-cli/init"
}
function exec() {
  const cmdObj = arguments[arguments.length - 1];
  const cmdName = cmdObj.name();
  const packageName = SETTINGS[cmdName];
  const packageVersion = "latest";
  // console.log(process.env.CLI_TARGET_PATH);
  // 拿到targetPath  ---> modulePath
  // modulePath ---> Package
  // Package.getRootFile(获取入口文件)
  // Package.update 
  // Package.install
  // 封装
  let targetPath = process.env.CLI_TARGET_PATH;
  if (!targetPath) {
    targetPath = ""; // 生成缓存路径
  }
  const homePath = process.env.CLI_HOME_PATH;
  console.log("targetPath", targetPath);
  console.log();
  console.log("homePath", homePath);
  const pkg = new Package({ targetPath, packageName, packageVersion });
  console.log(1111, pkg.getRootFile());
}


module.exports = exec;
