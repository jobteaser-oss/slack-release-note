This package provides a command to post a short release note created
from the commit history on Slack. This will mostly be useful on a CI/CD system.

Features :

- Good looking list of bullet points with hash, author and comment
- The hash has a link to the commit on GitHub, if you use GitHub

# How to use

This utility requires node 10.x or above installed where your CI / CD works.

You may install it on your CI system, or simply use npx.

    npx @jobteaser/slack-release-notes \
        --repo-url "https://github.com/org/project" \
        --tag-prefix "release-" \
        --project-name "project" \
        --webhook-url "<slack webhook url>" \
        --icon-emoji "package"

You can generate the `<slack webhook url>` by creating a new "Incomming Webhook"
from the [Custom Integrations page](https://jobteaser.slack.com/apps/manage/custom-integrations)
