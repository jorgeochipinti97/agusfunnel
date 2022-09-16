
import axios from 'axios';



const agusApi = axios.create({
    baseURL: '/api'
});


export default agusApi;


