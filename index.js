#!/usr/bin/env node
const { Command } = require("commander");
const package = require("./package.json");
const program = new Command();

program.version(package.version, "-v, --verision", "output bluepha-cli version").usage("<command> [options]");

program.option("-d, --debug", "output extra debugging");

program
  .command("create <name> [targetpath]")
  .description("create a bluepha-cli template project")
  .option("-f, --force", "忽略文件夹检查，如已存在则直接覆盖")
  .action((source, destination) => {
    console.log("当前的source", source);
    console.log();
    console.log("当前的destination", destination);
  })


console.log(33333, program.opts());
/**
 * 注意要使用program.parse()方式
 * 而不是直接在上面的链式调用之后直接xxx.parse()调用
 * 不然就会作为当前command的parse去处理了，从而help命令等都与你的预期不符合了
 */
try {
  program.parse(process.argv);
} catch(e) {
  console.error(e);
}
