import styled from 'styled-components'

export const HeaderWrap = styled.div`
  align-items: center;
  width: 100%;
  padding: 10px 24px;
  display: inline-block;
  background-color: #0747a6;
  height: 60px;
`
export const LeftSectionBox = styled.div`
  float: left;
  display: flex;
`
export const RightSectionBox = styled.div`
  float: right;
  display: flex;
`

export const Title = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: #dfe1e6;
`

export const TitleWarp = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 20px 25px;
  border-left: 1px solid #2684ff;
`

export const BurgerIconWarp = styled.div`
  cursor: pointer;
`

export const SaamaLogoWrap = styled.div`
  cursor: pointer;
  margin-left: 15px;
`

export const IconBox = styled.div`
  margin: 0px 3px;
  cursor: pointer;
`

export const ProfileFirstLetter = styled.div`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  position: absolute;
  line-height: 33px;
`

export const ProfileIconWrapper = styled.div`
  position: relative;
  display: flex;
  text-align: center;
  justify-content: center;
`

export const DropdownMenu = styled.div`
  position: absolute;
  z-index: 1000;
  right: 10px;
  top: 50px;
  z-index: 1000;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #525f7f;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 0 solid rgba(0, 0, 0, 0.15);
  border-radius: 0.4375rem;
  box-shadow: 0 50px 100px rgb(50 50 93 / 10%), 0 15px 35px rgb(50 50 93 / 15%),
    0 5px 15px rgb(0 0 0 / 10%);
`

export const DropdownItem = styled.div`
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
`

export const MenuText = styled.span`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
`

export const StudySelector = styled.div`
  float: right;
  top: 2px;
  right: 20px;
  position: relative;
  border-right: 1px solid #2684FF;
`
