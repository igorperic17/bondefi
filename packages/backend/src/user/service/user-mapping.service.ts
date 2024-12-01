import { Injectable } from "@nestjs/common";
import { UserDto } from "@shared/src/dto/user/user.dto";
import { MinimalUser } from "../model/user.model";

const assignExisting = <T extends object>(
  to: T,
  from: Record<string, unknown>,
): T => {
  const out = { ...to } as Record<string, unknown>;
  for (const key in from) {
    if (from[key]) {
      out[key] = from[key];
    }
  }
  return out as T;
};

@Injectable()
export class UserDtoMapper {
  fromUser(user: MinimalUser): UserDto {
    if (!user) return user;

    const userDto = new UserDto({ id: user.id });

    return assignExisting(userDto, {
      walletAddress: user.walletAddress,
    });
  }

  toUser(user: UserDto): MinimalUser {
    return assignExisting(
      { id: user.id },
      {
        walletAddress: user.walletAddress,
      },
    );
  }
}
