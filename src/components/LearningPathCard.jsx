import { TUTORIALS, TUTORIAL_LEVELS, COMING_SOON } from '../tutorialsConfig';
import styles from '../App.module.css';

/**
 * Visual learning path: Beginner → Advanced → Expert with counts.
 * Grant-friendly: shows structured curriculum at a glance.
 */
export function LearningPathCard() {
  const byLevel = TUTORIAL_LEVELS.map((level) => ({
    level,
    label: level.charAt(0).toUpperCase() + level.slice(1),
    count: TUTORIALS.filter((t) => t.level === level).length,
    totalMinutes: TUTORIALS.filter((t) => t.level === level).reduce((acc, t) => acc + (t.minutes || 0), 0),
  }));
  const comingSoonTotal = COMING_SOON.length;
  const seriesCount = COMING_SOON.filter((c) => c.series).length;

  return (
    <div className={styles.learningPathCard}>
      <h3 className={styles.learningPathTitle}>Learning path</h3>
      <p className={styles.learningPathIntro}>
        Follow the sidebar: 3 coding tutorials per tier (9 live, ~50 min). Complete all for a full dApp foundation. Plus <strong>{comingSoonTotal}+ planned</strong> lessons and <strong>{seriesCount} longer series</strong> (~45m–3h) in the pipeline.
      </p>
      <div className={styles.learningPathStrip}>
        {byLevel.map(({ level, label, count, totalMinutes }, i) => (
          <div key={level} className={styles.learningPathStep}>
            <span className={styles.learningPathStepBadge}>{label}</span>
            <span className={styles.learningPathStepMeta}>{count} tutorials</span>
            {totalMinutes > 0 && (
              <span className={styles.learningPathStepMeta}>~{totalMinutes} min</span>
            )}
            {i < byLevel.length - 1 && <span className={styles.learningPathArrow} aria-hidden>→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
