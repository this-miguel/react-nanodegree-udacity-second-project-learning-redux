import React, { Component } from 'react';
import PostListItem from './PostListItem';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
  asyncGetCategories,
  asyncGetPosts,
  asyncGetPostsByCategory,
} from '../actions/AsychActions'

class PostList extends Component {

  constructor(props){
    super(props);
    this.state = {
      sortBy: 'voteScore'
    }
  }

  componentWillMount(){
    const {categories, category, getPosts, getPostsByCategory} =  this.props;
    if ( Object.keys(categories).length === 0 ) {
      this.props.getCategories()
    }
    if (category === 'all') {
      getPosts()
    } else {
      getPostsByCategory(category)
    }
  }

  sortByDate = () => {
    this.setState({sortBy:'timestamp'})
  };

  sortByVotes = () => {
    this.setState({sortBy:'voteScore'})
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
    const headers =  ['Title', 'Author', 'Comments', 'Score', 'Vote', 'Date' ];
    return (
      <div className='post-list'>
       <h3> {title} </h3>
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
                       <span
                         className='glyphicon glyphicon-arrow-up'
                       >
                       </span>
                     </th>
                   );
                 if(header === 'Date') return (
                   <th
                     key={header}
                     style={this.showAsActive(this.isOrderedByThisCriteria(sortBy, 'timestamp'))}
                     onClick={this.sortByDate}
                   >
                     {header}
                     <span
                       className='glyphicon glyphicon-arrow-up'
                     >
                       </span>
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
  }
}

const PostListConnected =  connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);

export default PostListConnected