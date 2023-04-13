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


const __filepath__ = path.join(process.env.GITHUB_WORKSPACE, dir, file);
const __hashpath__ = path.join(process.env.GITHUB_WORKSPACE, dir, `${file}.${ext}`);

console.log(`reading ${__filepath__}`)
hasha.fromFile(__filepath__, { algorithm: 'sha256' })
  .then(function(hash) {
    console.log(`${__filepath__} hashed`)
    const content = `${hash} ${file}`;
    console.log(`content: ${content}`);
    console.log(`creating ${__hashpath__}`)
    return writeFileAsync(__hashpath__, content, 'utf8');
  }).then(function() {
    core.setOutput('hash-file', hashPathFile);
  })
  .catch(function(err) {
    core.setFailed(err.message);
  })
