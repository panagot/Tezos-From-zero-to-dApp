/**
 * Network and app constants.
 * Use .env for overrides: VITE_RPC_URL, VITE_NETWORK, VITE_APP_NAME
 * Ghostnet is being discontinued (TzKT Mar 2026, network Jun 2026). Default testnet is Shadownet.
 */
export const RPC_URL = import.meta.env.VITE_RPC_URL || 'https://rpc.shadownet.teztnets.com';
export const NETWORK = import.meta.env.VITE_NETWORK || 'shadownet';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Tezos Launchpad';
export const APP_ICON = import.meta.env.VITE_APP_ICON || 'https://tezos.com/favicon.ico';

/** Default contract for "Read contract" demo (counter). Replace with your own after deploying. */
export const DEMO_CONTRACT_ADDRESS = import.meta.env.VITE_DEMO_CONTRACT || '';

/** GitHub repo for contributing tutorials (issues, discussions). */
export const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO || 'https://github.com/panagot/Tezos-From-zero-to-dApp';

/** Explorer and faucet per network. Shadownet: https://shadownet.tzkt.io */
export const EXPLORER_URL = NETWORK === 'mainnet'
  ? 'https://tzkt.io'
  : 'https://shadownet.tzkt.io';
export const TZKT_API_URL = NETWORK === 'mainnet'
  ? 'https://api.tzkt.io'
  : 'https://api.shadownet.tzkt.io';
export const FAUCET_URL = NETWORK === 'shadownet'
  ? 'https://faucet.shadownet.teztnets.com'
  : null;
