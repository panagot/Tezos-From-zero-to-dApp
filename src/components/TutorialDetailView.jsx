import { CodeSnippet } from './CodeSnippet';
import { PracticeColumn } from './PracticeColumn';
import { getTutorialById } from '../tutorialsConfig';

/** Per-lesson hint for "Where to practice" in the practice panel. */
const PRACTICE_WHERE = {
  'connect-and-balance': 'Dashboard → click Demo wallet or Connect wallet, then check the Balance card.',
  'display-address-balance': 'Dashboard → after connecting, the Balance card and sidebar show address and balance from useWallet().',
  'send-transfer': 'Dashboard → Send XTZ card. Use Demo wallet for a simulated send, or connect a real wallet for an on-chain transfer.',
  'read-storage': 'Dashboard → Read contract storage card. Paste any Shadownet KT1 address and click Read storage (no wallet needed).',
  'call-entrypoint': 'Dashboard → Call contract (counter) card. Paste a counter KT1 and click Increment or Decrement (real wallet required).',
  'op-hash-explorer': 'After any send or contract call, the success message includes a "View in Explorer" link. Try Send XTZ or Call contract.',
  'wallet-context': 'The whole app uses WalletContext. Open src/context/WalletContext.jsx and src/components/BalanceCard.jsx in your editor.',
  'env-networks': 'Edit .env (copy from .env.example) and change VITE_RPC_URL or VITE_NETWORK, then restart npm run dev.',
  'error-handling': 'Try rejecting the wallet connection, or reject a transfer in the wallet popup, to see the error messages in the UI.',
};

/** Per-lesson "what you'll see" — describes or mocks the output of the code they type. */
const OUTPUT_PREVIEW = {
  'connect-and-balance': { description: 'After connecting, the wallet popup closes and the app shows the active account and balance from the RPC.', mock: 'balance' },
  'display-address-balance': { description: 'Components using useWallet() get address and balance. The sidebar and Balance card update when the user connects.', mock: 'balance' },
  'send-transfer': { description: 'A transfer form sends XTZ. After confirmation, the UI shows the operation hash and a link to the explorer.', mock: 'transfer' },
  'read-storage': { description: 'The app reads contract storage (e.g. an int). The result appears in the Read contract card without signing.', mock: 'storage' },
  'call-entrypoint': { description: 'The wallet prompts to sign. After confirmation, the contract state updates and the UI reflects the new value.', mock: 'call' },
  'op-hash-explorer': { description: 'Success message shows the operation hash and a "View in Explorer" link opening TzKT.', mock: 'opHash' },
  'wallet-context': { description: 'One shared wallet instance. Any component can call useWallet() to get address, balance, connect, disconnect.', mock: 'balance' },
  'env-networks': { description: 'The app uses the RPC and network from .env. Switching VITE_NETWORK changes explorer and API URLs.', mock: null },
  'error-handling': { description: 'Errors (rejected connection, failed transfer) appear in the UI. User can dismiss and try again.', mock: null },
};

export function TutorialDetailView({ tutorialId, onBack, styles: s }) {
  const tutorial = getTutorialById(tutorialId);
  const title = tutorial?.label ?? 'Tutorial';
  const level = tutorial?.level ?? '';

  const content = CONTENT[tutorialId];
  if (!content) {
    return (
      <div className={s.instructions}>
        <button type="button" className={s.instructionsBack} onClick={onBack}>← Back</button>
        <h2 className={s.instructionsTitle}>{title}</h2>
        <p className={s.muted}>Content for this tutorial is coming soon.</p>
      </div>
    );
  }

  const firstSectionWithCode = content.sections?.find((sec) => sec.code);
  const practiceSnippet = firstSectionWithCode?.code ?? '';

  return (
    <div className={s.tutorialWithPractice}>
      <div className={s.tutorialContentCol}>
        <button type="button" className={s.instructionsBack} onClick={onBack}>← Back to Dashboard</button>
        <div className={s.tutorialMeta}>
          {level && <span className={s.tutorialLevelBadge}>{level}</span>}
          {tutorial?.minutes != null && <span className={s.tutorialDuration}>~{tutorial.minutes} min</span>}
        </div>
        <h2 className={s.instructionsTitle}>{title}</h2>
        <p className={s.instructionsIntro}>{content.intro}</p>
        <div className={s.instructionsBody}>
          {content.sections?.map((section, i) => (
            <section key={i} className={s.instructionsSection}>
              <h3>{section.title}</h3>
              {typeof section.body === 'function' ? section.body(s) : section.body}
              {section.code && <CodeSnippet code={section.code} title={section.codeTitle} />}
            </section>
          ))}
        </div>
      </div>
      <aside className={`${s.practiceColumn} ${OUTPUT_PREVIEW[tutorialId] ? s.practiceColumnWithOutput : ''}`} aria-label="Practice code">
        <PracticeColumn
          practiceWhere={PRACTICE_WHERE[tutorialId]}
          initialCode={practiceSnippet}
          outputPreview={OUTPUT_PREVIEW[tutorialId]}
          styles={s}
        />
      </aside>
    </div>
  );
}

