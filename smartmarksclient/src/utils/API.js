import { API_URL, ACCESS_TOKEN } from '../constants/constants';
import axios from "axios";


const request = axios.create({
    baseURL: API_URL
});

request.interceptors.request.use(
    (config) => {
        config.headers['Content-Type'] = "application/json";
        let token = localStorage.getItem(ACCESS_TOKEN);

        if (token != "undefined") {
            config.headers['Authorization'] = 'Bearer ' + token;
        } else {
            config.headers["Authorization"] = null;
        }
        config.headers["Access-Control-Allow-Origin"] = "*"; 
        return config;
    }, 
    (error) => {
        return Promise.reject(error);
    }
);


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