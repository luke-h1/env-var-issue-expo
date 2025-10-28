import { cakeApi } from "./api";

export const cakeService = {
  listcakes: async () => {
    return cakeApi.get("/api/cake");
  },
} as const;
