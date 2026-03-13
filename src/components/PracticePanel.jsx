import { useState, useEffect } from 'react';
import styles from '../App.module.css';

/**
 * Slide-over panel for practicing tutorial code.
 * User can edit the snippet and copy it to use in their project.
 * "Where to practice" explains in-app (Dashboard cards) and locally (clone, npm run dev).
 */
export function PracticePanel({ open, onClose, title, practiceWhere, initialCode, styles: s }) {
  const [code, setCode] = useState(initialCode || '');

  useEffect(() => {
    if (open && initialCode != null) setCode(initialCode);
  }, [open, initialCode]);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  if (!open) return null;

  return (
    <>
      <div
        className={s.practiceOverlay}
        role="presentation"
        aria-hidden
        onClick={onClose}
      />
      <div className={s.practiceDrawer} role="dialog" aria-label="Practice">
        <div className={s.practiceDrawerHeader}>
          <h3 className={s.practiceDrawerTitle}>Practice</h3>
          <button
            type="button"
            className={s.practiceDrawerClose}
            onClick={onClose}
            aria-label="Close practice panel"
          >
            ×
          </button>
        </div>
        <div className={s.practiceDrawerBody}>
          <section className={s.practiceWhereSection}>
            <h4 className={s.practiceWhereTitle}>Where to practice</h4>
            <ul className={s.practiceWhereList}>
              <li><strong>In this app:</strong> Go to the Dashboard and use the cards mentioned in the lesson (e.g. Demo wallet, Send XTZ, Read contract storage). No setup needed.</li>
              <li><strong>Locally:</strong> Clone this repo, run <code>npm run dev</code>, then edit files in <code>src/</code> and see changes live. Paste the code below into the right file (see the lesson for which one).</li>
            </ul>
            {practiceWhere && (
              <p className={s.practiceWhereExtra}><strong>This lesson:</strong> {practiceWhere}</p>
            )}
          </section>
          <section className={s.practiceCodeSection}>
            <h4 className={s.practiceCodeTitle}>Edit and copy</h4>
            <p className={s.practiceCodeHint}>
              Edit the code below, then copy and paste it into your project. Run the app locally or use the Dashboard cards to see it in action.
            </p>
            <textarea
              className={s.practiceTextarea}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
              placeholder="Paste or edit code..."
              aria-label="Code to practice"
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
              <strong>Tip:</strong> After copying, paste into your project and run the app to see it in action. Use the Dashboard cards to try the same flow without coding.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
