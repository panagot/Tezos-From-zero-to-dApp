import { useState, useEffect } from 'react';
import { useWallet } from './context/WalletContext';
import { BalanceCard } from './components/BalanceCard';
import { TransferForm } from './components/TransferForm';
import { ContractRead } from './components/ContractRead';
import { ContractCall } from './components/ContractCall';
import { ResourcesCard } from './components/ResourcesCard';
import { OperationsList } from './components/OperationsList';
import { LearningOutcomesCard } from './components/LearningOutcomesCard';
import { KeyTermsCard } from './components/KeyTermsCard';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { LearningPathCard } from './components/LearningPathCard';
import { DashboardRightPanel } from './components/DashboardRightPanel';
import { Tooltip } from './components/Tooltip';
import { ForReviewersView } from './components/ForReviewersView';
import { TutorialDetailView } from './components/TutorialDetailView';
import { CodeSnippet } from './components/CodeSnippet';
import { TUTORIALS, TUTORIAL_LEVELS, COMING_SOON } from './tutorialsConfig';
import { GITHUB_REPO } from './constants';
import styles from './App.module.css';

const VIEWS = { dashboard: 'Dashboard', tutorial: 'Quickstart tutorial', reviewers: 'For reviewers' };
const tutorialIds = TUTORIALS.map((t) => t.id);

