import process from 'process'
import { expect, test, jest } from '@jest/globals'
import { getScopes } from '../src/helpers/getScopes'
import { validateBranchName } from '../src/helpers/validateBranchName'

test('parses scopes', async () => {
  process.env['INPUT_SCOPES'] = 'fix,feat'
  const scopes = getScopes()
  await expect(scopes).toEqual(['fix', 'feat'])
})

test('validates branch name', async () => {
  process.env['INPUT_VALIDATIONREGEX'] = '([A-Z]*)-(TICKET|\\d*)'
  // @ts-ignore
  const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {})

  validateBranchName('fix/this-is-invalid')
  expect(mockExit).toBeCalledTimes(1)
  expect(mockExit).toHaveBeenCalledWith(1)
  mockExit.mockReset()

  validateBranchName('DEMO!')
  expect(mockExit).toBeCalledTimes(1)
  expect(mockExit).toHaveBeenCalledWith(1)
  mockExit.mockReset()

  validateBranchName('fix/NO-1234')
  expect(mockExit).toBeCalledTimes(1)
  expect(mockExit).toHaveBeenCalledWith(0)
  mockExit.mockReset()

  validateBranchName('fix/NO-TICKET')
  expect(mockExit).toBeCalledTimes(1)
  expect(mockExit).toHaveBeenCalledWith(0)
  mockExit.mockReset()

  validateBranchName('fix/NO-1234-some-more-text')
  expect(mockExit).toBeCalledTimes(1)
  expect(mockExit).toHaveBeenCalledWith(0)
  mockExit.mockReset()
})
