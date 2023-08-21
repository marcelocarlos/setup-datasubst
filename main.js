const os = require('os');
const path = require('path');
const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const exec = require('@actions/exec');

function getDownloadURL(version) {
  const platform = os.platform();

  const filename = `datasubst-${version}-${platform}-amd64`
  const url = `https://github.com/marcelocarlos/datasubst/releases/download/${version}/${filename}.tar.gz`;
  core.info(`Downloading from ${url}`);
  return url
}

async function setup() {
  try {
    const version = core.getInput('version');
    core.info(`Installing datasubst ${version}...`);
    const download = getDownloadURL(version);
    const pathToTarball = await tc.downloadTool(download);
    core.info(`Downloaded, extracting...`);
    const pathToCLI = await tc.extractTar(pathToTarball);
    core.info(`Extracted to ${pathToCLI}`);
    core.addPath(path.join(pathToCLI, 'datasubst'));
    core.info(`Added ${pathToCLI} to the PATH`);
    // run datasubst --version just to make sure it's available
    await exec.exec('datasubst --version');
    core.info('>>> Successfully invoked datasubst help');
  } catch (e) {
    core.setFailed(e);
  }
}

module.exports = setup

if (require.main === module) {
  setup();
}