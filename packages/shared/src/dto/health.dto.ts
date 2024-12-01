export class HealthDto {
  status!: string;
  build!: {
    version: string;
    date: string;
  };
  config?: object;

  constructor(val: HealthDto) {
    for (const [key, value] of Object.entries(val) as [
      keyof HealthDto,
      unknown,
    ][]) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this as any)[key] = value;
    }
  }
}
