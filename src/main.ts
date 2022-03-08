import * as core from '@actions/core'
import { context } from '@actions/github'
import { getPullRequestBranch } from './helpers/getPullRequestBranch'
import { validateBranchName } from './helpers/validateBranchName'

const branch = context.payload.e

async function run(): Promise<void> {
  try {
    const branchName = await getPullRequestBranch()
    core.setOutput('branch', branchName)
    validateBranchName(branch)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
