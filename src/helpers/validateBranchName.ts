import * as core from '@actions/core'
import { getScopes } from './getScopes'

export function validateBranchName(branch: string): void {
  const scopes = getScopes()
  core.info(`Got ${scopes.length} scopes.`)
  const [type, rest] = branch.split('/')
  if (!scopes.includes(type)) {
    core.setFailed(`Type "${type}" is not valid. Expected one of ${scopes.join(', ')}`)
    return process.exit(1)
  }

  const validationRegex = new RegExp('([A-Z]*)-(TICKET|\\d*)', 'g')
  const matches = validationRegex.exec(rest)

  if (!matches) {
    core.setFailed(`"${branch}" doesn't seem to be a valid branch name. Expected following pattern: "type/XX-1234"`)
    return process.exit(1)
  }

  const ticketNumber = matches[2]

  if (ticketNumber && ticketNumber === 'TICKET') {
    return process.exit(0)
  }

  if (!matches || Number.isNaN(Number.parseInt(ticketNumber, 10))) {
    console.error(`"${branch}" doesn't seem to be a valid branch name. Expected following pattern: "type/XX-1234"`)
    return process.exit(1)
  }

  return process.exit(0)
}
