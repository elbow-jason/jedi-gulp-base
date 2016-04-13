
export function removeNamedItem(list, item){
  let index = listNames(list).indexOf(item.name)
  removeIndex(list, index);
}

export function removeItem(list, item){
  let index = list.indexOf(item)
  removeIndex(list, index)
}

export function listNames(list){
  return list.map(item => item.name)
}

export function removeIndex(list, index){
  if (index >= 0) list.splice(index, 1)
}

export function isNamedMember(list, item){
  return (listNames(list).indexOf(item.name) >= 0)
}