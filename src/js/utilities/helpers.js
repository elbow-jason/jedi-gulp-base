
export const redirectTo = (hashRoute) => {
  window.location.hash = hashRoute
}

export const logIt = (message, parts) => {
  console.groupCollapsed(message)
  for (let key in parts){
    let value = parts[key];
    console.log(key, value);
  }
  console.groupEnd()
  return parts;
}