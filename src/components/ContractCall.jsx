import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { Tooltip } from './Tooltip';
import { getContractAddressError } from '../lib/address';
import { IconCall } from './Icons';
import styles from '../App.module.css';

const CALL_TOOLTIP = 'Call a contract entrypoint (e.g. increment/decrement on a counter). Uses tezos.wallet.at(addr) so your wallet signs. The contract must have methods like increment(nat) or decrement(nat).';

/**
 * Call a counter contract's "increment" entrypoint (optional "decrement").
 * Contract must have entrypoints: increment(nat), optionally decrement(nat).
 */
export function ContractCall({ onError, onSuccess }) {
  const { tezos, connected, isDemo } = useWallet();
  const [contractAddr, setContractAddr] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastOpHash, setLastOpHash] = useState(null);

  const callIncrement = async (delta = 1) => {
    const addr = contractAddr.trim();
    const addrErr = getContractAddressError(addr);
    if (addrErr) {
      onError?.(addrErr);
      return;
    }
    if (!connected) {
      onError?.('Connect your wallet first');
      return;
    }
    setLoading(true);
    onError?.(null);
    try {
      const contract = await tezos.wallet.at(addr);
      const method = delta >= 0 ? 'increment' : 'decrement';
      const op = await contract.methods[method](Math.abs(delta)).send();
      await op.confirmation(1);
      setLastOpHash(op.hash);
      onSuccess?.(`Called ${method}(${Math.abs(delta)}). Confirmed.`);
    } catch (err) {
      onError?.(err.message || 'Contract call failed');
    } finally {
      setLoading(false);
    }
  };

  if (connected && isDemo) {
    return (
      <div className={styles.card}>
        <div className={styles.cardTitleRow}>
          <span className={styles.cardIcon} aria-hidden><IconCall /></span>
          <Tooltip content={CALL_TOOLTIP}>
            <h3 className={styles.cardTitle}>Call contract (counter)</h3>
          </Tooltip>
        </div>
        <p className={styles.muted}>
          Connect a real wallet (Temple, Kukai) to call contract entrypoints. Demo wallet cannot sign transactions.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardTitleRow}>
        <span className={styles.cardIcon} aria-hidden><IconCall /></span>
        <Tooltip content={CALL_TOOLTIP}>
          <h3 className={styles.cardTitle}>Call contract (counter)</h3>
        </Tooltip>
      </div>
      <p className={styles.cardBody} style={{ marginBottom: '1rem' }}>
        If you have a counter contract (with <code>increment(nat)</code> and optionally <code>decrement(nat)</code>), paste its KT1 address and click Increment or Decrement. Deploy one from the{' '}
        <a href="https://docs.tezos.com/tutorials" target="_blank" rel="noopener noreferrer">Tezos tutorials</a>.
      </p>
      <div className={styles.formRow}>
        <label className={styles.label}>Counter contract (KT1...)</label>
        <input
          type="text"
          className={styles.input}
          value={contractAddr}
          onChange={(e) => setContractAddr(e.target.value)}
          placeholder="KT1..."
          disabled={!connected}
        />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          className={styles.primaryBtn}
          disabled={!connected || loading}
          onClick={() => callIncrement(1)}
        >
          {loading ? '…' : 'Increment (1)'}
        </button>
        <button
          type="button"
          className={styles.secondaryBtn}
          disabled={!connected || loading}
          onClick={() => callIncrement(-1)}
        >
          Decrement (1)
        </button>
      </div>
      {lastOpHash && (
        <p className={styles.muted} style={{ marginTop: '0.75rem', fontSize: '0.85rem' }}>
          Last op: {lastOpHash.slice(0, 10)}…
        </p>
      )}
    </div>
  );
}
