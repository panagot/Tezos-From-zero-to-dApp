import { useState } from 'react';
import styles from '../App.module.css';

export function CodeSnippet({ code, language = 'javascript', title }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className={styles.codeBlockWrap}>
      {title && <span className={styles.codeBlockTitle}>{title}</span>}
      <pre className={styles.codeBlock}>
        <code>{code}</code>
        <button type="button" className={styles.codeBlockCopy} onClick={handleCopy} title="Copy">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </pre>
    </div>
  );
}
