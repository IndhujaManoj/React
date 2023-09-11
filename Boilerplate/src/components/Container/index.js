import { Container as RContainer } from 'sdq-ui'
import Alert from 'sdq-ui/Alert'

function Container({ children }) {
  return (
    <RContainer style={{height:"100%"}} className="demo">
      {children}
      <Alert />
    </RContainer>
  )
}

export default Container
