'use strict';

class Command{
  constructor(argv) {
    console.log(111111, argv);
    this._argv = argv;
    let runner = new Promise((resolve, reject) => {
      let chain = Promise.resolve();
      chain = chain.then(() => this.checkNodeVersion());
    })
  }

  checkNodeVersion() {
    const nodeVersion = process.versions.node;
    const [majorVs, minorVs, buildVs] = nodeVersion.split(".");
    if (+majorVs < 18) {
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
