'use strict';

// 异步执行的错误都需要捕获
class Command{
  constructor(argv) {
    if (!argv) {
      throw new Error("参数不能为空");
    }
    if (!Array.isArray(argv)) {
      throw new Error("参数必须是数组");
    }
    // if (argv.length < 2) {
    //   throw new Error("参数列表不能为空");
    // }
    // if (Object.prototype.toString.call(argv) !== "[object Object]") {
    //   throw new Error("参数必须是对象");
    // }
    this._argv = argv;
    let runner = new Promise((resolve, reject) => {
      let chain = Promise.resolve();
      chain = chain.then(() => this.checkNodeVersion());
      chain = chain.then(() => this.initArgs());
      chain = chain.then(() => this.exec());
      chain.catch((e) => {
        console.error(e.message)
      })
    });
  }
  initArgs() {
    this._cmd = this._argv[this._argv.length - 1];
    this._argv = this._argv.slice(0, this._argv.length - 1);
    console.log(11111, this._cmd, this._argv);
  }
  checkNodeVersion() {
    const nodeVersion = process.versions.node;
    const [majorVs, minorVs, buildVs] = nodeVersion.split(".");
    if (+majorVs < 14) {
      console.error(`You are running Node ${majorVs}. \nCreate Bluepha Cli requires Node 14 or higher. \nPlease update your Node version.`);
      process.exit(1);
    }
  }
  init() {
    throw new Error("init 必须实现");
  }
  exec() {
    throw new Error("exec 必须实现");
  }
}

module.exports = Command;
