import { faker } from "@faker-js/faker";

const { maybe } = faker.helpers;

export const maybeAssign = (
  base: object,
  maybeProperties: Record<string, unknown>,
) => {
  const out = { ...base } as Record<string, unknown>;
  for (const key in maybeProperties) {
    maybe(() => (out[key] = maybeProperties[key]));
  }
  return out;
};
