import React, { Component } from 'react';
import PostListItem from './PostListItem';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  asyncGetCategories,
  asyncGetPosts,
  asyncGetPostsByCategory,
} from '../actions/AsychActions'

import {
  showModal,
  setupModal,
} from '../actions/modalActions'

class PostList extends Component {

  constructor(props){
    super(props);
    this.state = {
      sortBy: 'voteScore'
    }
  }

  componentWillMount(){
    const { categories, category, getPosts, getPostsByCategory } =  this.props;
    if ( Object.keys(categories).length === 0 ) this.props.getCategories();
    category === 'all' ? getPosts() : getPostsByCategory(category);
  }

  sortByDate = () => {
    this.setState({sortBy:'timestamp'})
  };

  sortByVotes = () => {
    this.setState({sortBy:'voteScore'})
  };

  setupAnShowPostModal = () => {
    const {showPostModal, setupModal} = this.props;
    setupModal();
    showPostModal();
  };

  comparePosts = (property) => {
      return  function(post, otherPost){
        if (post[property] > otherPost[property]) {
          return -1;
        }
        if (post[property] < otherPost[property]) {
          return 1;
        }
        return 0;
      }
  };

  isOrderedByThisCriteria = (sortByArg, compareWith ) => sortByArg === compareWith;

  showAsActive = (active) => ( active ? { color: 'blue' } : { color: 'grey'} );

  render() {
    const {posts, postsIds, category} =  this.props;
    const { sortBy } = this.state;
    const {setupAnShowPostModal} = this;

    let postsToRender, filteredPosts;

    if(category === 'all'){
      filteredPosts = postsIds.map( postId => posts[postId] )
    } else {
      const idsFromCurrentCategory = postsIds.filter( postId => posts[postId].category === category );
      filteredPosts = idsFromCurrentCategory.map( postId => posts[postId] );
    }

    postsToRender = filteredPosts.filter( post => !post.deleted );
    postsToRender.sort(this.comparePosts(sortBy));

    let title = (category === 'all') ? 'All Posts' : `Posts about ${category}`;
    const headers =  ['Title', 'Author', 'Comments', 'Score', 'Vote', 'Date', 'Edit',  'Delete' ];
    return (
      <div className='post-list'>

        <div className="row" style={{padding: 10}}>
          <div className="col-xs-9">
            <h3> {title} </h3>
          </div>
          <div className="col-xs-3">
            <button onClick={setupAnShowPostModal} className='btn btn-default btn-block'>
              <span className='glyphicon glyphicon-plus'></span> New Post
            </button>
          </div>
        </div>

       <table className="table">
         <thead>
           <tr>
             {
               headers.map((header)=> {
                 if(header)
                   if(header === 'Score') return (
                     <th
                       key={header}
                       style={this.showAsActive(this.isOrderedByThisCriteria(sortBy, 'voteScore'))}
                       onClick={this.sortByVotes}
                     >
                       {header}
                       <span className='glyphicon glyphicon-arrow-up' style={{display:'inline'}}/>

                     </th>
                   );
                 if(header === 'Date') return (
                   <th
                     key={header}
                     style={this.showAsActive(this.isOrderedByThisCriteria(sortBy, 'timestamp'))}
                     onClick={this.sortByDate}
                   >
                     {header}
                     <span className='glyphicon glyphicon-arrow-up' style={{display:'inline'}}/>
                   </th>
                 );
                 return <th key={header}>{header}</th>
               })
             }
           </tr>
         </thead>
         <tbody>
         {
          postsToRender.map(post => (
            <PostListItem key={`${post.id}-${post.category}${category}_view`} post={post}/>
          ))
        }
        </tbody>
       </table>

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
    showPostModal:  function () {
      dispatch(showModal('post'))
    },
    setupModal: function () {
      // We sent null for comment because does not apply in this case, and null for post because the post is new.
      dispatch(setupModal( null, null))
    }
  }
}

const PostListConnected =  connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);

export default PostListConnected