import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {
  asyncGetCategories
} from '../actions/AsychActions'
import PropTypes from 'prop-types';

class CategoryList extends Component {

  componentWillMount(){
    this.props.getCategories()
  }
  render(){
    const {categoriesIds, categories} =  this.props;
    return (
      <div>
        <h3> Categories </h3>
        <ul>
          {
            categoriesIds.map((category)=> (
            <li key={`${categories[category].name}-li`}>
              <Link to={`/${categories[category].path}`} key={`${categories[category]}-link`}> {categories[category].name} </Link>
            </li>
            ))
          }
        </ul>
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