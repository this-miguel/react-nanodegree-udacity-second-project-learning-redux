import React, { Component } from 'react';
import {connect} from 'react-redux'
import {asyncVoteForAPost } from '../actions/AsychActions'

class Post extends Component {
  render(){
    const  {posts, postId, upvotePost, downvotePost } = this.props;
    const  post = posts[postId];
    const headers =  [ 'Comments', 'Score', 'Vote', 'Date' ];
    return (
      <div>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <p> by {post.author} </p>

        <div className="panel panel-default">
          <div className="panel-heading">Post Info</div>
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
      </div>
      )
  }
}

function mapStateToProps(state){
  return {
    posts: state.posts,
  }
}

function mapDispatchToProps(dispatch, OwnProps){
  const {  postId }      = OwnProps;
  return {
    upvotePost:asyncVoteForAPost(dispatch)(postId, 'upVote'),
    downvotePost:asyncVoteForAPost(dispatch)(postId, 'downVote'),
  }
}
const PostConnected =  connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);

export default PostConnected