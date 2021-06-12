import axios, { AxiosResponse } from "axios";
import { Profesori } from "../models/profesori";
import { Termin } from "../models/termini";
import { Lenda } from "../models/lenda";
import { Postimi } from "../models/postimi";
import { Prindi } from '../models/prindi';
import { Nxenesi } from "../models/nxenesi";
import { CustomNxenesi } from "../models/customNxenesi";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(0);
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
const Postimet = {
  list: () => requests.get<Postimi[]>("/Postimet"),
  details: (id: string) => requests.get<Postimi>(`/postimet/${id}`),
  create: (postimi: Postimi) => axios.post<void>(`/postimet/`, postimi),
  update: (postimi: Postimi) =>
    axios.put<void>(`/postimet/${postimi.id}`, postimi),
  delete: (id: string) => axios.delete<void>(`/postimet/${id}`),
};
const Lendet = {
  list: () => requests.get<Lenda[]>("/lendet"),
  details: (id: string) => requests.get<Lenda>(`/lendet/${id}`),
  create: (lenda: Lenda) => axios.post<void>(`/lendet/`, lenda),
  update: (lenda: Lenda) => axios.put<void>(`/lendet/${lenda.lendaId}`, lenda),
  delete: (id: string) => axios.delete<void>(`/lendet/${id}`),
};
const Prinderit = {
  list: () => requests.get<Prindi[]>('/prindi'),
  details: (id: string) => requests.get<Prindi>(`/prindi/${id}`),
  create: (profesori: Prindi) => axios.post<void>('/prindi', profesori),
  update: (profesori: Prindi)=> axios.put<void>(`/prindi/${profesori.id}`, profesori), 
  delete: (id:string)=> axios.delete<void> (`/prindi/${id}`)
}
const Nxenesit = {
  list: () => requests.get<Nxenesi[]>('/nxenesi'),
  details: (id: string) => requests.get<Nxenesi>(`/nxenesi/${id}`),
  create: (nxenesi: Nxenesi) => axios.post<void>(`/nxenesi`, nxenesi),
  update: (nxenesi: CustomNxenesi) => axios.put<void>(`/nxenesi/${nxenesi.id}`, nxenesi),
  delete: (id: string) => axios.delete<void>(`/nxenesi/${id}`)
}

const agent = {
  Profesoret,
  Terminet,
  Postimet,
  Lendet,
  Prinderit,
  Nxenesit
};

export default agent;
