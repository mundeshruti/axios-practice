import axios from 'axios'

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
})

export const GetData = () => {
  return api.get("posts/1")
}
