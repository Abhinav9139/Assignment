import LoginForm from './LoginForm';
import logoImage from '../assets/logo.png';

/**
 * RightPanel — Contains the logo, welcome text, login form,
 * Google sign-in, and the sign-up footer link.
 */
function RightPanel() {
  return (
    <div className="right-panel">
      {/* Brand logo */}
      <div className="right-panel__logo">
        <span className="logo__icon" aria-hidden="true">
          <img src={logoImage} alt="Cogie Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </span>
        <span className="logo__text">Cogie</span>
      </div>

      {/* Welcome heading */}
      <div className="right-panel__welcome">
        <h1 className="right-panel__title">Welcome Back</h1>
        <p className="right-panel__description">
          Enter your email and password to access your account
        </p>
      </div>

      {/* Login form component */}
      <LoginForm />

      {/* Footer link */}
      <p className="right-panel__footer">
        Don&apos;t have an account?{' '}
        <a href="#signup">Sign Up</a>
      </p>
    </div>
  );
}

export default RightPanel;
