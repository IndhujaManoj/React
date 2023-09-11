import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardText,
    Row,
    Col,
  } from "reactstrap";

import styled from 'styled-components'

const CustomBox = styled('div')`
    width: 300px;
    background-color: ${props => props.active ? 'red' : 'green'};
`

const StyledCard = (props) => (
      <Card lg="1">
              <CardHeader>
                <Row className="align-items-center">
                  <Col xs="8">
                    <h5 className="h3 mb-0">{props.title}</h5>
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
)

export default StyledCard