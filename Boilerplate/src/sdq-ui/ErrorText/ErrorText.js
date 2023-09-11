import React, { Fragment } from 'react'
import Styled from 'styled-components'

const ErrText = Styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.2px;
  color: #ff5630;
  margin-top: 6px;
`

export const ErrorText = (props) => {
  return (
    <Fragment>
      <ErrText>{props?.text}</ErrText>
    </Fragment>
  )
}

export default ErrorText
