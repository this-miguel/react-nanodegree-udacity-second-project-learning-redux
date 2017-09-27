import React, { Component }  from 'react'
import PropTypes from 'prop-types'
import {clearAndCloseModal} from '../actions/modalActions';

import {connect} from 'react-redux'

import {
  asyncSendComment,
  asyncUpdateComment
} from '../actions/AsychActions'

class CommentFormDisconnected extends Component {

  componentWillMount() {
    const {commentId} = this.props;
  }
  render(){

    const {
      commentId
    } = this.props;
    let content;
    if (commentId) {
      return <div> {commentId}</div>;
    } else{
      return <div> nuevo </div>;
    }
  }
}

function mapStateToProps (state) {
  return {
    commentId: state.selectedComment
  };
}


function mapDispatchToProps (dispatch, ownProps) {
  return{
    closeModal: function () {
      dispatch(clearAndCloseModal())
    }
  }
}

const CommentForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentFormDisconnected);

export default CommentForm