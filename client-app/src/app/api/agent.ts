import axios, { AxiosResponse } from 'axios';
import { Profesori } from '../models/profesori';

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

const Profesoret = {
    list: () => requests.get<Profesori[]>('/profesori'),
    details: (id: string) => requests.get<Profesori>(`/profesori/${id}`),
    create: (profesori: Profesori) => axios.post<void>('/profesori', profesori),
    update: (profesori: Profesori)=> axios.put<void>(`/profesori/${profesori.id}`, profesori), 
    delete: (id:string)=> axios.delete<void> (`/profesori/${id}`)
}

const agent = {
    Profesoret
}

export default agent;