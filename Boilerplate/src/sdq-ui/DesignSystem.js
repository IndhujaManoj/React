import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  CardText 
} from 'sdq-ui'
import {
  activateAlert,
} from 'reduxStore/slices/alert/AlertSlice'
import SelectComponent from 'components/Select'
import SampleIcon from 'Images/svg/SampleIcon'
import FeatherIcon from 'feather-icons-react'
import Alert from 'sdq-ui/Alert'
import classnames from 'classnames';

const Box = styled.div`
  display: block;
  margin: 40px;
`

const Title = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #0052cc;
`

const DesignSystem = () => {
  const dispatch = useDispatch()
  const [defaultModal, setdefaultModal] = useState(false);
  const [centeredModal, setcenteredtModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [activeTab, setActiveTab] = useState("tab1")

  return (
    <Container>
      <Card>
              <CardHeader>
                <Row className="align-items-center">
                  <Col>
                    <CardTitle className="h3 mb-0">Button Component</CardTitle>
                  </Col>
                </Row>
              </CardHeader>

              <CardBody>
                <CardText className="mb-4"> Buttons in default size</CardText>

                <Row>
                    <Col>
                      <Button
                      primary
                    >
                      Primary
                    </Button>
                    </Col>
                    <Col>
                      <Button
                        secondary
                      >
                        secondary
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        danger
                      >
                        Danger
                    </Button>
                    </Col>

                  </Row>  
                <CardText className="mt-4"> Buttons in large size</CardText>

                <Row>
                    <Col>
                      <Button
                        primary
                        large
                      >
                        Primary
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        secondary
                        large
                      >
                        secondary
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        danger
                        large
                      >
                        Danger
                    </Button>
                    </Col>

                  </Row>

                <CardText className="mt-4"> Buttons in small size</CardText>

                <Row>
                    <Col>
                      <Button
                        primary
                        small
                      >
                        Primary
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        secondary
                        small
                      >
                        secondary
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        danger
                        small
                      >
                        Danger
                    </Button>
                    </Col>

                  </Row>


                <CardText className="mt-4"> Buttons with disabled state</CardText>

                <Row>
                    <Col>
                      <Button
                        primary
                        disabled
                      >
                        Primary
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        secondary
                        disabled
                      >
                        secondary
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        danger
                        disabled
                      >
                        Danger
                    </Button>
                    </Col>
                </Row>  


                <CardText className="mt-4"> Buttons with outline</CardText>

                <Row>
                      <Col>
                        <Button
                          primary-outline
                          small
                        >
                          Primary
                        </Button>
                        <Button
                          default-outline
                          small
                        >
                          Default
                        </Button>
                        <Button
                          success-outline
                          small
                          className="mt-2"
                        >
                          Success
                        </Button>
                        <Button
                          info-outline
                          small
                          className="mt-2"
                        >
                          Info
                        </Button>
                        <Button
                          danger-outline
                          small
                          className="mt-2"
                        >
                          Danger
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          primary-outline
                          small
                        >
                          <i className="fas fa-download"></i>
                      </Button>
                        <Button
                          default-outline
                          small
                        >
                          <i className="fas fa-download"></i>
                      </Button>
                        <Button
                          success-outline
                          small
                        >
                          <i className="fas fa-download"></i>
                      </Button>
                        <Button
                          info-outline
                          small
                          className="mt-2"
                        >
                          <i className="fas fa-download"></i>
                      </Button>
                        <Button
                          danger-outline
                          small
                          className="mt-2"
                        >
                          <i className="fas fa-download"></i>
                      </Button>
                      </Col>
                      <Col>
                        <Button
                          primary-outline
                          small
                        >
                          <i className="fas fa-download mr-2"></i>
                          Primary
                        </Button>
                        <Button
                          default-outline
                          small
                          className="mt-2"
                        >
                          <i className="fas fa-download mr-2"></i>
                          Default
                        </Button>
                        <Button
                          success-outline
                          small
                          className="mt-2"
                        >
                          <i className="fas fa-download mr-2"></i>
                          Success
                        </Button>
                        <Button
                          info-outline
                          small
                          className="mt-2"
                        >
                          <i className="fas fa-download mr-2"></i>
                          Info
                        </Button>{' '}
                        <Button
                          danger-outline
                          small
                          className="mt-2"
                        >
                          <i className="fas fa-download mr-2"></i>
                          Danger
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          primary-outline
                          small
                          block
                        >
                          <i className="fas fa-download mr-2"></i>
                          Download
                        </Button>
                        <Button
                          default-outline
                          small
                          block
                          className="mt-2"
                        >
                          <i className="fas fa-download mr-2"></i>
                          Default
                        </Button>
                        <Button
                          success-outline
                          small
                          block
                          className="mt-2"
                        >
                          <i className="fas fa-download mr-2"></i>
                          Success
                        </Button>
                        <Button
                          info-outline
                          small
                          block
                          className="mt-2"
                        >
                          <i className="fas fa-download mr-2"></i>
                          Info
                        </Button>
                        <Button
                          danger-outline
                          small
                          block
                          className="mt-2"
                        >
                          <i className="fas fa-download mr-2"></i>
                          Danger
                        </Button>
                      </Col>

                      <Col>
                        <Button
                          primary-outline 
                        >
                          Primary
                        </Button>
                        <Button
                          default-outline
                          className="mt-2"
                        >
                          Default
                        </Button>
                        <Button
                          success-outline
                          className="mt-2"
                        >
                          Success
                        </Button>
                        <Button
                          info-outline
                          className="mt-2"
                        >
                          Info
                        </Button>
                        <Button
                          danger-outline
                          className="mt-2"
                        >
                          Danger
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          primary-outline 
                          disabled
                        >
                          Primary
                        </Button>
                        <Button
                          default-outline
                          disabled
                          className="mt-2"
                        >
                          Default
                        </Button>
                        <Button
                          success-outline
                          disabled
                          className="mt-2"
                        >
                          Success
                        </Button>
                        <Button
                          info-outline
                          disabled
                          className="mt-2"
                        >
                          Info
                        </Button>
                        <Button
                          danger-outline
                          disabled
                          className="mt-2"
                        >
                          Danger
                        </Button>
                      </Col>
                  </Row>  


                  <CardText className="mt-4"> Buttons in block state</CardText>

                  <Row>
                      <Col>
                        <Button
                          primary
                          block
                        >
                          <i className="fas fa-download mr-2"></i>
                          Primary
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          secondary
                          block
                        >
                          secondary
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          danger
                          block
                        >
                          Danger
                      </Button>
                      </Col>
                  </Row>    


                        <CardText className="mt-4"> Buttons with transparent</CardText>

                        <Row>
                            <Col>
                              <Button
                                transparent
                              >
                                <i className="fas fa-download mr-2"></i>
                                Primary
                              </Button>
                            </Col>
                            <Col>
                              <Button
                                transparent
                                small
                              >
                                <i className="fas fa-download mr-2"></i>
                                secondary
                              </Button>
                            </Col>
                            <Col>
                              <Button
                                transparent
                                block
                              >
                                <i className="fas fa-download mr-2"></i>
                                Danger
                            </Button>
                            </Col>
                        </Row> 


                  <CardText className="mt-4"> Buttons with icon and text</CardText>

                  <Row>
                      <Col>
                        <Button
                          primary
                        >
                          <i className="fas fa-download mr-2"></i>
                          Primary
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          secondary
                        >
                          <i className="fas fa-download mr-2"></i>
                          secondary
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          danger
                        >
                          <i className="fas fa-download mr-2"></i>
                          Danger
                      </Button>
                      </Col>
                  </Row>  


                  <CardText className="mt-4"> Buttons with icon</CardText>

                  <Row>
                      <Col>
                        <Button
                          primary
                        >
                          <i className="fas fa-download"></i>
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          secondary
                        >
                          <i className="fas fa-download"></i>
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          danger
                        >
                          <i className="fas fa-download"></i>
                      </Button>
                      </Col>
                  </Row>  
                
              </CardBody>
            </Card> 
      {/* <Container>
      <Nav tabs>
          <NavItem>
            <NavLink
            className={classnames({ active: activeTab == "tab1" })}
            onClick={() => setActiveTab("tab1") }
            >
              Tab1
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
            className={classnames({ active: activeTab == "tab2" })}
            onClick={() => setActiveTab("tab2") }
            >
              Moar Tabs
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="tab1">
            <Row>
              <Col sm="12">
                <h4>Tab 1 Contents</h4>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="tab2">
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>

       
      </Container>

      <hr />
      <Container>
        <h3>Design system - New component (Reactstrap)</h3>
        <h4>Buttons variants</h4>
        <Button color="primary" outline onClick={() => dispatch(activateAlert({content: 'This is a success alert message',color: '', type: 'success', title: 'Success' }))}>
          Primary
        </Button>
        <Button color="primary" onClick={() => dispatch(activateAlert({content: 'This is a success danger message',color: '', type: 'danger', title: 'Danger' }))}>Primary</Button>
        <Button color="primary" size="sm">
          Primary
        </Button>
        <Button color="primary">
          <FeatherIcon icon="heart" />
          Primary
        </Button>
        <Button color="primary" size="sm">
          <FeatherIcon icon="heart" size="sm" />
          Primary
        </Button>

        <br />
        <br />
        <br />
        <Button color="secondary" size="sm">
          Secondary
        </Button>
        <Button color="secondary" outline>
          Secondary
        </Button>
        <Button color="secondary">Secondary</Button>
        <Button color="secondary">
          <FeatherIcon icon="heart" />
          Secondary
        </Button>
        <Button
          color="secondary"
          size="sm"
          onClick={() => setIsModalOpen((isModalOpen) => !isModalOpen)}
        >
          <FeatherIcon icon="heart" />
          Secondary
        </Button>

        <br />
        <br />
        <br />

        <Label required>Input box</Label>
        <Input type="text" placeholder="search" invalid />
        <span className="invalid-feedback">Error text</span>

        <br />
        <br />
        <br />

        <SelectComponent
          id='some'
          options={[
            { label: 'Error', value: 'Error' },
            { label: 'Warning', value: 'Warning' },
          ]}
        />
        <Alert/>
      </Container>
      <Card width="100">
              <CardHeader>
                <Row className="align-items-center">
                  <Col xs="8">
                    <CardTitle className="h3 mb-0">Card title</CardTitle>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      className="btn-neutral"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Action
                    </Button>
                  </Col>
                </Row>
              </CardHeader>

              <CardBody>
                <CardText className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Facilis non dolore est fuga nobis ipsum illum eligendi nemo
                  iure repellat, soluta, optio minus ut reiciendis voluptates
                  enim impedit veritatis officiis.
                </CardText>
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Go somewhere
                </Button>
              </CardBody>
            </Card> 

      <Modal
        isOpen={isModalOpen}
        toggle={() => setIsModalOpen((isModalOpen) => !isModalOpen)}
        centered
      >
        <ModalHeader
          close={
            <button
              className="close"
              onClick={() => setIsModalOpen((isModalOpen) => !isModalOpen)}
            >
              ×
            </button>
          }
        >
          Modal Header 🤯
        </ModalHeader>
        <ModalBody>Modal Body...</ModalBody>
        <ModalFooter>Modal Footer 🦵🏼</ModalFooter>
      </Modal> */}


      <Card>
              <CardHeader>
                <Row className="align-items-center">
                  <Col>
                    <CardTitle className="h3 mb-0">Modal Component</CardTitle>
                  </Col>
                </Row>
              </CardHeader>

              <CardBody> 
                <Row>
                  <Col>
                  
                <Button
                  primary
                  onClick={() => setdefaultModal(true)}
                 >
                   Default Modal
                   </Button> 
                   <Modal
                      isOpen={defaultModal}
                    >
                     <ModalHeader
                      charCode="×"
                      toggle={() => setdefaultModal(false)}
                    >
                      Modal title
                    </ModalHeader>
                      <ModalBody>
                        <p>
                          Far far away, behind the word mountains, far from the
                          countries Vokalia and Consonantia, there live the
                          blind texts. Separated they live in Bookmarksgrove
                          right at the coast of the Semantics, a large language
                          ocean.
                        </p>
                        <p>
                          A small river named Duden flows by their place and
                          supplies it with the necessary regelialia. It is a
                          paradisematic country, in which roasted parts of
                          sentences fly into your mouth.
                        </p>
                      </ModalBody>
                      <ModalFooter>
                        <Button 
                        primary 
                        >
                          Save changes
                        </Button>
                        <Button
                          className="ml-auto"
                          color="link"
                          data-dismiss="modal"
                          type="button"
                          onClick={() => setdefaultModal(false)}
                        >
                          Close
                        </Button>
                      </ModalFooter>
                    </Modal>

                  </Col>
                  <Col>
                  
                <Button
                  primary
                  onClick={() => setcenteredtModal(true)}
                 >
                   Centered Modal
                   </Button> 
                   <Modal
                      isOpen={centeredModal}
                      className="modal-dialog-centered" 
                    >
                     <ModalHeader
                      charCode="×"
                      toggle={() => setcenteredtModal(false)}
                    >
                      Modal title
                    </ModalHeader>
                      <ModalBody>
                        <p>
                          Far far away, behind the word mountains, far from the
                          countries Vokalia and Consonantia, there live the
                          blind texts. Separated they live in Bookmarksgrove
                          right at the coast of the Semantics, a large language
                          ocean.
                        </p>
                        <p>
                          A small river named Duden flows by their place and
                          supplies it with the necessary regelialia. It is a
                          paradisematic country, in which roasted parts of
                          sentences fly into your mouth.
                        </p>
                      </ModalBody>
                      <ModalFooter>
                        <Button 
                        primary 
                        
                        >
                          Save
                        </Button>
                        <Button
                          transparent
                          className="ml-auto"
                          data-dismiss="modal"
                          type="button"
                          onClick={() => setcenteredtModal(false)}
                        >
                          Close
                        </Button>
                      </ModalFooter>
                    </Modal>

                  </Col>
                </Row>
              </CardBody>  
      </Card>


      <Card>
              <CardHeader>
                <Row className="align-items-center">
                  <Col>
                    <CardTitle className="h3 mb-0">Input Component</CardTitle>
                  </Col>
                </Row>
              </CardHeader>

              <CardBody> 
                <Row>
                  <Col>
                  
                  <Input
                    label="Input"
                  >
                  </Input>

                  </Col>
                  <Col>
                  
                  <Input
                    label="Input with required"
                    required
                  >
                  </Input>
                
                  </Col>
                  <Col>
                  
                  <Input
                    label="Disabled Input with required"
                    required
                    disabled
                  >
                  </Input>
                
                  </Col>
                </Row>
                <Row className="mt-5">
                  <Col>
                  
                  <Input
                    label="Input with error"
                    error={true}
                    required
                  >
                  </Input>

                  </Col>
                  <Col>
                  
                  <Input
                    label="Input with error text"
                    error={true}
                    errorText="Country is missing"
                    required
                  >
                  </Input>
                
                  </Col>
                </Row>

                <Row className="mt-5">
                  <Col>
                  
                    <Input
                      width={100}
                      placeholder="width = 100"
                    >
                    </Input>

                  </Col>
                  <Col>
                  
                    <Input
                      width={200}
                      placeholder="width = 200"
                    >
                    </Input>

                  </Col>
                  <Col>
                  
                    <Input
                      width={300}
                      placeholder="width = 300"
                    >
                    </Input>

                  </Col>

                </Row>

                <Row className="mt-5">
                  <Col>
                  
                    <Input
                      type="date"
                      label="Date Input"
                    >
                    </Input>

                  </Col>
                  <Col>
                  
                    <Input
                      type="time"
                      label="Time Input"
                    >
                    </Input>

                  </Col>
                  <Col>
                  
                  <Input
                      type="datetime-local"
                      label="Date & Time Input"
                    >
                    </Input>

                  </Col>

                </Row>

                <Row className="mt-5">
                  <Col>
                  
                    <Input
                      type="search"
                      placeholder="search text ..."
                      label="Type : Search"
                    >
                    </Input>

                  </Col>
                  <Col>
                  
                    <Input
                      type="url"
                      placeholder="https://www.example.com"
                      label="Type : url"
                    >
                    </Input>

                  </Col>
                  <Col>
                  
                  <Input
                      type="number"
                      placeholder={19}
                      label="Type : Number"
                    >
                    </Input>

                  </Col>
                  <Col>
                  
                  <Input
                      type="color"
                      label="Type : Color"
                      defaultValue="#0052CC"
                    >
                    </Input>

                  </Col>

                </Row>
                <Row className="mt-5">


                <Col>
                  
                  <Input
                     className="form-control-sm"
                     placeholder="Small input"
                     label="Small input"
                     type="text"
                     width={200}
                    >
                    </Input>

                  </Col>

                  <Col>
                  
                  <Input
                     label="Default Input"
                     placeholder="Default Input"
                     type="text"
                    >
                    </Input>

                  </Col>

                  <Col>
                  
                  <Input
                     className="form-control-lg mt--4"
                     label="Large input"
                     placeholder="Large input"
                     type="text"
                    >
                    </Input>

                  </Col>

                </Row>

                <Row className="mt-5">


                <Col>
                <Input
                        label="Textarea"
                        placeholder="Textarea"
                        rows="3"
                        type="textarea"
                      />
                </Col>

                <Col>
                <Input
                        label="Textarea with required"
                        placeholder="Textarea with required"
                        rows="3"
                        type="textarea"
                        required
                      />
                </Col>

                <Col>
                <Input
                        label="Textarea with disabled"
                        placeholder="Textarea with disabled"
                        rows="3"
                        type="textarea"
                        disabled
                      />
                </Col>

                </Row>

                <Row className="mt-5">


                <Col>
                <Input
                        label="Textarea with error"
                        placeholder="Textarea with error"
                        rows="3"
                        type="textarea"
                        error={true}
                        errorText="Missing Description"
                        required
                      />
                </Col>

                  <Col>
                  <Input
                          label="Textarea with resize = none"
                          placeholder="Textarea with resize = none"
                          type="textarea"
                          resize="none"
                          rows="3"
                          required
                        />
                  </Col>

                <Col>
                <Input
                        label="Textarea with row=6"
                        placeholder="Textarea with row=6"
                        rows="6"
                        type="textarea"
                        required
                      />
                </Col>

                </Row>
                <Row className="mt-5">
                <Col>
                
                </Col>
                
                </Row>
              </CardBody>  
      </Card>
    </Container>
  )
}

export default DesignSystem
