import React, { Component }  from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router, Route  } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import CategoryList from './CategoryList'
import PostListConnected from './PostList'
import {connect} from 'react-redux'

import {
  asyncGetCategories
} from '../actions/AsychActions'

const history = createHistory();

class Root extends Component {

  componentWillMount() {
    const {getCategories } = this.props;
    getCategories();
  }

  render(){
    const { store, categoriesIds } = this.props;

    return(
      <Provider store={store}>
        <Router history={history}>
          <div className="app">
            <CategoryList/>
            {
              categoriesIds.map(categoryId => (
                <Route
                  key={`/${categoryId}-route`}
                  exact path={`/${categoryId}`}
                  render={ () => (
                    <PostListConnected
                      key={`/${categoryId}-post-list`}
                      category={categoryId}
                    />
                  )}
                />
              ))
            }
            <Route
              exact path='/'
              render={ () => (
                <PostListConnected
                  category='all'
                />
              )}
            />

          </div>
        </Router>
      </Provider>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    getCategories: asyncGetCategories(dispatch),
  }
}

function mapStateToProps(state){
  return {
    categories: state.categories,
    categoriesIds: state.categoriesIds,
  }
}

const RootConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  categoriesIds: PropTypes.array.isRequired,
};

export default RootConnected