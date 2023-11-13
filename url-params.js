const getUrlParams = () => {
  let match
  const regexp = /([^&=]+)=?([^&]*)/g
  const url = window.location.search.substr(1).replace(/\+/g, " ")
  const params = {}

  while (match = regexp.exec(url)) {
    params[decodeURIComponent(match[1])] = decodeURIComponent(match[2])
  }

  return params
}
