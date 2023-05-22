import { writeFileSync } from 'fs'
import path from 'path'

const writeMarkdownFile = (markdown: string, filename: string) => {
  const extension = '.md'
  const basename = path.basename(filename, path.extname(filename))
  const markdownFileName = path.join(path.dirname(filename), basename + extension)
  writeFileSync(markdownFileName, markdown)
}

export default writeMarkdownFile
