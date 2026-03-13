import { CodeSnippet } from './CodeSnippet';
import styles from '../App.module.css';

const LEARNING_OUTCOMES = [
  'Connect a Tezos wallet (Beacon/TZIP-10) from a React app with a single shared instance.',
  'Read account balance and display it with correct XTZ/mutez handling.',
  'Send a transfer transaction and wait for confirmation; handle errors and show explorer links.',
  'Read contract storage via RPC (no wallet required) and call entrypoints with the wallet.',
  'Use a testnet (Shadownet) and env-based config to switch networks without code changes.',
  'Apply best practices: one BeaconWallet, one TezosToolkit, proper scope for read vs write.',
];

const CONNECT_SNIPPET = `// Single wallet instance (WalletContext.jsx)
const wallet = useMemo(() => new BeaconWallet({
  name: APP_NAME,
  network: { type: 'shadownet' }
}), []);
tezos.setWalletProvider(wallet);
await wallet.requestPermissions();
const account = await wallet.client.getActiveAccount();
// → account.address, then tezos.tz.getBalance(addr)
`;

const TRANSFER_SNIPPET = `// Send XTZ (TransferForm.jsx)
const op = await tezos.wallet
  .transfer({ to: recipientAddress, mutez: amountInMutez })
  .send();
await op.confirmation(1);
// → op.hash for explorer link
`;

const READ_STORAGE_SNIPPET = `// Read-only, no wallet (ContractRead.jsx)
const contract = await tezos.contract.at('KT1...');
const storage = await contract.storage();
// → storage is the contract's storage value
`;

