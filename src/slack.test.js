const slack = require('./slack')

test('generateSlackMessage()', async () => {
  const commits = [
    { hash: '11cbb845c1', author: 'John Doe', message: 'the first message' },
    { hash: '11cbb845c2', author: 'Alice', message: 'the second message' }
  ]

  const repoUrl = 'https://github.com/company/project'

  const message = slack.generateSlackMessage(commits, repoUrl, 'project')

  expect(message).toBe(
    'Deployment finished for <https://github.com/company/project|project>:\n' +
    '      • <https://github.com/company/project/commit/11cbb845c1|11cbb845c1> - _John Doe_ - *the first message*\n' +
    '      • <https://github.com/company/project/commit/11cbb845c2|11cbb845c2> - _Alice_ - *the second message*'
  )
})
