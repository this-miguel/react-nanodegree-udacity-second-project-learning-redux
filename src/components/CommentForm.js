import React, { Component }  from 'react'
import PropTypes from 'prop-types'
import {clearAndCloseModal} from '../actions/modalActions';

import {connect} from 'react-redux'

import {
  asyncGetCommentDetails,
  asyncSendComment,
  asyncUpdateComment
} from '../actions/AsychActions'

class CommentFormDisconnected extends Component {

  constructor(props){
    super(props);
    const { comment } = this.props;
    let body;
    if(comment) body = comment.body;
    this.state = {
      body: comment ? body : ''
    }
  }

  componentWillMount() {
    const { commentId, getCommentDetails } = this.props;
    if(commentId){
      getCommentDetails();
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    this.setState({
      body: target.value
    });
  };

  setupUpdateCommentData = () => {
    const {commentId} = this.props;
    const {body} = this.state;
    const timestamp = Date.now();
    return {
      commentId,
      timestamp,
      body
    }
  };

  updateCommentData = () => {
    const {updateComment, closeModal} = this.props;
    const {setupUpdateCommentData} = this;
    updateComment(setupUpdateCommentData());
    closeModal();
  };

  render() {

    const {handleInputChange, updateCommentData} = this;
    const {closeModal} = this.props;
    return (
      <div className="form-group">
        <textarea className="form-control comment-text-area" rows="5"
                  value={this.state.body}
                  onChange={handleInputChange}
                  style={{padding: 20}}
        ></textarea>
        <div className='comment-text-area'>
          <div className="btn-group btn-group-justified" role="group" aria-label="...">
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-default" onClick={closeModal}>Cancel</button>
            </div>
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-default" onClick={updateCommentData}>Save</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const {selectedComment} = state;
  return {
    commentId: selectedComment,
    comment: state.comments[selectedComment] ? state.comments[selectedComment] : null,
  };
}


function mapDispatchToProps (dispatch, ownProps) {
  const { commentId } = ownProps;
  return{
    closeModal: function () {
      dispatch(clearAndCloseModal())
    },
    getCommentDetails: asyncGetCommentDetails(dispatch)(commentId),
    updateComment: asyncUpdateComment(dispatch),
    createComment: asyncSendComment(dispatch),
  }
}

const CommentForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentFormDisconnected);

export default CommentForm