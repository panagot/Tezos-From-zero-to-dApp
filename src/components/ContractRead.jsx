import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { DEMO_CONTRACT_ADDRESS } from '../constants';
import { getContractAddressError } from '../lib/address';
import { Tooltip } from './Tooltip';
import { IconContract } from './Icons';
import styles from '../App.module.css';

const READ_TOOLTIP = 'Read contract storage via RPC—no wallet or signing needed. Use tezos.contract.at(addr) for read-only. Paste any KT1 (e.g. counter, FA1.2) from Shadownet.';

export function ContractRead() {
  const { tezos } = useWallet();
  const [contractAddr, setContractAddr] = useState(DEMO_CONTRACT_ADDRESS);
  const [storage, setStorage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRead = async (e) => {
    e?.preventDefault();
    const addr = contractAddr.trim();
    const addrErr = getContractAddressError(addr);
    if (addrErr) {
      setError(addrErr);
      return;
    }
    setLoading(true);
    setError(null);
    setStorage(null);
    try {
      const contract = await tezos.contract.at(addr);
      const st = await contract.storage();
      setStorage(typeof st === 'object' && st !== null ? JSON.stringify(st, null, 2) : String(st));
    } catch (err) {
      setError(err.message || 'Failed to read contract');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardTitleRow}>
        <span className={styles.cardIcon} aria-hidden><IconContract /></span>
        <Tooltip content={READ_TOOLTIP}>
          <h3 className={styles.cardTitle}>Read contract storage</h3>
        </Tooltip>
      </div>
      <p className={styles.cardBody} style={{ marginBottom: '1rem' }}>
        Enter a contract address (e.g. a counter or FA1.2 on Shadownet) to read its storage. Deploy your own with LIGO, SmartPy, or Archetype and paste the KT1 here.
      </p>
      <form onSubmit={handleRead}>
        <div className={styles.formRow}>
          <label className={styles.label}>Contract address (KT1...)</label>
          <input
            type="text"
            className={styles.input}
            value={contractAddr}
            onChange={(e) => setContractAddr(e.target.value)}
            placeholder="KT1..."
          />
        </div>
        <button type="submit" className={styles.primaryBtn} disabled={loading}>
          {loading ? 'Reading…' : 'Read storage'}
        </button>
      </form>
      {error && <p className={styles.muted} style={{ color: 'var(--danger)', marginTop: '0.75rem' }}>{error}</p>}
      {storage != null && (
        <pre className={styles.contractStorage} style={{ marginTop: '1rem' }}>
          {storage}
        </pre>
      )}
    </div>
  );
}
