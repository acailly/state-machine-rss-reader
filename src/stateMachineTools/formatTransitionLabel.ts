const formatTransitionLabel = (label: string) => {
  let transitionLabel = label
  if (transitionLabel.startsWith('done.')) {
    transitionLabel = 'OK'
  }
  if (transitionLabel.startsWith('error.')) {
    transitionLabel = 'Erreur'
  }
  return transitionLabel
}

export default formatTransitionLabel
