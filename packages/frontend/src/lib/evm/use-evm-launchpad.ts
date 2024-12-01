import { Launchpad, Launchpad__factory } from "@/typechain-types";
import { Eip1193Provider, ethers } from "ethers";
import { useEffect, useState } from "react";
import { EVM_LAUNCHPAD_ADDRESS } from "./token-addresses";

const launchpadFactory = new Launchpad__factory();

const useEvmLaunchpad = (
  connector: import("@particle-network/connector-core").Connector,
) => {
  const [launchpad, setLaunchpad] = useState<Launchpad>();

  useEffect(() => {
    connector?.getProvider().then((provider) => {
      if (provider) {
        new ethers.BrowserProvider(provider as Eip1193Provider, "any")
          .getSigner()
          .then((signer) => {
            setLaunchpad(
              launchpadFactory
                .connect(signer)
                .attach(EVM_LAUNCHPAD_ADDRESS) as Launchpad,
            );
          });
      }
    });
  }, [connector]);

  return { launchpad };
};

export default useEvmLaunchpad;
