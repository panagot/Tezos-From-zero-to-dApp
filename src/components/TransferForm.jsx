import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { xtzToMutez } from '../lib/tezos';
import { getAddressError } from '../lib/address';
import { Tooltip } from './Tooltip';
import { IconSend } from './Icons';
import styles from '../App.module.css';

const SEND_TOOLTIP = 'Send XTZ to any tz1/tz2/tz3 or KT1 address. The app builds a transfer with Taquito; your wallet signs. We wait for one confirmation then show the operation hash and a link to the block explorer.';

export function TransferForm({ onError, onSuccess }) {
  const { tezos, address, refreshBalance, connected, isDemo, deductDemoBalance } = useWallet();
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!connected || !address) {
      onError?.('Connect your wallet first');
      return;
    }
    const to = toAddress.trim();
    const mutez = xtzToMutez(amount);
    const addrErr = getAddressError(to);
    if (addrErr) {
      onError?.(addrErr);
      return;
    }
    if (mutez <= 0) {
      onError?.('Enter a valid amount (e.g. 0.5)');
      return;
    }
    setSending(true);
    onError?.(null);
    try {
      if (isDemo) {
        deductDemoBalance(mutez);
        setToAddress('');
        setAmount('');
        onSuccess?.({ message: `Demo: simulated send of ${amount} XTZ to ${to.slice(0, 12)}…. Connect a real wallet to send on-chain.` });
      } else {
        const op = await tezos.wallet.transfer({ to, mutez }).send();
        await op.confirmation(1);
        const opHash = op.hash;
        setToAddress('');
        setAmount('');
        await refreshBalance();
        onSuccess?.({ message: `Sent ${amount} XTZ to ${to.slice(0, 8)}…`, opHash });
      }
    } catch (err) {
      onError?.(err.message || 'Transfer failed');
    } finally {
      setSending(false);
    }
  };

  if (!connected) {
    return (
      <div className={styles.card}>
        <div className={styles.cardTitleRow}>
          <span className={styles.cardIcon} aria-hidden><IconSend /></span>
          <Tooltip content={SEND_TOOLTIP}>
            <h3 className={styles.cardTitle}>Send XTZ</h3>
          </Tooltip>
        </div>
        <p className={styles.muted}>Connect your wallet to send a transaction.</p>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardTitleRow}>
        <span className={styles.cardIcon} aria-hidden><IconSend /></span>
        <Tooltip content={SEND_TOOLTIP}>
          <h3 className={styles.cardTitle}>Send XTZ</h3>
        </Tooltip>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <label className={styles.label}>Recipient (tz1, tz2, tz3, or KT1)</label>
          <input
            type="text"
            className={styles.input}
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            placeholder="tz1VSUr8wwNhLAzempoch5d6hLRxTh8cjcjb"
          />
        </div>
        <div className={styles.formRow}>
          <label className={styles.label}>Amount (XTZ)</label>
          <input
            type="text"
            className={styles.input}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.5"
          />
        </div>
        <button type="submit" className={styles.primaryBtn} disabled={sending}>
          {sending ? 'Sending…' : 'Send'}
        </button>
      </form>
    </div>
  );
}
