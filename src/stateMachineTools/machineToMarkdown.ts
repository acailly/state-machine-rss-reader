import { toDirectedGraph } from '@xstate/graph'
import { AnyStateMachine } from 'xstate'

import formatTransitionLabel from './formatTransitionLabel'
import machineToMermaid from './machineToMermaid'
import stateKeyToAlias from './stateKeyToAlias'

const machineToMarkdown = (machine: AnyStateMachine) => {
  const mermaid = machineToMermaid(machine)

  const directedGraph = toDirectedGraph(machine)

  let markdown = ''
  markdown += `# ${directedGraph.id}\n\n`
  markdown += `## Diagramme d'état\n\n`
  markdown += '```mermaid\n' + mermaid + '\n```\n\n'

  const initialStateKey = directedGraph.stateNode.states[directedGraph.stateNode.initial?.toString() || ''].key
  markdown += `Aller à l'état initial : [${initialStateKey}](#${stateKeyToAlias(initialStateKey)})  \n`

  const states = directedGraph.stateNode.states
  Object.values(states).forEach((state) => {
    markdown += `## <a id="${stateKeyToAlias(state.key)}"></a>${state.key}\n\n`

    if (state.description) {
      markdown += `${state.description}\n\n`
    }

    markdown += '### Actions\n\n'
    const transitions = directedGraph.children.find((child) => child.stateNode.key === state.key)?.edges
    transitions?.forEach((transition) => {
      const transitionLabel = formatTransitionLabel(transition.label.text)
      markdown += `- ${transitionLabel} [${transition.target.key}](#${stateKeyToAlias(transition.target.key)})  \n`
    })
  })

  return markdown
}

export default machineToMarkdown