export function ForReviewersView({ onBack, styles: s }) {
  return (
    <div className={s.instructions}>
      <button type="button" className={s.instructionsBack} onClick={onBack}>
        ← Back to Dashboard
      </button>
      <h2 className={s.instructionsTitle}>For reviewers & educators</h2>
      <p className={s.instructionsIntro}>
        This stack is designed to reduce time-to-first-deploy for new Tezos developers and to give grant reviewers and educators a clear, runnable example of a minimal but complete dApp. Below: learning outcomes, target audience, what’s included, and code examples from this repo.
      </p>
      <p className={s.expansionNote} style={{ marginBottom: '1rem' }}>
        <strong>Coding tutorials:</strong> The sidebar offers 3 coding tutorials per tier (Beginner, Advanced, Expert). Upon successful review we will create <strong>15 for each</strong>.
      </p>
      <div className={s.reviewerSection} style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(0,168,107,0.08)', borderLeft: '4px solid var(--accent)', borderRadius: '0 6px 6px 0' }}>
        <h3>Funding request</h3>
        <p className={s.muted} style={{ margin: 0 }}>We request <strong>$5,000–$10,000</strong> for <strong>6 months of active GitHub support</strong> (issues, PRs, dependency updates, tutorial expansion). After the 6-month grant period we commit to 12 months of responsive maintenance and onboarding community co-maintainers.</p>
      </div>

      <div className={s.instructionsBody}>
        <section className={s.reviewerSection}>
          <h3>Reviewer experience (try the app in ~5 minutes)</h3>
          <p className={s.muted} style={{ marginBottom: '0.75rem' }}>Designed so grant reviewers can quickly see the value. Follow these steps:</p>
          <ol className={s.reviewerSteps}>
            <li>Click <strong>Demo wallet</strong> in the sidebar — no install needed.</li>
            <li>Try the <strong>Send XTZ</strong> card — see instant feedback (simulated).</li>
            <li>Open the sidebar → explore <strong>3 tutorials per tier</strong> (Beginner, Advanced, Expert).</li>
            <li>Open <strong>For reviewers</strong> (this view) for learning outcomes and code examples.</li>
            <li>On the Dashboard, expand <strong>How it works</strong> to see the architecture diagram.</li>
            <li>Hover any <strong>?</strong> tooltip on card titles for context (mutez, RPC vs Beacon, etc.).</li>
            <li>Use <strong>Read contract storage</strong> with any Shadownet KT1 — works without a wallet.</li>
          </ol>
        </section>

        <section className={s.reviewerSection}>
          <h3>Success metrics (grant targets)</h3>
          <p className={s.muted} style={{ marginBottom: '0.5rem' }}>How we will measure impact post-grant:</p>
          <ul className={s.metricsList}>
            <li><strong>Time to first success:</strong> &lt;15 min (demo: &lt;1 min).</li>
            <li><strong>Adoption:</strong> 500+ GitHub stars, 200+ forks within 12 months.</li>
            <li><strong>Engagement:</strong> 1,000+ unique monthly visitors; 25%+ tutorial completion rate (when tracked).</li>
            <li><strong>Community:</strong> 20+ community-contributed tutorials or PRs in year one.</li>
            <li><strong>Ecosystem:</strong> Used in 5+ university courses or hackathons; featured in Tezos developer resources.</li>
          </ul>
        </section>

        <section className={s.reviewerSection}>
          <h3>Differentiation (why this project)</h3>
          <ul>
            <li><strong>15-minute onboarding</strong> — Most tutorials require hours of setup; we target &lt;15 min to first working dApp.</li>
            <li><strong>Demo wallet</strong> — Try without installing a wallet or claiming faucet; zero friction for workshops and first-time users.</li>
            <li><strong>Code-first learning</strong> — Copy-paste snippets that run; minimal prose, maximum hands-on.</li>
            <li><strong>Complete dApp stack</strong> — Wallet connect, balance, transfer, contract read, contract call, explorer links, tiered tutorials, and glossary in one place.</li>
            <li><strong>Visual clarity</strong> — Architecture diagram (read vs signed paths), tooltips on every concept, professional icons; no equivalent in-app, tiered starter exists in the ecosystem.</li>
          </ul>
        </section>

        <section className={s.reviewerSection}>
          <h3>Learning outcomes (what students will be able to do)</h3>
          <ul className={s.learningOutcomes}>
            {LEARNING_OUTCOMES.map((outcome, i) => (
              <li key={i} className={s.learningOutcomeItem}>{outcome}</li>
            ))}
          </ul>
        </section>

        <section className={s.reviewerSection}>
          <h3>Target audience</h3>
          <ul>
            <li>New developers (web2 or other chains) who want to build on Tezos with minimal setup.</li>
            <li>Educators and workshop leads who need a single, self-contained template (React + Vite + Taquito + Beacon) with demo mode and step-by-step tutorial.</li>
            <li>Grant reviewers who want to see a working “first dApp” with real patterns (context, env config, read vs write, testnet).</li>
          </ul>
        </section>

        <section className={s.reviewerSection}>
          <h3>What this stack delivers</h3>
          <ul>
            <li><strong>Zero-friction try:</strong> Demo wallet (no install) so anyone can use balance, simulated send, and contract read in under a minute.</li>
            <li><strong>Real wallet path:</strong> Beacon connect, balance, transfer, and contract call with Temple/Kukai on Shadownet.</li>
            <li><strong>Copy-paste patterns:</strong> Wallet context, mutez/XTZ helpers, RPC/explorer/faucet from env; code snippets in the tutorial and below.</li>
            <li><strong>Production-ready structure:</strong> Single Beacon instance, env-based network, error handling, explorer links, recent operations via TzKT API.</li>
          </ul>
        </section>

        <section className={s.reviewerSection}>
          <h3>Time to first success</h3>
          <ul>
            <li><strong>With demo wallet:</strong> &lt; 1 min — open app, click Demo wallet, see balance and try simulated send.</li>
            <li><strong>With real wallet:</strong> ~5–10 min — install Temple, get faucet XTZ, connect, send one transaction.</li>
            <li><strong>Full quickstart:</strong> Clone, run, connect (or demo), send, read contract storage, optional contract call.</li>
          </ul>
        </section>

        <section className={s.reviewerSection}>
          <h3>Code examples (from this codebase)</h3>
          <p className={s.muted} style={{ marginBottom: '0.5rem' }}>These snippets are used in the app. Reviewers can open the repo and find the same patterns in the listed files.</p>
          <CodeSnippet code={CONNECT_SNIPPET} title="Wallet connect (context + Beacon)" />
          <CodeSnippet code={TRANSFER_SNIPPET} title="Send XTZ and wait for confirmation" />
          <CodeSnippet code={READ_STORAGE_SNIPPET} title="Read contract storage (no wallet)" />
        </section>

        <section className={s.reviewerSection}>
          <h3>How this supports the ecosystem</h3>
          <ul>
            <li>Aligns with <strong>Developer Experience</strong> and <strong>Education</strong> grant areas: tools, tutorials, and documentation that improve onboarding.</li>
            <li>Uses official stack (Taquito, Beacon, Shadownet, TzKT) so skills transfer to production and other dApps.</li>
            <li>Demo mode removes the “I don’t have a wallet” barrier for workshops and first-time users.</li>
            <li>Template can be forked for hackathons, university courses, or internal training; README and in-app tutorial are self-contained.</li>
          </ul>
        </section>

        <section className={s.reviewerSection}>
          <h3>Sustainability (post-grant)</h3>
          <ul>
            <li><strong>Open source:</strong> MIT license (see LICENSE in repo); full handover with contributor guide and PR template.</li>
            <li><strong>6-month grant period:</strong> Active GitHub support (issues, PRs, tutorials). After 6 months: 12 months responsive maintenance and onboarding 1–2 community co-maintainers.</li>
            <li><strong>Community ownership:</strong> Onboard 1–2 co-maintainers; tutorials and new features via community PRs.</li>
            <li><strong>Ecosystem integration:</strong> Seek listing in Tezos developer portal; promotion via Discord, workshops, hackathons. No monetization — pure commons contribution.</li>
          </ul>
        </section>

        <section className={s.reviewerSection}>
          <h3>For educators & workshops</h3>
          <p className={s.muted} style={{ marginBottom: '0.5rem' }}>This template is designed as a <strong>workshop-ready</strong> and <strong>classroom-friendly</strong> kit:</p>
          <ul>
            <li>Students can use <strong>Demo wallet</strong> with no prior setup — no wallet install or faucet in session.</li>
            <li>Fork the repo for your course; the Quickstart tutorial and tiered coding tutorials are in-app.</li>
            <li>Key terms glossary and architecture diagram support teaching (RPC vs Beacon, read vs write).</li>
            <li>Future roadmap: workshop curriculum, instructor guide, and optional "workshop mode" (preconfigured demos, classroom exercises).</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
