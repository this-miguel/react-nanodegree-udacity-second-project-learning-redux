import React, { Component } from 'react';
import CommentListItem from './CommentItem';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  asyncGetCommentsForAPost
} from '../actions/AsychActions'

class CommentList extends Component {

  componentWillMount(){
    const {postId, getCommentsForPost} =  this.props;
    getCommentsForPost(postId)
  }


  render() {
    const {commentsIds} =  this.props;

    return (
      <ul className='list-group'>
        {
          commentsIds.map((commentId) =>(
            <CommentListItem
              commentId={commentId}
              key={commentId}
            />
          ))
        }
      </ul>
    )

  }
}

CommentList.propTypes = {
  getCommentsForPost:  PropTypes.func.isRequired,
  commentsIds:      PropTypes.array.isRequired,
};

function mapStateToProps(state, ownProps){
  const  {postId} = ownProps;
  return {
    commentsIds: state.posts[postId].comments
      ? state.posts[postId].comments.filter( commentId => !state.comments[commentId].deleted )
      : []
  }
}

function mapDispatchToProps(dispatch, ownProps){
  const  {postId} = ownProps;
  return {
    getCommentsForPost: asyncGetCommentsForAPost(dispatch)(postId),
  }
}

const CommentListConnected =  connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentList);

export default CommentListConnected