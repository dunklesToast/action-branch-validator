import * as core from '@actions/core'
import { context } from '@actions/github'
import { octokit } from './getOctokit'

export async function getPullRequestBranch(): Promise<string> {
  const { owner, repo } = context.repo
  const prNumber = getPRNumber()
  if (!prNumber) {
    core.setFailed('Unable to get Pull Request number. Make sure that his action only runs in PR triggered Events.')
    process.exit(1)
  }
  core.info('Fetching PR from GitHub')
  const pr = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number: prNumber
  })
  core.info('Fetched PR from GitHub')

  return pr.data.head.ref
}

function getPRNumber(): undefined | number {
  const pullRequest = context.payload.pull_request

  if (!pullRequest) {
    return undefined
  }

  return pullRequest.number
}
