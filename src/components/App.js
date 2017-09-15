import React, { Component } from 'react';
import {connect} from 'react-redux'
import {
  asyncGetCategories,
  asyncGetPosts,
  asyncGetPostsByCategory,
  asyncGetCommentsForAPost,
  asyncGetPostDetails,
  asyncGetCommentDetails,
  asyncSendPost,
  asyncVoteForAPost,
  asyncSendComment

} from '../actions/AsychActions'

class App extends Component {

  postDetailsObject(

    id,
    timestamp,
    title,
    body,
    author,
    category

  ) {
    return {

      id,
      timestamp,
      title,
      body,
      author,
      category

    }
  }

  commentDetailsObject(

    id,
    timestamp,
    body,
    author,
    parentId

  ) {
    return {

      id,
      timestamp,
      body,
      author,
      parentId

    }
  }

  componentWillMount = () => {
    this.props.sendPost(this.postDetailsObject('testId', Date.now(), 'my new post', 'a brand new post', 'me', 'redux'))
    this.props.sendComment(this.commentDetailsObject(
      'testCommentId',
      Date.now(),
      'Hello, this is a comment',
      'me',
      '8xf0y6ziyjabvozdd253nd'))
    this.props.getCategories()
    this.props.getPosts()
    this.props.getPostsByCategory('redux')
    this.props.getCommentsForAPost('8xf0y6ziyjabvozdd253nd')
    this.props.getPostDetails('8xf0y6ziyjabvozdd253nd')
    this.props.getCommentDetails('894tuq4ut84ut8v4t8wun89g')
    this.props.getPosts()
    this.props.votePost('8xf0y6ziyjabvozdd253nd', 'upVote')
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
    getCommentDetails:asyncGetCommentDetails(dispatch),
    sendPost:asyncSendPost(dispatch),
    votePost:asyncVoteForAPost(dispatch),
    sendComment: asyncSendComment(dispatch)
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp;
