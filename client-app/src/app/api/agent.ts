import axios, { AxiosResponse } from 'axios';
import { Prindi } from '../models/prindi';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;
const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Prinderit = {
    list: () => requests.get<Prindi[]>('/prindi'),
    details: (id: string) => requests.get<Prindi>(`/prindi/${id}`),
    create: (profesori: Prindi) => axios.post<void>('/prindi', profesori),
    update: (profesori: Prindi)=> axios.put<void>(`/prindi/${profesori.id}`, profesori), 
    delete: (id:string)=> axios.delete<void> (`/prindi/${id}`)
}

const agent = {
    Prinderit
}

export default agent;