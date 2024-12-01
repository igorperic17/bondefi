'use client'

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		interface IntrinsicElements {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			'radix-connect-button': any
		}
	}
}

export function RadixConnectButton() {
	return (
		<div>
			<radix-connect-button theme="black" mode="dark" />
		</div>
	)
}
