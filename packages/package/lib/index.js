'use strict';
const path = require("path");

const pkgDir = require('pkg-dir').sync;
const formatPath = require("@bluepha-cli/format-path");
class Package {
  constructor(options) {
    if (!options) {
      throw new Error("Package类的options参数不能为空！");
    }
    console.log(77777, options);
    if (Object.prototype.toString.call(options) !== '[object Object]') {
      throw new Error("Package类的options选项必须为对象！");
    }
    // package 目标路径
    this.targetPath = options.targetPath;
    // package 缓存路径
    // this.storePath = options.storePath;
    // package的name
    this.packageName = options.packageName;
    // package的版本
    this.packageVersion = options.packageVersion;

  }
  // 判断当前package是否存在
  exists() {

  }
  // 安装package
  install() {

  }
  // 更新package
  update() {

  }
  // 获取入口文件地址
  getRootFile() {
    // 获取package.json目录 pkg-dir
    // 读取package.json - require(js/json/node)
    // main/ lib - path
    // 兼容路径
    const dir = pkgDir(this.targetPath);
    if (dir) {
      const pkgFile = require(path.resolve(dir, 'package.json'));
      if (pkgFile && pkgFile.main) {
        return formatPath(path.resolve(dir, pkgFile.main));
      }
    }
    return null;
  }
}

module.exports = Package;


