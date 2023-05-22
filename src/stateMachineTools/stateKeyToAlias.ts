const stateKeyToAlias = (stateKey?: string) => {
  return stateKey ? stateKey.replaceAll(' ', '_') : ''
}

export default stateKeyToAlias
