#!/usr/bin/env node
'use strict';

const { Command } = require("commander");
const program = new Command();

const nodeVersion = process.versions.node;
const [majorVs, minorVs, buildVs] = nodeVersion.split(".");

checkNodeVersion();
const packageJson = require("../package.json");
program
  .version(packageJson.version)
  .parse(process.argv);

function registerCommand() {

}

function prepare() {

}

function checkGlobalUpdate() {

}

function checkNodeVersion() {
  if (+majorVs < 18) {
    console.error(`You are running Node ${majorVs}. \nCreate Bluepha Cli requires Node 14 or higher. \nPlease update your Node version.`);
    process.exit(1);
  }
}