import axios from "axios";
import { accountService } from "./account.service";
const Axios = axios.create({
    baseURL: "http://localhost:8081",
    withCredentials: true,
})

Axios.interceptors.request.use(request => {
    if (accountService.isLogged()) {
        const token = accountService.getToken();
        console.log('Token from accountService:', token);
        request.headers.Authorization = 'Bearer ' + token;
    }
    return request;
});


export default Axios;

