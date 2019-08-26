#!/usr/bin/env node

const cli = require('./src/cli')

cli.run().then(
  () => {
    console.log('Message posted')
  },
  (err) => {
    console.error(err)
    process.exit(1)
  }
)
