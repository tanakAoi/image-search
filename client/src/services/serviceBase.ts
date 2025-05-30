import axios from "axios";

export const get = async (url: string, data?: object) => {
  return await axios.get(url, data ? { params: data } : undefined);
};

export const post = async (url: string, data: object) => {
  return await axios.post(url, data);
};

export const put = async (url: string, data: object) => {
  return await axios.put(url, data);
};

export const remove = async (url: string, data: object) => {
  return await axios.delete(url, data);
};
