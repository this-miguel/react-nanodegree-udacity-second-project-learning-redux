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
  asyncSendComment,
  asyncUpdatePost,
  asyncUpdateComment,
  asyncDeletePost,
  asyncDeleteComment

} from '../actions/AsychActions'
import CategoryList from './CategoryList'

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

  updatePostData( postId, title, body){
    return {
      postId,
      title,
      body
    }
  }

  updateCommentData( commentId, body, timestamp ) {
    return {
      commentId,
      timestamp,
      body
    }
  }

  componentWillMount = () => {
    this.props.getPostDetails('8xf0y6ziyjabvozdd253nd')
    this.props.sendPost(this.postDetailsObject('testId3', Date.now(), 'my new post to be deleted soon', 'soon to be deleted', 'me', 'redux'))
    this.props.sendPost(this.postDetailsObject('testId', Date.now(), 'my new post', 'a brand new post', 'me', 'redux'))
    this.props.sendPost(this.postDetailsObject('testId2', Date.now(), 'old post', 'old body', 'me', 'redux'))
    this.props.sendComment(this.commentDetailsObject(
      'testCommentId',
      Date.now(),
      'Hello, this is a comment',
      'me',
      '8xf0y6ziyjabvozdd253nd'))
    this.props.sendComment(this.commentDetailsObject(
      'testCommentId2',
      Date.now(),
      'this is an old comment',
      'me',
      '8xf0y6ziyjabvozdd253nd')
    )
    this.props.sendComment(this.commentDetailsObject(
      'testCommentId3',
      Date.now(),
      'this will be deleted',
      'me',
      '8xf0y6ziyjabvozdd253nd')
    )

    this.props.sendComment(this.commentDetailsObject(
      'testCommentId9',
      Date.now(),
      'brand new comment',
      'me',
      'testId2')
    )
    this.props.getCategories()
    this.props.getPosts()
    this.props.deletePost('testId3')
    this.props.getPostsByCategory('redux')
    this.props.getCommentsForAPost('8xf0y6ziyjabvozdd253nd')
    this.props.getPostDetails('8xf0y6ziyjabvozdd253nd')
    this.props.getCommentDetails('894tuq4ut84ut8v4t8wun89g')
    this.props.getPosts()
    this.props.votePost('8xf0y6ziyjabvozdd253nd', 'upVote')
    this.props.updatePost(this.updatePostData('testId2', 'updated title', 'updated body'))
    this.props.updateComment(this.updateCommentData('testCommentId2', 'updated comment', Date.now()))
    this.props.deleteComment('testCommentId3')
  }

  render() {
    return (
      <div className="App">
        <CategoryList/>
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
    sendComment: asyncSendComment(dispatch),
    updatePost: asyncUpdatePost(dispatch),
    updateComment: asyncUpdateComment(dispatch),
    deletePost: asyncDeletePost(dispatch),
    deleteComment: asyncDeleteComment(dispatch),
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp;
