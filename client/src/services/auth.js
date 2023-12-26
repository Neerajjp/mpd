import axios from "axios";
import { toast } from "react-toastify";
import { apiBaseUrl, authBaseUrl } from "../config";
import { apiGet } from "../utils/axios";

export const getAuthToken = () => {
    const tokens = localStorage.getItem('token');
    if (tokens) {
        const parsedTokens = JSON.parse(tokens) || {};
        return parsedTokens.access;
    }
    return null;
};


export const getUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        const user = JSON.parse(userStr) || {};
        return user;
    }
    return null;
};

export const login = async (email, password) => {
    try{
        const res = await axios.post(`${authBaseUrl}/token/`, {username: email, password});
        if (res.status < 299) {
            localStorage.setItem('token',JSON.stringify( res.data));
           const user = await apiGet(`${apiBaseUrl}/users/get-me/`)
        localStorage.setItem('user', JSON.stringify(user?.data));
            window.location.href = '/projects'
        } else {

            return null;
        }
    }
    catch(err){
        // navigate('/projects')

        return null
        if(err?.response?.status === 401 ) return toast.error('Invalid email and password')
         return toast.error('Something went wrong')
    }
 
}; 

export const register = async (name, email, password, nevigate) => {
    try{
        if (!email || !name || !password) {
            window.alert("All Fields are required");
        }
        const res = await axios.post(`${apiBaseUrl}/users/`, {username: email, email, password, first_name: name});
        if (res.status < 299) {
            nevigate('/login');
        } else {
            console.log(res);
            return null;
        }
    }
    catch(err){
        return null
    }
 
}; 

