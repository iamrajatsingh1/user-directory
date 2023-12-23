import axios from "axios"

export const fetchUserList = () => {
    return axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
        return response.data || []
    });
}