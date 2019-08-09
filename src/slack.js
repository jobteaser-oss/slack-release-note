const request = require('request');

function generateLine ({ author, hash, message }, repoUrl) {
  return `      • <${repoUrl}/commit/${hash}|${hash}> - _${author}_ - *${message}*`
}

function generateSlackMessage (commits, repoUrl, projectName) {
  const commitLines = commits.map(commit => generateLine(commit, repoUrl))
  const header = `Deployment finished for <${repoUrl}|${projectName}>:`
  const lines = [header, ...commitLines]
  return lines.join('\n')
}

async function postMessage(message, webhookURL, iconEmoji) {
  const data = {
    username: 'CI/CD System',
    text: message,
    icon_emoji: iconEmoji
  }
  console.log('Posting message to Slack:', data)
  await request.post(webhookURL, { json: data })
}

module.exports = {
  generateSlackMessage,
  postMessage
}
