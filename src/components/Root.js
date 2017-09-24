import 'bootstrap/dist/css/bootstrap.css'
import React, { Component }  from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router, Route  } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import CategoryList from './CategoryList'
import PostListConnected from './PostList'
import Post from './Post'
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
    const { store } = this.props;

    return(
      <Provider store={store}>
        <Router history={history}>
          <div className="app">
            <div className="container">
              <div className="row">
                <div className="col-xs-4">
                  <CategoryList/>
                </div>
                <div className="col-xs-8">
                  <Route
                    key={'category-route'}
                    exact path='/:categoryId'
                    render={({match}) => ( <PostListConnected category={ match.params.categoryId}/>)}
                  />

                  <Route
                    exact path='/'
                    render={ () => (
                      <PostListConnected
                        category='all'
                      />
                    )}
                  />
                  <Route
                    key='category-post-details-route'
                    exact path={`/:categoryId/:postId`}
                    render={({match}) => (
                       <Post
                        category={ match.params.categoryId}
                        postId={ match.params.postId}
                      />
                    )}
                  />

                </div>
              </div>

            </div>


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