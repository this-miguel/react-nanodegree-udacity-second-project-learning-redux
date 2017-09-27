import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  asyncGetCommentDetails,
  asyncDeleteComment,
  asyncVoteForAComment
} from '../actions/AsychActions'
import {
  showModal,
  setupModal
} from '../actions/modalActions';

class CommentItem extends Component {

  componentWillMount(){
    const {getCommentDetails} = this.props;
    getCommentDetails()
  }

  setupAnShowModal = () => {
    console.log(this.props);
    const {showModal, setupModal} = this.props;
    setupModal();
    showModal()
  };

  render() {
    const {downvoteComment, upvoteComment, deleteComment, comment} =  this.props;
    const {setupAnShowModal} = this;

    return (

      <blockquote className='list-group-item'>
        <p>{comment.body}</p>
        <footer>{comment.author} <cite title="Source Title">{new Date(comment.timestamp).toDateString()} Score: {comment.voteScore} </cite></footer>

        <div className="row">
          <div className=" col-xs-offset-8 col-xs-4">
            <div className="btn-group" role="group" aria-label="...">
              <button type="button" className="btn btn-default" onClick={downvoteComment}>
                <span className='glyphicon glyphicon-thumbs-down'></span>
              </button>
              <button type="button" className="btn btn-default" onClick={upvoteComment}>
                <span className='glyphicon glyphicon-thumbs-up'></span>
              </button>
              <button type="button" className="btn btn-default" onClick={setupAnShowModal}>
                <span className='glyphicon glyphicon-pencil'></span>
              </button>
              <button type="button" className="btn btn-default" onClick={deleteComment}>
                <span className='glyphicon glyphicon-remove'></span>
              </button>
            </div>

          </div>
        </div>
      </blockquote>
    )

  }
}

CommentItem.propTypes = {
  getCommentDetails:  PropTypes.func.isRequired,
  upvoteComment:      PropTypes.func.isRequired,
  downvoteComment:    PropTypes.func.isRequired,
  deleteComment:      PropTypes.func.isRequired,
  commentId:          PropTypes.string.isRequired,
};

function mapStateToProps(state, ownProps){
  const  {commentId} = ownProps;
  return {
    comment: state.comments[commentId],
  }
}

function mapDispatchToProps(dispatch, ownProps){
  const  {commentId} = ownProps;
  return {
    upvoteComment: asyncVoteForAComment(dispatch)(commentId, 'upVote'),
    downvoteComment: asyncVoteForAComment(dispatch)(commentId, 'downVote'),
    getCommentDetails: asyncGetCommentDetails(dispatch)(commentId),
    deleteComment: asyncDeleteComment(dispatch)(commentId),
    showModal:  function () {
      dispatch(showModal('comment'))
    },
    setupModal: function () {
      dispatch(setupModal('Comment', commentId))
    }
  }
}

const CommentItemConnected =  connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentItem);

export default CommentItemConnected;