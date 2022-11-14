#!/usr/bin/env node
'use strict';

const { Command } = require("commander");
const init = require("@bluepha-cli/init");
// const exec = require("@bluepha-cli/exec");
const program = new Command();

// checkNodeVersion();
const packageJson = require("../package.json");
  // .parse(process.argv);

registerCommand();
function registerCommand() {
  program
    .name(Object.keys(packageJson.bin)[0])
    .usage('<command> [options]')
    .version(packageJson.version)
    .option('-d, --debug', '是否进入调试模式', false)
    .option('-tp, --targetPath <targetPath>', '是否制定本地调试文件');

  
  program
    .command('init [projectName]')
    .option('-f, --force', '是否强制初始化项目')
    // .action(exec)
    .action(init)

  program.on("option:debug", (params) => {
    console.log("debug:::", params);
  });

  program.on('option:targetPath', (params) => {
    process.env.CLI_TARGET_PATH = params;
    console.log(params)
  });
  // 对未知命令监听
  program.on("command:*", (obj) => {
    const availableCommands = program.commands.map((cmd) => cmd.name());
    console.log("未知命令：", obj[0]);
    if (availableCommands.length) {
      console.log("可用命令：" + availableCommands.join(","));
    }
  });

  program.parse(process.argv);
}

function prepare() {
  checkPackageVersoin();
  checkRoot();
  checkUserHome();
  checkEnv();
  // await checkGlobalUpdate();
}

async function checkGlobalUpdate() {

}