export const queryBuilder = (list) => {
  let condition = ''
  const conditionList = []
  list.forEach((i) => {
    switch (i.type) {
      case 'eq':
        if (i.key && i.val) {
          conditionList.push(`${i.key} = ${i.val}`)
        }
        break
      case 'like':
        if (i.key && i.val) {
          conditionList.push(`${i.key} like ${i.val}`)
        }
        break
      case 'gt':
        if (i.key && (i.val || i.val === 0)) {
          conditionList.push(`${i.key} > ${i.val}`)
        }
        break
      case 'raw':
        if (i.val) {
          conditionList.push(i.val)
        }
        break
      default:
        break
    }
  })
  if (conditionList.length > 0) {
    condition = conditionList.join(' && ')
  }
  return condition
}

export const urlQueryBuilder = (obj) => {
  let query = '?'
  const queryList = []
  for (let key in obj) {
    if (obj[key]) {
      queryList.push(`${key}=${obj[key]}`)
    }
  }
  if (queryList.length > 0) {
    query += queryList.join('&')
  }
  return query
}
