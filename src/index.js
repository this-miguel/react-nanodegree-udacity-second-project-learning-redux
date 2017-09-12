import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose  } from 'redux'
import ReduxThunk from 'redux-thunk'
import mainReducer from './reducers/main'
import Root from './components/Root'

import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let store = createStore(
  mainReducer,
  composeEnhancers(
    applyMiddleware(ReduxThunk)
  )
)

render(
  <Root store={store} />,
  document.getElementById('root')
)
registerServiceWorker();
