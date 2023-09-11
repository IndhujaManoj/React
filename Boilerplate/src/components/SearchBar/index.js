import { Row, Input } from 'sdq-ui'
function SearchBar(props) {
  const {  type, id, forwardRef, label, noMargin, apiCall } = props


  const debounce = (apiFunc, delay) => {
    let inDebounce
    return function () {
      const context = this
      const args = arguments
      clearTimeout(inDebounce)
      inDebounce = setTimeout(() => {
        inDebounce = null
        apiFunc.apply(context, args)
      }, delay)
    }
  }

  const optimizedVersion = debounce(apiCall, 600)

  const handleSearchChange = (value) => {
    optimizedVersion(value)
  }

  return (
    <Row className={`${props?.headerSearch ? '' : 'mb-4'} ${props?.wrapperClass ?? ''}`}>
      <label htmlFor="search" className="px-3 control-label text-center">
        Search:{' '}
      </label>
      <Input
        innerRef={forwardRef}
        className={`form-control form-control-sm ${props?.classes}`}
        type={type}
        id={id}
        data-test-id={id}
        placeholder={props?.placeholder}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
    </Row>
  )
}

export default SearchBar
