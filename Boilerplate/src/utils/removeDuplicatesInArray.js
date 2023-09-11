const removeDuplicatesInArray = (dropdownItem) => {
  //To avoid duplicates in Drop down List
  const uniqueArray = []
  dropdownItem.map((item) => {
    if (item != null) {
      var findItem = uniqueArray.find((x) => x.value === item.value)
      if (!findItem) uniqueArray.push(item)
    }
  })
  return uniqueArray
}
export { removeDuplicatesInArray }
