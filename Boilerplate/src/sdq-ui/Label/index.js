import React, { Fragment } from 'react'
import Styled from 'styled-components'
import { space, layout, typography, flexbox } from 'styled-system'

const LabelWrapper = Styled.label`
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: 0.2px;
    margin-bottom: 6px;
    color: #172B4D;
    ${space};
    ${layout};
    ${typography};
    ${flexbox};
`
export const Label = (props) => {
  return (
    <Fragment>
      <LabelWrapper {...props}>
        {props.children}
        {props.required && <span className='red'> *</span>}
      </LabelWrapper>
    </Fragment>
  )
}

export default Label
