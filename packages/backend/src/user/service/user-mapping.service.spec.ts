import { faker } from "@faker-js/faker/.";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { UserDto } from "@shared/src/dto/user/user.dto";

describe("User Validation", () => {
  let validationPipe: ValidationPipe;

  beforeEach(() => {
    validationPipe = new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    });
  });

  it("should throw a BadRequestException for invalid DTO data", async () => {
    const invalidUserDto = {
      id: faker.string.alphanumeric(16),
      walletAddress: faker.finance.ethereumAddress(),
      username: "invalid",
    };

    try {
      await validationPipe.transform(invalidUserDto, {
        type: "body",
        metatype: UserDto,
      });
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(BadRequestException);
      const { message } = (error as BadRequestException).getResponse() as {
        message: string;
      };
      expect(message).toEqual(["property username should not exist"]);
    }
  });
});
