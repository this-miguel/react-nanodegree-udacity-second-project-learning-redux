import React, { Component } from 'react';
import {connect} from 'react-redux'
import {asyncVoteForAPost, asyncGetPostDetails, asyncGetCommentsForAPost } from '../actions/AsychActions'
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
    showModal()
  };


  render(){
    const  {post, upvotePost, downvotePost } = this.props;
    const {setupAnShowCommentModal} = this;
    const headers =  [ 'Comments', 'Score', 'Vote', 'Date' ];
    if(post === undefined) return null;
    if(post.deleted){
      return  <h4>The post you are looking for was deleted</h4>
    }
    return (
      <div>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <p> by {post.author} </p>
        <button onClick={setupAnShowCommentModal} className='btn btn-default'>
          New Comment <span className='glyphicon glyphicon-comment' alt='new comment'></span>
        </button>
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
    showModal:  function () {
      dispatch(showModal('comment'))
    },
    setupModal: function () {
      dispatch(setupModal( null, postId)) // when the comment is new, the commentId (first param) is null.
    }

  }
}
const PostConnected =  connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);

export default PostConnected