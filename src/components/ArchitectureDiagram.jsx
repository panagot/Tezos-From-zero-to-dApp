import { useState } from 'react';
import styles from '../App.module.css';

/**
 * How data flows: User → React UI → Beacon → Taquito → RPC / TzKT.
 * Collapsible; includes an SVG diagram for visual impact.
 */
export function ArchitectureDiagram() {
  const [open, setOpen] = useState(true);

  return (
    <div className={styles.diagramCard}>
      <button
        type="button"
        className={styles.diagramHeader}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className={styles.diagramTitle}>How it works</span>
        <span className={styles.diagramChevron}>{open ? '▼' : '▶'}</span>
      </button>
      {open && (
        <div className={styles.diagramBody}>
          <p className={styles.diagramIntro}>
            Data flows from your wallet (or Demo) through Taquito to the Tezos network. Reading storage uses RPC only; sending XTZ or calling contracts requires your wallet to sign.
          </p>
          <div className={styles.diagramSvgWrap}>
            <svg className={styles.diagramSvg} viewBox="0 0 520 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <linearGradient id="boxGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00a86b" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#00a86b" stopOpacity="0.05" />
                </linearGradient>
                <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                  <path d="M0 0 L8 3 L0 6 Z" fill="#6b6b76" />
                </marker>
              </defs>
              {/* Flow arrows */}
              <path d="M 86 60 L 154 60" stroke="#6b6b76" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.8" markerEnd="url(#arrowhead)" />
              <path d="M 206 60 L 274 60" stroke="#6b6b76" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.8" markerEnd="url(#arrowhead)" />
              <path d="M 326 60 L 394 60" stroke="#6b6b76" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.8" markerEnd="url(#arrowhead)" />
              <path d="M 446 60 L 514 60" stroke="#6b6b76" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.8" markerEnd="url(#arrowhead)" />
              {/* Boxes */}
              <rect x="10" y="30" width="76" height="60" rx="8" fill="#14141a" stroke="#22222c" strokeWidth="1.5" />
              <text x="48" y="58" textAnchor="middle" fill="#e8e8ec" fontSize="11" fontWeight="600">You</text>
              <text x="48" y="72" textAnchor="middle" fill="#6b6b76" fontSize="9">Browser</text>

              <rect x="90" y="30" width="116" height="60" rx="8" fill="url(#boxGrad)" stroke="#00a86b" strokeWidth="1.5" />
              <text x="148" y="58" textAnchor="middle" fill="#e8e8ec" fontSize="11" fontWeight="600">React</text>
              <text x="148" y="72" textAnchor="middle" fill="#6b6b76" fontSize="9">Vite, UI</text>

              <rect x="210" y="30" width="116" height="60" rx="8" fill="#14141a" stroke="#22222c" strokeWidth="1.5" />
              <text x="268" y="58" textAnchor="middle" fill="#e8e8ec" fontSize="11" fontWeight="600">Beacon</text>
              <text x="268" y="72" textAnchor="middle" fill="#6b6b76" fontSize="9">Wallet</text>

              <rect x="330" y="30" width="116" height="60" rx="8" fill="#14141a" stroke="#22222c" strokeWidth="1.5" />
              <text x="388" y="58" textAnchor="middle" fill="#e8e8ec" fontSize="11" fontWeight="600">Taquito</text>
              <text x="388" y="72" textAnchor="middle" fill="#6b6b76" fontSize="9">Toolkit</text>

              <rect x="450" y="30" width="70" height="60" rx="8" fill="#14141a" stroke="#22222c" strokeWidth="1.5" />
              <text x="485" y="58" textAnchor="middle" fill="#e8e8ec" fontSize="10" fontWeight="600">RPC</text>
              <text x="485" y="72" textAnchor="middle" fill="#6b6b76" fontSize="9">TzKT</text>
            </svg>
          </div>
          <div className={styles.diagramLegend}>
            <span className={styles.diagramLegendItem}>Read storage: RPC only (no wallet)</span>
            <span className={styles.diagramLegendItem}>Send / call: wallet signs via Beacon</span>
          </div>
        </div>
      )}
    </div>
  );
}
