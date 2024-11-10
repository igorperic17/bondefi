import { DatePicker } from "@/components/datepicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NetworkSelector } from "@/components/ui/network-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { CreateTokenProps } from "@/lib/evm/dto/create-token";
import {
  RESERVE_TOKENS,
  getReserveTokenByAddress,
} from "@/lib/evm/token-addresses";

interface TokenFormProps {
  params: CreateTokenProps;
  onSet: (params: CreateTokenProps) => void;
}

const optionalBrackets = (text?: string) => (text ? `(${text})` : "");

export function TokenForm({ params, onSet }: TokenFormProps) {
  const set = (change: Partial<CreateTokenProps>) => {
    onSet({ ...params, ...change });
  };

  return (
    <div>
      <div className="mb-4 w-full space-y-2">
        <Label>Network</Label>
        <NetworkSelector />
      </div>

      <div className="mb-4 w-full space-y-2">
        <Label>Name</Label>
        <Input
          type="text"
          value={params.name}
          placeholder="Your token name: e.g. Infinity Shard"
          onChange={(e) => set({ name: e.target.value })}
        />
      </div>

      <div className="mb-4 w-full space-y-2">
        <Label>Symbol</Label>
        <Input
          type="text"
          value={params.symbol}
          placeholder='e.g. "BDFI"'
          onChange={(e) => set({ symbol: e.target.value })}
        />
      </div>

      <div className="mb-4 w-full space-y-2">
        <Label>
          Funding Target{" "}
          {optionalBrackets(
            getReserveTokenByAddress(params.purchaseToken)?.symbol,
          )}
        </Label>
        <Input
          type="number"
          value={params.targetRaise}
          placeholder="e.g. 100000"
          onChange={(e) => set({ targetRaise: e.target.value })}
        />
      </div>

      <div className="mb-4 w-full space-y-2">
        <Label>Reserve Token</Label>
        <Select
          value={params.purchaseToken}
          onValueChange={(purchaseToken) => set({ purchaseToken })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select reserve token" />
          </SelectTrigger>
          <SelectContent>
            {RESERVE_TOKENS.map((t) => (
              <SelectItem key={t.address} value={t.address}>
                ({t.symbol}) {t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4 w-full space-y-2">
        <Label>Description</Label>
        <Textarea
          value={params.description}
          placeholder="Provide a short description of your project"
          onChange={(e) => set({ description: e.target.value })}
        />
      </div>

      <div className="mb-4 w-full space-y-2">
        <Label>Icon URL</Label>
        <Input
          type="text"
          value={params.iconUrl}
          placeholder="https://example.com/icon.png"
          onChange={(e) => set({ iconUrl: e.target.value })}
        />
      </div>

      <div className="mb-4 w-full space-y-2">
        <Label>Launch Date</Label>
        <div>
          <DatePicker
            date={params.saleStart}
            setDate={(saleStart) => set({ saleStart })}
          />
        </div>
      </div>

      <div className="mb-4 w-full space-y-2">
        <Label>Sale End Date</Label>
        <div>
          <DatePicker
            date={params.saleEnd}
            setDate={(saleEnd) => set({ saleEnd })}
          />
        </div>
      </div>
    </div>
  );
}
