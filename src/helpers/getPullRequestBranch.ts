import { octokit } from './getOctokit'
import { context } from '@actions/github'

export async function getPullRequestBranch(): Promise<string> {
  const { owner, repo } = context.repo
  const prNumber = getPRNumber()
  if (!prNumber) {
    throw new Error('Unable to get Pull Request number. Make sure that his action only runs in PR triggered Events.')
  }
  const pr = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number: prNumber
  })

  return pr.data.head.ref
}

function getPRNumber(): undefined | number {
  const pullRequest = context.payload.pull_request

  if (!pullRequest) {
    return undefined
  }

  return pullRequest.number
}
