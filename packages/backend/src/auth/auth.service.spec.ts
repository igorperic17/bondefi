import { faker } from "@faker-js/faker/.";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { EntityNotFoundException } from "src/common/exception/db/entity-not-found.exception";
import { RolaService } from "src/radix/rola/rola.service";
import { UserService } from "src/user/service/user.service";
import { mockConfigService } from "test/fixtures/config/mock-config-provider";
import { createValidUserDto } from "test/fixtures/model/user.data";
import { createValidWebappInitData } from "test/fixtures/telegram/telegram-data";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let config: ConfigService;

  const mockUser = createValidUserDto();
  const inexistentUserId = "-1";

  beforeEach(async () => {
    config = mockConfigService();
    config.set("radix.appName", faker.string.alphanumeric(10));
    config.set("radix.dAppDefinition", faker.string.alphanumeric(10));
    config.set("radix.networkId", 2); //stokenet
    config.set("frontend.url", faker.internet.url());

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            getUser: jest.fn().mockImplementation((id: string) => {
              if (id === inexistentUserId) {
                throw new EntityNotFoundException();
              }

              return mockUser;
            }),
            create: jest.fn().mockResolvedValue(mockUser),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue(faker.string.alphanumeric(12)),
          },
        },
        {
          provide: ConfigService,
          useValue: config,
        },
        RolaService,
      ],
    }).compile();

    authService = module.get(AuthService);
    userService = module.get(UserService);
    jwtService = module.get(JwtService);
    config = module.get(ConfigService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(authService).toBeDefined();
  });

  it("should return a user when found", async () => {
    const { initData } = createValidWebappInitData(parseInt(mockUser.id));
    const result = authService.logInWithTelegram(mockUser.id, initData);

    await expect(result).resolves.toMatchObject({
      user: expect.any(Object),
      token: expect.any(String),
    });
    expect(jwtService.sign).toHaveBeenCalled();
    expect(userService.getUser).toHaveBeenCalledTimes(1);
    expect(userService.create).not.toHaveBeenCalled();
  });

  it("should create a user when not found and still return it", async () => {
    const { initData } = createValidWebappInitData(parseInt(inexistentUserId));
    const result = authService.logInWithTelegram(inexistentUserId, initData);
    await expect(result).resolves.toMatchObject({
      user: expect.any(Object),
      token: expect.any(String),
    });
    expect(jwtService.sign).toHaveBeenCalled();
    expect(userService.getUser).toHaveBeenCalledTimes(1);
    expect(userService.create).toHaveBeenCalledTimes(1);
  });
});
