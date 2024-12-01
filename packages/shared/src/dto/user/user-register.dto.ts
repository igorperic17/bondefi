import { IsOptional, IsString } from "class-validator";
import { UserDto } from "./user.dto";

export class UserRegisterDto {
  @IsOptional()
  @IsString()
  walletAddress?: string;

  constructor({ walletAddress }: Partial<UserDto> = {}) {
    if (walletAddress) this.walletAddress = walletAddress;
  }
}
