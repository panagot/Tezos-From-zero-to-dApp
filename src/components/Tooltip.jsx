import { useState, useRef, useEffect } from 'react';
import styles from '../App.module.css';

/**
 * Wraps children and shows an info icon; hover/focus reveals tooltip content.
 * Use for helpful context on buttons, card titles, etc.
 */
export function Tooltip({ children, content, title }) {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!visible) return;
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setVisible(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [visible]);

  const text = content || title;
  if (!text) return children;

  return (
    <span ref={wrapperRef} className={styles.tooltipWrap}>
      {children}
      <span className={styles.tooltipIconWrap}>
        <span
          className={styles.tooltipIcon}
          role="button"
          tabIndex={0}
          aria-label="More info"
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          onFocus={() => setVisible(true)}
          onBlur={() => setVisible(false)}
          onClick={(e) => { e.preventDefault(); setVisible((v) => !v); }}
        >
          ?
        </span>
        {visible && (
          <span className={styles.tooltipBubble} role="tooltip">
            {content || title}
          </span>
        )}
      </span>
    </span>
  );
}
