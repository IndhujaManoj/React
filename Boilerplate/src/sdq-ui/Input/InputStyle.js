import styled from 'styled-components'
import {
  layout,
  space,
  position,
  background,
  border,
  typography,
  color,
  flexbox,
  shadow,
} from 'styled-system'
import { Input } from 'reactstrap'
export const InputStyle = styled(Input)`
  background-color: #ffffff;
  color: #172b4d;
  display: flex;
  font-size: 13px;
  border: 1px solid ${(props) => (props.error ? '#FF5630' : '#dee2e6')};
  border-radius: 4px;
  padding: 6px 8px;
  line-height: 20px;
  min-height: 32px;
  min-width: ${(props) => (props.width ? props.width : '226px')};
  font-weight: 400px;
  box-shadow: none;
  ::placeholder {
    color: #8898AA;
  }
  &:hover {
    border: 1px solid ${(props) => (props.error ? '#FF5630' : '#0052CC')};
  }
  &:focus {
    border: 1px solid ${(props) => (props.error ? '#FF5630' : '#0052CC')};
  }
  &:disabled {
    border: 1px solid #b3bac5;
    background-color: #f4f5f7;
  }
  ${color};
  ${background};
  ${position}
  ${space};
  ${typography};
  ${layout};
  ${flexbox};
  ${border};
  ${shadow};
`

export default InputStyle
