#!/usr/bin/env node
'use strict';
const Command = require("@bluepha-cli/command");

class InitCommand extends Command {
  
}
function init(argv) {
  return new InitCommand(argv);
}

// 动态加载init包
module.exports = init;
module.exports.InitCommand = InitCommand;
