import React, { useState, useEffect, useRef } from 'react'
import ProfileIcon from 'Images/svg/ProfileIcon'
import { getItem } from 'utils/localStorageController'
import {
  ProfileFirstLetter,
  ProfileIconWrapper,
  DropdownMenu,
  DropdownItem,
  MenuText,
} from '../style'
import { useDispatch } from 'react-redux'
import { logoutUser } from 'reduxStore/slices/user/UserSlice'
import { useHistory } from 'react-router'

const AppProfile = () => {
  const dispatch = useDispatch()
  let iconRef = useRef(null)
  const history = useHistory()
  const [userName, setUserName] = useState('')
  const [showDropdownMenu, setShowDropdownMenu] = useState(false)

  useEffect(() => {
    setUserName(getItem('user_name'))
  }, [])

  useEffect(() => {
    document.addEventListener('mouseup', handleClick, false)
    return () => {
      document.removeEventListener('mouseup', handleClick, false)
    }
  }, [])

  const handleClick = (e) => {
    if (
      !iconRef.current.contains(e.target) &&
      !e?.target?.closest('#profile-dropdown')
    ) {
      setShowDropdownMenu(false)
    }
  }

  return (
    <div>
      <ProfileIconWrapper
        onClick={() => {
          setShowDropdownMenu(!showDropdownMenu)
        }}
        ref={iconRef}
      >
        <ProfileIcon />
        <ProfileFirstLetter>
          {userName?.charAt(0)?.toUpperCase()}
        </ProfileFirstLetter>
      </ProfileIconWrapper>

      {showDropdownMenu ? (
        <DropdownMenu id="profile-dropdown">
          <DropdownItem className="noti-title" header tag="div">
            <h6 className="text-overflow m-0">Welcome <span className="text-primary font-weight-bold">{userName}</span></h6>
          </DropdownItem>
          {/* <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
            <i className="ni ni-single-02" />
            <MenuText>My profile</MenuText>
          </DropdownItem>
          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
            <i className="ni ni-settings-gear-65" />
            <MenuText>Settings</MenuText>
          </DropdownItem>
          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
            <i className="ni ni-calendar-grid-58" />
            <MenuText>Activity</MenuText>
          </DropdownItem>
          <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
            <i className="ni ni-support-16" />
            <MenuText>Support</MenuText>

          </DropdownItem>
          <DropdownItem divider /> */}

          <DropdownItem
            onClick={() => {
              dispatch(logoutUser(''))
              history.push('/')
            }}
          >
            <i className="ni ni-user-run" />
            <MenuText>Logout</MenuText>
          </DropdownItem>
        </DropdownMenu>
      ) : null}
    </div>
  )
}

export default AppProfile
