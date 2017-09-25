import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  asyncGetCommentsForAPost,
  asyncVoteForAPost,
  asyncDeletePost
} from '../actions/AsychActions'

class PostListItem extends Component {

  componentWillMount(){
    let {getCommentsForAPost, post} = this.props;
    getCommentsForAPost(post.id);
  }

  getComments = () => {
    let {getCommentsForAPost, post} = this.props;
    if(post.comments === undefined) {
      getCommentsForAPost(post.id)
    }
    return '...'
  };

  render() {
    let { post, upvotePost, downvotePost, deletePost} = this.props;
    return (
            <tr key={`${post.id}-post-item`}>
              <td>
                <Link to={`${post.category}/${post.id}`}> {post.title} </Link>
              </td>
              <td>
                {post.author}
              </td>
              <td>
                {post.comments ? post.comments.length : this.getComments()}
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
              <td>
                <button onClick={deletePost}>
                  <span className='glyphicon glyphicon-remove' alt='downvote'></span>
                </button>
              </td>
            </tr>
    )

  }
}

PostListItem.propTypes = {
  getCommentsForAPost: PropTypes.func.isRequired,
  upvotePost: PropTypes.func.isRequired,
  downvotePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post:         PropTypes.object.isRequired,
};



function mapDispatchToProps(dispatch, OwnProps){
  const {  post }      = OwnProps;
  const { id: postId } = post;
  return {
    getCommentsForAPost: asyncGetCommentsForAPost(dispatch),
    upvotePost:asyncVoteForAPost(dispatch)(postId, 'upVote'),
    downvotePost:asyncVoteForAPost(dispatch)(postId, 'downVote'),
    deletePost:asyncDeletePost(dispatch)(postId),
  }
}

const PostListItemConnected =  connect(
  null,
  mapDispatchToProps
)(PostListItem);

export default PostListItemConnected