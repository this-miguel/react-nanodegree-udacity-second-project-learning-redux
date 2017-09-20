import React, { Component } from 'react';

class Post extends Component {
  render(){
    return (
      <div>
        <div>{this.props.postId}</div>
        <div>{this.props.category}</div>
      </div>
      )
  }
}
export default Post