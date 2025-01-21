export const WALLET_ADDRESS_PATTERN = /^0x[a-fA-F0-9]{40}$/;

export function validateWalletAddress(address: string): boolean {
  return WALLET_ADDRESS_PATTERN.test(address);
}

export function normalizeWalletAddress(address: string): string {
  return address.toLowerCase();
}
