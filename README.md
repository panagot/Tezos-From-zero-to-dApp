# Tezos Launchpad

**Your launchpad to building on Tezos** — go from zero to a working dApp in one short session: wallet connect, balance, transfer, and contract read. Built with **React**, **Vite**, **Taquito**, and **Beacon**. The name *Launchpad* is meant to work for everyone: inspiring for students, clear for developers, strong for grant reviewers.

Use this repo as a template for the [Tezos Foundation](https://grants.tezos.foundation/) **Developer Experience** and **Education** grant: your launchpad for students, developers, and educators.

**Funding request:** We are requesting **$5,000–$10,000** for **6 months of active GitHub support** (issues, PRs, dependency updates, and tutorial expansion). After the 6-month grant period we commit to 12 months of responsive maintenance and onboarding community co-maintainers.

**Live demo:** [**tezos-from-zero-to-d-app.vercel.app**](https://tezos-from-zero-to-d-app.vercel.app/) — try the app in your browser (no clone required). Use **Demo wallet** to explore in under a minute.

---

## For reviewers and educators

**Why this is helpful to support:** Open the app, use **Demo wallet** (no install), then open **For reviewers** in the sidebar for the full **reviewer experience** (7-step path in ~5 min), learning outcomes, success metrics, differentiation, sustainability, and copy-paste code examples. Summary:

| What | Details |
|------|---------|
| **Learning outcomes** | Connect wallet (Beacon, single instance); read balance; send XTZ with confirmation and explorer link; read contract storage and call entrypoints; use testnet + env config. |
| **Target audience** | New developers, educators and workshop leads, grant reviewers. |
| **Time to first success** | Under 1 min (Demo wallet); 5–10 min (real wallet); ~15 min (full tutorial). |
| **Ecosystem fit** | Developer Experience and Education; Taquito, Beacon, Shadownet, TzKT; forkable for hackathons and courses. |

---

## What's included

- **Wallet connection** — Beacon (Temple, Kukai, and any TZIP-10 wallet) on **Shadownet** (Ghostnet is being discontinued; TzKT for Ghostnet ends Mar 2026)
- **Balance** — Display XTZ balance and refresh
- **Transfer** — Send XTZ to any tz/KT address
- **Contract read** — Read storage of any contract by KT1 address (no wallet needed for read)
- **Quickstart tutorial** — In-app Quickstart tutorial view and this README

UI matches the Zen Relay for Tezos style: dark theme, Tezos green accent, Outfit + JetBrains Mono.

---

## Quick start

**Try in the browser:** [tezos-from-zero-to-d-app.vercel.app](https://tezos-from-zero-to-d-app.vercel.app/) — no install. Click **Demo wallet** to start.

**Run locally (≈2 min):**

```bash
git clone https://github.com/panagot/Tezos-From-zero-to-dApp
cd Tezos-From-zero-to-dApp
npm install
npm run dev
```
Or set `VITE_GITHUB_REPO` in `.env` to your fork URL.

Open the URL (e.g. `http://localhost:5179`). Click **Demo wallet** to try with no install, or **Connect wallet** for Temple/Kukai.

---

## Quickstart tutorial

### 1. Get a wallet (or skip with Demo)

- **Easiest:** Click **Demo wallet** in the app. You get a fake address and 1000 XTZ to try balance, simulated send, and contract read with no install.
- **Real wallet:** Node.js 18+, then [Temple](https://templewallet.com/) or your wallet’s Shadownet option, and [Shadownet faucet](https://faucet.shadownet.teztnets.com) for test XTZ.

### 2. Clone and run (2 min)

```bash
npm install
npm run dev
```

Open the dev server URL in your browser.

### 3. Connect (or use Demo)

Click **Demo wallet** for instant try-without-install, or **Connect wallet** to use Temple/Kukai. After connecting, the app shows your address and XTZ balance.

**Best practice:** The app uses a **single** `BeaconWallet` instance provided via React Context. Never create multiple Beacon wallets in one app — it leads to duplicate pairing and errors.

### 4. Send a transaction (3 min)

In **Send XTZ**, enter:

- **Recipient:** Any valid tz1/tz2/tz3 or KT1 (e.g. another Shadownet address).
- **Amount:** e.g. `0.1` XTZ.

Click **Send**, confirm in your wallet, and wait for one confirmation. The balance updates after that.

**Best practice:** Amounts are in XTZ; the app converts to mutez (1 XTZ = 1_000_000 mutez) for Taquito.

### 5. Read contract storage (3 min)

- Deploy a simple contract to Shadownet (e.g. a [counter](https://docs.tezos.com/tutorials) from LIGO, SmartPy, or Archetype), or use an existing KT1.
- In **Read contract storage**, paste the contract address and click **Read storage**.
- Storage is fetched via **RPC only** — no wallet needed for reads. Use `tezos.contract.at(kt1)` for read-only calls.

### 6. Next steps (3 min)

- **Call an entrypoint:** e.g. `const contract = await tezos.wallet.at('KT1...'); await contract.methods.increment(1).send();`
- **Mainnet:** Set `VITE_NETWORK=mainnet` and a mainnet RPC in `.env`.
- **Etherlink:** Set `VITE_RPC_URL` to an [Etherlink](https://etherlink.com/) RPC for fast, cheap L2 transactions.

---

## Project structure

```
Tezos-From-zero-to-dApp/
├── index.html
├── package.json
├── vite.config.js
├── .env.example
├── README.md
└── src/
    ├── main.jsx              # Entry; wraps app in WalletProvider
    ├── App.jsx               # Layout, sidebar, Dashboard + Tutorial views
    ├── App.module.css
    ├── index.css             # Globals, CSS variables (Tezos green theme)
    ├── constants.js          # RPC_URL, NETWORK, APP_NAME (env-driven)
    ├── context/
    │   └── WalletContext.jsx # Single TezosToolkit + BeaconWallet; connect/disconnect/balance
    ├── components/
    │   ├── BalanceCard.jsx   # XTZ balance + refresh
    │   ├── TransferForm.jsx  # Send XTZ form
    │   └── ContractRead.jsx  # Read contract storage by KT1
    └── lib/
        └── tezos.js          # createTezosToolkit, createWallet, mutezToXtz, xtzToMutez
```

---

## Best practices

1. **One Beacon wallet instance** — Create `BeaconWallet` once (e.g. in context) and share via React Context. Avoid multiple instances.
2. **One TezosToolkit** — Create one `TezosToolkit` per RPC and set the wallet provider after connect: `tezos.setWalletProvider(wallet)`.
3. **Env for config** — Use `VITE_*` in `.env` for RPC, network, and app name so you can switch Shadownet/mainnet/Etherlink without code changes.
4. **Read vs write** — Use `tezos.contract.at(kt1)` for read-only storage; use `tezos.wallet.at(kt1)` when the user will sign (e.g. contract calls).
5. **Shadownet first** — Develop and demo on Shadownet (Ghostnet is being discontinued); switch to mainnet or Etherlink when ready.

---

## Environment variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_RPC_URL` | Tezos RPC endpoint | `https://rpc.shadownet.teztnets.com` |
| `VITE_NETWORK` | `shadownet` or `mainnet` | `shadownet` |
| `VITE_APP_NAME` | App name in wallet prompt | `Tezos Launchpad` |
| `VITE_APP_ICON` | Icon URL for wallet UI | Tezos favicon |
| `VITE_DEMO_CONTRACT` | Optional KT1 for “Read storage” placeholder | (empty) |
| `VITE_GITHUB_REPO` | GitHub repo for "Add a tutorial" link (e.g. your fork) | `https://github.com/panagot/Tezos-From-zero-to-dApp` |

Copy `.env.example` to `.env` and adjust if needed.

---

## Contributing tutorials

The sidebar lists **Coming soon** topics (smart contract basics, LIGO/Michelson, FA2, views, Taqueria, Etherlink, etc.). To **suggest or add a tutorial**, open an issue or PR on the project's GitHub repo. Set `VITE_GITHUB_REPO` in `.env` so the in-app **Add a tutorial** link points to your repo's issues/discussions.

---

## Scripts

- `npm run dev` — Start Vite dev server (default port 5179).
- `npm run build` — Production build.
- `npm run preview` — Preview production build locally.

---

## References

- [Tezos](https://tezos.com/)
- [Tezos Docs](https://docs.tezos.com/) — tutorials, wallets, contracts
- [Taquito](https://taquito.io/) — JavaScript/TypeScript SDK
- [Beacon](https://docs.walletbeacon.io/) — wallet connection standard (TZIP-10)
- [Shadownet](https://teztnets.com/shadownet-about) — testnet (migrate from Ghostnet; [TzKT Shadownet](https://shadownet.tzkt.io/))
- [Etherlink](https://etherlink.com/) — Tezos L2
- [Tezos Foundation Grants](https://grants.tezos.foundation/)
