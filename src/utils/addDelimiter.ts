function addDelimiter(value: number | string, delimiter = ',') {
  if (value == null) return null

  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)
}

export default addDelimiter
