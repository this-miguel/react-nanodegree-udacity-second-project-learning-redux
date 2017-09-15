import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001/'
axios.defaults.headers.common['Authorization'] = 'OK'

const api = {

  fetchCategories: () => (
    axios.get('categories').then(
      (response) => (response.data)
    ).then((data) => (data))
  ),

  fetchPosts: () => (
    axios.get('posts').then(
      (response) => (response.data)
    ).then((data) => (data))
  ),

  fetchPostsByCategory: (category) => (
    axios.get(`${category}/posts`).then(
      (response) => (response.data)
    ).then((data) => (data))
  ),

  fetchCommentsForAPost: (postId) => (
    axios.get(`posts/${postId}/comments`).then(
      (response) => (response.data)
    ).then((data) => (data))
  ),

  voteForAPost: (postId, option) => (
    axios.post(`posts/${postId}`,
      {
        option
      }
    ).then(
      (response) => (response.data)
    ).then((data) => (data))
  ),

  fetchPostDetails: (postId) => (
    axios.get(`posts/${postId}`).then(
      (response) => (response.data)
    ).then((data) => (data))
  ),

  fetchCommentDetails: (commentId) => (
    axios.get(`comments/${commentId}`).then(
      (response) => (response.data)
    ).then((data) => (data))
  ),

  sendPost: (
    {

      id,
      timestamp,
      title,
      body,
      author,
      category

    }) => (

    axios.post('posts', {

      id,
      timestamp,
      title,
      body,
      author,
      category,

    }).then( (data) => (data))
  ),

  sendComment: (
    {

      id,
      timestamp,
      body,
      author,
      parentId

    }) => (

    axios.post('comments', {

      id,
      timestamp,
      body,
      author,
      parentId,

    }).then( (data) => (data))
  )

}

export default api