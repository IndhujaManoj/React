import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import ShowSpinner from 'components/Spinner/spinner'
import { Card, CardBody, Row, Col } from 'sdq-ui'
import { loginByToken } from 'reduxStore/slices/user/UserSlice'

function Home(props) {
  const dispatch = useDispatch()
  const { history } = props
  const { signIn } = props
  let token = new URL(window.location.href).searchParams.get(
    'CDH-WEBAUTH-TOKEN'
  )
  useEffect(() => {
    if (token) {
      dispatch(loginByToken(token))
    } 
    else {
      history.push(`/login`)
    }
  }, [token])

  return (
    <>
      {!signIn.CDHError ? (
        <ShowSpinner />
      ) : (
        <Row className="justify-content-center align-middle mt-9">
          <Col xs="6">
            <Card className="text-center">
              <CardBody>
                <div className="my-4">
                  <div className="h1">Oops!</div>
                  <span className="d-block h3">Authentication Failed</span>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default Home
