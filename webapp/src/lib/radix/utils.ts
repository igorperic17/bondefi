import type { StateEntityMetadataPageResponse } from '@radixdlt/babylon-gateway-api-sdk'

export const string = (value: string) =>
	`"${value.replace(/"/g, '\\"').replace(/\\/g, '\\')}"`

export const extractProperty = <T>(
	meta: StateEntityMetadataPageResponse,
	key: string,
	def: T,
) => {
	const value = meta.items.filter((t) => t.key === key).at(0)?.value.typed

	if (value && 'value' in value) return value.value as T
	return def
}

export const dateToUnixTimestamp = (date: Date) =>
	Math.floor(date.getTime() / 1000)
