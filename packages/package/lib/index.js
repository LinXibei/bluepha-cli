'use strict';
const path = require("path");
const npminstall = require("npminstall");
const fse = require("fs-extra");
const pathExists = require("path-exists").sync;
const pkgDir = require('pkg-dir').sync;
const formatPath = require("@bluepha-cli/format-path");

function getDefaultRegistry(isOrigin = false) {
  return isOrigin ? "https://registry.npmjs.org" : "https://registry.npm.taobao.org";
}
async function getNpmSemverVersion(baseVersion, npmName, registry) {
  const version = await getNpmLatestVersions(npmName, registry);
  const newVersion = getSemverVersions(baseVersion, versions);
  if (newVersion && newVersion.length) {
    return newVersion[0]
  }
  return null
}
function getSemverVersions(baseVersion, versions) {
  let versions = versions.filter(version => getSemverVersions.satisfies(version, `^${baseVersion}`))
  if (versions) {
    return versions.sort((a, b) => getSemverVersions.gt(b, a))[0]
  };
  return null
}
async function getNpmLatestVersion(npmName, registry) {
  const version = getNpmLatestVersions(npmName, registry);
}
function getNpmLatestSemverVersion(npm, baseVersion, registry) {
  return getVersions(npm, registry).then(function (versions) {
    return getLatestSemverVersion(baseVersion, versions);
  });
}
class Package {
  constructor(options) {
    if (!options) {
      throw new Error("Package类的options参数不能为空！");
    }
    if (Object.prototype.toString.call(options) !== '[object Object]') {
      throw new Error("Package类的options选项必须为对象！");
    }
    // package 目标路径
    this.targetPath = options.targetPath;
    // package 缓存路径
    this.storeDir = options.storeDir;
    // package的name
    this.packageName = options.packageName;
    // package的版本
    this.packageVersion = options.packageVersion;
    // package的缓存目录前缀
    this.cacheFilePathPrefix = this.packageName.replace("/", "_");
  }
  async prepare() {
    if (this.storeDir && !pathExists(this.storeDir)) {
      fse.mkdirpSync(this.storeDir);
    }
    if (this.packageVersion === "latest") {
      this.packageVersion = await getNpmLatestVersion(this.packageName);
    }
    console.log(this.packageVersion)
  }
  get cacheFilePath() {
    return path.resolve(this.storeDir, `_${this.cacheFilePath}@${this.packageVersion}@${this.packageName}`)
  }
  // 判断当前package是否存在
  async exists() {
    if (this.storeDir) {
      await this.prepare();
      return pathExists(this.cacheFilePath);
    } else {
      return pathExists(this.targetPath);
    }
  }
  // 安装package
  async install() {
    await this.prepare();
    // npminstall 
    npminstall({
      root: this.targetPath,
      storeDir: this.storeDir,
      registry: getDefaultRegistry(),
      pkgs: [{
        name: this.packageName,
        version: this.packageVersion
      }]
    })
  }
  // 更新package
  async update() {
    await this.prepare();
  }
  // 获取入口文件地址
  getRootFile() {
    function _getRootFile(targetPaht) {
      const dir = pkgDir(targetPath);
      if (dir) {
        const pkgFile = require(path.resolve(dir, 'package.json'));
        if (pkgFile && pkgFile.main) {
          return formatPath(path.resolve(dir, pkgFile.main));
        }
      }
    }
    // 获取package.json目录 pkg-dir
    // 读取package.json - require(js/json/node)
    // main/ lib - path
    // 兼容路径
    if (this.storeDir) {
      return _getRootFile(this.cacheFilePath);
    } else {
      return _getRootFile(this.targetPath)
    }
  }
}

module.exports = Package;


