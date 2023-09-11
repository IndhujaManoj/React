/**
 * Debounce utilty to avoid the api calls for every keypress in search box
 * @param {*} callbackFunction -> Function to be called after debounce time
 * @param {*} delay -> Time delay in ms
 * @returns
 */
const debounce = function (callbackFunction, delay) {
  let inDebounce
  return function () {
    const context = this
    const args = arguments
    // eslint-disable-next-line no-undef
    clearTimeout(inDebounce)
    // eslint-disable-next-line no-undef
    inDebounce = setTimeout(() => callbackFunction.apply(context, args), delay)
  }
}
export { debounce }
