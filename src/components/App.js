import React, { Component } from 'react';
import {connect} from 'react-redux'
import {
  asyncGetCategories,
  asyncGetPosts,
  asyncGetPostsByCategory

} from '../actions/AsychActions'

class App extends Component {
  componentWillMount = () => {
    this.props.getCategories()
    this.props.getPosts()
    this.props.getPostsByCategory('redux')
  }
  render() {
    return (
      <div className="App">
        hello world
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    categories: state.categories,
    posts: state.posts
  }
}

function mapDispatchToProps(dispatch){
  return {
    getCategories: asyncGetCategories(dispatch),
    getPosts: asyncGetPosts(dispatch),
    getPostsByCategory:asyncGetPostsByCategory(dispatch)
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp;
