import axios, { AxiosError, AxiosResponse } from "axios";
import { Termin } from "../models/termini";
import { Lenda } from "../models/lenda";
import { Postimi } from "../models/postimi";
import { Prindi } from "../models/prindi";
import { Nxenesi } from "../models/nxenesi";
import { CustomNxenesi } from "../models/customNxenesi";
import { Admin, AdminFormValues } from "../models/user";
import { toast } from "react-toastify";
import { store } from "../stores/store";
import { Professor, ProfFormValues } from "../models/professor";
import { Parent, ParentFormValues } from "../models/parent";
import { Laburatori } from "../models/laburatori";
import { Kontakti } from "../models/kontakti";
import { Nxenesiuser, NxenesiuserFormValues } from "../models/nxenesiuser";
import { Vleresimi } from "../models/Vleresimi";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep(0);
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
      case 400:
        toast.error("bad request");
        break;
      case 401:
        toast.error("unauthorized");
        break;
      case 404:
        toast.error("not found");
        break;
      case 500:
        toast.error("server error");
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;
const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Profesoret = {
  list: () => requests.get<Professor[]>("/profesori"),
  details: (id: string) => requests.get<Professor>(`/profesori/${id}`),
  // create: (profesori: Profesori) => axios.post<void>("/profesori", profesori),
  update: (profesori: Professor) =>
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
  list: () => requests.get<Prindi[]>("/prinderit"),
  details: (id: string) => requests.get<Prindi>(`/prinderit/${id}`),
  create: (profesori: Prindi) => axios.post<void>('/prinderit', profesori),
  update: (profesori: Prindi) => axios.put<void>(`/prinderit/${profesori.id}`, profesori),
  delete: (id: string) => axios.delete<void>(`/prinderit/${id}`)
}
const Nxenesit = {
  list: () => requests.get<Nxenesi[]>("/nxenesi"),
  details: (id: string) => requests.get<Nxenesi>(`/nxenesi/${id}`),
  create: (nxenesi: Nxenesi) => axios.post<void>(`/nxenesi`, nxenesi),
  update: (nxenesi: Nxenesi) => { console.log("nxenesi inside:", nxenesi); return axios.put<void>(`/nxenesi/${nxenesi.id}`, nxenesi) },
  delete: (id: string) => axios.delete<void>(`/nxenesi/${id}`),
};
const Account = {
  current: () => requests.get<Admin>("/account"),
  login: (user: AdminFormValues) =>
    requests.post<Admin>("/account/login", user),
};

const AccountProf = {
  currentProf: () => requests.get<Professor>("/account/currentProf"),

  login: (prof: ProfFormValues) =>
    requests.post<Professor>("/account/loginProf", prof),
  register: (prof: ProfFormValues) =>
    requests.post<Professor>("/account/registerProf", prof),
};
const AccountPrindi = {
  current: () => requests.get<Parent>("/PrindAccount"),
  login: (prindi: ParentFormValues) =>
    requests.post<Parent>("/PrindAccount/loginPrindi", prindi),
  register: (prindi: ParentFormValues) =>
    requests.post<Parent>("/PrindAccount/registerPrind", prindi),
};

const Laburatoret = {
  list: () => requests.get<Laburatori[]>("/laburatori"),
  details: (id: string) => requests.get<Laburatori>(`/laburatori/${id}`),
  create: (laburatori: Laburatori, EmriLendes: string) => axios.post<void>(`/laburatori/${EmriLendes}`, laburatori),
  update: (laburatori: Laburatori) =>
    axios.put<void>(`/laburatori/${laburatori.id}`, laburatori),
  delete: (id: string) => axios.delete<void>(`/laburatori/${id}`),
};
const Kontaktet = {
  listPrindi: (id: string | undefined) => requests.get<Kontakti[]>(`/kontakti/${id}`),
  listProf: (email: string | undefined) => requests.get<Kontakti[]>(`/kontakti/prof/${email}`),
  create: (kontakti: Kontakti) => axios.post<void>(`/kontakti/`, kontakti),
  delete: (id: string) => axios.delete<void>(`/kontakti/${id}`)
};
const AccountNxenesi = {
  currentNxenesi: () => requests.get<Nxenesiuser>('/NxenesiAccount/currentNxenesi'),
  login: (nxenesi: NxenesiuserFormValues) =>
    requests.post<Nxenesiuser>('/NxenesiAccount/loginNxenesi', nxenesi),
  register: (nxenesi: NxenesiuserFormValues) =>
    requests.post<Nxenesiuser>('/NxenesiAccount/registerNxenesi', nxenesi)
};


const Vleresimet = {
  list: () => requests.get<Vleresimi[]>('/Vleresimet'),
  details: (id: string) => requests.get<Vleresimi>(`/Vleresimet/${id}`),
  create: (vlersimi: Vleresimi, profID: string, nxensiId: string) => axios.post<void>(`/Vleresimet/${profID}&${nxensiId}`, vlersimi),
  update: (vlersimi: Vleresimi, profID: string, nxensiId: string) => axios.put<void>(`/Vleresimet/${vlersimi.vleresimiId}/${profID}&${nxensiId}`, vlersimi),
  delete: (id: string) => axios.delete<void>(`/Vleresimet/${id}`)
}

const agent = {
  Profesoret,
  Terminet,
  Postimet,
  Lendet,
  Prinderit,
  Nxenesit,
  Account,
  AccountProf,
  AccountPrindi,
  Laburatoret,
  Kontaktet,
  AccountNxenesi,
  Vleresimet
};

export default agent;
