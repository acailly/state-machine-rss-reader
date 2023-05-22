import { toDirectedGraph } from '@xstate/graph'
import { AnyStateMachine } from 'xstate'

import formatTransitionLabel from './formatTransitionLabel'
import stateKeyToAlias from './stateKeyToAlias'

const machineToMermaid = (machine: AnyStateMachine) => {
  const directedGraph = toDirectedGraph(machine)

  let mermaid = ''
  mermaid += `stateDiagram-v2  \n`
  mermaid += `%% ${directedGraph.id}  \n`

  const initialStateKey = directedGraph.stateNode.states[directedGraph.stateNode.initial?.toString() || ''].key
  mermaid += `\t[*] --> ${stateKeyToAlias(initialStateKey)}  \n`

  const states = directedGraph.stateNode.states
  Object.values(states).forEach((state) => {
    mermaid += `\t${stateKeyToAlias(state.key)}: ${state.key}  \n`
  })

  const edgeCollections = directedGraph.children
  edgeCollections.forEach((edgeCollection) => {
    const edges = edgeCollection.edges
    edges.forEach((edge) => {
      const transitionLabel = formatTransitionLabel(edge.label.text)
      mermaid += `\t${stateKeyToAlias(edge.source.key)} --> ${stateKeyToAlias(edge.target.key)}: ${transitionLabel}  \n`
    })
  })

  return mermaid
}

export default machineToMermaid
