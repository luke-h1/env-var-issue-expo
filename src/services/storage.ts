import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV();

const FEATURE_FLAG_KEY = "use_staging_url";

export const storageService = {
  getUseStagingUrl: (): boolean => {
    return storage.getBoolean(FEATURE_FLAG_KEY) ?? false;
  },

  setUseStagingUrl: (value: boolean): void => {
    storage.set(FEATURE_FLAG_KEY, value);
  },

  getString: (key: string): string | undefined => {
    return storage.getString(key);
  },

  setString: (key: string, value: string): void => {
    storage.set(key, value);
  },

  getBoolean: (key: string): boolean | undefined => {
    return storage.getBoolean(key);
  },

  setBoolean: (key: string, value: boolean): void => {
    storage.set(key, value);
  },

  delete: (key: string): void => {
    storage.remove(key);
  },

  clearAll: (): void => {
    storage.clearAll();
  },
} as const;
