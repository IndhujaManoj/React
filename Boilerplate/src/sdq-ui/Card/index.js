import {
    Card,
    CardTitle,
    CardHeader,
    CardBody,
    CardText,
    CardFooter
  } from "reactstrap";

import styled,{css} from 'styled-components'

export const StyledCard = styled(Card)`
  ${props => props.width && css`
    width: ${props.width}%
  `}
`

export const StyledCardHeader = styled(CardHeader)``

export const StyledCardTitle = styled(CardTitle)``

export const StyledCardBody = styled(CardBody)``

export const StyledCardText = styled(CardText)``

export const StyledCardFooter = styled(CardFooter)``
