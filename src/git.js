const childProcess = require('child_process')

const SEPARATOR = '/////'
const GIT_FORMAT_SPEC = `--pretty=format:"%an${SEPARATOR}%h${SEPARATOR}%s"`

function getGitLogOutput (tagPrefix) {
  const commitListSpec = `$(git tag | grep '^${tagPrefix}' | tail -n2 | head -n1)..HEAD`
  const gitCommand = `git log ${commitListSpec} ${GIT_FORMAT_SPEC}`

  return new Promise((resolve, reject) => {
    childProcess.exec(gitCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(error)
        console.error(stderr)
        reject(new Error('Git command failed'))
      } else {
        resolve(stdout)
      }
    })
  })
}

function parseCommit (gitLogLine) {
  const [author, hash, message] = gitLogLine.split(SEPARATOR)
  return { author, hash, message }
}

function parseCommits (gitLogOutput) {
  const lines = gitLogOutput.trim().split('\n')
  return lines.map(parseCommit)
}

module.exports = {
  getGitLogOutput,
  parseCommits
}
