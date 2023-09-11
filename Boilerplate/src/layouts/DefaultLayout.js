import React from 'react'
// react library for routing
import { useLocation, Route, Switch, Redirect } from 'react-router-dom'
import Sidebar from 'components/Sidebar/Sidebar.js'
import { useSelector, useDispatch } from 'react-redux'
import nav from '__nav'
import routes from 'routes'
import { getItem } from 'utils/localStorageController'
import AppHeader from './AppHeader'
import { AppBody } from '../style'
import { pageLoad } from '../reduxStore/slices/user/UserSlice'
import ShowSpinner from 'components/Spinner/spinner'

import { Container } from 'sdq-ui'

function DefaultLayout(props) {
  const [sidenavOpen, setSidenavOpen] = React.useState(true)
  const user = useSelector((state) => state.user)
  const { signIn } = user
  const { user_ui_permission } = signIn
  let isAuth = signIn.status === 1 ? true : false

  let token = getItem('_token')
  if (token) {
    // setting Auth as true , if the user has already signed in and refresh the page
    isAuth = true
  }

  const location = useLocation()
  const dispatch = useDispatch()

  const mainContentRef = React.useRef(null)

  React.useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
    // mainContentRef.current.scrollTop = 0
  }, [location])

  React.useEffect(() => {
    if (!signIn.instance_permissions.api_fetched) {
      dispatch(pageLoad())
    }
  }, [])

  let filteredNav = nav.filter((nav) =>
    nav.permission?.some((permission) => {
      return user_ui_permission?.includes(permission)
    })
  )
  let finalNav = filteredNav.map((nav) => {
    if (nav.views) {
      nav.views = nav.views.filter((nav) =>
        nav.permission?.some((permission) => {
          return user_ui_permission?.includes(permission)
        })
      )
    }

    return nav
  })

  // toggles collapse between mini sidenav and normal
  const toggleSidenav = (e) => {
    if (document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-pinned')
      document.body.classList.add('g-sidenav-hidden')
    } else {
      document.body.classList.add('g-sidenav-pinned')
      document.body.classList.remove('g-sidenav-hidden')
    }
    setSidenavOpen(!sidenavOpen)
  }

  const hasPermission = (permissionList) => {
    if (permissionList === true) {
      return true
    }
    if (user_ui_permission) {
      return user_ui_permission?.some((permission) =>
        permissionList?.includes(permission)
      )
    }
    return true
  }
  return (
    <>
      {signIn.showDefaultLayout === true ? (
        <>
          <AppHeader />
          <AppBody>
            {location.pathname !== '/access-denied' && (
              <Sidebar
                className="side-margined"
                routes={finalNav}
                toggleSidenav={toggleSidenav}
                sidenavOpen={sidenavOpen}
                logo={{
                  innerLink: '/',
                  imgSrc: require('assets/img/brand/sdq-logo.png').default,
                  imgAlt: '...',
                }}
              />
            )}
            <div className="main-content" ref={mainContentRef}>
              <Container
                className="components-display"
                style={{ height: '100%' }}
              >
                <Switch>
                  {routes.map((route, index) => {
                    return route.component ? (
                      <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) =>
                          route.path === '/access-denied' ? (
                            <>
                              <route.component {...props} />
                            </>
                          ) : user_ui_permission?.length === 0 ? (
                            <Redirect to="/access-denied" />
                          ) : isAuth && hasPermission(route.permissions) ? (
                            <>
                              <route.component {...props} />
                            </>
                          ) : (
                            <Redirect to="/" />
                          )
                        }
                      />
                    ) : null
                  })}
                  <Redirect to="/" />
                </Switch>
              </Container>
              {/* <AdminFooter /> */}
              {sidenavOpen ? (
                <div className="backdrop d-xl-none" onClick={toggleSidenav} />
              ) : null}
            </div>
          </AppBody>
        </>
      ) : (
        <ShowSpinner />
      )}
    </>
  )
}

export default DefaultLayout
