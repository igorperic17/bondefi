import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { validate as initDataValidate } from "@telegram-apps/init-data-node";
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@Injectable()
@ValidatorConstraint({ name: "telegramInitData", async: false })
export class TelegramInitDataValid implements ValidatorConstraintInterface {
  constructor(private readonly config: ConfigService) {}

  validate(value: string, _validationArguments?: ValidationArguments) {
    if (this.config.get<boolean>("features.devMode")) {
      return true; //We trust all telegram data in dev mode
    }

    try {
      const token = this.config.get<string>("telegram.appToken");
      if (token) {
        initDataValidate(value, token, {
          expiresIn: this.config.get<number>(
            "telegram.webappDataExpirySeconds",
          ),
        });

        return true;
      }
    } catch {}

    return false;
  }
}
