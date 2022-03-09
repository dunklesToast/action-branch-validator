import * as core from '@actions/core'
import { getOctokit } from '@actions/github'

const token = core.getInput('GITHUB_TOKEN')

export const octokit = getOctokit(token)
