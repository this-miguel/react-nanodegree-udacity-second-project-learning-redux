import React, { Component }  from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import createHistory from 'history/createBrowserHistory'
import {clearAndCloseModal} from '../actions/modalActions';
import modalStyles from './common/modalStyles'
import CommentForm from  './CommentForm';
import {connect} from 'react-redux'

import {
  asyncGetCategories
} from '../actions/AsychActions'

class CommentModalDisconnected extends Component {

  componentWillMount() {

  }
  render(){

    const {
      isOpen,
      closeModal,
      ...others
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

            <CommentForm />

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


function mapDispatchToProps (dispatch, ownProps) {
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