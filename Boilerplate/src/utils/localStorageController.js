/* 
using typeof window to check if the script is being run in a web-page inside a web-browser or not.
*/
import base64 from 'base-64'

const getItem = (key) => {
  const data =
    typeof window !== 'undefined' && localStorage.getItem(key)
      ? localStorage.getItem(key)
      : ''
  try {
    // return "";
    return base64.decode(data)
  } catch (err) {
    return ''
  }
}

const setItem = (key, value) => {
  const stringify =
    typeof value !== 'string'
      ? JSON.stringify(base64.encode(value))
      : base64.encode(value)
  return localStorage.setItem(key, stringify)
}

const removeItem = (key) => {
  localStorage.removeItem(key)
}

export { getItem, setItem, removeItem }
