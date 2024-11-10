import { ProjectDetailsStruct } from "../../typechain-types/contracts/launchpad/Launchpad";

export const createLaunchDetails = (): ProjectDetailsStruct => {
  return {
    name: "Test Project",
    symbol: "TEST",
    description: "A project description",
    iconUrl: "https://a-url.com",
  };
};
