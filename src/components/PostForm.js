import React, { Component }  from 'react'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'
import {clearAndCloseModal} from '../actions/modalActions';

import {connect} from 'react-redux'

import {
  asyncGetPostDetails,
  asyncSendPost,
  asyncUpdatePost
} from '../actions/AsychActions'

class PostFormDisconnected extends Component {

  constructor(props){
    super(props);
    const { post, postId, categoriesIds } = this.props;
    if (post) {
      const {title, body, author, category} = post;
      this.state = {
        body:   body,
        author: author,
        title:  title,
        category: category,
      }
    } else if (postId === null) {
      this.state = {
        body:   '',
        author: '',
        title:  '',
        category: categoriesIds[0]
      }
    }
  }


  handleInputChange = (event) => {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  };

  handleSelectChange = (event) => {
    this.setState({category: event.target.value});
  };

  setupUpdatePostData = () => {
    const {postId} = this.props;
    const {body, title} = this.state;
    return {
      postId,
      title,
      body
    }
  };

  setupNewPostData = () => {
    const timestamp = Date.now();
    const {body, author, title, category} = this.state;
    const id = uuidv4();

    return {
      author,
      body,
      category,
      id,
      timestamp,
      title,
    }
  };

  updatePostData = () => {
    const {updatePost, closeModal} = this.props;
    const {setupUpdatePostData} = this;
    updatePost(setupUpdatePostData());
    closeModal();
  };

  sentNewPostData = () => {
    const {createPost, closeModal} = this.props;
    const {setupNewPostData} = this;
    createPost(setupNewPostData());
    closeModal();
  };

  render() {

    const {handleInputChange, updatePostData, sentNewPostData} = this;
    const { closeModal, postId, categoriesIds } = this.props;
    const { handleSelectChange } = this;
    let content;
    if(postId) {
      content= (
        <div>
            <div className="input-group post-form-title">
              <span
                className="input-group-addon"
                id="basic-addon1">
                title
              </span>
              <input
                type="text"
                className="form-control"
                aria-describedby="basic-addon1"
                name='title'
                value={this.state.title}
                onChange={handleInputChange}
              />
            </div>

          <div className="form-group">



            <textarea className="form-control comment-text-area" rows="5"
                      value={this.state.body}
                      onChange={handleInputChange}
                      style={{padding: 20}}
                      name='body'
            />

            <div className='action-buttons-post-modal'>
              <div className="btn-group btn-group-justified" role="group" aria-label="...">
                <div className="btn-group" role="group">
                  <button type="button" className="btn btn-default" onClick={closeModal}>Cancel</button>
                </div>
                <div className="btn-group" role="group">
                  <button type="button" className="btn btn-default" onClick={updatePostData}>Save</button>
                </div>
              </div>
            </div>

          </div>
        </div>
          )
    } else if(postId === null) {
     content = (
       <div>
         <div className="input-group post-form-title">
              <span
                className="input-group-addon"
                id="basic-addon1">
                title
              </span>
             <input
               type="text"
               className="form-control"
               aria-describedby="basic-addon1"
               name='title'
               value={this.state.title}
               onChange={handleInputChange}
             />
         </div>

         <div className="form-group">

           <textarea className="form-control comment-text-area" rows="5"
                    value={this.state.body}
                    onChange={handleInputChange}
                    style={{padding: 20}}
                    name='body'
           />

           <div className="row post-form-author-category">
             <div className="col-xs-6">
               <div className="input-group ">
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
             </div>
             <div className="col-xs-6">
               <div className="input-group ">
                    <span
                      className="input-group-addon"
                      id="basic-addon1">
                      <span className='glyphicon glyphicon-folder-open'/>
                    </span>
                   <select value={this.state.value} className='form-control' onChange={handleSelectChange} >
                     {
                       categoriesIds.map((categoryId) =>(<option key={categoryId} value={categoryId} > {categoryId} </option>))
                     }
                   </select>
               </div>
             </div>
           </div>

           <div className='action-buttons-post-modal'>
             <div className="btn-group btn-group-justified" role="group" aria-label="...">
               <div className="btn-group" role="group">
                 <button type="button" className="btn btn-default" onClick={closeModal}>Cancel</button>
               </div>
               <div className="btn-group" role="group">
                 <button type="button" className="btn btn-default" onClick={sentNewPostData}>Save</button>
               </div>
             </div>
           </div>
         </div>
       </div>
     )
    }

    return content;

  }
}

PostFormDisconnected.propTypes = {
  postId: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  getPostDetails: PropTypes.func.isRequired,
};

function mapStateToProps (state) {
  const { selectedPost} = state;
  return {
    categoriesIds: state.categoriesIds,
    postId: selectedPost,
    post: state.posts[selectedPost] ? state.posts[selectedPost] : null,
  };
}


function mapDispatchToProps (dispatch, ownProps) {
  const { postId } = ownProps;
  return{
    closeModal: function () {
      dispatch(clearAndCloseModal())
    },
    getPostDetails: asyncGetPostDetails(dispatch)(postId),
    updatePost: asyncUpdatePost(dispatch),
    createPost: asyncSendPost(dispatch),
  }
}

const PostForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostFormDisconnected);

export default PostForm