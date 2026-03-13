import { useState } from 'react';
import { Tooltip } from './Tooltip';
import { IconBook } from './Icons';
import styles from '../App.module.css';

const TERMS_TOOLTIP = 'Glossary of Tezos and dApp terms: XTZ, mutez, Shadownet, wallet, address, Beacon, RPC, operation hash. Expand for definitions.';

const TERMS = [
  { term: 'XTZ', def: 'The native token of the Tezos blockchain (also called “tez”). Used to pay fees and interact with contracts.' },
  { term: 'Mutez', def: 'Smallest unit of XTZ. 1 XTZ = 1,000,000 mutez. APIs often return amounts in mutez.' },
  { term: 'Shadownet', def: 'Tezos testnet. Use it to try dApps and contracts without real money. Get test XTZ from the faucet.' },
  { term: 'Wallet', def: 'Software that holds your keys and lets you sign transactions. Temple, Kukai, and others support the Beacon protocol.' },
  { term: 'Address', def: 'A Tezos identity (tz1…, tz2…, tz3… for accounts; KT1… for contracts). Others send XTZ to your address.' },
  { term: 'Beacon', def: 'Standard (TZIP-10) for dApp–wallet communication. One BeaconWallet instance per app.' },
  { term: 'RPC', def: 'Remote procedure call endpoint. Your app talks to the Tezos network via an RPC URL (e.g. Shadownet RPC).' },
  { term: 'Operation hash', def: 'Unique ID for a transaction. Use it to look up the operation in a block explorer (e.g. TzKT).' },
];

export function KeyTermsCard() {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.card}>
      <button
        type="button"
        className={styles.cardTitle}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="key-terms-list"
        style={{ width: '100%', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <span className={styles.cardTitleRow} style={{ marginBottom: 0 }}>
          <span className={styles.cardIcon} aria-hidden style={{ marginRight: '0.5rem' }}><IconBook /></span>
          <Tooltip content={TERMS_TOOLTIP}>
            <span>Key terms</span>
          </Tooltip>
        </span>
        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{open ? '▼' : '▶'}</span>
      </button>
      {open && (
        <dl id="key-terms-list" className={styles.keyTermsList} style={{ marginTop: '0.5rem', marginBottom: 0 }}>
          {TERMS.map(({ term, def }) => (
            <div key={term} className={styles.keyTermItem}>
              <dt className={styles.keyTermName}>{term}</dt>
              <dd className={styles.keyTermDef}>{def}</dd>
            </div>
          ))}
        </dl>
      )}
      {!open && (
        <p className={styles.muted} style={{ marginTop: '0.35rem', marginBottom: 0 }}>
          Glossary: XTZ, mutez, Shadownet, wallet, address, Beacon, RPC, operation hash. Click to expand.
        </p>
      )}
    </div>
  );
}
