import { API_URL, ACCESS_TOKEN } from '../constants/constants';
import axios from "axios";


const request = axios.create({
    baseURL: API_URL
});

request.interceptors.request.use(
    (config) => {
        config.headers['Content-Type'] = "application/json";
        let token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + localStorage.getItem(ACCESS_TOKEN);
        }
        console.log(config);
        return config;
    }, 
    (error) => {
        return Promise.reject(error);
    }
);


/*
const apirequest = (parameters) => {
    axios.defaults.headers.common["Content-Type"] = "application/json";

    if (localStorage.getItem(ACCESS_TOKEN)) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem(ACCESS_TOKEN);
    }    

    return axios(parameters)
    .then((response) => {
        if (response.status < 200 && response.status > 299) {
            return Promise.reject(response);
        }    
        return response;
    });
}; */

export function login(loginRequest) {
    axios.post(API_URL + "/auth/login", loginRequest);
}

export function signup(signupRequest) {
    return request({
        url: "/auth/register",
        method: 'POST',
        data: signupRequest
    });
}

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        console.log("get wrecked");
        return Promise.reject("No access token set.");
    };
    return request({
        url: "/user/me",
        method: "GET"
    });
}   

export const ajax = request;