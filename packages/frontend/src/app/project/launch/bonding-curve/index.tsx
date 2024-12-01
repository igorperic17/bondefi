import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { BONDING_CURVES, getFormulaByAddress } from "@/lib/bonding-curve";
import { CreateTokenProps } from "@/lib/evm/dto/create-token";
import { getReserveTokenByAddress } from "@/lib/radix/reserve-tokens";
import { Chart } from "./chart";

interface BondingCurveProps {
  params: CreateTokenProps;
  onSet: (params: CreateTokenProps) => void;
}

export function BondingCurve({ params, onSet }: BondingCurveProps) {
  const curve = getFormulaByAddress(params.purchaseFormula);

  const set = (change: Partial<CreateTokenProps>) => {
    onSet({ ...params, ...change });
  };

  const onSetType = (address: string) => {
    set({
      purchaseFormula: address,
    });
  };

  return (
    <div className="">
      <div className="mb-4 w-full space-y-2">
        <Label>Bounding Curve</Label>
        <Select value={params.purchaseFormula} onValueChange={onSetType}>
          <SelectTrigger>
            <SelectValue>{curve?.name}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {BONDING_CURVES.map((t) => (
              <SelectItem key={t.id} value={t.address}>
                {t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {curve?.parameters.map((param) => (
        <div className="mb-4 w-full space-y-2" key={param}>
          <Label>
            {param} ({params.reserveRatio})
          </Label>
          <Input
            type="range"
            min={0.01}
            max={1.0}
            step={0.01}
            value={params.reserveRatio}
            placeholder={param}
            onChange={(e) => {
              onSet({
                ...params,
                reserveRatio: parseFloat(e.target.value),
              });
            }}
          />
        </div>
      ))}

      {curve && (
        <div className="bg-black pa-4 rounded-lg border mb-5 overflow-hidden">
          <Chart
            curve={curve}
            params={[params.reserveRatio]}
            target={Number.parseFloat(params.targetRaise)}
            symbol={params.symbol}
            collateral={getReserveTokenByAddress(params.purchaseToken)?.symbol}
          />
        </div>
      )}
    </div>
  );
}
