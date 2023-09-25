export const downloadTextFile = (options) => {
  const downloader = document.createElement('a')
  downloader.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(options.content)
  )
  downloader.setAttribute('download', options.filename)
  downloader.click()
}
