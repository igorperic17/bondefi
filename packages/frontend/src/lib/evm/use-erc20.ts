import { IERC20Metadata, IERC20Metadata__factory } from "@/typechain-types";
import { Eip1193Provider, ethers } from "ethers";
import { useEffect, useState } from "react";

const useERC20 = (
  connector: import("@particle-network/connector-core").Connector,
  address: string,
) => {
  const [erc20, setERC20] = useState<IERC20Metadata>();

  useEffect(() => {
    if (address) {
      connector?.getProvider().then((provider) => {
        new ethers.BrowserProvider(provider as Eip1193Provider, "any")
          .getSigner()
          .then((signer) => {
            setERC20(IERC20Metadata__factory.connect(address, signer));
          });
      });
    }
  }, [connector, address]);

  return [erc20];
};

export default useERC20;
