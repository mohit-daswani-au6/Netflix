import Axios from 'axios'
const instance = Axios.create({
    baseURL:"http://localhost:5555/"
})
export default instance