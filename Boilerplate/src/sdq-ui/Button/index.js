import { Button } from 'reactstrap'
import styled, {css} from 'styled-components'

export const StyledButton = ({ 
  primary,
  secondary,
  danger,
  disabled,
  small,
  large,
  transparent,
  ['primary-outline']: primary_outline, 
  ['primary-default']: primary_default, 
  ['default-outline']: default_outline, 
  ['success-outline']: success_outline, 
  ['info-outline']: info_outline, 
  ['danger-outline']: danger_outline, 
  ...props 
}) => {

  
  const NewButton = styled(Button)`
  ${primary && css`
    color: #FFFFFF;
    background: #0052CC;
    border-color: #0052CC;
  `}
  ${secondary && css`
    color: #253858;
    background: #f7fafc;
    border-color: #f7fafc;
  `}
  ${danger && css`
    color: #FFFFFF;
    background: #f5365c;
    border-color: #f5365c;
  `}
  ${transparent && css`
    color: #253858;
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
  `}
  ${primary_outline && css`
    color: #0052CC;
    background-color: transparent;
    border-color: #0052CC;
  `}
  ${primary_default && css`
    color: #212529;
    background-color: f7fafc;
    border-color: #f7fafc;
  `}
  ${default_outline && css`
    color: #172b4d;
    background-color: transparent;
    border-color: #172b4d;
  `}
  ${success_outline && css`
    color: #2dce89;
    background-color: transparent;
    border-color: #2dce89;
  `}
  ${info_outline && css`
    color: #11cdef;
    background-color: transparent;
    border-color: #11cdef;
  `}
  ${danger_outline && css`
    color: #f5365c;
    background-color: transparent;
    border-color: #f5365c;
  `}
  &:hover {
    ${primary && css`
        color: #FFFFFF;
        background: #0065FF;
        border-color: #0065FF;
    `}
    ${secondary && css`
        background: #f7fafc;
        border-color: #f7fafc;
    `}
    ${danger && css`
        color: #FFFFFF;
        background: #f5365c;
        border-color: #f5365c;
    `}
    ${primary_outline && css`
      color: #FFFFFF;
      background: #0052CC;
      border-color: #0052CC;
  `}
    ${primary_default && css`
      color: #212529;
      background: #f7fafc;
      border-color: #f7fafc;
  `}
    ${default_outline && css`
      color: #FFFFFF;
      background: #172b4d;
      border-color: #172b4d;
  `}
  ${success_outline && css`
      color: #FFFFFF;
      background: #2dce89;
      border-color: #2dce89;
  `}
  ${info_outline && css`
      color: #FFFFFF;
      background: #11cdef;
      border-color: #11cdef;
  `}
  ${danger_outline && css`
      color: #FFFFFF;
      background: #f5365c;
      border-color: #f5365c;
  `}
  ${transparent && css`
    color: #253858;
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
  `}
  }
  &:not(:disabled):not(.disabled):active {
    ${primary && css`
        color: #FFFFFF;
        background: #0747A6;
        border-color: #0747A6;
    `}
    ${danger && css`
        color: #FFFFFF;
        background: #f5365c;
        border-color: #f5365c; 
    `}
    ${primary_outline && css`
        color: #FFFFFF;
        background: #0052CC;
        border-color: #0052CC;
    `}
    ${primary_default && css`
      color: #212529;
      background: #f7fafc;
      border-color: #f7fafc;
    `}
    ${default_outline && css`
        color: #FFFFFF;
        background: #172b4d;
        border-color: #172b4d;
    `}
    ${success_outline && css`
        color: #FFFFFF;
        background: #2dce89;
        border-color: #2dce89;
    `}
    ${info_outline && css`
        color: #FFFFFF;
        background: #11cdef;
        border-color: #11cdef;
    `}
    ${danger_outline && css`
        color: #FFFFFF;
        background: #f5365c;
        border-color: #f5365c;
    `}
    ${transparent && css`
      color: #253858;
      background-color: transparent;
      border-color: transparent;
      box-shadow: none;
    `}
  }
  &:disabled {
    ${primary && css`
        color: #FFFFFF;
        background: #0747A6;
        border-color: #0747A6;
    `}
    ${danger && css`
        color: #FFFFFF;
        background: #f5365c;
        border-color: #f5365c;
    `}
    ${primary_outline && css`
        color: #0052CC;
        background-color: transparent;
        border-color: #0052CC;
    `}
    ${primary_default && css`
      color: #212529;
      background: #f7fafc;
      border-color: #f7fafc;
    `}
    ${default_outline && css`
        color: #172b4d;
        background-color: transparent;
        border-color: #172b4d;
    `}
    ${success_outline && css`
        color: #2dce89;
        background-color: transparent;
        border-color: #2dce89;
    `}
    ${info_outline && css`
        color: #11cdef;
        background-color: transparent;
        border-color: #11cdef;
    `}
    ${danger_outline && css`
        color: #f5365c;
        background-color: transparent;
        border-color: #f5365c;
    `}
  }
  ${disabled && css`
    cursor: not-allowed;
  `}
  ${small && css`
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    line-height: 1.5;
    border-radius: 0.25rem;
  `}
  ${large && css`
    padding: 0.875rem 1rem;
    font-size: 0.875rem;
    line-height: 1.5;
    border-radius: 0.4375rem;
  `}

`
  return (<NewButton { ...props} disabled={disabled}>{props.children}</NewButton>);
}

