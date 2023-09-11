import React, { Fragment } from 'react'
import InputStyle from './InputStyle'
import ErrorText from 'sdq-ui/ErrorText/ErrorText'
import Label from 'sdq-ui/Label'

export const Input = (props) => {
  return (
    <Fragment>
      {props?.label && <Label {...props}>{props.label}</Label>}
      <InputStyle {...props} />
      {props.error ? <ErrorText text={props.errorText} /> : null}
    </Fragment>
  )
}

export default Input
