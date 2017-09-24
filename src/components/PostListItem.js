import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  asyncGetCommentsForAPost,
} from '../actions/AsychActions'

class PostListItem extends Component {

  componentWillMount(){
    let {getCommentsForAPost, post} = this.props;
    getCommentsForAPost(post.id)
  }


  render() {
    let { post} = this.props;
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
            </tr>
    )

  }
}

PostListItem.propTypes = {
  getCommentsForAPost: PropTypes.func.isRequired,
  post:         PropTypes.object.isRequired,
};



function mapDispatchToProps(dispatch){
  return {
    getCommentsForAPost: asyncGetCommentsForAPost(dispatch),
  }
}

const PostListItemConnected =  connect(
  null,
  mapDispatchToProps
)(PostListItem);

export default PostListItemConnected