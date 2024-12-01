import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsOptional()
  @IsString()
  walletAddress?: string;

  constructor({ id, walletAddress }: Partial<UserDto> = {}) {
    if (id) this.id = id;
    if (walletAddress) this.walletAddress = walletAddress;
  }
}
