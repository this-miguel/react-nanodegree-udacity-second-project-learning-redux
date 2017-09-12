import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router, Route  } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import App from './App'

const history = createHistory()

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <Route  exact path="/" component={App} />
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root