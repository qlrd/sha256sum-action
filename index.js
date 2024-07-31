const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs')
const path = require('path')
const hasha = require('hasha')
const util = require('util')

const writeFileAsync = util.promisify(fs.writeFile)

const dir = core.getInput('working-directory');
const file = core.getInput('file');
const ext = core.getInput('ext');

const __filepath__ = path.join(dir, file);
const __hashpath__ = path.join(dir, `${file}.${ext}`);

function colorize(action, msg) {
  return `\x1b[32m${action}\x1b[0m ${msg}`
}

console.log(colorize('reading:', __filepath__))
hasha.fromFile(__filepath__, { algorithm: 'sha256' })
  .then(function(hash) {
    console.log(colorize('hashed:', __filepath__))
    const content = `${hash} ${file}`;
    console.log(colorize('content:', content));
    console.log(colorize('created:', __hashpath__));
    return writeFileAsync(__hashpath__, content, 'utf8');
  }).then(function() {
    core.setOutput('hash-file', __hashpath__);
  })
  .catch(function(err) {
    core.setFailed(err.message);
  })