const CONTENT = {
  'connect-and-balance': {
    intro: 'Connecting a wallet is the first step in any Tezos dApp. You create a single BeaconWallet and TezosToolkit, request the user\'s permission via the Beacon (TZIP-10) protocol, then read the active account and its balance from the RPC. This tutorial shows the exact code used in this app.',
    sections: [
      {
        title: '1. Create wallet and toolkit',
        body: (s) => (
          <>
            <p>Use <strong>one</strong> <code>BeaconWallet</code> and <strong>one</strong> <code>TezosToolkit</code> per app. The toolkit talks to the Tezos node (RPC); the wallet is the signer. Set the RPC URL for your network (e.g. Shadownet) and attach the wallet as the provider so that operations are signed by the user.</p>
            <ul>
              <li><code>BeaconWallet</code> handles the connection handshake with Temple, Kukai, or any TZIP-10 wallet.</li>
              <li><code>TezosToolkit</code> is the main API for reading balance, sending transfers, and calling contracts.</li>
            </ul>
            <div className={s.tutorialCallout}><strong>In this app:</strong> See <code>src/context/WalletContext.jsx</code> and <code>src/lib/tezos.js</code>. The Balance card on the Dashboard shows the result of this flow after you click Connect wallet or Demo wallet.</div>
          </>
        ),
        code: `import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';

const RPC_URL = 'https://rpc.shadownet.teztnets.com';
const tezos = new TezosToolkit(RPC_URL);
const wallet = new BeaconWallet({
  name: 'My dApp',
  network: { type: 'shadownet' }
});
tezos.setWalletProvider(wallet);`,
        codeTitle: 'Setup (one wallet, one toolkit)',
      },
      {
        title: '2. Request connection and get balance',
        body: (s) => (
          <>
            <p>Call <code>requestPermissions()</code> to open the wallet pairing popup. After the user approves, get the active account and fetch the balance. The RPC returns balance in <strong>mutez</strong> (1 XTZ = 1,000,000 mutez).</p>
            <ul>
              <li><code>wallet.client.getActiveAccount()</code> returns the connected account (address, public key).</li>
              <li><code>tezos.tz.getBalance(address)</code> returns a BigNumber in mutez; divide by 1e6 for XTZ.</li>
            </ul>
            <div className={s.tutorialCallout}><strong>Example:</strong> If balance is <code>1500000</code> mutez, that is 1.5 XTZ. Display it as <code>(balance.toNumber() / 1e6).toFixed(2)</code> for two decimals.</div>
          </>
        ),
        code: `await wallet.requestPermissions();
const account = await wallet.client.getActiveAccount();
const address = account.address;  // e.g. tz1VSUr8wwNhLAzempoch5d6hLRxTh8cjcjb
const balance = await tezos.tz.getBalance(address);
// balance is a BigNumber in mutez; 1 XTZ = 1e6 mutez
const xtz = balance.toNumber() / 1e6;`,
        codeTitle: 'Connect and get balance',
      },
    ],
  },
  'display-address-balance': {
    intro: 'To avoid passing wallet state through every component, we use a React Context. The context holds the connected address, balance, and methods (connect, disconnect). Any component can call useWallet() and display the data. This is the same pattern used in this app\'s Balance card and sidebar.',
    sections: [
      {
        title: '1. Context value',
        body: (s) => (
          <>
            <p>Create a context that provides <code>address</code>, <code>balance</code>, <code>tezos</code>, <code>connect</code>, and <code>disconnect</code>. After a successful <code>requestPermissions()</code>, set the address and fetch the balance, then store both in state so the provider value updates and all consumers re-render.</p>
            <ul>
              <li>Keep the wallet and toolkit in a ref or useMemo so they are created once.</li>
              <li>Export a custom hook <code>useWallet()</code> so components don\'t touch the context directly.</li>
            </ul>
            <div className={s.tutorialCallout}><strong>In this app:</strong> <code>src/context/WalletContext.jsx</code> wraps the app in <code>WalletProvider</code>. The sidebar and Balance card both use <code>useWallet()</code>.</div>
          </>
        ),
        code: `const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  // ... after connect: setAddress(account.address), setBalance(await tezos.tz.getBalance(...))
  return (
    <WalletContext.Provider value={{ address, balance, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);`,
        codeTitle: 'WalletContext and useWallet',
      },
      {
        title: '2. Display in a component',
        body: (s) => (
          <>
            <p>Any child of the provider can call <code>useWallet()</code> and render the address (shortened for UI) and balance. Format the address as <code>address.slice(0, 8) + '…' + address.slice(-6)</code> so users can copy the full value from a tooltip.</p>
            <div className={s.tutorialCallout}><strong>Example output:</strong> Address: <code>tz1VSUr8…cjcjb</code>, Balance: <code>12.50 XTZ</code>. See <code>src/components/BalanceCard.jsx</code> in this repo.</div>
          </>
        ),
        code: `function BalanceCard() {
  const { address, balance } = useWallet();
  if (!address) return <p>Not connected</p>;
  const xtz = balance ? balance.toNumber() / 1e6 : 0;
  return (
    <div>
      <p>Address: {address.slice(0, 8)}…{address.slice(-6)}</p>
      <p>Balance: {xtz} XTZ</p>
    </div>
  );
}`,
        codeTitle: 'Using useWallet in a component',
      },
    ],
  },
  'send-transfer': {
    intro: 'Sending XTZ is the most common operation: you build a transfer with a recipient address and amount in mutez, the user signs in their wallet, and you wait for at least one confirmation before updating the UI. This tutorial shows the exact pattern used in the Send XTZ card.',
    sections: [
      {
        title: '1. Build and send the transfer',
        body: (s) => (
          <>
            <p><code>tezos.wallet.transfer({'{ to, mutez }'})</code> builds the operation; <code>.send()</code> triggers the wallet popup and returns an operation object. The recipient can be any <code>tz1</code>, <code>tz2</code>, <code>tz3</code>, or <code>KT1</code> (contract) address.</p>
            <ul>
              <li>Amount must be in <strong>mutez</strong>. Example: 0.5 XTZ = <code>500000</code> mutez.</li>
              <li>Validate the address format before sending (Tezos addresses have a specific prefix and length).</li>
            </ul>
            <div className={s.tutorialCallout}><strong>Example:</strong> Sending 0.1 XTZ to <code>tz1VSUr8wwNhLAzempoch5d6hLRxTh8cjcjb</code> uses <code>mutez: 100000</code>. Try it in the <strong>Send XTZ</strong> card on the Dashboard (use Demo wallet for a simulated send).</div>
          </>
        ),
        code: `const to = 'tz1VSUr8wwNhLAzempoch5d6hLRxTh8cjcjb';
const amountMutez = 100000;  // 0.1 XTZ
const op = await tezos.wallet.transfer({ to, mutez: amountMutez }).send();`,
        codeTitle: 'Build and send transfer',
      },
      {
        title: '2. Wait for confirmation and show the hash',
        body: (s) => (
          <>
            <p>Wait for one block with <code>await op.confirmation(1)</code> so the operation is included on chain. Then use <code>op.hash</code> to build a TzKT explorer link so the user can verify the transaction.</p>
            <div className={s.tutorialCallout}><strong>In this app:</strong> After a successful send, the green success message includes a "View in Explorer" link. The hash looks like <code>opXXXXXXXX...</code> (starts with <code>op</code>).</div>
          </>
        ),
        code: `await op.confirmation(1);
console.log('Included in block:', op.hash);
// Build explorer URL: \`https://shadownet.tzkt.io/\${op.hash}\``,
        codeTitle: 'Confirmation and hash',
      },
    ],
  },
  'read-storage': {
    intro: "Reading a contract’s storage is read-only (no wallet). You get current state. Try the Read contract storage card.",
    sections: [
      {
        title: '1. Contract instance and storage (read-only)',
        body: (s) => (
          <>
            <p>Use <code>tezos.contract.at(contractAddress)</code> then <code>contract.storage()</code>. Result can be a number (e.g. <code>42</code>) or an object. Works without a wallet. Try the <strong>Read contract storage</strong> card with any Shadownet KT1.</p>
            <div className={s.tutorialCallout}><strong>Example output:</strong> <code>{'{ "counter": 42 }'}</code> or <code>42</code> for a simple counter.</div>
          </>
        ),
        code: `const contractAddress = 'KT1...';
const contract = await tezos.contract.at(contractAddress);
const storage = await contract.storage();
console.log(storage);  // e.g. { 0: 42 } for a simple counter`, codeTitle: 'Read storage (no wallet)' },
      {
        title: '2. Read vs write',
        body: (s) => (
          <>
            <p>Read: <code>tezos.contract.at()</code> — RPC only. Write: <code>tezos.wallet.at()</code> then <code>methods.entrypointName(args).send()</code> so the user signs. In this app, Read contract storage uses <code>contract.at()</code>; Call contract (counter) uses <code>wallet.at()</code>.</p>
          </>
        ),
        code: `// Read: no sign
const c = await tezos.contract.at('KT1...');
const s = await c.storage();

// Write: user must sign
const cw = await tezos.wallet.at('KT1...');
await cw.methods.increment(1).send();`, codeTitle: 'Read vs write' },
    ],
  },
  'call-entrypoint': {
    intro: 'Call a contract entrypoint (e.g. increment on a counter). Taquito generates methods from the contract’s interface.',
    sections: [
      { title: 'Wallet contract and method', body: <p>Use <code>tezos.wallet.at(contractAddress)</code> so the user’s wallet signs. Then call the generated method and <code>.send()</code>.</p>, code: `const contract = await tezos.wallet.at('KT1...');
// For a counter with entrypoint increment(nat):
await contract.methods.increment(1).send();`, codeTitle: 'Call entrypoint' },
      { title: 'Confirmation', body: <p>Wait for at least one confirmation before updating UI or balance.</p>, code: `const op = await contract.methods.increment(1).send();
await op.confirmation(1);
// op.hash for explorer link`, codeTitle: 'Wait for confirmation' },
      {
        title: '3. Example in this app',
        body: (s) => (
          <div className={s.tutorialCallout}>
            <strong>Try it:</strong> Open the <strong>Call contract (counter)</strong> card on the Dashboard. Paste a counter contract KT1 (deploy one from Tezos docs or use a Shadownet counter). Click Increment (1) or Decrement (1). Requires a real wallet (Temple/Kukai); Demo wallet cannot sign. See <code>src/components/ContractCall.jsx</code>.
          </div>
        ),
      },
    ],
  },
  'op-hash-explorer': {
    intro: 'Every operation returns a hash. Use it to build a TzKT explorer URL so users can open the transaction in the browser.',
    sections: [
      { title: 'Get hash after send', body: <p><code>.send()</code> returns an object with <code>hash</code>. Wait for confirmation, then use the hash for the link.</p>, code: `const op = await tezos.wallet.transfer({ to, mutez }).send();
await op.confirmation(1);
const explorerUrl = \`https://shadownet.tzkt.io/\${op.hash}\`;
// Show link: <a href={explorerUrl}>View in Explorer</a>`, codeTitle: 'Operation hash and explorer URL' },
      { title: 'Per-network explorer', body: <p>Use your app’s network config so the base URL matches Shadownet, mainnet, or Etherlink.</p>, code: `const EXPLORER = import.meta.env.VITE_NETWORK === 'mainnet'
  ? 'https://tzkt.io'
  : 'https://shadownet.tzkt.io';
const link = \`\${EXPLORER}/\${op.hash}\`;`, codeTitle: 'Network-aware explorer base' },
      {
        title: '3. Example in this app',
        body: (s) => (
          <div className={s.tutorialCallout}>
            <strong>Try it:</strong> Send XTZ from the <strong>Send XTZ</strong> card (or call a contract). After confirmation, the green success message shows a <strong>View in Explorer</strong> link. The hash looks like <code>op2abc3Def4...</code>. See <code>src/components/TransferForm.jsx</code> and <code>constants.js</code> for <code>EXPLORER_URL</code>.
          </div>
        ),
      },
    ],
  },
  'wallet-context': {
    intro: "Centralising the wallet and TezosToolkit in a React context lets every component access the same instance. Use a single BeaconWallet and share it via a provider. Multiple BeaconWallet instances cause duplicate pairing prompts and bugs.",
    sections: [
      {
        title: '1. Single wallet and toolkit',
        body: (s) => (
          <>
            <p>Create the wallet and toolkit once (e.g. with <code>useMemo</code>) and set the wallet as the toolkit provider. Never create multiple BeaconWallet instances in one app — the Beacon protocol expects one dApp identity per origin.</p>
            <div className={s.tutorialCallout}><strong>Example:</strong> In this app, <code>WalletContext.jsx</code> creates <code>BeaconWallet</code> and <code>TezosToolkit</code> in useMemo and passes them in the context value.</div>
          </>
        ),
        code: `const wallet = useMemo(() => new BeaconWallet({
  name: APP_NAME,
  network: { type: 'shadownet' }
}), []);
const tezos = useMemo(() => {
  const t = new TezosToolkit(RPC_URL);
  t.setWalletProvider(wallet);
  return t;
}, [wallet]);`, codeTitle: 'One wallet, one toolkit' },
      {
        title: '2. Connect and expose state',
        body: (s) => (
          <>
            <p>On connect, call <code>requestPermissions()</code>, then get the active account and fetch balance with <code>tezos.tz.getBalance(address)</code>. Store address and balance in state and expose them (with <code>connect</code>, <code>disconnect</code>, <code>tezos</code>) via the context provider value.</p>
          </>
        ),
        code: `const connect = async () => {
  await wallet.requestPermissions();
  const account = await wallet.client.getActiveAccount();
  setAddress(account.address);
  const bal = await tezos.tz.getBalance(account.address);
  setBalance(bal);
};
// Provider value: { address, balance, tezos, connect, disconnect }`, codeTitle: 'Connect and set state' },
      {
        title: '3. Example in this app',
        body: (s) => (
          <div className={s.tutorialCallout}>
            <strong>Where to see it:</strong> <code>src/context/WalletContext.jsx</code> holds the single BeaconWallet and TezosToolkit in useMemo, exposes connect/disconnect and address/balance. <code>BalanceCard.jsx</code>, <code>TransferForm.jsx</code>, and the sidebar all use <code>useWallet()</code>. Never create a second BeaconWallet in the same app.
          </div>
        ),
      },
    ],
  },
  'env-networks': {
    intro: "Environment variables let you switch networks (Shadownet, mainnet, Etherlink) without changing code. In Vite, prefix with VITE_ to expose to the client. This app uses VITE_RPC_URL, VITE_NETWORK, and optional VITE_DEMO_CONTRACT.",
    sections: [
      {
        title: '1. Vite env',
        body: (s) => (
          <>
            <p>Prefix with <code>VITE_</code> so the variable is available in the browser. Read with <code>import.meta.env.VITE_RPC_URL</code>, etc. Add a <code>.env</code> file (and <code>.env.example</code> for docs) and do not commit secrets.</p>
            <div className={s.tutorialCallout}><strong>Example:</strong> <code>VITE_RPC_URL=https://rpc.shadownet.teztnets.com</code>, <code>VITE_NETWORK=shadownet</code>. For mainnet use <code>mainnet</code> and a mainnet RPC URL.</div>
          </>
        ),
        code: `// .env
VITE_RPC_URL=https://rpc.shadownet.teztnets.com
VITE_NETWORK=shadownet

// In code
const RPC_URL = import.meta.env.VITE_RPC_URL;
const network = import.meta.env.VITE_NETWORK;`, codeTitle: '.env and usage' },
      {
        title: '2. Network-specific config',
        body: (s) => (
          <>
            <p>Derive <code>EXPLORER_URL</code>, <code>TZKT_API_URL</code>, and <code>FAUCET_URL</code> from <code>VITE_NETWORK</code> so the UI shows the right explorer and faucet links (e.g. shadownet.tzkt.io vs tzkt.io).</p>
          </>
        ),
        code: `const EXPLORER_URL = network === 'mainnet'
  ? 'https://tzkt.io'
  : 'https://shadownet.tzkt.io';
const FAUCET_URL = network === 'shadownet'
  ? 'https://faucet.shadownet.teztnets.com'
  : null;`, codeTitle: 'Explorer and faucet by network' },
      {
        title: '3. Example in this app',
        body: (s) => (
          <div className={s.tutorialCallout}>
            <strong>Where to see it:</strong> <code>src/constants.js</code> reads <code>VITE_RPC_URL</code>, <code>VITE_NETWORK</code> and sets <code>EXPLORER_URL</code>, <code>TZKT_API_URL</code>, <code>FAUCET_URL</code>. Copy <code>.env.example</code> to <code>.env</code> and change values to switch networks without code changes.
          </div>
        ),
      },
    ],
  },
  'error-handling': {
    intro: "Users can reject the wallet connection or a transaction; the network can fail. Use try/catch around requestPermissions() and transfer(). Optionally add a timeout so the Connect button does not hang if the wallet never responds.",
    sections: [
      {
        title: '1. User rejects or closes popup',
        body: (s) => (
          <>
            <p>If the user denies the wallet prompt or closes the popup, the Beacon SDK throws. Catch and check <code>err.message</code> or <code>err.name</code> (e.g. "rejected", "PermissionRequestNotFound") and show a clear message like "Connection cancelled".</p>
            <div className={s.tutorialCallout}><strong>Example:</strong> This app uses a 60-second timeout around <code>requestPermissions()</code> so the button stops loading if no wallet responds.</div>
          </>
        ),
        code: `try {
  await wallet.requestPermissions();
  // ... fetch address, balance
} catch (err) {
  if (err.message?.includes('rejected') || err.name === 'PermissionRequestNotFound') {
    setError('Connection cancelled');
  } else {
    setError(err.message || 'Connection failed');
  }
}`, codeTitle: 'Catch connection errors' },
      {
        title: '2. Transfer and confirmation',
        body: (s) => (
          <>
            <p>Wrap <code>tezos.wallet.transfer(...).send()</code> and <code>op.confirmation(1)</code> in try/catch. The user can reject the transfer in the wallet; the RPC can fail. Call <code>onError(message)</code> or set state so the UI shows the error.</p>
          </>
        ),
        code: `try {
  const op = await tezos.wallet.transfer({ to, mutez }).send();
  await op.confirmation(1);
  onSuccess(op.hash);
} catch (err) {
  if (err.message?.includes('rejected')) {
    onError('Transaction cancelled');
  } else {
    onError(err.message || 'Transaction failed');
  }
}`, codeTitle: 'Transfer try/catch' },
      {
        title: '3. Example in this app',
        body: (s) => (
          <div className={s.tutorialCallout}>
            <strong>Where to see it:</strong> <code>WalletContext.jsx</code> wraps <code>requestPermissions()</code> in try/catch and uses a 60s timeout so the Connect button does not hang. <code>TransferForm.jsx</code> catches transfer rejection and RPC errors and calls <code>onError</code>. User rejection typically sets <code>err.message</code> with "rejected" or similar.
          </div>
        ),
      },
    ],
  },
};
