const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs')
const path = require('path')
const hasha = require('hasha')
const util = require('util')

const writeFileAsync = util.promisify(fs.writeFile)

const file = core.getInput('file');
const ext = core.getInput('ext');

const hashPathFile = `${file}.${ext}`;

const __path__ = path.join(process.env.GITHUB_WORKSPACE, pathToFile);
const __hashpath__ = path.join(process.env.GITHUB_WORKSPACE, hashPathFile);

hasha.fromFile(__path__, { algorithm: 'sha256' })
  .then(function(hash) {
    const content = `${hash} ${file}`;
    console.log(`creating ${__hashpath__} with the following content: `);
    console.log(`  ${content}`);
    return writeFileAsync(__hashpath__, content, 'utf8');
  }).then(function() {
    core.setOutput('hash-file', hashPathFile);
  })
  .catch(function(err) {
    core.setFailed(err.message);
  })
