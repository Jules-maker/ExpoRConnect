import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const API_URL = "https://rconnect-api.azurewebsites.net/api/";

const defaultOptions: AxiosRequestConfig = { timeout: 20000 };

export const api = {
  get: async (url: string, options: AxiosRequestConfig = defaultOptions) => {
    try {
      console.log(API_URL + url);
      const response: AxiosResponse = await axios.get(API_URL + url, options);
      return response;
    } catch (e) {
      console.error(`Erreur lors de l'appel (route : ${url}) : `, e);
      throw e;
    }
  },
  delete: async (url: string, options: AxiosRequestConfig = defaultOptions) => {
    try {
      const response: AxiosResponse = await axios.delete(
        API_URL + url,
        options,
      );
      return response;
    } catch (e) {
      console.error(`Erreur lors de l'appel (route : ${url}) : `, e);
      throw e;
    }
  },
  post: async (
    url: string,
    data: { [key: string]: any },
    options: AxiosRequestConfig = defaultOptions,
  ) => {
    try {
      const response: AxiosResponse = await axios.post(
        API_URL + url,
        data,
        options,
      );
      return response;
    } catch (e) {
      console.error(`Erreur lors de l'appel (route : ${url}) : `, e);
      throw e;
    }
  },
};
