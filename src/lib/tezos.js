/**
 * Tezos toolkit and wallet setup.
 * Single TezosToolkit and BeaconWallet instance (best practice).
 */
import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { RPC_URL, NETWORK, APP_NAME, APP_ICON } from '../constants';

export function createTezosToolkit(rpcUrl = RPC_URL) {
  const tezos = new TezosToolkit(rpcUrl);
  return tezos;
}

/**
 * Create a single BeaconWallet instance.
 * Must be called once and shared via context (avoids duplicate wallet connections).
 */
export function createWallet(options = {}) {
  const network = NETWORK === 'mainnet' ? { type: 'mainnet' } : { type: 'shadownet' };
  return new BeaconWallet({
    name: options.name || APP_NAME,
    iconUrl: options.iconUrl || APP_ICON,
    network,
    enableMetrics: false,
    ...options,
  });
}

/**
 * Format mutez to XTZ string (6 decimals).
 */
export function mutezToXtz(mutez) {
  if (mutez == null) return '0';
  const m = typeof mutez === 'bigint' ? mutez : BigInt(String(mutez));
  const whole = m / 1_000_000n;
  const frac = (m % 1_000_000n).toString().padStart(6, '0').replace(/0+$/, '') || '0';
  return frac ? `${whole}.${frac}` : `${whole}`;
}

/**
 * Parse XTZ string to mutez (number for Taquito).
 */
export function xtzToMutez(xtzStr) {
  const s = String(xtzStr).trim().replace(/,/g, '');
  if (!s || isNaN(Number(s))) return 0;
  const [whole = '0', frac = ''] = s.split('.');
  const padded = frac.padEnd(6, '0').slice(0, 6);
  return Number(whole) * 1_000_000 + (padded ? parseInt(padded, 10) : 0);
}
