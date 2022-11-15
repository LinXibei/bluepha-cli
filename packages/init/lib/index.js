#!/usr/bin/env node
'use strict';
const Command = require("@bluepha-cli/command");

class InitCommand extends Command {
  init() {
    this.projectName = this._argv[0] || "";
    this.force = !!this._cmd.force;
    console.log(this.projectName, this.force);
  }
  exec() {
    console.log("init的业务逻辑");
  }
}
function init(argv) {
  return new InitCommand([argv]);
}

// 动态加载init包
module.exports = init;
module.exports.InitCommand = InitCommand;
