import { useWallet } from '../context/WalletContext';
import { NETWORK, FAUCET_URL } from '../constants';
import { Tooltip } from './Tooltip';
import { IconLink } from './Icons';
import styles from '../App.module.css';

const RESOURCES_TOOLTIP = 'Links to block explorer (TzKT), testnet faucet for free XTZ, Tezos docs, and Taquito SDK. Your account link appears when connected.';

export function ResourcesCard() {
  const { explorerUrl, address } = useWallet();
  const isTestnet = NETWORK === 'shadownet';

  return (
    <div className={styles.card}>
      <div className={styles.cardTitleRow}>
        <span className={styles.cardIcon} aria-hidden><IconLink /></span>
        <Tooltip content={RESOURCES_TOOLTIP}>
          <h3 className={styles.cardTitle}>Network & resources</h3>
        </Tooltip>
      </div>
      <div className={styles.resourcesGrid}>
        <span className={styles.networkBadge}>{NETWORK}</span>
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.resourceLink}
        >
          Explorer (TzKT) →
        </a>
        {FAUCET_URL && (
          <a href={FAUCET_URL} target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
            Faucet (test XTZ) →
          </a>
        )}
        <a href="https://docs.tezos.com" target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
          Tezos Docs →
        </a>
        <a href="https://taquito.io" target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
          Taquito →
        </a>
        {address && explorerUrl && (
          <a
            href={`${explorerUrl}/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resourceLink}
          >
            My account in Explorer →
          </a>
        )}
      </div>
      {isTestnet && (
        <p className={styles.muted} style={{ marginTop: '0.75rem', fontSize: '0.85rem' }}>
          Using Shadownet testnet. Get test XTZ from the faucet to try transfers and contract calls.
        </p>
      )}
    </div>
  );
}
