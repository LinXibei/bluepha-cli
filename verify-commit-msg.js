const msgPath = process.env.GIT_PRAMAS;
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim();

console.log(msg)
