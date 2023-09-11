import axios from 'axios'
import { API_URL } from './config'
import { getItem } from './utils/localStorageController'
import {userCDHError} from 'reduxStore/slices/user/UserSlice'
import { useDispatch } from 'react-redux'
const API_ENDPOINT = API_URL

const authHeader = () => ({
  _sdq_user_token: `${getItem('_token')}`,
})

const client = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

const MSG_SERVER_ERROR = 'INTERNAL SERVER ERROR'
/**
Dataservice class handles all operations by creating an instance of the mentods.
To access the local storage use the utility
 */
class DataService {
  static get(path = '', optionalHeader = {}, cancelToken = null) {
    return client({
      method: 'GET',
      url: path,
      headers: { ...authHeader(), ...optionalHeader },
      cancelToken,
    })
  }

  static post(path = '', data = {}, optionalHeader = {}) {
    return client({
      method: 'POST',
      url: path,
      data,
      headers: { ...authHeader(), ...optionalHeader },
    })
  }

  static patch(path = '', data = {}) {
    return client({
      method: 'PATCH',
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    })
  }

  static put(path = '', data = {}) {
    return client({
      method: 'PUT',
      url: path,
      data: data,
      headers: { ...authHeader() },
    })
  }

  static delete(path = '', data = {}) {
    return client({
      method: 'DELETE',
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    })
  }
}

/**
 * axios interceptors runs before and after a request, letting the developer modify req,req more
 * For more details on axios interceptor see https://github.com/axios/axios#interceptors
 */

// client.interceptors.request.use(
//     config => {
//         if (!config.headers._sdq_user_token) {
//             const token = getItem('_token');
//             if (token !== undefined && token !== '' && token !== null) {
//                 config.headers._sdq_user_token = `${getItem('_token')}`;
//             } else {
//                 window.open('/?src=auth-error', '_self');
//             }
//         }

//         return config;
//     },
//     error => Promise.reject(error)
// );
// client.interceptors.request.use((config) => {
//   const requestConfig = config;
//   const { headers } = config;
//   requestConfig.headers = {
//     ...headers,
//     Authorization: `Bearer ${getItem("access_token")}`,
//   };

//   return requestConfig;
// });

/**
 * in case the response returns an error code [3**, 4**, 5**] etc handle that here
 */
client.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error
    console.error('API response error:', response)
    if (response) {
      switch (response.status) {
        case 401:
          // dispatch logout action
          if (response.config.url !== '/auth/login/' && response.config.url !== '/auth/icc-token/'){
              localStorage.clear()
              window.location.href = '/'
              throw 'Error - Unauthourized to use application'
            
          }
          
          
        case 500:
          throw `${MSG_SERVER_ERROR}: ${response?.data?.error || ''}`
        default:
          throw `${response?.data?.error || ''}`
      }
    }
    return Promise.reject(error)
  }
)
export { DataService }
