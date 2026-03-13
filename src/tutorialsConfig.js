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
 * Tutorials planned for the Tezos ecosystem. Refined per Grok/ChatGPT/DeepSeek: we ADD value, don't duplicate.
 * Removed: FA1.2 (legacy), wallet deep dive (glossary), baking/node/PoS (off-topic for dApp). Merged: demo+Taquito
 * into one; FA2/NFT into one; LIGO write+compile+call into one. Added: error handling, debugging, loading/optimistic UI,
 * error recovery, gas optimization, testing dApps, Etherlink vs L1. Learning-path friendly; see LESSONS-FOR-AI-REVIEW.md.
 */
export const COMING_SOON = [
  // Beginner — demo wallet, Shadownet, bridge from docs, practical errors
  { label: 'Get test XTZ from Shadownet faucet', level: 'beginner' },
  { label: 'Run the app locally (clone, npm run dev)', level: 'beginner' },
  { label: 'Integrate Taquito + Beacon: from quickstart to Launchpad (demo vs live paths)', level: 'beginner' },
  { label: 'Understanding the Dashboard', level: 'beginner' },
  { label: 'Explore contract anatomy in the app (storage, entrypoints)', level: 'beginner' },
  { label: 'Copy address and open in TzKT Explorer', level: 'beginner' },
  { label: 'Gas and fees when sending from the app (mutez, burn cap)', level: 'beginner' },
  { label: 'RPC vs wallet: read-only vs signed operations', level: 'beginner' },
  { label: 'Operations and explorer: what TzKT shows', level: 'beginner' },
  { label: 'TzKT API from your dApp: account and balance', level: 'beginner' },
  { label: 'Handle common errors: no funds, rejected sig, wrong network', level: 'beginner' },
  { label: 'Beginner series: Zero to first transaction', level: 'beginner', series: true, duration: '~45m' },
  // Advanced — template, Taqueria/LIGO/SmartPy "then use in this app", UX and debugging
  { label: 'FA2 in this app: fungible transfer, NFT mint and display (Taquito)', level: 'advanced' },
  { label: 'This Launchpad as template: add your contract', level: 'advanced' },
  { label: 'Batch transfers: UX patterns for multiple operations', level: 'advanced' },
  { label: 'Deploy a contract with Taqueria, then call it here', level: 'advanced' },
  { label: 'LIGO to dApp: write, compile, call from this app', level: 'advanced' },
  { label: 'SmartPy first contract, then use it in this dApp', level: 'advanced' },
  { label: 'Archetype first contract, then integrate here', level: 'advanced' },
  { label: 'On-chain views (call_view) for read-only data', level: 'advanced' },
  { label: 'Flextesa: local sandbox with this Launchpad', level: 'advanced' },
  { label: 'IPFS and Pinata for NFT metadata', level: 'advanced' },
  { label: 'NFT marketplace patterns (with Tezos docs)', level: 'advanced' },
  { label: 'TZIP standards (TZIP-12 FA2, TZIP-16 metadata)', level: 'advanced' },
  { label: 'TzKT API: operations and contracts in your dApp', level: 'advanced' },
  { label: 'SmartPy: testing contracts before deployment', level: 'advanced' },
  { label: 'LIGO: testing with unit tests', level: 'advanced' },
  { label: 'Contract upgrade patterns (proxy, migration)', level: 'advanced' },
  { label: 'Etherlink RPC and config from a dApp', level: 'advanced' },
  { label: 'Debugging dApps: console, TzKT, Taquito errors', level: 'advanced' },
  { label: 'Loading states and optimistic UI in blockchain apps', level: 'advanced' },
  { label: 'Error recovery when a transaction fails', level: 'advanced' },
  { label: 'LIGO series: From storage to deployment', level: 'advanced', series: true, duration: '~1h' },
  { label: 'FA2 series: Fungible and NFT in one contract', level: 'advanced', series: true, duration: '~1h 30m' },
  { label: 'Build a token dApp (frontend + contract)', level: 'advanced', series: true, duration: '~2h' },
  { label: 'Build an NFT marketplace: mint, list, buy (series)', level: 'advanced', series: true, duration: '~2–3h' },
  // Expert — TzKT sync, multi-network, production, Etherlink, testing
  { label: 'Taqueria full workflow (compile, deploy, test)', level: 'expert' },
  { label: 'Wallet + TzKT: sync UI with chain state', level: 'expert' },
  { label: 'Origination and multi-network from one codebase', level: 'expert' },
  { label: 'Etherlink (L2) + MetaMask', level: 'expert' },
  { label: 'Etherlink vs L1: when to use which from your dApp', level: 'expert' },
  { label: 'FA2 multi-asset contract', level: 'expert' },
  { label: 'Unit testing smart contracts', level: 'expert' },
  { label: 'Testing dApps: mocking Beacon and Taquito', level: 'expert' },
  { label: 'Mainnet readiness: testing, gas, and security', level: 'expert' },
  { label: 'Gas optimization and batching in Taquito', level: 'expert' },
  { label: 'On-chain views in this app (Taquito call_view)', level: 'expert' },
  { label: 'Big_map in storage (LIGO + Taquito)', level: 'expert' },
  { label: 'Tickets (non-transferable tokens, Tezos)', level: 'expert' },
  { label: 'Contract-to-contract calls', level: 'expert' },
  { label: 'Origination: deploy from Taquito', level: 'expert' },
  { label: 'Formal verification (Archetype)', level: 'expert' },
  { label: 'Tezos Domains and resolution', level: 'expert' },
  { label: 'Transaction batching and optimisations', level: 'expert' },
  { label: 'Indexers: TzKT and DipDup for dApps', level: 'expert' },
  { label: 'Smart rollup basics for developers', level: 'expert' },
  { label: 'Etherlink architecture (sequencer, nodes)', level: 'expert' },
  { label: 'TZIP-12 (FA2) and TZIP-16 (metadata)', level: 'expert' },
  { label: 'TZIP-21 (NFT royalty standard)', level: 'expert' },
  { label: 'Multisig and DAO patterns', level: 'expert' },
  { label: 'Smart contract security checklist', level: 'expert' },
  { label: 'Smart contract security (series)', level: 'expert', series: true, duration: '~2h' },
  { label: 'Etherlink full stack (series)', level: 'expert', series: true, duration: '~2h 30m' },
  { label: 'Etherlink migration: from L1 dApp to L2 (config + bridge intro)', level: 'expert', series: true, duration: '~1h' },
  { label: 'Production dApp: testing to mainnet (series)', level: 'expert', series: true, duration: '~3h' },
];
