#!/usr/bin/env node
const { Command } = require("commander");
// const commander = require("commander");
const package = require("./package.json");
const program = new Command();
// const { program } = commander; // 单例模式

program
  .name(package.name)
  .usage("<command> [option]")
  .version(package.version)
  .option("-d, --debug", "是否开启调试", false)
  .option("-e, --env", "获取环境变量")
  // .parse(process.argv);

  console.log(program.args);
// program.version(package.version, "-v, --verision", "output bluepha-cli version").usage("<command> [options]");

// program.option("-d, --debug", "output extra debugging");
// console.log(33333, program.opts());
// program
//   .command("create <name> [targetpath]")
//   .description("create a bluepha-cli template project")
//   .option("-f, --force", "忽略文件夹检查，如已存在则直接覆盖")
//   .action((source, destination) => {
//     console.log("当前的source", source);
//     console.log();
//     console.log("当前的destination", destination);
//   })

// Command 注册命令
const clone = program.command("clone <source> [destination]"); // 返回的不是program，是另外一个对象
clone
  .description("clone xxx")
  .option("-f, --force")
  .action((source, destination, cmdObj) => {
  console.log("do clone", source, destination, cmdObj);
})

// addCommand 注册子命令
const service = new Command("service");
service
  .command("start [port]]")
  .description("start service at some port")
  .action((port) => {
    console.log("do service start", port);
  })
program.addCommand(service);


program
  .arguments("<cmd> [options]")
  .description("test command")
  .action((cmd, options) => {
    console.log(cmd, options);
  });
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
