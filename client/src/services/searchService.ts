import { get } from "./serviceBase";

const API_URL = `${import.meta.env.VITE_APP_API_URL}/api/search`;

export const getImagesFromGoogleSearch = async (
  query: string,
  start: number = 1
) => {
  const response = await get(API_URL, {
    query,
    start,
  });

  return response.data;
};
