import { GenericObjectKeyType } from "./TypeHelpers"

export function formatDateToISO(data?: Date): string
{
  return data ?
    data.toLocaleDateString('en-US', {year: "numeric", month: "2-digit", day: "2-digit", }).split('/').reverse().join('-')
    :
    new Date().toLocaleDateString('en-US', {year: "numeric", month: "2-digit", day: "2-digit", }).split('/').reverse().join('-')
}

export function formatColumn(column: string): string
{
  return column.replaceAll("_", " ").toUpperCase()
}

export function shouldOrder(filteredArray: Object[], filteredColumn: string, filterOrder: string): Object[]
{
  let t: Object[] = filteredArray

  t.sort((i1: GenericObjectKeyType, i2: GenericObjectKeyType) => {
    
    if (i1[filteredColumn] < i2[filteredColumn]) {
      return -1
    }

    if (i1[filteredColumn] > i2[filteredColumn]) {
      return 1
    }

    return 0
  })

  if (filterOrder === 'desc') {
    t.reverse()
  }
  
  return t
}

export function conditionalComparison(a: string[], operator: string): boolean
{
  switch (operator) {
    case 'contains':
      return String(a[0]).toLowerCase().includes(String(a[1]).toLowerCase())
  
    case 'equals':
      return String(a[0]).toLowerCase() === String(a[1]).toLowerCase()

    case 'starts_with':
      return String(a[0]).toLowerCase().startsWith(String(a[1]).toLowerCase())
    
    case 'ends_with':
      return String(a[0]).toLowerCase().endsWith(String(a[1]).toLowerCase())

    case 'not_equal':
      return String(a[0]).toLowerCase() !== String(a[1]).toLowerCase()

    default:
      return String(a[0]).toLowerCase().includes(String(a[1]).toLowerCase())
  }
}

export function whereIn(property: string, arrayValues: number[], listOfObjects: Object[])
{
  let r: Object[] = []

  arrayValues.forEach((val) => {
    let i = listOfObjects.find((v: GenericObjectKeyType) => {
      return v[property] === val
    })

    if(i)
      r.push(i)
  })

  return r
}

export function pluck(keysAccepted: string[], objectArray: GenericObjectKeyType[])
{
  let onlyKeysAccepted: GenericObjectKeyType[] = []

  objectArray.forEach((item, index) => {
    let momentItem: GenericObjectKeyType = {}

    Object.keys(item).filter((key) => keysAccepted.includes(key)).forEach((el, i) => {
      momentItem[el]= item[el]
    })

    onlyKeysAccepted.push(momentItem)
  })

  return onlyKeysAccepted
}