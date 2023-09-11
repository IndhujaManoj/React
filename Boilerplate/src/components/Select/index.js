import Select from 'react-select'
import styled from 'styled-components'


function SelectComponent(props) {
  return (
    <Select
      id={props.id}
      inputId={`${props.id}-input`}
      value={props.value}
      options={props.options}
      onChange={props.onChange}

    />
  )
}

export default SelectComponent
