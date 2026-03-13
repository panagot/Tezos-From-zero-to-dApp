import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { createTezosToolkit, createWallet } from '../lib/tezos';
import { RPC_URL, NETWORK, EXPLORER_URL } from '../constants';

const WalletContext = createContext(null);

/** Demo wallet: fixed address and starting balance (1000 XTZ in mutez) so students can try the app without installing Temple/Kukai. */
const DEMO_ADDRESS = 'tz1DemoWallet2ForTutorial1234567890AbCdEf';
const DEMO_BALANCE_MUTEZ = 1000 * 1_000_000; // 1000 XTZ

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within WalletProvider');
  return ctx;
}

export function WalletProvider({ children }) {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDemo, setIsDemo] = useState(false);

  const tezos = useMemo(() => createTezosToolkit(RPC_URL), []);
  const wallet = useMemo(() => createWallet(), []);

  const connect = useCallback(async () => {
    setLoading(true);
    setError(null);
    const timeoutMs = 60000;
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Connection timed out. Unlock your wallet, allow popups for this site, and try again.')), timeoutMs);
    });
    try {
      await Promise.race([wallet.requestPermissions(), timeoutPromise]);
      tezos.setWalletProvider(wallet);
      const activeAccount = await wallet.client.getActiveAccount();
      if (!activeAccount) {
        setError('No account received. Try connecting again.');
        return;
      }
      setIsDemo(false);
      const addr = activeAccount.address;
      setAddress(addr);
      const bal = await tezos.tz.getBalance(addr);
      setBalance(bal.toString());
    } catch (err) {
      const msg = err?.message || String(err) || 'Connection failed';
      setError(msg);
      setAddress(null);
      setBalance(null);
    } finally {
      setLoading(false);
    }
  }, [tezos, wallet]);

  const connectDemo = useCallback(() => {
    setError(null);
    setIsDemo(true);
    setAddress(DEMO_ADDRESS);
    setBalance(String(DEMO_BALANCE_MUTEZ));
  }, []);

  const disconnect = useCallback(async () => {
    if (isDemo) {
      setAddress(null);
      setBalance(null);
      setIsDemo(false);
      setError(null);
      return;
    }
    setLoading(true);
    try {
      await wallet.client.clearActiveAccount();
      setAddress(null);
      setBalance(null);
      setIsDemo(false);
      setError(null);
    } finally {
      setLoading(false);
    }
  }, [wallet, isDemo]);

  const refreshBalance = useCallback(async () => {
    if (!address) return;
    if (isDemo) return; // demo balance only changes on simulated send
    try {
      const bal = await tezos.tz.getBalance(address);
      setBalance(bal.toString());
    } catch {
      // ignore
    }
  }, [tezos, address, isDemo]);

  /** For demo wallet: deduct mutez from balance (simulated send). Returns new balance. */
  const deductDemoBalance = useCallback((mutez) => {
    if (!isDemo || balance == null) return null;
    const next = Math.max(0, Number(balance) - Number(mutez));
    setBalance(String(next));
    return next;
  }, [isDemo, balance]);

  useEffect(() => {
    if (isDemo) return;
    wallet.client.getActiveAccount()
      .then((acc) => {
        if (acc) {
          setAddress(acc.address);
          tezos.setWalletProvider(wallet);
          tezos.tz.getBalance(acc.address).then((b) => setBalance(b.toString())).catch(() => {});
        }
      })
      .catch(() => {});
  }, [wallet, tezos, isDemo]);

  const value = useMemo(
    () => ({
      address,
      balance,
      loading,
      error,
      setError,
      connect,
      connectDemo,
      disconnect,
      refreshBalance,
      deductDemoBalance,
      tezos,
      wallet,
      connected: !!address,
      isDemo,
      network: NETWORK,
      explorerUrl: EXPLORER_URL,
    }),
    [address, balance, loading, error, setError, connect, connectDemo, disconnect, refreshBalance, deductDemoBalance, tezos, wallet, isDemo]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}
