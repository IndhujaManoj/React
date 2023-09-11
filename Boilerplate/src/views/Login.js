import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import ShowSpinner from 'components/Spinner/spinner'
import { Button, Card, CardBody, Row, Col } from 'sdq-ui'
import {
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Alert
} from 'reactstrap'

import { loginInputChange, loginUser } from 'reduxStore/slices/user/UserSlice'

function Login(props) {
  const { signIn } = props
  const { email, password } = signIn
  const session = useSelector((state) => state.user)
  const [visible, setVisible] = useState(true)
  const onDismiss = () => setVisible(false)

  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    dispatch(loginInputChange({ name: e.target.name, value: e.target.value }))
  }

  const login = (e) => {
    e.preventDefault()
    dispatch(loginUser(email, password))
  }

  if (session.signIn.load || session.signIn.pageLoad) {
    return <ShowSpinner />
  }
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg="6" md="7" sm="12">
          <Card className="bg-secondary border-0 mb-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Sign In with credentials</small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-merge input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      id="email"
                      name="email"
                      placeholder="Email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        handleInputChange(e)
                      }}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-merge input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      id="password"
                      name="password"
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e) => {
                        handleInputChange(e)
                      }}
                    />
                  </InputGroup>
                </FormGroup>

                <div className="text-center">
                  <Button
                    primary
                    type="submit"
                    onClick={login}
                  >
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
