import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

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
import queryString from 'query-string';
import {activateUser} from '../reduxStore/slices/user/UserSlice'


export default function Activate(props) {
    const dispatch = useDispatch()
    const [password, setPassword] = useState('')
    const [re_password, setRePassword] = useState('')
    const { location} = props
    const {search} = location
    const searchParams = queryString.parse(search)
    const invite_key = searchParams.invite_key
    console.log(password, re_password, 'password')
    return (
        <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg="6" md="7" sm="12">
          <Card className="bg-secondary border-0 mb-0">
            {
                invite_key ? <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Set Password</small>
                </div>
                <Form role="form">
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="password"
                        name="Password"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
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
                        id="re-password"
                        name="re-password"
                        placeholder="Confirm Password"
                        type="password"
                        value={re_password}
                        onChange={(e) => {
                          setRePassword(e.target.value)
                        }}
                      />
                    </InputGroup>
                  </FormGroup>
  
                  <div className="text-center">
                    <Button
                      primary
                      type="button"
                      onClick = {() => {dispatch(activateUser(password, invite_key))}}
                      disabled={password === '' || password !== re_password}
                    >
                      Activate
                    </Button>
                  </div>
                </Form>
              </CardBody>
              :
              <CardBody style={{width:"100%", textAlign:""}}><div style={{width:"100%", height:"100px",}}>Invite Key Missing</div></CardBody>
            }
          </Card>
        </Col>
      </Row>
    </Container>
    )
}
