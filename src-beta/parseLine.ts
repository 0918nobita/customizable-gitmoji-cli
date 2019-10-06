import chalk from 'chalk'

type Gitmoji = {
  emoji: string
  entity?: string // fix later
  code: string
  description: string
  name: string
}

function parse(
  { emoji, code, description }: Gitmoji,
  longest: number,
  process?: (line: string) => string
) {
  const line = [
    emoji,
    ' - ',
    chalk.blue(code),
    ''.padStart(longest - code.length + 1, ' '),
    '│ ',
    description
  ].join('')
  return process ? process(line) : line
}

export default function(
  gitmojis?: Gitmoji[],
  process?: (line: string) => string
) {
  if (!gitmojis || gitmojis.length <= 0) return false

  const longest = gitmojis
    .map(({ code }) => code.length)
    .reduce((acc, cur) => Math.max(acc, cur))
  gitmojis.forEach(gitmoji => {
    // eslint-disable-next-line no-console
    console.log(parse(gitmoji, longest, process))
  })

  return true
}