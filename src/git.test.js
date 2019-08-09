const childProcess = require('child_process')

const git = require('./git')

test('getGitLogOutput()', async () => {
  const spy = jest
    .spyOn(childProcess, 'exec')
    .mockImplementation((command, callback) => {
      callback(null, 'the stdout', 'the stderr')
    })

  const tagPrefix = 'prod-'
  const output = await git.getGitLogOutput(tagPrefix)
  expect(output).toBe('the stdout')

  expect(spy).toHaveBeenCalledTimes(1)
  expect(spy.mock.calls[0][0]).toBe(
    `git log $(git tag | grep '^prod-' | tail -n2 | head -n1)..HEAD --pretty=format:"%an/////%h/////%s"`)
})

test('parseCommits()', async () => {
  const gitLogOutput =
    'John Doe/////11cbb845c1/////the first message\n' +
    'Alice/////11cbb845c2/////the second message\n'

  const commits = git.parseCommits(gitLogOutput)
  expect(commits).toStrictEqual([
    { hash: '11cbb845c1', author: 'John Doe', message: 'the first message' },
    { hash: '11cbb845c2', author: 'Alice', message: 'the second message' }
  ])
})
