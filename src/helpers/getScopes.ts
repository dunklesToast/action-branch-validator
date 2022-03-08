import * as core from '@actions/core'

export function getScopes(): string[] {
  const scopes = core.getInput('scopes').split(',')
  if (typeof scopes !== 'object' || !scopes.length) {
    throw new Error(
      'scopes are valid. Expected array of strings, got "' +
        scopes +
        '". Use commas to provide multiple scopes: scope1,scope2'
    )
  }
  return scopes
}