export default function App() {
  const { address, connect, connectDemo, disconnect, connected, loading, error, setError, explorerUrl, isDemo } = useWallet();
  const [view, setView] = useState('dashboard');
  const [flashMessage, setFlashMessage] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setError(null), 8000);
      return () => clearTimeout(t);
    }
  }, [error, setError]);

  useEffect(() => {
    if (flashMessage) {
      const t = setTimeout(() => setFlashMessage(null), 4000);
      return () => clearTimeout(t);
    }
  }, [flashMessage]);

  const handleTransferError = (msg) => {
    if (msg) setError(msg);
  };

  const handleTransferSuccess = (payload) => {
    setFlashMessage(typeof payload === 'string' ? { message: payload } : payload);
  };

  return (
    <div className={styles.layout}>
      <a href="#main-content" className={styles.skipLink}>Skip to main content</a>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHead}>
          <h1 className={styles.logo}>Launchpad</h1>
          <p className={styles.tagline}>Tezos · From zero to dApp</p>
        </div>
        <div className={styles.walletSection}>
          <div className={styles.walletRow}>
            {address ? (
              <span className={styles.address} title={address}>
                {address.slice(0, 8)}…{address.slice(-6)}
              </span>
            ) : (
              <span className={styles.addressPlaceholder}>No wallet</span>
            )}
            {address && (
              <button
                type="button"
                className={styles.copyBtn}
                title="Copy address"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(address);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  } catch {}
                }}
              >
                {copied ? '✓' : '⎘'}
              </button>
            )}
            {!connected && (
              <>
                <Tooltip content="Try the app with no install. You get a simulated address and 1000 XTZ to try balance, send, and contract read. No wallet extension or faucet needed.">
                  <button
                    type="button"
                    className={styles.demoBtn}
                    onClick={connectDemo}
                    disabled={loading}
                  >
                    Demo wallet
                  </button>
                </Tooltip>
                <Tooltip content="Connect Temple, Kukai, or any Beacon-compatible wallet. Make sure your wallet is set to Shadownet and you have test XTZ from the faucet.">
                  <button
                    type="button"
                    className={`${styles.walletBtn} ${styles.primary}`}
                    onClick={connect}
                    disabled={loading}
                  >
                    {loading ? '…' : 'Connect wallet'}
                  </button>
                </Tooltip>
              </>
            )}
            {connected && (
              <button
                type="button"
                className={styles.walletBtn}
                onClick={disconnect}
              >
                Disconnect
              </button>
            )}
          </div>
          {!connected && (
            <p className={styles.walletHint}>
              <strong>No wallet?</strong> Use <strong>Demo wallet</strong> to try the app right away. Or install Temple/Kukai and click Connect wallet.
            </p>
          )}
          {connected && isDemo && (
            <p className={styles.demoBadge}>Demo — no real funds. Install a wallet to send real transactions.</p>
          )}
          {loading && (
            <p className={styles.walletHint}>
              Check for a popup or your wallet extension. Allow popups for this site if nothing appears.
            </p>
          )}
        </div>
        <nav className={styles.nav}>
          <button
            type="button"
            className={view === 'dashboard' ? `${styles.navItem} ${styles.active}` : styles.navItem}
            onClick={() => setView('dashboard')}
          >
            Dashboard
          </button>
          {TUTORIAL_LEVELS.map((level) => (
            <div key={level}>
              <div className={styles.navSectionHeader}>{level.charAt(0).toUpperCase() + level.slice(1)}</div>
              {TUTORIALS.filter((t) => t.level === level).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={view === t.id ? `${styles.navItem} ${styles.active}` : styles.navItem}
                  onClick={() => setView(t.id)}
                  title={t.minutes ? `~${t.minutes} min` : undefined}
                >
                  <span className={styles.navItemLabel}>{t.label}</span>
                  {t.minutes != null && <span className={styles.navItemMeta}>~{t.minutes} min</span>}
                </button>
              ))}
              {COMING_SOON.filter((c) => c.level === level).length > 0 && (
                <>
                  <div className={styles.navComingSoonHeader}>Coming soon</div>
                  {COMING_SOON.filter((c) => c.level === level).map((c, i) => (
                    <div key={`${level}-${i}`} className={styles.navItemComingSoon} title={c.duration ? `Planned: ${c.duration}` : 'Coming soon'}>
                      <span className={styles.navItemLabel}>{c.label}</span>
                      {(c.series || c.duration) && (
                        <span className={styles.navItemComingSoonMeta}>
                          {c.series && 'Series'}
                          {c.series && c.duration && ' · '}
                          {c.duration}
                        </span>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
          <button
            type="button"
            className={view === 'tutorial' ? `${styles.navItem} ${styles.active}` : styles.navItem}
            onClick={() => setView('tutorial')}
          >
            Quickstart tutorial
          </button>
          <button
            type="button"
            className={view === 'reviewers' ? `${styles.navItem} ${styles.active}` : styles.navItem}
            onClick={() => setView('reviewers')}
          >
            For reviewers
          </button>
          <a
            href={`${GITHUB_REPO.replace(/\/$/, '')}/issues`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navItemLink}
            title="Suggest or add a tutorial on GitHub"
          >
            Add a tutorial →
          </a>
        </nav>
        <footer className={styles.sidebarFooter}>
          <span className={styles.footerBadge}>MIT · 6-month supported</span>
          <a href="https://tezos.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
            Tezos
          </a>
          <span style={{ opacity: 0.6 }}>·</span>
          <a href="https://docs.tezos.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
            Docs
          </a>
          <span style={{ opacity: 0.6 }}>·</span>
          <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
            GitHub
          </a>
        </footer>
      </aside>
      <main id="main-content" className={styles.main} tabIndex={-1}>
        {tutorialIds.includes(view) ? (
          <TutorialDetailView tutorialId={view} onBack={() => setView('dashboard')} styles={styles} />
        ) : view === 'tutorial' ? (
          <TutorialView onBack={() => setView('dashboard')} styles={styles} />
        ) : view === 'reviewers' ? (
          <ForReviewersView onBack={() => setView('dashboard')} styles={styles} />
        ) : (
          <div className={styles.dashboardLayout}>
            <div className={styles.dashboardContent}>
            <header className={styles.hero}>
              <h2 className={styles.heroTitle}>Your launchpad to building on Tezos</h2>
              <p className={styles.heroSubtitle}>
                Connect a wallet, send XTZ, and read or call contracts in minutes. Use <strong>Demo wallet</strong> to try with zero setup—no install, no faucet. Or connect Temple/Kukai on Shadownet for real testnet transactions.
              </p>
              <div className={styles.heroBadges}>
                <span className={styles.heroBadge}>React · Vite · Taquito · Beacon</span>
                <span className={`${styles.heroBadge} ${styles.heroBadgeAccent}`}>Shadownet</span>
                <span className={styles.heroBadge}>TZIP-10</span>
                <span className={styles.heroBadgeEducator} title="Designed for educators, workshops, and grant evaluation">Educator-friendly</span>
              </div>
            </header>
            <Tooltip content="We ship 9 live tutorials now; 50+ planned (short lessons + longer series). After grant approval we deliver 15 per tier (45 total) and expand series (LIGO, FA2, NFT marketplace, Etherlink, security, production dApp).">
              <div className={styles.expansionNote}>
                <strong>Sample:</strong> 3 coding tutorials per tier (9 live). Roadmap: <strong>50+ lessons</strong> and <strong>longer series</strong> (~45m–3h). Upon successful review we will create <strong>15 for each tier</strong> (45 total) plus expanded series.
              </div>
            </Tooltip>
            <div className={styles.grantReviewerCallout}>
              <h3 className={styles.grantReviewerCalloutTitle}>Grant reviewers: try the app in ~5 minutes</h3>
              <p>
                Click <strong>Demo wallet</strong> → try <strong>Send XTZ</strong> → open the sidebar tutorials → then open{' '}
                <button type="button" className={styles.inlineLink} onClick={() => setView('reviewers')}>
                  For reviewers
                </button>
                {' '}for the full step-by-step path, success metrics, differentiation, and code examples.
              </p>
            </div>
            <LearningPathCard />
            <ArchitectureDiagram />
            <LearningOutcomesCard />
            <KeyTermsCard />
            <p className={styles.accessibilityTip} role="note">
              <strong>Accessibility:</strong> Use Tab to move between buttons and links; collapsible sections support keyboard and screen readers.
            </p>
            {flashMessage && (
              <div className={styles.card} style={{ borderColor: 'var(--success)', marginBottom: '1rem' }}>
                <p className={styles.success}>{flashMessage.message ?? flashMessage}</p>
                {flashMessage.opHash && explorerUrl && (
                  <p className={styles.muted} style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                    <a href={`${explorerUrl}/${flashMessage.opHash}`} target="_blank" rel="noopener noreferrer">
                      View in Explorer →
                    </a>
                  </p>
                )}
              </div>
            )}
            <BalanceCard />
            <TransferForm onError={handleTransferError} onSuccess={handleTransferSuccess} />
            <ContractRead />
            <ContractCall onError={handleTransferError} onSuccess={(msg) => setFlashMessage({ message: msg })} />
            <OperationsList />
            <ResourcesCard />
            </div>
            <aside className={styles.dashboardRight} aria-label="Quick start reference">
              <DashboardRightPanel styles={styles} />
            </aside>
          </div>
        )}
        {error && (
          <div className={styles.error}>
            {error}
            <button type="button" className={styles.dismiss} onClick={() => setError(null)}>
              ×
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

function TutorialView({ onBack, styles: s }) {
  return (
    <div className={s.instructions}>
      <button type="button" className={s.instructionsBack} onClick={onBack}>
        ← Back to Dashboard
      </button>
      <h2 className={s.instructionsTitle}>Quickstart: your first Tezos dApp</h2>
      <p className={s.instructionsIntro}>
        This template uses <strong>React</strong>, <strong>Vite</strong>, <strong>Taquito</strong>, and <strong>Beacon</strong> to connect a wallet, read balances, send XTZ, and read contract storage. Follow the steps below; the app is already set up so you can try each step as you go.
      </p>
      <div className={s.reviewerSection} style={{ marginBottom: '1.5rem' }}>
        <h3>Learning objectives</h3>
        <ul className={s.learningOutcomes}>
          <li className={s.learningOutcomeItem}>Connect a Tezos wallet (Beacon) and display address and balance.</li>
          <li className={s.learningOutcomeItem}>Send a transfer, wait for confirmation, and open the operation in the explorer.</li>
          <li className={s.learningOutcomeItem}>Read contract storage via RPC and (with a real wallet) call an entrypoint.</li>
          <li className={s.learningOutcomeItem}>Use Shadownet and env config; understand read-only vs wallet-signed calls.</li>
        </ul>
      </div>
      <div className={s.instructionsBody}>
        <section className={s.instructionsSection}>
          <h3>1. Get a wallet (or skip with Demo)</h3>
          <p>Install Node.js 18+. Create a Tezos wallet on <strong>Shadownet</strong> (testnet) so you don’t use real funds:</p>
          <ul>
            <li>Install <a href="https://templewallet.com" target="_blank" rel="noopener noreferrer">Temple</a> or use <a href="https://shadownet.kukai.app" target="_blank" rel="noopener noreferrer">Kukai Shadownet</a>.
            </li>
            <li>Get test XTZ from the <a href="https://faucet.shadownet.teztnets.com" target="_blank" rel="noopener noreferrer">Shadownet faucet</a>.</li>
          </ul>
        </section>
        <section className={s.instructionsSection}>
          <h3>2. Clone and run (2 min)</h3>
          <p>Clone this repo, install dependencies, and start the dev server:</p>
          <CodeSnippet code={'git clone https://github.com/panagot/Tezos-From-zero-to-dApp\ncd Tezos-From-zero-to-dApp\nnpm install\nnpm run dev'} title="Terminal" />
          <p>Open the URL shown (e.g. http://localhost:5179).</p>
        </section>
        <section className={s.instructionsSection}>
          <h3>3. Connect (or use Demo)</h3>
          <p>Click <strong>Demo wallet</strong> to try the app with no extension, or <strong>Connect wallet</strong> to use Temple/Kukai. After connecting, your address and balance appear. Demo wallet lets you simulate sends; real wallet sends on-chain.</p>
        </section>
        <section className={s.instructionsSection}>
          <h3>4. Send a transaction (3 min)</h3>
          <p>In the <strong>Send XTZ</strong> card, enter a recipient address (e.g. another Shadownet address or your own) and an amount (e.g. 0.1). Click <strong>Send</strong>. Confirm in your wallet. After one confirmation, the balance updates.</p>
        </section>
        <section className={s.instructionsSection}>
          <h3>5. Read contract storage (3 min)</h3>
          <p>Deploy a simple contract to Shadownet (e.g. a counter from <a href="https://docs.tezos.com/tutorials" target="_blank" rel="noopener noreferrer">Tezos tutorials</a>), copy its KT1 address, and paste it in <strong>Read contract storage</strong>. Click <strong>Read storage</strong> to fetch the contract’s storage via the RPC—no wallet needed for reads.</p>
        </section>
        <section className={s.instructionsSection}>
          <h3>6. Next steps (3 min)</h3>
          <ul>
            <li><strong>Call an entrypoint:</strong> <code>const c = await tezos.wallet.at('KT1...'); await c.methods.increment(1).send();</code></li>
            <li><strong>Mainnet:</strong> Set <code>VITE_NETWORK=mainnet</code> and a mainnet RPC in <code>.env</code>.</li>
            <li><strong>Etherlink:</strong> Set <code>VITE_RPC_URL</code> to an Etherlink RPC for L2.</li>
          </ul>
          <p style={{ marginTop: '0.75rem' }}>Open <strong>For reviewers</strong> in the sidebar for full learning outcomes, target audience, and copy-paste code examples from this codebase.</p>
        </section>
      </div>
    </div>
  );
}
