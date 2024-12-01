import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "@shared/src/dto/user/user.dto";
import { InitData } from "@telegram-apps/init-data-node";
import { EntityNotFoundException } from "src/common/exception/db/entity-not-found.exception";
import { UserService } from "src/user/service/user.service";
import { TelegramJwtDto } from "../../../shared/src/dto/auth/telegram-jwt-dto";
import { LoggedInUser } from "./logged-in-user-data";
import { RolaService } from "../radix/rola/rola.service";
import { SignedChallenge } from "@radixdlt/rola";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private config: ConfigService,
    private jwtService: JwtService,
    private rolaService: RolaService,
  ) {}

  async getLoginWithRadixChallenge() {
    return this.rolaService.getNewChallenge();
  }

  async logInWithRadix(signedChallenges: SignedChallenge[]) {
    const isValid =
      await this.rolaService.verifySignedChallenges(signedChallenges);
    if (!isValid) {
      throw new BadRequestException("Invalid signed challenge");
    }

    const userId = signedChallenges[0].address;
    const user = await this.getOrCreateUser(
      userId,
      signedChallenges[0].address, // TODO - we may need to check another address, the persona, etc.. to revisit but it's more complex than EVM
    );

    return {
      user,
      token: this.jwtService.sign({ id: userId } as LoggedInUser, {
        secret: process.env.JWT_SECRET,
        expiresIn: `${this.config.get<number>("session.expiryMinutes")}m`,
      }),
    } as TelegramJwtDto;
  }

  async logInWithTelegram(userId: string, _initData: InitData) {
    const user = await this.getOrCreateUser(userId);

    return {
      user,
      token: this.jwtService.sign({ id: userId } as LoggedInUser, {
        secret: process.env.JWT_SECRET,
        expiresIn: `${this.config.get<number>("session.expiryMinutes")}m`,
      }),
    };
  }

  private async getOrCreateUser(
    userId: string,
    walletAddress?: string,
  ): Promise<UserDto> {
    let userObj: UserDto;
    try {
      userObj = await this.userService.getUser(userId);
    } catch (e) {
      if (e instanceof EntityNotFoundException) {
        userObj = await this.userService.create({
          id: userId,
          walletAddress,
        });
      }
    }

    if (!userObj) {
      throw new Error("Unable to log in user");
    }

    return userObj;
  }
}
