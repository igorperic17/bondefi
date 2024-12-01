import { Injectable } from "@nestjs/common";
import { HealthDto } from "@shared/src/dto/health.dto";
import configuration from "@config/configuration";
import { Feature } from "@config/features";
import { FeatureService } from "src/common/feature-flags/feature-flag.service";
import { LazyInitializer } from "src/common/util/lazy-initializer";

@Injectable()
export class HealthService {
  private readonly configuration = new LazyInitializer<object>(() => {
    const result = { ...configuration() };
    delete result.secrets;
    return result;
  });

  constructor(private readonly feature: FeatureService) {}

  getHealth(): HealthDto {
    const baseHealth = {
      status: "OK",
      build: {
        version: process.env.APP_VERSION,
        date: process.env.BUILD_TIME,
      },
    };

    if (this.feature.enabled(Feature.DEV_MODE)) {
      return {
        ...baseHealth,
        config: this.configuration.get(),
      };
    } else {
      return baseHealth;
    }
  }
}
