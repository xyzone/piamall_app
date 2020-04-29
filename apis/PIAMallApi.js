import axios from 'axios';

const PIAMallApi = axios.create({
    //baseURL: 'http://192.168.46.129:7150/en/',
    baseURL: 'http://172.17.0.1:7150/en/'
})


export default PIAMallApi