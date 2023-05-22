import { describe, it } from 'vitest'

import machineToMarkdown from '../stateMachineTools/machineToMarkdown'
import writeMarkdownFile from '../stateMachineTools/writeMarkdownFile'

import machine from './telecharger.machine'

describe('telecharger - doc', () => {
  it('should generate documentation', () => {
    const markdown = machineToMarkdown(machine)
    writeMarkdownFile(markdown, __filename)
  })
})
