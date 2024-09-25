import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CreateTokenProps } from '@/lib/radix/manifest/create-token'
import { RESERVE_TOKENS } from '@/lib/reserve-tokens'

interface TokenFormProps {
  params: CreateTokenProps
  onSet: (params: CreateTokenProps) => void
}

export function TokenForm({ params, onSet }: TokenFormProps) {
  const set = (change: Partial<CreateTokenProps>) => {
    onSet({ ...params, ...change })
  }

  return (
    <div>
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
        <Label>Reserve Token</Label>
        <Select
          value={params.collateralAddress}
          onValueChange={(collateralAddress) => set({ collateralAddress })}
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
        <Input
          type="text"
          value={params.description}
          placeholder="Description"
          onChange={(e) => set({ description: e.target.value })}
        />
      </div>

      <div className="mb-4 w-full space-y-2">
        <Label>Icon URL</Label>
        <Input
          type="text"
          value={params.iconUrl}
          placeholder="https://example.com/icon.png"
          onChange={(e) => set({ description: e.target.value })}
        />
      </div>
    </div>
  )
}
