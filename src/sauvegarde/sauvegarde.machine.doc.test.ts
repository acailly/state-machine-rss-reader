import { describe, it } from 'vitest'

import machineToMarkdown from '../stateMachineTools/machineToMarkdown'
import writeMarkdownFile from '../stateMachineTools/writeMarkdownFile'

import machine from './sauvegarde.machine'

describe('sauvegarde - doc', () => {
  it('should generate documentation', () => {
    const markdown = machineToMarkdown(machine)
    writeMarkdownFile(markdown, __filename)
  })
})
