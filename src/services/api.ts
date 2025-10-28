import Client from "./Client";
import { storageService } from "./storage";

const useStagingUrl = storageService.getUseStagingUrl();

const getApiBaseUrl = (): string => {
  const useStagingUrl = storageService.getUseStagingUrl();
  return useStagingUrl
    ? (process.env.EXPO_PUBLIC_CAKE_API_URL_STAGING as string)
    : (process.env.EXPO_PUBLIC_CAKE_API_URL as string);
};

const initialBaseUrl = getApiBaseUrl();

export const cakeApi = new Client({
  baseURL: initialBaseUrl,
  headers: {
    ...(useStagingUrl ? { "x-api-key": "staging-api-key" } : {}),
  },
});

export const updateApiBaseUrl = (): void => {
  cakeApi.baseURL = getApiBaseUrl();
};

export const getCurrentApiBaseUrl = (): string => {
  return cakeApi.baseURL;
};
