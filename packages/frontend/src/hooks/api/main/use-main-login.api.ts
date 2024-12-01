import { useMainApiConfigAnonymous } from "./config";

export const useLoginApi = (baseUrl?: string) => {
  const [axios] = useMainApiConfigAnonymous(baseUrl);

  return {
    login: async (authDto: any) => {
      if (typeof window === "undefined") return;
      try {
        const response = await axios.post(`/v1/auth/telegram/login`, authDto);
        if (response.status !== 200) {
          throw new Error("Server responded with unexpected status code");
        }
        return response.data;
      } catch (e: unknown) {
        throw new Error("Unable to log in");
      }
    },
  };
};
