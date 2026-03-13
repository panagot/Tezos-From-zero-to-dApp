import { useWallet } from '../context/WalletContext';
import { mutezToXtz } from '../lib/tezos';
import { Tooltip } from './Tooltip';
import { IconBalance } from './Icons';
import styles from '../App.module.css';

const BALANCE_TOOLTIP = 'Your XTZ balance from the Tezos RPC. For a real wallet we call tezos.tz.getBalance(address). Demo wallet shows a simulated value. 1 XTZ = 1,000,000 mutez.';

export function BalanceCard() {
  const { address, balance, connected, refreshBalance, loading, network, isDemo } = useWallet();

  if (!connected) {
    return (
      <div className={styles.card}>
        <div className={styles.cardTitleRow}>
          <span className={styles.cardIcon} aria-hidden><IconBalance /></span>
          <Tooltip content={BALANCE_TOOLTIP}>
            <h3 className={styles.cardTitle}>Balance</h3>
          </Tooltip>
        </div>
        <p className={styles.muted}>Connect your wallet to see your XTZ balance.</p>
      </div>
    );
  }

  const xtz = balance != null ? mutezToXtz(balance) : '—';

  return (
    <div className={styles.card}>
      <div className={styles.cardTitleRow}>
        <span className={styles.cardIcon} aria-hidden><IconBalance /></span>
        <Tooltip content={BALANCE_TOOLTIP}>
          <h3 className={styles.cardTitle}>Balance</h3>
        </Tooltip>
      </div>
      <span className={styles.balanceLabel}>XTZ ({network}{isDemo ? ', demo' : ''})</span>
      <p className={styles.balanceValue}>{xtz} XTZ</p>
      {!isDemo && (
        <button
          type="button"
          className={styles.secondaryBtn}
          onClick={refreshBalance}
          disabled={loading}
          style={{ marginTop: '0.75rem' }}
        >
          Refresh
        </button>
      )}
    </div>
  );
}
