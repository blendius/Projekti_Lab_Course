import axios, { AxiosResponse } from 'axios';
import { Lenda } from '../models/lenda';
import { Postimi } from '../models/postimi';

const sleep = (deley: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, deley)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.response.use(async response => {
    try {
        await sleep(200);
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
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Postimet = {
    list: () => requests.get<Postimi[]>('/Postimet'),
    details: (id: string) => requests.get<Postimi>(`/postimet/${id}`),
    create: (postimi: Postimi) => axios.post<void>(`/postimet/`, postimi),
    update: (postimi: Postimi) => axios.put<void>(`/postimet/${postimi.id}`,postimi),
    delete: (id: string) => axios.delete<void>(`/postimet/${id}`)
}
const Lendet = {
    list: () => requests.get<Lenda[]>('/lendet'),
    details: (id: string) => requests.get<Lenda>(`/lendet/${id}`),
    create: (lenda: Lenda) => axios.post<void>(`/lendet/`, lenda),
    update: (lenda: Lenda) => axios.put<void>(`/lendet/${lenda.lendaId}`,lenda),
    delete: (id: string) => axios.delete<void>(`/lendet/${id}`)

}

const agent = {
    Postimet,
    Lendet
}

export default agent;