// export const StyledButton1 = styled(Button)`
//   ${props => props.primary && css`
//     color: #FFFFFF;
//     background: #0052CC;
//     border-color: #0052CC;
//   `}
//   ${props => props.secondary && css`
//     color: #253858;
//     background: #f7fafc;
//     border-color: #f7fafc;
//   `}
//   ${props => props.danger && css`
//     color: #FFFFFF;
//     background: #f5365c;
//     border-color: #f5365c;
//   `}
//   ${props => props.transparent && css`
//     color: #253858;
//     background-color: transparent;
//     border-color: transparent;
//     box-shadow: none;
//   `}
//   ${props => props["primary-outline"] && css`
//     color: #0052CC;
//     background-color: transparent;
//     border-color: #0052CC;
//   `}
//   ${props => props["default-outline"] && css`
//     color: #172b4d;
//     background-color: transparent;
//     border-color: #172b4d;
//   `}
//   ${props => props["success-outline"] && css`
//     color: #2dce89;
//     background-color: transparent;
//     border-color: #2dce89;
//   `}
//   ${props => props["info-outline"] && css`
//     color: #11cdef;
//     background-color: transparent;
//     border-color: #11cdef;
//   `}
//   ${props => props["danger-outline"] && css`
//     color: #f5365c;
//     background-color: transparent;
//     border-color: #f5365c;
//   `}
//   &:hover {
//     ${props => props.primary && css`
//         color: #FFFFFF;
//         background: #0065FF;
//         border-color: #0065FF;
//     `}
//     ${props => props.secondary && css`
//         background: #f7fafc;
//         border-color: #f7fafc;
//     `}
//     ${props => props.danger && css`
//         color: #FFFFFF;
//         background: #f5365c;
//         border-color: #f5365c;
//     `}
//     ${props => props["primary-outline"] && css`
//       color: #FFFFFF;
//       background: #0052CC;
//       border-color: #0052CC;
//   `}
//     ${props => props["default-outline"] && css`
//       color: #FFFFFF;
//       background: #172b4d;
//       border-color: #172b4d;
//   `}
//   ${props => props["success-outline"] && css`
//       color: #FFFFFF;
//       background: #2dce89;
//       border-color: #2dce89;
//   `}
//   ${props => props["info-outline"] && css`
//       color: #FFFFFF;
//       background: #11cdef;
//       border-color: #11cdef;
//   `}
//   ${props => props["danger-outline"] && css`
//       color: #FFFFFF;
//       background: #f5365c;
//       border-color: #f5365c;
//   `}
//   ${props => props.transparent && css`
//     color: #253858;
//     background-color: transparent;
//     border-color: transparent;
//     box-shadow: none;
//   `}
//   }
//   &:not(:disabled):not(.disabled):active {
//     ${props => props.primary && css`
//         color: #FFFFFF;
//         background: #0747A6;
//         border-color: #0747A6;
//     `}
//     ${props => props.danger && css`
//         color: #FFFFFF;
//         background: #f5365c;
//         border-color: #f5365c; 
//     `}
//     ${props => props["primary-outline"] && css`
//         color: #FFFFFF;
//         background: #0052CC;
//         border-color: #0052CC;
//     `}
//     ${props => props["default-outline"] && css`
//         color: #FFFFFF;
//         background: #172b4d;
//         border-color: #172b4d;
//     `}
//     ${props => props["success-outline"] && css`
//         color: #FFFFFF;
//         background: #2dce89;
//         border-color: #2dce89;
//     `}
//     ${props => props["info-outline"] && css`
//         color: #FFFFFF;
//         background: #11cdef;
//         border-color: #11cdef;
//     `}
//     ${props => props["danger-outline"] && css`
//         color: #FFFFFF;
//         background: #f5365c;
//         border-color: #f5365c;
//     `}
//     ${props => props.transparent && css`
//       color: #253858;
//       background-color: transparent;
//       border-color: transparent;
//       box-shadow: none;
//     `}
//   }
//   &:disabled {
//     ${props => props.primary && css`
//         color: #FFFFFF;
//         background: #0747A6;
//         border-color: #0747A6;
//     `}
//     ${props => props.danger && css`
//         color: #FFFFFF;
//         background: #f5365c;
//         border-color: #f5365c;
//     `}
//     ${props => props["primary-outline"] && css`
//         color: #0052CC;
//         background-color: transparent;
//         border-color: #0052CC;
//     `}
//     ${props => props["default-outline"] && css`
//         color: #172b4d;
//         background-color: transparent;
//         border-color: #172b4d;
//     `}
//     ${props => props["success-outline"] && css`
//         color: #2dce89;
//         background-color: transparent;
//         border-color: #2dce89;
//     `}
//     ${props => props["info-outline"] && css`
//         color: #11cdef;
//         background-color: transparent;
//         border-color: #11cdef;
//     `}
//     ${props => props["danger-outline"] && css`
//         color: #f5365c;
//         background-color: transparent;
//         border-color: #f5365c;
//     `}
//   }
//   ${props => props.disabled && css`
//     cursor: not-allowed;
//   `}
//   ${props => props.small && css`
//     font-size: 0.75rem;
//     padding: 0.25rem 0.5rem;
//     line-height: 1.5;
//     border-radius: 0.25rem;
//   `}
//   ${props => props.large && css`
//     padding: 0.875rem 1rem;
//     font-size: 0.875rem;
//     line-height: 1.5;
//     border-radius: 0.4375rem;
//   `}


// `