import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001/'
axios.defaults.headers.common['Authorization'] = 'OK'

const api = {
  fetchCategories: () => (
    axios.get('categories').then(
      (response) => (response.data)
    ).then((data) => (data))
  )

}

export default api