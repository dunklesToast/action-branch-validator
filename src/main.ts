import * as core from '@actions/core'
import { context } from '@actions/github'
import { getPullRequestBranch } from './helpers/getPullRequestBranch'
import { validateBranchName } from './helpers/validateBranchName'

async function run(): Promise<void> {
  try {
    core.info('Getting pull request branch...')
    const branchName = await getPullRequestBranch()
    core.setOutput('branch', branchName)
    core.info(`Set branch name output to "${branchName}"`)
    validateBranchName(branchName)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
