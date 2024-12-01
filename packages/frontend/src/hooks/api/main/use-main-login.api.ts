import { SignedChallenge } from "@radixdlt/radix-dapp-toolkit";
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
    getRadixChallenge: async () => {
      console.log("getRadixChallenge");
      if (typeof window === "undefined") return;
      try {
        const response = await axios.get(`/v1/auth/radix/login`);
        if (response.status !== 200) {
          throw new Error("Server responded with unexpected status code");
        }
        return response.data;
      } catch (e: unknown) {
        throw new Error("Unable to log in");
      }
    },
    loginWithRadix: async (signedChallenges: SignedChallenge[]) => {
      if (typeof window === "undefined") return;
      try {
        const response = await axios.post(
          `/v1/auth/radix/login`,
          signedChallenges,
        );
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
