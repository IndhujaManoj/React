import ReactDOM from 'react-dom'
import App from './App'

import { Provider } from 'react-redux'
import store, { history } from './store'

// plugins styles from node_modules
import 'react-notification-alert/dist/animate.css'
import '@fullcalendar/common/main.min.css'
import 'react-perfect-scrollbar/dist/css/styles.css'
import '@fullcalendar/daygrid/main.min.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'select2/dist/css/select2.min.css'
import 'quill/dist/quill.core.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
// plugins styles downloaded
import 'assets/vendor/nucleo/css/nucleo.css'
// core styles
import 'assets/scss/argon-dashboard-pro-react.scss?v1.2.0'

import 'assets/css/app-custom.css'
import './index.scss'

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
)
