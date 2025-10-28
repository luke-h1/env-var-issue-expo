import Client from "./Client";
import { storageService } from "./storage";

const getApiBaseUrl = (): string => {
  const useStagingUrl = storageService.getUseStagingUrl();
  return useStagingUrl
    ? (process.env.EXPO_PUBLIC_CAKE_API_URL_STAGING as string)
    : (process.env.EXPO_PUBLIC_CAKE_API_URL as string);
};

const getInitialHeaders = () => {
  const useStagingUrl = storageService.getUseStagingUrl();
  return useStagingUrl ? { "x-api-key": "staging-api-key" } : {};
};

const initialBaseUrl = getApiBaseUrl();

export const cakeApi = new Client({
  baseURL: initialBaseUrl,
  headers: getInitialHeaders(),
});

export const updateApiBaseUrl = (): void => {
  const useStagingUrl = storageService.getUseStagingUrl();
  cakeApi.baseURL = getApiBaseUrl();

  if (useStagingUrl) {
    cakeApi["axios"].defaults.headers.common["x-api-key"] = "staging-api-key";
  }
  delete cakeApi["axios"].defaults.headers.common["x-api-key"];
};

export const getCurrentApiBaseUrl = (): string => {
  return cakeApi.baseURL;
};
