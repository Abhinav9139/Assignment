/**
 * LeftPanel — Transparent glass overlay that reveals the
 * same continuous background artwork visible behind the page.
 * No separate image — just a dark translucent window into
 * the full-page background with text content on top.
 */
function LeftPanel({ backgroundUrl }) {
  return (
    <div className="left-panel" aria-hidden="true">
      {/* Glass window that mirrors the page background */}
      <div
        className="left-panel__glass"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        {/* Dark overlay for readability */}
        <div className="left-panel__glass-overlay" />

        {/* Foreground content */}
        <div className="left-panel__content">
          {/* Top quote with decorative line */}
          <div className="left-panel__quote">
            <span className="left-panel__quote-text">A Wise Quote</span>
            <span className="left-panel__quote-line" />
          </div>

          {/* Bottom heading area */}
          <div className="left-panel__bottom">
            <h2 className="left-panel__heading">
              Get<br />
              Everything<br />
              You Want
            </h2>
            <p className="left-panel__subtitle">
              You can get everything you want if you work hard,
              trust the process, and stick to the plan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftPanel;
