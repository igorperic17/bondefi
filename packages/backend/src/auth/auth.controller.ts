import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SignedChallenge } from "@radixdlt/rola";
import { BACKEND_JWT_COOKIE_NAME } from "@shared/src/cookie/auth";
import { InitData } from "@telegram-apps/init-data-node";
import { CookieOptions, Response } from "express";
import { TelegramInitDataPipeTransform } from "src/telegram/init-data/telegram-init-data-transform.pipe";
import { TelegramWebappAuthDtoValid } from "src/telegram/init-data/valid-init-data.dto";
import { AuthService } from "./auth.service";

const MINUTE = 1000 * 60;

@Controller("/auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
    private readonly telegramInitDataTransformer: TelegramInitDataPipeTransform,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get("/radix/login")
  async getLoginWithRadixChallenge() {
    return this.authService.getLoginWithRadixChallenge();
  }

  // TODO - validate payload with nestia!!!!!!!
  @HttpCode(HttpStatus.OK)
  @Post("/radix/login")
  async loginWithRadix(
    @Body() signedChallenges: SignedChallenge[],
    @Res({ passthrough: true }) res: Response,
  ) {
    const loginResult = await this.authService.logInWithRadix(signedChallenges);

    res.cookie(
      BACKEND_JWT_COOKIE_NAME,
      loginResult.token,
      this.getCookieSettings(),
    );

    return loginResult;
  }

  @HttpCode(HttpStatus.OK)
  @Post("/telegram/login")
  async logIn(
    @Body()
    webappAuthDto: TelegramWebappAuthDtoValid,
    @Res({ passthrough: true }) res: Response,
  ) {
    let userId: string | undefined;
    let webappInitData: InitData;

    try {
      webappInitData =
        this.telegramInitDataTransformer.transform(webappAuthDto);
      userId = webappInitData.user?.id.toString();
    } catch {
      throw new BadRequestException("Invalid initData");
    }

    if (!userId) {
      throw new BadRequestException(
        "Unable to authenticate user, incorrect initData",
      );
    }

    const loginResult = await this.authService.logInWithTelegram(
      userId,
      webappInitData,
    );

    res.cookie(
      BACKEND_JWT_COOKIE_NAME,
      loginResult.token,
      this.getCookieSettings(),
    );

    return loginResult;
  }

  private getCookieSettings(): CookieOptions {
    const settings: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: this.config.getOrThrow<number>("session.expiryMinutes") * MINUTE,
    };

    if (this.config.get<string>("env") === "local") {
      settings.secure = false;
      settings.sameSite = "none";
    }

    return settings;
  }
}
