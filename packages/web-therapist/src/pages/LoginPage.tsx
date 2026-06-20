import React, { useState } from 'react';
import customInstance from '../api/custom-instance';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      const res = await customInstance.post('/auth/login', { email: email.trim(), password });
      const { access_token, user } = res.data;
      localStorage.setItem('auth_token', access_token);
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userRole', user.role);
      window.location.href = '/dashboard';
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Invalid email or password. Please try again.';
      setError(Array.isArray(msg) ? msg.join(', ') : msg);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '16px 48px 16px 48px',
    backgroundColor: '#e8e8e8',
    border: '1px solid #999999',
    borderRadius: 8,
    fontSize: 15,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    color: '#111111',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const focusedInputStyle: React.CSSProperties = {
    ...inputStyle,
    borderColor: '#2a73d4',
    boxShadow: '0 0 0 3px rgba(42, 115, 212, 0.12)',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        background: 'linear-gradient(110deg, #ffffff 0%, #eef5fc 35%, #7aaaf6 100%)',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Brand Header */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <img
          src="/logo.png"
          alt="Telehealings Logo"
          style={{ width: 90, height: 90, margin: '0 auto 12px', objectFit: 'contain' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <h1 style={{ fontSize: 42, fontWeight: 700, letterSpacing: '-1px', color: '#0745b1', marginBottom: 6 }}>
          Telehealings
        </h1>
        <p style={{ fontSize: 14, fontWeight: 500, color: '#144db9', marginBottom: 35 }}>
          Continuity-First Wellness Care Platform
        </p>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#4b4b4b', textAlign: 'center', marginBottom: 25 }}>
          Therapist Login
        </h2>
      </div>

      {/* Login Wrapper */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 420, margin: '0 auto 40px' }}>
        {/* Heali Mascot */}
        <img
          src="/Heali-peak.png"
          alt="Heali Mascot"
          style={{
            position: 'absolute',
            top: -170,
            right: -150,
            width: 300,
            height: 'auto',
            zIndex: 0,
            pointerEvents: 'none',
          }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />

        {/* Login Card */}
        <div
          style={{
            position: 'relative',
            background: '#ffffff',
            borderRadius: 16,
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '35px 35px 25px' }}>
            {/* Error Message */}
            {error && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 14px',
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: 8,
                  fontSize: 13,
                  color: '#dc2626',
                  fontWeight: 500,
                  marginBottom: 18,
                }}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Email Input */}
              <div style={{ position: 'relative', marginBottom: 18 }}>
                <svg
                  style={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 20,
                    height: 20,
                    color: '#000',
                    pointerEvents: 'none',
                  }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Email Address"
                  autoComplete="email"
                  required
                  style={focusedField === 'email' ? focusedInputStyle : inputStyle}
                />
              </div>

              {/* Password Input */}
              <div style={{ position: 'relative', marginBottom: 18 }}>
                <svg
                  style={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 20,
                    height: 20,
                    color: '#000',
                    pointerEvents: 'none',
                  }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect width="14" height="10" x="5" y="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                  <circle cx="12" cy="16" r="1" />
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  style={focusedField === 'password' ? focusedInputStyle : inputStyle}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="pw-toggle"
                  style={{
                    position: 'absolute',
                    right: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    padding: 2,
                    color: '#a8a8a8',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'color 0.2s',
                  }}
                >
                  {showPassword ? (
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                      <path d="M14.12 14.12a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-login"
                style={{
                  width: '100%',
                  padding: 16,
                  backgroundColor: '#2a73d4',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  marginTop: 10,
                  marginBottom: 25,
                  opacity: loading ? 0.7 : 1,
                  transition: 'background-color 0.2s',
                }}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>

            {/* Links */}
            <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 600 }}>
              <a href="#" style={{ color: '#2a73d4', textDecoration: 'none' }}>Forgot Password?</a>
            </div>
          </div>

          {/* Card Footer */}
          <div
            style={{
              backgroundColor: '#e5e4df',
              padding: 22,
              textAlign: 'center',
              fontSize: 13,
              fontWeight: 600,
              color: '#111111',
            }}
          >
            Don't have an account?{' '}
            <a href="/register" style={{ color: '#2a73d4' }}>Sign Up</a>
          </div>
        </div>
      </div>

      {/* Global styles for hover states */}
      <style>{`
        .btn-login:hover { background-color: #2361b5 !important; }
        .pw-toggle:hover { color: #4b4b4b !important; }
        input::placeholder { color: #a8a8a8; font-weight: 500; }
      `}</style>
    </div>
  );
};

export default LoginPage;
