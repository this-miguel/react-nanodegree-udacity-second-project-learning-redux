import React, { Component } from 'react';
import {connect} from 'react-redux'
import {asyncGetCategories} from '../actions/AsychActions'

class App extends Component {
  componentWillMount = () => {
    this.props.getCategories()
  }
  render() {
    return (
      <div className="App">
        hello world
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch){
  return {
    getCategories: asyncGetCategories(dispatch)
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp;
