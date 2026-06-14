/**
 * LeftPanel — Transparent overlay that reveals the
 * continuous background artwork visible behind the page.
 * No image used — just a dark translucent window.
 */
function LeftPanel() {
  return (
    <div className="left-panel" aria-hidden="true">
      {/* The transparent cutout window with a massive white shadow to form the frame */}
      <div className="left-panel__window" />

      {/* Dark overlay for readability, matching the window's shape */}
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
  );
}

export default LeftPanel;
