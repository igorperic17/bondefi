'use client'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'radix-connect-button': any
    }
  }
}

export function RadixConnectButton() {
  return (
    <div>
      <radix-connect-button theme="black" />
    </div>
  )
}
