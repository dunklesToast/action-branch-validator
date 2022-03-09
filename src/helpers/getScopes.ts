import * as core from '@actions/core'

export function getScopes(): string[] {
  const scopesInput = core.getInput('scopes');
  if(!scopesInput) {
    core.setFailed('no scopes provided. got ' + scopesInput);
  }
  const scopes = scopesInput.split(',');
  if (typeof scopes !== 'object' || !scopes.length) {
    core.setFailed(`scopes are valid. Expected array of strings, got "${scopes}". Use commas to provide multiple scopes: scope1,scope2`);
  }
  return scopes
}
