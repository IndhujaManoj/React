import styled from 'styled-components'
import Alert from 'sdq-ui/Alert'
import { Row, Col } from 'reactstrap'

const ContainerParent = styled.div`
  padding: ${(props) => (props.isNoPadding ? 0 : '10px')};
`

export function StyledContainer({ children, isNoPadding }) {
  return (
    <ContainerParent isNoPadding={isNoPadding}>
      {children}
      <Alert />
    </ContainerParent>
  )
}

export const StyledRow = styled(Row)``

export const StyledCol = styled(Col)``