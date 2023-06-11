import { ActorRef, InterpreterFrom } from 'xstate'

import { Event } from '../machine.types'
import navigationMachine from '../navigation/navigation.machine'

// INFO : ce code servait anciennement à initialiser l'état initial à partir de l'URL

// FIXME Mettre des états initialisateurs dans chaque machine pour naviguer vers le bon état initial
// Ca revient à mettre dans la machine à état ce qui est codé plus bas
// C'est fastidieux mais au moins c'est visible et ca fait pas hack

// FIXME inspirations :
// - https://github.com/statelyai/xstate/discussions/3963
//    implémentation qui semble simple
// - https://github.com/carloslfu/xstate-router
//    lib sur étagère

// FIXME franchement c'est crade et pas maintenable
// Piste d'amélioration :
// ----
// const targetNode = machine.getStateNodeById('/my-url') // <= présuppose qu'on ait définit id: '/my-url' sur l'état qu'on veut charger
// const initialState = machine.getInitialState(targetNode.path[0], {})
// useInterpret(fullAppMachine, { devTools: true, state: initialState })
// ----
// Sauf que ca ne gère pas les sous machines :-/
const initializeFromUrl = (
  currentLocation: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interpretedStateMachine: InterpreterFrom<typeof navigationMachine>
) => {
  console.log('-- Initialize state machine from URL:', currentLocation)

  if (currentLocation.includes('/news')) {
    interpretedStateMachine.send('NOUVEAUTES')
  } else if (currentLocation.includes('/feeds')) {
    interpretedStateMachine.send('ABONNEMENTS')
    const abonnements = interpretedStateMachine.children.get('abonnements') as ActorRef<Event> | undefined

    if (currentLocation.includes('/feeds/new')) {
      abonnements?.send('Ajouter un abonnement')
      if (currentLocation === '/feeds/new/rss') {
        abonnements?.send('Abonnement RSS')
      } else if (currentLocation === '/feeds/new/twitter') {
        abonnements?.send('Abonnement Twitter')
      }
    } else if (currentLocation === '/feeds/fetching') {
      interpretedStateMachine.send('TELECHARGER')
    }
  } else if (currentLocation.includes('/backup')) {
    interpretedStateMachine.send('SAUVEGARDE')
  } else {
    interpretedStateMachine.send('NOUVEAUTES')
  }
}

export default initializeFromUrl
