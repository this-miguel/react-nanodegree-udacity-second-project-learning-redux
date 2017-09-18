import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  asyncGetCategories,
  asyncGetPosts,
  asyncGetPostsByCategory,
} from '../actions/AsychActions'
import '../PostList.css'

class PostList extends Component {

  componentWillMount(){
    const {categories, category, getPosts, getPostsByCategory } =  this.props;
    if ( Object.keys(categories).length === 0 ) {
      this.props.getCategories()
    }
    if (category === 'all') {
      getPosts()
    } else {
      getPostsByCategory(category)
    }
  }

  render() {
    const {posts, postsIds, category} =  this.props;
    let postsToRender;

    if(category === 'all'){
      postsToRender = postsIds.map( postId => posts[postId] )
    } else {
      const idsFromCurrentCategory = postsIds.filter( postId => posts[postId].category === category );
      postsToRender = idsFromCurrentCategory.map( postId => posts[postId] );
    }

    postsToRender = postsToRender.filter( post => !post.deleted );

    let title = (category === 'all') ? 'All Posts' : `Posts about ${category}`;
    return (
      <div className='post-list'>
       <h3> {title} </h3>
       <ul>
        {
          postsToRender.map(post => (
            <li key={`${post.id}-${category}`}>
              <div>title: {post.title} </div>
            </li>
          ))
        }
       </ul>

      </div>
    )

  }
}
PostList.defaultProps = {category: 'all'};

PostList.propTypes = {
  getCategories: PropTypes.func.isRequired,
  categoriesIds: PropTypes.array.isRequired,
  categories:    PropTypes.object.isRequired,
  category:      PropTypes.string.isRequired,
  posts:         PropTypes.object.isRequired,
  postsIds:      PropTypes.array.isRequired,
};

function mapStateToProps(state){
  return {
    categories: state.categories,
    categoriesIds: state.categoriesIds,
    posts: state.posts,
    postsIds: state.postsIds,
  }
}

function mapDispatchToProps(dispatch){
  return {
    getCategories: asyncGetCategories(dispatch),
    getPosts: asyncGetPosts(dispatch),
    getPostsByCategory:asyncGetPostsByCategory(dispatch),
  }
}

const PostListConnected =  connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);

export default PostListConnected