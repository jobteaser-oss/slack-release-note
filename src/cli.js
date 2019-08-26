const minimist = require('minimist')

const git = require('./git')
const slack = require('./slack')

const INVALID_CLI_ARGS_EXIT_CODE = 64

function getConfiguration () {
  const args = minimist(process.argv.slice(2))
  const {
    'repo-url': repoUrl,
    'tag-prefix': tagPrefix,
    'project-name': projectName,
    'webhook-url': webhookURL,
    'icon-emoji': iconEmoji,
  } = args

  if (!repoUrl) {
    console.error('Missing command line argument --repo-url')
  }
  if (!tagPrefix) {
    console.error('Missing command line argument --tag-prefix')
  }
  if (!projectName) {
    console.error('Missing command line argument --project-name')
  }
  if (!webhookURL) {
    console.error('Missing command line argument --webhook-url')
  }
  if (!iconEmoji) {
    console.error('Missing command line argument --icon-emoji')
  }
  if (!repoUrl || !tagPrefix || !projectName || !webhookURL || !iconEmoji) {
    console.error('Use : npx generate_slack_release_notes ' +
      '--repo-url <repo url>' +
      '--tag_prefix <git tag prefix>' +
      '--project-name <project name>' +
      '--webhook-url <webhook url>' +
      '--icon-emoji <icon emoji name>'
    )
    process.exit(INVALID_CLI_ARGS_EXIT_CODE)
  }

  return { tagPrefix, repoUrl, projectName, webhookURL, iconEmoji }
}

async function run () {
  const { tagPrefix, repoUrl, projectName, webhookURL, iconEmoji } = getConfiguration()

  const gitLogOutput = await git.getGitLogOutput(tagPrefix)

  const commits = git.parseCommits(gitLogOutput)

  const message = slack.generateSlackMessage(commits, repoUrl, projectName)

  await slack.postMessage(message, webhookURL, iconEmoji)
}

module.exports = {
  run
}
