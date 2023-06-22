import { useMachine } from 'react-robot';

import useAbonnementMachine from './abonnement.robot'

const useStateMachine = () => {
  const machine = useAbonnementMachine()
  return useMachine(machine);
}

export default useStateMachine
