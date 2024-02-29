import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useSession } from "@/components/Ctx";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
console.log(API_URL);
if (!API_URL) throw new Error('API URL not found');


const defaultOptions: AxiosRequestConfig = { timeout: 20000 };

export const api = {
  get: async (url: string, options: AxiosRequestConfig = defaultOptions) => {
     const { session } = useSession();
     // Merge headers with any provided options
     const requestOptions: AxiosRequestConfig = {
      ...options,
      headers: {
        Authorization: session ? `Bearer ${session}` : undefined,
        ...options.headers, // This ensures that any headers in the options are preserved
      },
    };
    try {
      const response: AxiosResponse = await axios.get(API_URL + url, requestOptions);
      return response;
    } catch (e) {
      console.error(`Erreur lors de l'appel (route : ${url}) : `, e);
      throw e;
    }
  },
  delete: async (url: string, options: AxiosRequestConfig = defaultOptions) => {
    const { session } = useSession();
    const requestOptions: AxiosRequestConfig = {
      ...options,
      headers: {
        Authorization: session ? `Bearer ${session}` : undefined,
        ...options.headers, // This ensures that any headers in the options are preserved
      },
    };
    try {
      const response: AxiosResponse = await axios.delete(
        API_URL + url,
        requestOptions,
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
    headers: { [key: string]: any } = {},
    options: AxiosRequestConfig = defaultOptions,
  ) => {
    const { session } = useSession();
    const requestOptions: AxiosRequestConfig = {
      ...options,
      headers: {
        Authorization: session ? `Bearer ${session}` : undefined,
        ...options.headers, // This ensures that any headers in the options are preserved
      },
    };
    try {
      const response: AxiosResponse = await axios.post(
        API_URL + url,
        data,
        requestOptions,
      );
      return response;
    } catch (e) {
      console.error(`Erreur lors de l'appel (route : ${url}) : `, e);
      throw e;
    }
  },
};
