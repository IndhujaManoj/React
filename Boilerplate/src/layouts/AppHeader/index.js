import React, { Fragment } from 'react'
import { HeaderWrap } from './style'
import LeftSection from './LeftSection'
import RightSection from './RightSection'

const AppHeader = () => {
  return (
    <Fragment>
      <HeaderWrap>
        <LeftSection />
        <RightSection />
      </HeaderWrap>
    </Fragment>
  )
}

export default AppHeader
