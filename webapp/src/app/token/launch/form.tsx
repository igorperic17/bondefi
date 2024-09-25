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
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import { format, parseISO } from 'date-fns'

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
          onChange={(e) => set({ iconUrl: e.target.value })}
        />
      </div>

      <div className="mb-4 w-full space-y-2">
        <Label>Launch Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`w-full justify-start text-left font-normal ${!params.launchDate && "text-muted-foreground"
                }`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {params.launchDate ? format(parseISO(params.launchDate), "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={params.launchDate ? parseISO(params.launchDate) : undefined}
              onSelect={(date) => set({ launchDate: date ? date.toISOString() : undefined })}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="mb-4 w-full space-y-2">
        <Label>Sale End Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`w-full justify-start text-left font-normal ${!params.saleEndDate && "text-muted-foreground"
                }`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {params.saleEndDate ? format(parseISO(params.saleEndDate), "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={params.saleEndDate ? parseISO(params.saleEndDate) : undefined}
              onSelect={(date) => set({ saleEndDate: date ? date.toISOString() : undefined })}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="mb-4 w-full space-y-2">
        <Label>Funding Target (USD)</Label>
        <Input
          type="number"
          value={params.fundingTarget}
          placeholder="e.g. 100000"
          onChange={(e) => set({ fundingTarget: parseFloat(e.target.value) })}
        />
      </div>
    </div>
  )
}
