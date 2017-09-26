import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {
  asyncGetCategories
} from '../actions/AsychActions'
import PropTypes from 'prop-types';

class CategoryList extends Component {

  componentWillMount(){
    const { categories } =  this.props;
    if ( Object.keys(categories).length === 0 ) {
      this.props.getCategories()
    }
  }
  render(){
    const {categoriesIds, categories} =  this.props;
    return (
      <div className='category-list'>
        <h3> Categories </h3>
        <div className='list-group'>
          {
            categoriesIds.map( category => (
              <Link className='list-group-item' to={`/${categories[category].path}`} key={`${category}-link`}> {categories[category].name} </Link>
            ))
          }
          <Link className='list-group-item' to='/' key='root-link'> all posts </Link>
        </div>

      </div>
    )
  }
}

CategoryList.propTypes = {
  getCategories: PropTypes.func.isRequired,
  categoriesIds: PropTypes.array.isRequired,
  categories:    PropTypes.object.isRequired,
};

function mapStateToProps(state){
  return{
    categories: state.categories,
    categoriesIds: state.categoriesIds
  }
}

function mapDispatchToProps(dispatch){
  return{
    getCategories: asyncGetCategories(dispatch),
  }
}
const CategoryListConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList);

export default CategoryListConnected