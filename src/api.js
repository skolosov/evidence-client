import axios from "axios";

const config = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    responseType: 'json',
};

const HOST = 'http://127.0.0.1:8000/api/';


export const apiGet = async (url, data) => {
    return await axios.get(`${HOST}${url}`, {...config, data});
};

export const apiPost = async (url, data) => {
    return await axios.post(`${HOST}${url}`, data, config);
};

export const apiPatch = async (url, data) => {
    return await axios.patch(`${HOST}${url}`, data, config);
};

export const apiDelete = async (url, data) => {
    return  await axios.delete(`${HOST}${url}`, {...config, data});
};