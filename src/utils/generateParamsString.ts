const generateParamsString = (params: { [key: string]: string }) => {
  let searchParams = ''

  for (let item of Object.keys(params)) {
    searchParams += `${searchParams ? '&' : ''}${item}=${params[item]}`
  }

  return searchParams
}

export default generateParamsString
