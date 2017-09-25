import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  asyncGetCommentsForAPost,
  asyncVoteForAPost,
} from '../actions/AsychActions'

class PostListItem extends Component {

  componentWillMount(){
    let {getCommentsForAPost, post} = this.props;
    getCommentsForAPost(post.id)
  }

  render() {
    let { post, upvotePost, downvotePost} = this.props;
    return (
            <tr key={`${post.id}-post-item`}>
              <td>
                <Link to={`${post.category}/${post.id}`}> {post.title} </Link>
              </td>
              <td>
                {post.author}
              </td>
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
    )

  }
}

PostListItem.propTypes = {
  getCommentsForAPost: PropTypes.func.isRequired,
  post:         PropTypes.object.isRequired,
};



function mapDispatchToProps(dispatch, OwnProps){
  const {  post }      = OwnProps;
  const { id: postId } = post;
  return {
    getCommentsForAPost: asyncGetCommentsForAPost(dispatch),
    upvotePost:asyncVoteForAPost(dispatch)(postId, 'upVote'),
    downvotePost:asyncVoteForAPost(dispatch)(postId, 'downVote'),
  }
}

const PostListItemConnected =  connect(
  null,
  mapDispatchToProps
)(PostListItem);

export default PostListItemConnected