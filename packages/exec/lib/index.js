'use strict';
const path = require("path");
const Package = require("@bluepha-cli/package");

const SETTINGS = {
  init: "@bluepha-cli/init"
}
const CACHE_DIR = "dependencies";
async function exec() {
  const cmdObj = arguments[arguments.length - 1];
  const cmdName = cmdObj.name();
  const packageName = SETTINGS[cmdName];
  const packageVersion = "latest";
  let pkg = null;
  // console.log(process.env.CLI_TARGET_PATH);
  // 拿到targetPath  ---> modulePath
  // modulePath ---> Package
  // Package.getRootFile(获取入口文件)
  // Package.update 
  // Package.install
  // 封装
  let storeDir = "";
  let targetPath = process.env.CLI_TARGET_PATH;
  const homePath = process.env.CLI_HOME_PATH || "";
  if (!targetPath) {
    targetPath = !homePath ? path.resolve(CACHE_DIR) : path.resolve(homePath, CACHE_DIR); // 生成缓存路径
    storeDir = path.resolve(targetPath, "node_modules");
    pkg = new Package({ targetPath, packageName, packageVersion, storeDir });
    if(await pkg.exists()) {
      // 更新package
    } else {
      // 安装package
      await pkg.install();
    }
  } else {
    pkg = new Package({
      targetPath, packageName, packageVersion, 
    })
  }
  const rootFile = pkg.getRootFile();
  if (rootFile) {
    require(rootFile).apply(null, Array.from(arguments));
  }
}


module.exports = exec;
