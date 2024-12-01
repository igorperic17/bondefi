import { UserDto } from "@shared/src/dto/user/user.dto";
import { validate } from "class-validator";
import { useCallback } from "react";

import { useMainUserApi } from "../api/main/use-main-user.api";
import useLogger from "../use-logger";

export interface IUser {
  firstName?: string;
  lastName?: string;
  id: number;
  avatar: string;
}

export const USER_QUERY_KEY = "user";
export const LOGIN_QUERY_KEY = "login";

const useUserService = () => {
  const userApi = useMainUserApi();
  const logger = useLogger("useUserService");

  const register = useCallback(
    async (walletAddress: string) => {
      let result: UserDto;
      try {
        result = await userApi.register({
          walletAddress,
        });
        const userDtoErrors = await validate(result);
        if (userDtoErrors.length) {
          logger.error("Failed to validate user dto", userDtoErrors);
          throw new Error("Failed to validate user dto");
        }
      } catch (err) {
        throw new Error("Failed to register user", err);
      }
      return result;
    },
    [logger, userApi],
  );

  const login = async () => {
    throw new Error("Not implemented");
  };

  return { login, register };
};

export default useUserService;
