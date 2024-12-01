import * as React from "react";

import { ConnectButton } from "@particle-network/connectkit";

const NetworkSelector = React.forwardRef<HTMLInputElement>(
  () => {
    return (
      <div className="particle-network-only rounded-md border border-input bg-background text-sm ring-offset-background">
        <ConnectButton />
      </div>
    );
  },
);
NetworkSelector.displayName = "NetworkSelector"

export { NetworkSelector };

