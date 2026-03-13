import { useState, useEffect } from 'react';

/** Mini mock of what the code produces — fills the "output" space in the practice column. */
function OutputMock({ type, styles: s }) {
  if (type === 'balance') {
    return (
      <div className={s.outputMockBox}>
        <div className={s.outputMockLabel}>Balance</div>
        <div className={s.outputMockRow}><span className={s.outputMockKey}>Address</span> tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb</div>
        <div className={s.outputMockRow}><span className={s.outputMockKey}>Balance</span> 1.5 XTZ</div>
      </div>
    );
  }
  if (type === 'transfer') {
    return (
      <div className={s.outputMockBox}>
        <div className={s.outputMockLabel}>Send XTZ</div>
        <div className={s.outputMockRow}>Success → op hash</div>
        <div className={s.outputMockMuted}>View in Explorer →</div>
      </div>
    );
  }
  if (type === 'storage') {
    return (
      <div className={s.outputMockBox}>
        <div className={s.outputMockLabel}>Read contract storage</div>
        <div className={s.outputMockRow}><span className={s.outputMockKey}>Storage</span> 42</div>
      </div>
    );
  }
  if (type === 'call') {
    return (
      <div className={s.outputMockBox}>
        <div className={s.outputMockLabel}>Call contract</div>
        <div className={s.outputMockRow}>Increment / Decrement</div>
        <div className={s.outputMockMuted}>Wallet signs → storage updates</div>
      </div>
    );
  }
  if (type === 'opHash') {
    return (
      <div className={s.outputMockBox}>
        <div className={s.outputMockLabel}>Operation</div>
        <div className={s.outputMockMono}>opXYZ123...</div>
        <div className={s.outputMockMuted}>View in Explorer →</div>
      </div>
    );
  }
  return null;
}

/**
 * Always-visible practice column on tutorial pages.
 * Users can type and edit code here, then copy to their project.
 * outputPreview: { description, mock } shows what the code produces.
 */
export function PracticeColumn({ practiceWhere, initialCode, outputPreview, styles: s }) {
  const [code, setCode] = useState(initialCode || '');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialCode != null) setCode(initialCode);
  }, [initialCode]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className={s.practiceColumnInner}>
      <div className={s.practiceColumnLeft}>
        <h3 className={s.practiceColumnTitle}>Practice</h3>
        <section className={s.practiceWhereSection}>
          <h4 className={s.practiceWhereTitle}>Where to practice</h4>
          <ul className={s.practiceWhereList}>
            <li><strong>In this app:</strong> Use the Dashboard cards (Demo wallet, Send XTZ, Read contract, etc.). No setup needed.</li>
            <li><strong>Locally:</strong> Clone the repo, run <code>npm run dev</code>, edit files in <code>src/</code> and paste code from below.</li>
          </ul>
          {practiceWhere && (
            <p className={s.practiceWhereExtra}><strong>This lesson:</strong> {practiceWhere}</p>
          )}
        </section>
        <section className={s.practiceCodeSection}>
          <h4 className={s.practiceCodeTitle}>Type or edit code</h4>
          <p className={s.practiceCodeHint}>
            Edit the code below and copy it into your project. You can type freely—changes are only in this box until you copy.
          </p>
          <textarea
            className={s.practiceColumnTextarea}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
            placeholder="Type or paste code here..."
            aria-label="Editable code for this lesson"
          />
          <button
            type="button"
            className={s.primaryBtn}
            onClick={handleCopy}
            style={{ marginTop: '0.5rem' }}
          >
            {copied ? 'Copied' : 'Copy code'}
          </button>
        </section>
        <section className={s.practiceTipSection}>
          <p className={s.practiceTip}>
            <strong>Tip:</strong> After copying, paste into your project and run the app. Use the Dashboard to try the same flow without coding.
          </p>
        </section>
      </div>
      {outputPreview && (
        <div className={s.practiceColumnRight}>
          <section className={s.practiceOutputSection}>
            <h4 className={s.practiceOutputTitle}>What this code does</h4>
            <p className={s.practiceOutputDesc}>{outputPreview.description}</p>
            {outputPreview.mock && <OutputMock type={outputPreview.mock} styles={s} />}
          </section>
        </div>
      )}
    </div>
  );
}
