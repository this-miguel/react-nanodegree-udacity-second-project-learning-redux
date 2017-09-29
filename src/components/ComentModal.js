import React, { Component }  from 'react'
import Modal from 'react-modal'
import {clearAndCloseModal} from '../actions/modalActions';
import modalStyles from './common/modalStyles'
import CommentForm from  './CommentForm';
import {connect} from 'react-redux'


class CommentModalDisconnected extends Component {

  render(){

    const {
      isOpen,
      closeModal,
      commentId
    } = this.props;
    return(
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className='react-modal'
        contentLabel='Modal'
        closeTimeoutMS={275}
        style={modalStyles}


      >
            <span className='glyphicon glyphicon-remove close-modal-x' onClick={closeModal}></span>
            <CommentForm commentId={commentId} closeModal={closeModal}/>

      </Modal>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    isOpen: state.activeModal === ownProps.modalAction,
    commentId: state.selectedComment
  };
}


function mapDispatchToProps (dispatch) {
  return{
    closeModal: function () {
      dispatch(clearAndCloseModal())
    }
  }
}

const CommentModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentModalDisconnected);

export default CommentModal