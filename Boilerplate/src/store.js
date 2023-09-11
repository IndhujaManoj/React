import { configureStore } from '@reduxjs/toolkit'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { logger } from 'redux-logger'
import createRootReducer, { resetEnhancer } from './reduxStore/RootReducer'

export const history = createBrowserHistory()

const middleware = [routerMiddleware(history), logger]

const store = configureStore({
  reducer: resetEnhancer(createRootReducer(history)),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
})

export default store
