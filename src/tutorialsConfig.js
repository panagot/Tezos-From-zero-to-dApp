/**
 * Coding tutorials only: 3 per tier (Beginner, Advanced, Expert).
 * Sample for review; upon successful review we will create 15 per tier.
 */
export const TUTORIAL_LEVELS = ['beginner', 'advanced', 'expert'];

export const TUTORIALS = [
  // Beginner — connect, display, transfer (code you can copy and run)
  { id: 'connect-and-balance', label: 'Connect wallet & read balance', level: 'beginner', minutes: 5 },
  { id: 'display-address-balance', label: 'Display address & balance in React', level: 'beginner', minutes: 5 },
  { id: 'send-transfer', label: 'Send a transfer', level: 'beginner', minutes: 5 },
  // Advanced — contract read, entrypoint call, explorer
  { id: 'read-storage', label: 'Read contract storage', level: 'advanced', minutes: 5 },
  { id: 'call-entrypoint', label: 'Call a contract entrypoint', level: 'advanced', minutes: 6 },
  { id: 'op-hash-explorer', label: 'Operation hash & explorer link', level: 'advanced', minutes: 4 },
  // Expert — context, env, error handling
  { id: 'wallet-context', label: 'Wallet context (Beacon + TezosToolkit)', level: 'expert', minutes: 8 },
  { id: 'env-networks', label: 'Env & multi-network config', level: 'expert', minutes: 5 },
  { id: 'error-handling', label: 'Error handling & confirmation flow', level: 'expert', minutes: 6 },
];

export function getTutorialById(id) {
  return TUTORIALS.find((t) => t.id === id);
}

/**
 * Tutorials planned from ecosystem demand: dApp, LIGO, SmartPy, Archetype, Michelson, FA2, Taqueria, Flextesa, Etherlink, indexers, TZIP.
 * Optional: duration (~15m, ~1h) or series: true for longer / multi-part tutorials.
 * Shown in sidebar as "Coming soon" per tier. Contributors can propose more via GitHub (see GITHUB_REPO).
 */
export const COMING_SOON = [
  // Beginner — onboarding and first steps
  { label: 'Get test XTZ from Shadownet faucet', level: 'beginner' },
  { label: 'Run the app locally (clone, npm run dev)', level: 'beginner' },
  { label: 'Understanding the Dashboard', level: 'beginner' },
  { label: 'Tezos address types (tz1, tz2, tz3, KT1)', level: 'beginner' },
  { label: 'Contract basics: storage, balance, entrypoints', level: 'beginner' },
  { label: 'Copy address and use Explorer (TzKT)', level: 'beginner' },
  { label: 'Wallet deep dive: Temple vs Kukai', level: 'beginner' },
  { label: 'Gas and fees (mutez, burn cap)', level: 'beginner' },
  { label: 'RPC vs wallet: read-only vs signed operations', level: 'beginner' },
  { label: 'Block and operation concepts', level: 'beginner' },
  { label: 'First steps with TzKT API (account, balance)', level: 'beginner' },
  { label: 'Beginner series: Zero to first transaction', level: 'beginner', series: true, duration: '~45m' },
  // Advanced — dApp + contract fundamentals
  { label: 'FA2 token transfer with Taquito', level: 'advanced' },
  { label: 'Batch transfers (multiple operations)', level: 'advanced' },
  { label: 'Deploy a contract with Taqueria', level: 'advanced' },
  { label: 'Create NFTs from a web app', level: 'advanced' },
  { label: 'LIGO first contract (Taco Shop style)', level: 'advanced' },
  { label: 'SmartPy first contract', level: 'advanced' },
  { label: 'Archetype first contract', level: 'advanced' },
  { label: 'Storage and entrypoints in LIGO', level: 'advanced' },
  { label: 'Compile contract and storage (LIGO CLI)', level: 'advanced' },
  { label: 'Michelson basics (what the chain runs)', level: 'advanced' },
  { label: 'FA1.2 allowance and transfer', level: 'advanced' },
  { label: 'Flextesa: local sandbox with Docker', level: 'advanced' },
  { label: 'IPFS and Pinata for NFT metadata', level: 'advanced' },
  { label: 'NFT marketplace intro (Tezos docs)', level: 'advanced' },
  { label: 'TZIP standards intro (TZIP-12, FA2)', level: 'advanced' },
  { label: 'TzKT API from your dApp (operations, contracts)', level: 'advanced' },
  { label: 'FA2 single-asset (fungible) with Taquito', level: 'advanced' },
  { label: 'SmartPy: testing contracts before deployment', level: 'advanced' },
  { label: 'LIGO: testing with unit tests', level: 'advanced' },
  { label: 'Contract upgrade patterns (proxy, migration)', level: 'advanced' },
  { label: 'Etherlink RPC and config from a dApp', level: 'advanced' },
  { label: 'LIGO series: From storage to deployment', level: 'advanced', series: true, duration: '~1h' },
  { label: 'FA2 series: Fungible and NFT in one contract', level: 'advanced', series: true, duration: '~1h 30m' },
  { label: 'Build a token dApp (frontend + contract)', level: 'advanced', series: true, duration: '~2h' },
  { label: 'Build an NFT marketplace (series)', level: 'advanced', series: true, duration: '~3h' },
  // Expert — smart contract and tooling deep dive
  { label: 'Taqueria full workflow (compile, deploy, test)', level: 'expert' },
  { label: 'Etherlink (L2) + MetaMask', level: 'expert' },
  { label: 'FA2 multi-asset contract', level: 'expert' },
  { label: 'Unit testing smart contracts', level: 'expert' },
  { label: 'Mainnet deployment checklist', level: 'expert' },
  { label: 'On-chain views and call_view (Taquito)', level: 'expert' },
  { label: 'Big_map in storage (LIGO + Taquito)', level: 'expert' },
  { label: 'Tickets (non-transferable tokens)', level: 'expert' },
  { label: 'Contract-to-contract calls', level: 'expert' },
  { label: 'Origination: deploy from Taquito', level: 'expert' },
  { label: 'Formal verification (Archetype)', level: 'expert' },
  { label: 'Tezos Domains and resolution', level: 'expert' },
  { label: 'Transaction batching and optimisations', level: 'expert' },
  { label: 'Indexers: TzKT and DipDup for dApps', level: 'expert' },
  { label: 'Smart rollup basics for developers', level: 'expert' },
  { label: 'Etherlink architecture (sequencer, nodes)', level: 'expert' },
  { label: 'Baking intro for developers (delegation, rewards)', level: 'expert' },
  { label: 'Running a Tezos node (dev/snapshot)', level: 'expert' },
  { label: 'TZIP-12 (FA2) and TZIP-16 (metadata)', level: 'expert' },
  { label: 'TZIP-21 (NFT royalty standard)', level: 'expert' },
  { label: 'Multisig and DAO patterns', level: 'expert' },
  { label: 'Proof-of-stake and consensus (dev view)', level: 'expert' },
  { label: 'Smart contract security checklist', level: 'expert' },
  { label: 'Smart contract security (series)', level: 'expert', series: true, duration: '~2h' },
  { label: 'Etherlink full stack (series)', level: 'expert', series: true, duration: '~2h 30m' },
  { label: 'Production dApp: testing to mainnet (series)', level: 'expert', series: true, duration: '~3h' },
];
