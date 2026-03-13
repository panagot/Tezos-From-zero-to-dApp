/**
 * Dashboard right panel: "Your path" + Quick access strip to fill the right column.
 */
export function DashboardRightPanel({ styles: s }) {
  const quickLinks = [
    { label: 'Live demo', href: 'https://tezos-from-zero-to-d-app.vercel.app/' },
    { label: 'GitHub', href: 'https://github.com/panagot/Tezos-From-zero-to-dApp' },
    { label: 'Tezos Docs', href: 'https://docs.tezos.com' },
    { label: 'Taquito', href: 'https://taquito.io' },
  ];

  return (
    <div className={s.dashboardRightInner}>
      <div className={s.pathColumn}>
        <h2 className={s.pathTitle}>Your path</h2>
        <p className={s.pathIntro}>
          From zero to a working dApp in one session. Follow the steps below.
        </p>

        <ol className={s.pathSteps}>
          <li className={s.pathStep}>
            <span className={s.pathStepNum} aria-hidden>1</span>
            <div className={s.pathStepBody}>
              <h3 className={s.pathStepTitle}>Try the app</h3>
              <p className={s.pathStepText}>
                Click <strong>Demo wallet</strong> in the sidebar (no install). Then use the cards in the main area: <strong>Send XTZ</strong>, <strong>Read contract</strong>. You’ll see the full flow in under a minute.
              </p>
            </div>
          </li>

          <li className={s.pathStep}>
            <span className={s.pathStepNum} aria-hidden>2</span>
            <div className={s.pathStepBody}>
              <h3 className={s.pathStepTitle}>Learn step-by-step</h3>
              <p className={s.pathStepText}>
                Open a <strong>Beginner</strong> tutorial in the sidebar. Each lesson has copy-paste code and a practice panel. Build the same patterns in your own project.
              </p>
            </div>
          </li>

          <li className={s.pathStep}>
            <span className={s.pathStepNum} aria-hidden>3</span>
            <div className={s.pathStepBody}>
              <h3 className={s.pathStepTitle}>Go further</h3>
              <p className={s.pathStepText}>
                Use the live site and the docs to build your own dApp. The stack includes Taquito, Beacon, and Shadownet — ready to extend.
              </p>
            </div>
          </li>
        </ol>

        <footer className={s.dashboardRightFooter}>
          <span className={s.dashboardRightFooterMeta}>MIT · 6-month supported</span>
        </footer>
      </div>

      <aside className={s.quickAccessStrip} aria-label="Quick links">
        <span className={s.quickAccessTitle}>Quick access</span>
        {quickLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={s.quickAccessLink}
          >
            {label}
          </a>
        ))}
      </aside>
    </div>
  );
}
