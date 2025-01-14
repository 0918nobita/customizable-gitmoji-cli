import test from 'ava'

import loadConfig, {
  validate,
  validateGitmoji,
  validatePresetName
} from '~/config'
import { parsePackageName } from '~/gitmojis'

test('Validate config autoAdd', t => {
  // success
  t.true(validate('autoAdd', true))
  t.true(validate('autoAdd', false))
  // fail
  t.throws(() => validate('autoAdd', 1))
  t.throws(() => validate('autoAdd', 'yes'))
})

test('Validate config emojiFormat', t => {
  // success
  t.true(validate('emojiFormat', 'emoji'))
  t.true(validate('emojiFormat', 'code'))
  // fail
  t.throws(() => validate('emojiFormat', 'string'))
  t.throws(() => validate('emojiFormat', true))
  t.throws(() => validate('emojiFormat', 1))
})

test('Validate config signedCommit', t => {
  // success
  t.true(validate('signedCommit', true))
  t.true(validate('signedCommit', false))
  // fail
  t.throws(() => validate('signedCommit', 'string'))
  t.throws(() => validate('signedCommit', 1))
})

test('Validate config titleMaxLength', t => {
  /* eslint-disable @typescript-eslint/no-magic-numbers */
  // success
  t.true(validate('titleMaxLength', 48))
  t.true(validate('titleMaxLength', 64))
  // fail
  t.throws(() => validate('titleMaxLength', -1))
  t.throws(() => validate('titleMaxLength', 0))
  t.throws(() => validate('titleMaxLength', 100))
  t.throws(() => validate('titleMaxLength', 'string'))
  t.throws(() => validate('titleMaxLength', true))
  /* eslint-enable @typescript-eslint/no-magic-numbers */
})

test('Validate config order', t => {
  // success
  t.true(validate('order', ['a']))
  t.true(validate('order', ['a', 'b']))
  t.true(validate('order', []))
  // fail
  t.throws(() => validate('order', [1, 1]))
  t.throws(() => validate('order', ['a', 1]))
  t.throws(() => validate('order', 'a'))
})

test('Validate config scopes', t => {
  // success
  t.true(validate('scopes', ['a']))
  t.true(validate('scopes', ['a', 'b']))
  t.true(validate('scopes', []))
  // fail
  t.throws(() => validate('scopes', [1, 1]))
  t.throws(() => validate('scopes', ['a', 1]))
  t.throws(() => validate('scopes', 'a'))
})

test('Validate config presets', t => {
  // success
  t.true(validate('presets', ['base']))
  t.true(validate('presets', ['base', 'sno2wman']))
  t.true(validate('presets', ['sno2wman/oss']))
  t.true(validate('presets', []))
  // fail
  t.throws(() => validate('presets', true))
  t.throws(() => validate('presets', 1))
})

test('Validate config gitmojis', t => {
  // success
  t.true(
    validate('rules', [
      {
        emoji: '✨',
        description: 'Introduce new features.',
        name: 'sparkles'
      }
    ])
  )
  t.true(
    validate('rules', [
      {
        emoji: '✨',
        description: 'Introduce new features.',
        name: 'sparkles'
      },
      {
        emoji: '🔥',
        description: 'Remove codes.',
        name: 'fire'
      }
    ])
  )
  t.true(validate('rules', []))
  // fail
  t.throws(() => validate('rules', ['a']))
  t.throws(() => validate('rules', true))
})

test('Validate gitmoji', t => {
  // success
  t.true(
    validateGitmoji({
      emoji: '✨',
      description: 'Introduce new features.',
      name: 'sparkles'
    })
  )
  // fail
  t.false(
    validateGitmoji({
      description: 'Introduce new features.',
      name: 'sparkles'
    })
  )
  t.false(
    validateGitmoji({
      emoji: '✨',
      name: 'sparkles'
    })
  )
  t.false(
    validateGitmoji({
      emoji: '✨'
    })
  )
  t.false(validateGitmoji({}))
})

test('Validate preset name', t => {
  // success
  t.true(validatePresetName('@sno2wman/gitmoji-preset'))
  t.true(validatePresetName('@sno2wman/gitmoji-preset/oss'))
  t.true(validatePresetName('gitmoji-preset-base'))
  t.true(validatePresetName('base'))
  t.true(validatePresetName('base/oss'))
  // fail
  t.false(validatePresetName('@sno2wman'))
  t.false(validatePresetName('@sno2wman'))
  t.false(validatePresetName('gitmoji-preset'))
})

test('Validate parsing preset name to package name', t => {
  // success
  t.deepEqual(parsePackageName('@sno2wman/gitmoji-preset'), [
    '@sno2wman/gitmoji-preset'
  ])
  t.deepEqual(parsePackageName('@sno2wman/gitmoji-preset/oss'), [
    '@sno2wman/gitmoji-preset',
    'oss'
  ])
  t.deepEqual(parsePackageName('gitmoji-preset-base'), ['gitmoji-preset-base'])
  t.deepEqual(parsePackageName('base'), ['gitmoji-preset-base'])
  t.deepEqual(parsePackageName('base/oss'), ['gitmoji-preset-base', 'oss'])
})

test('Correct gitmojirc', async t => {
  t.snapshot(await loadConfig('tests/gitmojirc/correct/no-preset/.gitmojirc'))
})

test('Incorrect gitmojirc ', async t => {
  await t.throwsAsync(loadConfig('tests/gitmojirc/incorrect/1/.gitmojirc'))

  await t.throwsAsync(loadConfig('tests/gitmojirc/incorrect/2/.gitmojirc'))
})
