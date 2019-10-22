import test from 'ava'

import { validate, validateGitmoji } from '~/config'

test('Validate config autoAdd', t => {
  // success
  t.true(validate('autoAdd', true))
  t.true(validate('autoAdd', false))
  // fail
  t.false(validate('autoAdd', 1))
  t.false(validate('autoAdd', 'yes'))
})

test('Validate config emojiFormat', t => {
  // success
  t.true(validate('emojiFormat', 'emoji'))
  t.true(validate('emojiFormat', 'code'))
  // fail
  t.false(validate('emojiFormat', 'string'))
  t.false(validate('emojiFormat', true))
  t.false(validate('emojiFormat', 1))
})

test('Validate config signedCommit', t => {
  // success
  t.true(validate('signedCommit', true))
  t.true(validate('signedCommit', false))
  // fail
  t.false(validate('signedCommit', 'string'))
  t.false(validate('signedCommit', 1))
})

test('Validate config titleMaxLength', t => {
  // success
  t.true(validate('titleMaxLength', 48))
  t.true(validate('titleMaxLength', 64))
  // fail
  t.false(validate('titleMaxLength', -1))
  t.false(validate('titleMaxLength', 0))
  t.false(validate('titleMaxLength', 100))
  t.false(validate('titleMaxLength', 'string'))
  t.false(validate('titleMaxLength', true))
})

test('Validate config order', t => {
  // success
  t.true(validate('order', ['a']))
  t.true(validate('order', ['a', 'b']))
  t.true(validate('order', []))
  // fail
  t.false(validate('order', [1, 2]))
  t.false(validate('order', ['a', 2]))
  t.false(validate('order', 'a'))
})

test('Validate config scopes', t => {
  // success
  t.true(validate('scopes', ['a']))
  t.true(validate('scopes', ['a', 'b']))
  t.true(validate('scopes', []))
  // fail
  t.false(validate('scopes', [1, 2]))
  t.false(validate('scopes', ['a', 2]))
  t.false(validate('scopes', 'a'))
})

test('Validate config presets', t => {
  // success
  t.true(validate('presets', ['base']))
  t.true(validate('presets', ['base', 'sno2wman']))
  t.true(validate('presets', ['sno2wman/oss']))
  t.true(validate('presets', []))
  // fail
  t.false(validate('presets', true))
  t.false(validate('presets', 2))
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
  t.false(validate('rules', ['a']))
  t.false(validate('rules', true))
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