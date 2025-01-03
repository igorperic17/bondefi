import { UserRegisterDto } from "@shared/src/dto/user/user-register.dto";
import { UserDto } from "@shared/src/dto/user/user.dto";
import { useMainApiConfig } from "./config";

export const useMainUserApi = (baseUrl?: string) => {
  const [axios] = useMainApiConfig(baseUrl);

  return {
    get: async (userId: number) => {
      try {
        const response = await axios.get(`/v1/user/${userId}`);
        if (response.status !== 200) {
          throw new Error("Server responded with unexpected status code");
        }
        return response.data as UserDto;
      } catch (e: unknown) {
        throw new Error("Unable to retrieve user data", e ?? "Unknown error");
      }
    },
    register: async (user: UserRegisterDto) => {
      try {
        const response = await axios.post(`/v1/user/`, user);
        if (response.status !== 201) {
          throw new Error("Server responded with unexpected status code");
        }
        return response.data as UserDto;
      } catch (e: unknown) {
        throw new Error("Unable to create user", e ?? "Unknown error");
      }
    },
  };
};
