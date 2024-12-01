import useLogger from "@/hooks/use-logger";
import { useMainApiConfig } from "./config";

export const useMainApi = (baseUrl?: string) => {
  const [axios] = useMainApiConfig(baseUrl);
  const logger = useLogger("isHealthy");

  return {
    isHealthy: async () => {
      try {
        const response = await axios.get("/v1/health");
        if (response.status === 200) {
          return response.data;
        }
      } catch (e: unknown) {
        logger.error("Unable to get API health", e);
      }

      return false;
    },
  };
};
