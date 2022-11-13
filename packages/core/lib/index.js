#!/usr/bin/env node
'use strict';

const { Command } = require("commander");
const init = require("@bluepha-cli/init");
const exec = require("@bluepha-cli/exec");
const program = new Command();

const nodeVersion = process.versions.node;
const [majorVs, minorVs, buildVs] = nodeVersion.split(".");

// checkNodeVersion();
const packageJson = require("../package.json");
program
  .version(packageJson.version)
  .option('-d, --debug', '是否进入debug模式', false)
  .option('-tp, --targetPath <targetPath>', '是否制定本地调试文件', '');
  // .parse(process.argv);


program
  .command('init [projectName]')
  .option('-f, --force', '是否强制初始化项目')
  .action(exec)

program.on('option:targetPath', (params) => {
  process.env.CLI_TARGET_PATH = params;
  console.log(params)
});
function registerCommand() {

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

program.parse(process.argv);
function checkNodeVersion() {
  if (+majorVs < 18) {
    console.error(`You are running Node ${majorVs}. \nCreate Bluepha Cli requires Node 14 or higher. \nPlease update your Node version.`);
    process.exit(1);
  }
}