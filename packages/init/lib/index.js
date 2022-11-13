#!/usr/bin/env node
'use strict';

function init(projectName, cmdObj) {
  console.log(2222222)
  console.log("init", projectName, cmdObj.force, cmdObj.targetPath, process.env.CLI_TARGET_PATH);
}

// 动态加载init包
module.exports = init;
