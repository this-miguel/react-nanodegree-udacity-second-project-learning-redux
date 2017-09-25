import React, { Component } from 'react';
import {connect} from 'react-redux'

class Post extends Component {
  render(){
    const  {posts, postId } = this.props;
    const  post = posts[postId];
    return (
      <div>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <p> by {post.author}</p>
      </div>
      )
  }
}

function mapStateToProps(state){
  return {
    posts: state.posts,
  }
}

const PostConnected =  connect(
  mapStateToProps
)(Post);

export default PostConnected