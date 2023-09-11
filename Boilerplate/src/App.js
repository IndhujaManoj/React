import { useEffect } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { getItem } from 'utils/localStorageController'
import role_based_page from './RoleFirstpage'

// Containers
import DefaultLayout from './layouts/DefaultLayout'

// Login Page
import Login from './views/Login'
import Activate from './views/Activate'

// Home Page
import Home from './views/Home'
import { Container } from 'sdq-ui'

import { updateUserSession } from 'reduxStore/slices/user/UserSlice'

function App({ history }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const { signIn } = user

  useEffect(() => {
    const params = {
      role: getItem('crr_role') ?? '',
      id: getItem('user_id'),
      status: getItem('user_id') !== null && getItem('user_id') !== '' ? 1 : 0,
    }
    dispatch(updateUserSession(params))
  }, [])

  return (
    <ConnectedRouter history={history}>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/activate"
            render={({ location }) => (
              <Container isNoPadding={true}>
                <Activate location={location} />
              </Container>
            )}
          />
          <Route
            exact
            path="/"
            name="Login"
            render={({ history }) =>
              signIn.status === 1 ? (
                <Redirect to={role_based_page[getItem('crr_role')]} />
              ) : (
                <Container isNoPadding={true}>
                  <Login signIn={signIn} />
                </Container>
              )
            }
          />
          <Route
            path="/home"
            name="App"
            render={({ history }) =>
              signIn.status === 1 ? (
                <Redirect to={role_based_page[getItem('crr_role')]} />
              ) : (
                <Home signIn={signIn} history={history} />
              )
            }
          />
          <Route
            path="/"
            name="App"
            render={(routerProps) => <DefaultLayout {...routerProps} />}
          />
        </Switch>
      </BrowserRouter>
    </ConnectedRouter>
  )
}

export default App