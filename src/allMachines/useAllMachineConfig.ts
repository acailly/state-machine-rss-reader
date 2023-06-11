import useAllMachineGuards from './useAllMachineGuards'

const useAllMachineConfig = () => {
  const guards = useAllMachineGuards()

  // Add here additional shared config:
  //  const services = useAllMachineServices()
  //  const actions = useAllMachineActions()
  //  ...

  return { guards }
}

export default useAllMachineConfig
