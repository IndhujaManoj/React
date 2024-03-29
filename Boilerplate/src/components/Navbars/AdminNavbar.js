// nodejs library that concatenates classes
import classnames from 'classnames'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getItem } from 'utils/localStorageController'
import StudyList from '../StudyList/index'
// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from 'reactstrap'
import { logoutUser } from 'reduxStore/slices/user/UserSlice'
import { useEffect, useState } from 'react'
function AdminNavbar({ theme, sidenavOpen, toggleSidenav }) {
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const user = useSelector((state) => state.user)
  const { signIn } = user

  const history = useHistory()
  useEffect(() => {
    setUserName(getItem('user_name'))
  }, [])

  // function that on mobile devices makes the search open
  const openSearch = () => {
    document.body.classList.add('g-navbar-search-showing')
    setTimeout(function () {
      document.body.classList.remove('g-navbar-search-showing')
      document.body.classList.add('g-navbar-search-show')
    }, 150)
    setTimeout(function () {
      document.body.classList.add('g-navbar-search-shown')
    }, 300)
  }
  // function that on mobile devices makes the search close
  const closeSearch = () => {
    document.body.classList.remove('g-navbar-search-shown')
    setTimeout(function () {
      document.body.classList.remove('g-navbar-search-show')
      document.body.classList.add('g-navbar-search-hiding')
    }, 150)
    setTimeout(function () {
      document.body.classList.remove('g-navbar-search-hiding')
      document.body.classList.add('g-navbar-search-hidden')
    }, 300)
    setTimeout(function () {
      document.body.classList.remove('g-navbar-search-hidden')
    }, 500)
  }

  return (
    <>
      <Navbar
        className={classnames(
          'navbar-top navbar-expand border-bottom navbar-light custom-header'
        )}
      >
        <Container fluid>
          <Collapse navbar isOpen={true}>
            {!(
              signIn.role == 'ACCOUNT_ADMIN' || signIn.role == 'MODEL_MANAGER'
            ) ? (
              <StudyList />
            ) : (
              ''
            )}
            <Nav className="align-items-center ml-md-auto" navbar>
              <NavItem className="d-xl-none">
                <div
                  className={classnames(
                    'pr-3 sidenav-toggler',
                    { active: sidenavOpen },
                    { 'sidenav-toggler-dark': theme === 'dark' }
                  )}
                  onClick={toggleSidenav}
                >
                  <div className="sidenav-toggler-inner">
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                  </div>
                </div>
              </NavItem>
              <NavItem className="d-sm-none">
                <NavLink onClick={openSearch}>
                  <i className="ni ni-zoom-split-in" />
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="align-items-center ml-auto ml-md-0" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  style={{ cursor: 'pointer' }}
                  className="nav-link pr-0"
                  color=""
                  tag="a"
                >
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      {userName.charAt(0)}
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {userName}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="ni ni-settings-gear-65" />
                    <span>Settings</span>
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="ni ni-calendar-grid-58" />
                    <span>Activity</span>
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="ni ni-support-16" />
                    <span>Support</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    onClick={() => {
                      dispatch(logoutUser(''))
                      history.push('/')
                    }}
                  >
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  )
}

AdminNavbar.defaultProps = {
  toggleSidenav: () => {},
  sidenavOpen: false,
  theme: 'dark',
}
AdminNavbar.propTypes = {
  toggleSidenav: PropTypes.func,
  sidenavOpen: PropTypes.bool,
  theme: PropTypes.oneOf(['dark', 'light']),
}

export default AdminNavbar
