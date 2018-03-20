import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-constructor.firebaseio.com/'
});

export default instance;