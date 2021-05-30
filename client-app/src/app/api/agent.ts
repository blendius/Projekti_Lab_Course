import axios, { AxiosResponse } from "axios";
import { Profesori } from "../models/profesori";
import { Termin } from "../models/termini";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;
const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Profesoret = {
  list: () => requests.get<Profesori[]>("/profesori"),
  details: (id: string) => requests.get<Profesori>(`/profesori/${id}`),
  create: (profesori: Profesori) => axios.post<void>("/profesori", profesori),
  update: (profesori: Profesori) =>
    axios.put<void>(`/profesori/${profesori.id}`, profesori),
  delete: (id: string) => axios.delete<void>(`/profesori/${id}`),
};
const Terminet = {
  list: () => requests.get<Termin[]>("/terminet"),
  details: (id: string) => requests.get<Termin>(`/terminet/${id}`),
  create: (termini: Termin) => requests.post<void>("/terminet", termini),
  update: (termini: Termin) =>
    requests.put<void>(`/terminet/${termini.id}`, termini),
  delete: (id: string) => axios.delete<void>(`/terminet/${id}`),
};

const agent = {
  Profesoret,
  Terminet,
};

export default agent;
