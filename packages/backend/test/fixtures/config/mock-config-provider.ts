import { ConfigService } from "@nestjs/config";

export interface MockConfigService extends Partial<ConfigService> {
  set: (key: string, value: unknown) => void;
}

export const mockConfigService: () => ConfigService = () => {
  const config = new Map<string, unknown>();

  return {
    get: jest.fn().mockImplementation((key: string) => config.get(key)),
    getOrThrow: jest.fn().mockImplementation((key: string) => {
      if (config.has(key)) {
        return config.get(key);
      } else {
        throw new Error(`Config key ${key} not found`);
      }
    }),
    set: jest
      .fn()
      .mockImplementation((key: string, value: unknown) =>
        config.set(key, value),
      ),
  } as MockConfigService as ConfigService;
};

export const mockConfigProvider = () => {
  return {
    provide: ConfigService,
    useValue: mockConfigService(),
  };
};
