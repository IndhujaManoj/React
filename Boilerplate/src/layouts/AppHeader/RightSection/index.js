import React, { Fragment } from 'react'
import { RightSectionBox, IconBox } from '../style'
import AppHelp from './AppHelp'
import AppSetting from './AppSetting'
import AppNotification from './AppNotification'
import AppMenu from './AppMenu'
import AppProfile from './AppProfile'
import { StudySelector } from './../style'
import StudyList from 'components/StudyList/index'
import { useSelector } from 'react-redux'

const RightSection = () => {
  const user = useSelector((state) => state.user)
  const { signIn } = user
  return (
    <Fragment>
      <RightSectionBox>
        {/* <IconBox>
          <AppHelp />
        </IconBox>
        <IconBox>
          <AppSetting />
        </IconBox>
        <IconBox>
          <AppNotification />
        </IconBox>
        <IconBox>
          <AppMenu />
        </IconBox> */}
        <IconBox>
          <AppProfile />
        </IconBox>
      </RightSectionBox>
      <StudySelector>
        {!(signIn.role == 'ACCOUNT_ADMIN' || signIn.role == 'MODEL_MANAGER') ? (
          <> <span className="study-title">Study</span> <StudyList /></>
        ) : (
          ''
        )}
      </StudySelector>
    </Fragment>
  )
}

export default RightSection
