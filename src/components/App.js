import React, { Component } from 'react';
import {connect} from 'react-redux'
import {
  asyncGetCategories,
  asyncGetPosts,
  asyncGetPostsByCategory,
  asyncGetCommentsForAPost,
  asyncGetPostDetails,
  asyncGetCommentDetails

} from '../actions/AsychActions'

class App extends Component {
  componentWillMount = () => {
    this.props.getCategories()
    this.props.getPosts()
    this.props.getPostsByCategory('redux')
    this.props.getCommentsForAPost('8xf0y6ziyjabvozdd253nd')
    this.props.getPostDetails('8xf0y6ziyjabvozdd253nd')
    this.props.getCommentDetails('894tuq4ut84ut8v4t8wun89g')
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
    getPostsByCategory:asyncGetPostsByCategory(dispatch),
    getCommentsForAPost:asyncGetCommentsForAPost(dispatch),
    getPostDetails:asyncGetPostDetails(dispatch),
    getCommentDetails:asyncGetCommentDetails(dispatch)
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp;
