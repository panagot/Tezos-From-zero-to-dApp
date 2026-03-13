import { useState } from 'react';
import { Tooltip } from './Tooltip';
import { IconTarget } from './Icons';
import styles from '../App.module.css';

const OUTCOMES_TOOLTIP = 'What developers will be able to do after using this stack: connect wallet, read balance, send XTZ, read/call contracts, use testnet and env config.';

const OUTCOMES = [
  'Connect a Tezos wallet (Beacon) from React with one shared instance',
  'Read balance and send XTZ with confirmation and explorer link',
  'Read contract storage via RPC and call entrypoints with the wallet',
  'Use testnet (Shadownet) and env config to switch networks',
  'Apply best practices: single BeaconWallet, read vs write scope',
];

export function LearningOutcomesCard() {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.card}>
      <button
        type="button"
        className={styles.cardTitle}
        onClick={() => setOpen(!open)}
        title={OUTCOMES_TOOLTIP}
        aria-expanded={open}
        aria-controls="learning-outcomes-list"
        style={{ width: '100%', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <span>What you’ll learn</span>
        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{open ? '▼' : '▶'}</span>
      </button>
      {open && (
        <ul id="learning-outcomes-list" className={styles.learningOutcomes} style={{ marginTop: '0.5rem', marginBottom: 0 }}>
          {OUTCOMES.map((item, i) => (
            <li key={i} className={styles.learningOutcomeItem}>{item}</li>
          ))}
        </ul>
      )}
      {!open && (
        <p className={styles.muted} style={{ marginTop: '0.35rem', marginBottom: 0 }}>
          Click to expand. Open <strong>Quickstart tutorial</strong> or <strong>For reviewers</strong> in the sidebar for full details and code examples.
        </p>
      )}
    </div>
  );
}
