import React, { Component } from 'react';
import {connect} from 'react-redux'
import {
  asyncVoteForAPost,
  asyncGetPostDetails,
  asyncGetCommentsForAPost,
  asyncDeletePost } from '../actions/AsychActions';
import {showModal, setupModal} from '../actions/modalActions'
import CommentList from './CommentList';

class Post extends Component {
  componentWillMount(){
    const  {getPostDetails, getCommentsFor, postId} = this.props;
    getPostDetails();
    getCommentsFor(postId)
  }

  setupAnShowCommentModal = () => {
    const {showModal, setupModal} = this.props;
    setupModal();
    showModal();
  };

  setupAnShowPostModal = () => {
    const {showPostModal, setupModal} = this.props;
    setupModal();
    showPostModal();
  };

  render(){
    const  {
      post,
      upvotePost,
      downvotePost,
      deletePost } = this.props;

    const {setupAnShowCommentModal, setupAnShowPostModal} = this;

    const headers =  [ 'Comments', 'Score', 'Vote', 'Date' ];
    if(post === undefined) return null;
    if(post.deleted){
      return  <h4>The post you are looking for was deleted</h4>
    }
    return (
      <div>
        <div className="row" style={{padding: 10}}>
          <div className="col-xs-9">
            <h3>{post.title}</h3>
          </div>
          <div className="col-xs-3">
            <button onClick={setupAnShowPostModal} className='btn btn-default btn-block'>
               <span className='glyphicon glyphicon-pencil'></span> Edit Post
            </button>
          </div>
        </div>
        <p>{post.body}</p>
        <p> by {post.author} </p>
        <div className="row" style={{padding: 10}}>
          <div className="col-xs-offset-6 col-xs-3">
            <button onClick={setupAnShowCommentModal} className='btn btn-default btn-block'>
              <span className='glyphicon glyphicon-comment' alt='new comment'></span> New Comment
            </button>
          </div>
          <div className="col-xs-3">
            <button onClick={deletePost} className='btn btn-default btn-block'>
              <span className='glyphicon glyphicon-remove' alt='new comment'></span> Delete Post
            </button>
          </div>
        </div>
        <div className="panel panel-default">
            <table className="table">
            <thead>
            <tr>
            {
              headers.map((header)=> (<th key={header}>{header}</th>))
            }
          </tr>
          </thead>
            <tbody>
            <tr>
              <td>
                {post.comments ? post.comments.length : '...' }
              </td>
              <td>
                {post.voteScore}
              </td>
              <td>
                <button style={{display: 'inline-block'}} onClick={upvotePost}>
                  <span className='glyphicon glyphicon-chevron-up' alt='upvote'></span>
                </button>
                <button onClick={downvotePost}>
                  <span className='glyphicon glyphicon-chevron-down' alt='downvote'></span>
                </button>
              </td>
              <td>
                {new Date(post.timestamp).toDateString()}
              </td>

            </tr>
            </tbody>
          </table>
        </div>
        <CommentList postId={post.id}/>
      </div>
      )
  }
}

function mapStateToProps(state, ownProps){
  const {postId} = ownProps;
  return {
    post: state.posts[postId]
  }
}

function mapDispatchToProps(dispatch, OwnProps){
  const {  postId }      = OwnProps;
  return {
    upvotePost:asyncVoteForAPost(dispatch)(postId, 'upVote'),
    downvotePost:asyncVoteForAPost(dispatch)(postId, 'downVote'),
    getPostDetails: asyncGetPostDetails(dispatch)(postId),
    getCommentsFor:  asyncGetCommentsForAPost(dispatch),
    deletePost:asyncDeletePost(dispatch)(postId),
    showModal:  function () {
      dispatch(showModal('comment'))
    },
    showPostModal:  function () {
      dispatch(showModal('post'))
    },
    setupModal: function () {
      // We sent null for comment because does not apply in this case.
      dispatch(setupModal( null, postId))
    }

  }
}
const PostConnected =  connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);

export default PostConnected