import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) { setError('Please enter your email address.'); return; }
    if (!email.includes('@')) { setError('Please enter a valid email address.'); return; }
    if (!password.trim()) { setError('Please enter your password.'); return; }

    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: 'linear-gradient(110deg, #ffffff 0%, #eef5fc 35%, #7aaaf6 100%)' }}
    >
      {/* Brand Header */}
      <div className="text-center mb-5">
        <img
          src="/shared/assets/logo.png"
          alt="Telehealings Logo"
          className="w-[90px] h-[90px] mx-auto mb-3 object-contain"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <h1 className="text-[42px] font-bold tracking-tight mb-1" style={{ color: '#0745b1' }}>
          Telehealings
        </h1>
        <p className="text-sm font-medium mb-8" style={{ color: '#144db9' }}>
          Continuity-First Wellness Care Platform
        </p>
        <h2 className="text-[26px] font-bold" style={{ color: '#4b4b4b' }}>
          Admin Login
        </h2>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-[420px]">
        {/* Mascot */}
        <img
          src="/shared/assets/Heali-peak.png"
          alt="Heali Mascot"
          className="absolute w-[300px] h-auto pointer-events-none"
          style={{ top: '-170px', right: '-150px', zIndex: 0 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />

        <div
          className="relative bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 15px 35px rgba(0,0,0,0.08)', zIndex: 1 }}
        >
          <div className="px-[35px] pt-[35px] pb-[25px]">
            {/* Error Message */}
            {error && (
              <div
                className="flex items-center gap-2 p-3 mb-4 rounded-lg text-sm font-medium"
                style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}
              >
                <AlertCircle size={18} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Email Input */}
              <div className="relative mb-[18px]">
                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: '#000' }}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  autoComplete="email"
                  required
                  className="w-full text-[15px] rounded-lg transition-colors"
                  style={{
                    padding: '16px 48px',
                    background: '#e8e8e8',
                    border: '1px solid #999999',
                    outline: 'none',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#2a73d4'; e.target.style.boxShadow = '0 0 0 3px rgba(42,115,212,0.12)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#999999'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              {/* Password Input */}
              <div className="relative mb-[18px]">
                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: '#000' }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  autoComplete="current-password"
                  required
                  className="w-full text-[15px] rounded-lg transition-colors"
                  style={{
                    padding: '16px 48px',
                    background: '#e8e8e8',
                    border: '1px solid #999999',
                    outline: 'none',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#2a73d4'; e.target.style.boxShadow = '0 0 0 3px rgba(42,115,212,0.12)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#999999'; e.target.style.boxShadow = 'none'; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 cursor-pointer"
                  style={{ color: '#a8a8a8' }}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white text-base font-semibold rounded-lg cursor-pointer transition-colors mt-2.5 mb-6"
                style={{
                  padding: '16px',
                  background: loading ? '#94a3b8' : '#2a73d4',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>
          </div>

          {/* Card Footer */}
          <div
            className="text-center text-sm font-semibold"
            style={{ background: '#e5e4df', padding: '22px', color: '#111111' }}
          >
            Having issues signing in?{' '}
            <a href="#" style={{ color: '#2a73d4' }}>Contact Tech Team</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
