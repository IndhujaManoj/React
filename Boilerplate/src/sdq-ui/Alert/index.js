import { useRef, useEffect } from 'react'
import NotificationAlert from 'react-notification-alert'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { deactivateAlert } from 'reduxStore/slices/alert/AlertSlice'
import './alert.scss'

const AlertContainer = styled.div`
  display: block;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
`

const AlertTitle = styled.span`
  font-weight: 700;
`

const AlertMessage = styled.span``

function Alert() {
  const dispatch = useDispatch()
  const notifyEl = useRef(null)
  const { isAlertActive, type, alertTitle, content  } = useSelector((state) => state.alert)
  console.log('type ,', type);

  useEffect(() => {
    let timer
    if (isAlertActive) {
      myFunc()
      timer = setTimeout(() => dispatch(deactivateAlert()), 0)
    }
    return () => clearTimeout(timer)
  }, [isAlertActive])

  let options = {}
  options = {
    place: 'tc',
    message: (
      <AlertContainer className="alert-text">
        <AlertTitle className="alert-title" data-notify="title">
          {alertTitle}
        </AlertTitle>
        <AlertMessage data-notify="message">{content}</AlertMessage>
      </AlertContainer>
    ),
    type: type,
    icon: `ni ni-${type === 'success' ? 'check-bold' : 'fat-remove' }`,
    // icon: `ni ni=bell-55`
    autoDismiss: 4,
    
  }

  const myFunc = () => {
    notifyEl.current.notificationAlert(options)
  }
  return <NotificationAlert ref={notifyEl} onClick={() => console.log('clicked noti')} />
}

export default Alert
