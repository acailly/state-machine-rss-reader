const downloadJson = (data: unknown, filename: string) => {
  // Inspired by https://stackoverflow.com/a/30800715
  const databaseContentDownloadUrl = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2))
  const downloadAnchorNode = document.createElement('a')
  downloadAnchorNode.setAttribute('href', databaseContentDownloadUrl)
  downloadAnchorNode.setAttribute('download', filename)
  document.body.appendChild(downloadAnchorNode) // required for firefox
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
}

export default downloadJson
