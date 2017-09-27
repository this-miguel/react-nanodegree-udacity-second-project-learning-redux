import React, { Component }  from 'react'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'
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
      body: comment ? body : '',
      author: ''
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
      [target.name]: target.value
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

  setupNewCommentData = () => {
    const timestamp = Date.now();
    const {body, author} = this.state;
    const {postId} = this.props;
    const id = uuidv4();
    const parentId = postId;

    return {
      id,
      timestamp,
      body,
      author,
      parentId
    }
  };

  updateCommentData = () => {
    const {updateComment, closeModal} = this.props;
    const {setupUpdateCommentData} = this;
    updateComment(setupUpdateCommentData());
    closeModal();
  };

  sentNewCommentData = () => {
    const {createComment, closeModal} = this.props;
    const {setupNewCommentData} = this;
    createComment(setupNewCommentData());
    closeModal();
  };

  render() {

    const {handleInputChange, updateCommentData, sentNewCommentData} = this;
    const { closeModal, commentId } = this.props;
    let content;
    if(commentId) {
      content= (
        <div className="form-group">
        <textarea className="form-control comment-text-area" rows="5"
                  value={this.state.body}
                  onChange={handleInputChange}
                  style={{padding: 20}}
                  name='body'
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
    } else if(commentId === null){
      content = (
        <div className="form-group">
          <textarea className="form-control comment-text-area" rows="5"
                    value={this.state.body}
                    onChange={handleInputChange}

                    name='body'
          ></textarea>

          <div className="input-group comment-text-area">
            <span
              className="input-group-addon"
              id="basic-addon1">
              <span className='glyphicon glyphicon-user'/>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Your name"
              aria-describedby="basic-addon1"
              name='author'
              value={this.state.author}
              onChange={handleInputChange}
            />
          </div>
          <div className='comment-text-area'>
            <div className="btn-group btn-group-justified" role="group" aria-label="...">
              <div className="btn-group" role="group">
                <button type="button" className="btn btn-default" onClick={closeModal}>Cancel</button>
              </div>
              <div className="btn-group" role="group">
                <button type="button" className="btn btn-default" onClick={sentNewCommentData}>Save</button>
              </div>
            </div>
          </div>
        </div>
        )
    }

    return content;

  }
}

CommentFormDisconnected.propTypes = {
  commentId: PropTypes.string,
  postId: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
  getCommentDetails: PropTypes.func.isRequired,
};

function mapStateToProps (state) {
  const {selectedComment, selectedPost} = state;
  return {
    commentId: selectedComment,
    postId: selectedPost,
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