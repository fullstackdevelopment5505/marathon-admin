export const sortByName = function (a1, a2) {
  const a = a1.name ? a1.name.toLowerCase() : ''
  const b = a2.name ? a2.name.toLowerCase() : ''
  if (a > b) {
    return 1
  }
  if (b > a) {
    return -1
  }
  return 0
}

export const sortBySlug = function (a1, a2) {
  const a = a1.slug
  const b = a2.slug
  if (a > b) {
    return 1
  }
  if (b > a) {
    return -1
  }
  return 0
}

export const sortTags = function (a1, a2) {
  const a = a1.owner + '.' + a1.opcTagId
  const b = a2.owner + '.' + a2.opcTagId
  if (a > b) {
    return 1
  }
  if (b > a) {
    return -1
  }
  return 0
}
