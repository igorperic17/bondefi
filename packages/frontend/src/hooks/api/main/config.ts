import { useStoredField } from "@/contexts/LocalStorage";
import useLogger from "@/hooks/use-logger";
import { Feature } from "@/lib/feature-flags";
import { Config } from "@config/index";
import { UserDto } from "@shared/src/dto/user/user.dto";
import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { Logger } from "pino";
import { useMemo } from "react";
import { useLoginApi } from "./use-main-login.api";

const setupLoginInterceptor = (
  axiosInstance: AxiosInstance,
  login: (_?: number) => Promise<UserDto>,
  logger: Logger,
): AxiosInstance => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          await login();

          return axios(originalRequest);
        } catch (e) {
          logger.error("Unable to log user in, error", e);
          return Promise.reject(e);
        }
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

const useAxiosWrapper = (
  baseUrl?: string,
  withPlugins?: (axiosInstance: AxiosInstance) => AxiosInstance,
): [AxiosInstance] => {
  const [storageApiUrl] = useStoredField("API_BASE_URL");

  const apiUrl =
    baseUrl || (Feature.DEV_MODE ? storageApiUrl : Config.apiBaseUrl);

  return useMemo(() => {
    const options: CreateAxiosDefaults = {
      baseURL: apiUrl,
      withCredentials: true,
    };

    const axiosDefault = axios.create(options);
    return [withPlugins ? withPlugins(axiosDefault) : axiosDefault];
  }, [apiUrl, withPlugins]);
};

export const useMainApiConfig = (baseUrl?: string) => {
  const { login } = useLoginApi();
  const logger = useLogger("useMainApiConfig");
  return useAxiosWrapper(baseUrl, (axios) =>
    setupLoginInterceptor(axios, login, logger),
  );
};

export const useMainApiConfigAnonymous = (baseUrl?: string) => {
  return useAxiosWrapper(baseUrl);
};
