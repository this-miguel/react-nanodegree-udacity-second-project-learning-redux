import React, { Component }  from 'react'
import Modal from 'react-modal'
import {clearAndCloseModal} from '../actions/modalActions';
import modalStyles from './common/modalStyles'
import PostForm from  './PostForm';
import {connect} from 'react-redux'


class PostDisconnected extends Component {

  render(){

    const {
      isOpen,
      closeModal,
      postId
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
        <PostForm postId={postId} closeModal={closeModal}/>

      </Modal>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    isOpen: state.activeModal === ownProps.modalAction,
    postId: state.selectedComment
  };
}


function mapDispatchToProps (dispatch) {
  return{
    closeModal: function () {
      dispatch(clearAndCloseModal())
    }
  }
}

const PostModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDisconnected);

export default PostModal;