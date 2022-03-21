import isEqual from 'react-fast-compare'

export * from './sorts'
export * from './tags'
// export * from './axios'
export * from './tree'

export const getUniqueListBy = (arr, key) => {
  return [...new Map(arr.map((item) => [item[key], item])).values()]
}

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const omit = (obj, ignoreFields = []) => {
  const newObj = { ...obj }
  ignoreFields.forEach((prop) => {
    delete newObj[prop]
  })
  return newObj
}

export const isDeepEqual = (oldData = [], newData = [], ignoreFields = []) =>
  isEqual(
    oldData.map((d) => omit(d, ignoreFields)),
    newData.map((d) => omit(d, ignoreFields))
  )
