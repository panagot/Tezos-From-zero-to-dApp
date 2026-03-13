import { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext';
import { TZKT_API_URL, EXPLORER_URL } from '../constants';
import { Tooltip } from './Tooltip';
import { IconActivity } from './Icons';
import styles from '../App.module.css';

const OPS_TOOLTIP = 'Last 8 operations for your address from the TzKT API. Each row links to the block explorer. Demo wallet has no on-chain history.';

const LIMIT = 8;

function formatTime(ts) {
  if (!ts) return '—';
  const d = new Date(ts);
  const now = new Date();
  const diff = (now - d) / 1000;
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function opKindLabel(kind) {
  const labels = {
    transaction: 'Transaction',
    delegation: 'Delegation',
    origination: 'Origination',
    activation: 'Activation',
  };
  return labels[kind] || kind;
}

export function OperationsList() {
  const { address, connected, isDemo } = useWallet();
  const [ops, setOps] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!connected || !address) {
      setOps([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetch(`${TZKT_API_URL}/v1/accounts/${address}/operations?limit=${LIMIT}&sort=desc`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setOps(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setOps([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [address, connected]);

  const titleRow = (
    <div className={styles.cardTitleRow}>
      <span className={styles.cardIcon} aria-hidden><IconActivity /></span>
      <Tooltip content={OPS_TOOLTIP}>
        <h3 className={styles.cardTitle}>Recent activity</h3>
      </Tooltip>
    </div>
  );

  if (!connected) {
    return (
      <div className={styles.card}>
        {titleRow}
        <p className={styles.muted}>Connect your wallet or use Demo wallet to get started.</p>
      </div>
    );
  }

  if (isDemo) {
    return (
      <div className={styles.card}>
        {titleRow}
        <p className={styles.muted}>No on-chain operations (demo wallet). Connect a real wallet to see history.</p>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      {titleRow}
      {loading ? (
        <p className={styles.muted}>Loading…</p>
      ) : ops.length === 0 ? (
        <p className={styles.muted}>No operations yet.</p>
      ) : (
        <ul className={styles.opsList}>
          {ops.map((op) => (
            <li key={op.id} className={styles.opsItem}>
              <span className={styles.opsKind}>{opKindLabel(op.type)}</span>
              <span className={styles.opsTime}>{formatTime(op.timestamp)}</span>
              {op.hash && (
                <a
                  href={`${EXPLORER_URL}/${op.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.opsLink}
                  title={op.hash}
                >
                  {op.hash.slice(0, 8)}…
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
