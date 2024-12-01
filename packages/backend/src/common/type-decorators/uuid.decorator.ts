import { Param, ParseUUIDPipe } from "@nestjs/common";

export const UUIDParam = (property: string): ParameterDecorator => {
  return Param(property, ParseUUIDPipe);
};

export type UUID = string & { readonly brand: unique symbol };
