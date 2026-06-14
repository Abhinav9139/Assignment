import { useState, useCallback } from 'react';

/**
 * LoginForm — Controlled form with email/password validation,
 * password visibility toggle, loading state, and success toast.
 */

/* Simple email regex — covers common patterns */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginForm() {
  /* Form field values */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  /* Track which fields have been interacted with */
  const [touched, setTouched] = useState({ email: false, password: false });

  /* UI states */
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  /* ---------- Validation helpers ---------- */

  const getEmailError = useCallback((value) => {
    if (!value.trim()) return 'Email is required';
    if (!EMAIL_REGEX.test(value)) return 'Please enter a valid email address';
    return '';
  }, []);

  const getPasswordError = useCallback((value) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    return '';
  }, []);

  const emailError = touched.email ? getEmailError(email) : '';
  const passwordError = touched.password ? getPasswordError(password) : '';
  const isFormValid = !getEmailError(email) && !getPasswordError(password);

  /* ---------- Handlers ---------- */

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    /* Mark all fields as touched to show any remaining errors */
    setTouched({ email: true, password: true });

    if (!isFormValid) return;

    /* Simulate async login */
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);

      /* Auto-dismiss success toast after 4 seconds */
      setTimeout(() => setShowSuccess(false), 4000);
    }, 1500);
  };

  return (
    <>
      {/* Success notification toast */}
      {showSuccess && (
        <div className="success-toast" role="status" aria-live="polite">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.15" />
            <path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Signed in successfully!
        </div>
      )}

      <form
        className="login-form"
        onSubmit={handleSubmit}
        noValidate
        aria-label="Login form"
      >
        {/* ---- Email field ---- */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="login-email">
            Email
          </label>
          <input
            id="login-email"
            className={`form-group__input ${emailError ? 'form-group__input--error' : ''}`}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
            required
            autoComplete="email"
            aria-invalid={emailError ? 'true' : 'false'}
            aria-describedby={emailError ? 'email-error' : undefined}
          />
          {emailError && (
            <p className="form-group__error" id="email-error" role="alert">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7 4v3M7 9h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {emailError}
            </p>
          )}
        </div>

        {/* ---- Password field ---- */}
        <div className="form-group">
          <label className="form-group__label" htmlFor="login-password">
            Password
          </label>
          <div className="form-group__input-wrapper">
            <input
              id="login-password"
              className={`form-group__input form-group__input--password ${passwordError ? 'form-group__input--error' : ''}`}
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur('password')}
              required
              minLength={8}
              autoComplete="current-password"
              aria-invalid={passwordError ? 'true' : 'false'}
              aria-describedby={passwordError ? 'password-error' : undefined}
            />
            <button
              type="button"
              className="form-group__toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                /* Eye-off icon */
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                  <path d="M14.12 14.12a3 3 0 11-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                /* Eye icon */
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {passwordError && (
            <p className="form-group__error" id="password-error" role="alert">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7 4v3M7 9h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {passwordError}
            </p>
          )}
        </div>

        {/* ---- Remember me / Forgot password ---- */}
        <div className="form-options">
          <label className="form-options__checkbox">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>
          <a href="#forgot" className="form-options__forgot">
            Forgot Password
          </a>
        </div>

        {/* ---- Sign In button ---- */}
        <button
          type="submit"
          className="btn-signin"
          disabled={isLoading}
        >
          {isLoading && <span className="btn-signin__spinner" aria-hidden="true" />}
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>

        {/* ---- Google button ---- */}
        <button type="button" className="btn-google">
          <svg className="btn-google__icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Sign In with Google
        </button>
      </form>
    </>
  );
}

export default LoginForm;
