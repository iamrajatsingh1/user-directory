import axios from "axios"

export const fetchUserDetails = (id) => {
    return axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => {
            return response.data || []
        }).catch(e => e);
}