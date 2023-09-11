import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardBody,
  Row,
  Col,
  CardHeader,
} from 'sdq-ui'
import moment from 'moment'


function Dashboard({history}) {

  
  return (
              <Card>
                <CardHeader>
                  <Row className="align-items-center">
                    <Col className="col-auto">
                      Test
                    </Col>  
                    <Col>
                      <CardTitle className="h3 mb-0">
                        Title
                      </CardTitle>
                      <p className="mb-0">
                      Test
                      </p>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="panel-body">
                  <Row>
                    <Col>
                    Test
                    </Col>
                  </Row>
                  
                </CardBody>
              </Card>
  )
}
export default Dashboard
