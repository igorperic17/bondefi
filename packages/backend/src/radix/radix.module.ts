import { Module } from "@nestjs/common";
import { RolaService } from "./rola/rola.service";

@Module({
  providers: [RolaService],
  exports: [RolaService],
})
export class RadixModule {}
