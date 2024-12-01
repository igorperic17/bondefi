import { UserDto } from "../user/user.dto";

export interface TelegramJwtDto {
  user: UserDto;
  token: string;
}
