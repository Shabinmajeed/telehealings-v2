import React, { useState } from 'react';
import customInstance from '../api/custom-instance';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    specialization: '',
    password: '',
    confirmPassword: '',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    if (!termsAccepted) {
      alert('Please accept the Terms and Conditions before registering.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.dob || !formData.specialization) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await customInstance.post('/therapist/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          dob: formData.dob,
          specialization: formData.specialization,
        }),
      });

      const result = response.data || response;

      if (result.message && result.status >= 400) {
        alert(result.message || 'Registration failed. Please try again.');
        return;
      }

      setShowSuccessModal(true);
    } catch (error) {
      console.error('Registration error:', error);
      alert('Unable to connect to the server. Please try again later.');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px 14px 42px',
    backgroundColor: '#f8fafc',
    border: '1px solid #cbd5e1',
    borderRadius: 8,
    fontSize: 15,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    color: '#0f172a',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'all 0.2s',
  };

  const focusedInputStyle: React.CSSProperties = {
    ...inputStyle,
    borderColor: '#2a73d4',
    backgroundColor: '#ffffff',
    boxShadow: '0 0 0 3px rgba(42, 115, 212, 0.1)',
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '40px 20px',
        background: 'linear-gradient(110deg, #ffffff 0%, #eef5fc 35%, #7aaaf6 100%)',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Header & Branding */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 30 }}>
        <img
          src="/logo.png"
          alt="Telehealings Logo"
          style={{ width: 70, height: 70, marginBottom: 12 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-1px', color: '#0745b1', marginBottom: 6 }}>
          Telehealings
        </h1>
        <p style={{ fontSize: 14, fontWeight: 500, color: '#144db9', marginTop: -4 }}>
          Continuity-First Wellness Care Platform
        </p>
      </div>

      {/* Registration Wrapper */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 550 }}>
        {/* Heali Mascot */}
        <img
          src="/Heali-peak.png"
          alt="Penguin Mascot"
          style={{
            position: 'absolute',
            top: -140,
            left: -120,
            width: 250,
            height: 'auto',
            zIndex: 0,
            transform: 'scaleX(-1)',
          }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />

        {/* Registration Card */}
        <div
          style={{
            position: 'relative',
            backgroundColor: '#fff',
            borderRadius: 16,
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            maxHeight: '80vh',
          }}
        >
          <div style={{ padding: 40, overflowY: 'auto' }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e293b', marginBottom: 8, textAlign: 'center' }}>
              Create an Account
            </h2>
            <p style={{ fontSize: 14, color: '#64748b', marginBottom: 30, lineHeight: 1.5, textAlign: 'center' }}>
              Join the Telehealings provider network to expand your practice and manage your clients seamlessly.
            </p>

            {/* Form Fields */}
            <div style={{ maxHeight: 280, overflowY: 'auto', paddingRight: 8 }}>
              {/* First Name + Last Name */}
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ position: 'relative', marginBottom: 20, flex: 1, transition: 'color 0.2s' }}>
                  <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 20, height: 20, color: focusedField === 'firstName' ? '#2a73d4' : '#64748b', pointerEvents: 'none', transition: 'color 0.2s' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    onFocus={() => setFocusedField('firstName')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="First Name"
                    style={focusedField === 'firstName' ? focusedInputStyle : inputStyle}
                  />
                </div>
                <div style={{ position: 'relative', marginBottom: 20, flex: 1, transition: 'color 0.2s' }}>
                  <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 20, height: 20, color: focusedField === 'lastName' ? '#2a73d4' : '#64748b', pointerEvents: 'none', transition: 'color 0.2s' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    onFocus={() => setFocusedField('lastName')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Last Name"
                    style={focusedField === 'lastName' ? focusedInputStyle : inputStyle}
                  />
                </div>
              </div>

              {/* Email */}
              <div style={{ position: 'relative', marginBottom: 20 }}>
                <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 20, height: 20, color: focusedField === 'email' ? '#2a73d4' : '#64748b', pointerEvents: 'none', transition: 'color 0.2s' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Email Address"
                  style={focusedField === 'email' ? focusedInputStyle : inputStyle}
                />
              </div>

              {/* Date of Birth */}
              <div style={{ position: 'relative', marginBottom: 20 }}>
                <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 20, height: 20, color: focusedField === 'dob' ? '#2a73d4' : '#64748b', pointerEvents: 'none', transition: 'color 0.2s' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <input
                  type="text"
                  value={formData.dob}
                  onChange={(e) => handleChange('dob', e.target.value)}
                  onFocus={(e) => { e.target.type = 'date'; setFocusedField('dob'); }}
                  onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; setFocusedField(null); }}
                  placeholder="Date of Birth"
                  style={focusedField === 'dob' ? focusedInputStyle : inputStyle}
                />
              </div>

              {/* Specialization */}
              <div style={{ position: 'relative', marginBottom: 20 }}>
                <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 20, height: 20, color: focusedField === 'specialization' ? '#2a73d4' : '#64748b', pointerEvents: 'none', zIndex: 1, transition: 'color 0.2s' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                <select
                  value={formData.specialization}
                  onChange={(e) => handleChange('specialization', e.target.value)}
                  onFocus={() => setFocusedField('specialization')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    ...(focusedField === 'specialization' ? focusedInputStyle : inputStyle),
                    appearance: 'none',
                    cursor: 'pointer',
                    color: formData.specialization ? '#0f172a' : '#64748c',
                  }}
                >
                  <option value="" disabled>Select Specialization</option>
                  <option value="Clinical Psychology">Clinical Psychology</option>
                  <option value="Cognitive Behavioral Therapy">Cognitive Behavioral Therapy</option>
                  <option value="Couples Therapy">Couples Therapy</option>
                  <option value="Child Psychology">Child Psychology</option>
                </select>
                <svg style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#999', pointerEvents: 'none' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {/* Password */}
              <div style={{ position: 'relative', marginBottom: 20 }}>
                <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 20, height: 20, color: focusedField === 'password' ? '#2a73d4' : '#64748b', pointerEvents: 'none', transition: 'color 0.2s' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Create Password"
                  style={focusedField === 'password' ? focusedInputStyle : inputStyle}
                />
              </div>

              {/* Confirm Password */}
              <div style={{ position: 'relative', marginBottom: 20 }}>
                <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 20, height: 20, color: focusedField === 'confirmPassword' ? '#2a73d4' : '#64748b', pointerEvents: 'none', transition: 'color 0.2s' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Confirm Password"
                  style={focusedField === 'confirmPassword' ? focusedInputStyle : inputStyle}
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20, marginBottom: 24, textAlign: 'left' }}>
              <div
                onClick={() => {
                  if (termsAccepted) {
                    setTermsAccepted(false);
                  } else {
                    setShowTermsModal(true);
                  }
                }}
                style={{
                  width: 20,
                  height: 20,
                  border: `2px solid ${termsAccepted ? '#2a73d4' : '#cbd5e1'}`,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                  backgroundColor: termsAccepted ? '#2a73d4' : '#fff',
                }}
              >
                {termsAccepted && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <div style={{ fontSize: 13, color: '#475569' }}>
                I agree to the{' '}
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setShowTermsModal(true); }}
                  style={{ color: '#2a73d4', fontWeight: 600, textDecoration: 'none' }}
                >
                  Terms and Conditions
                </a>
              </div>
            </div>

            {/* Register Button */}
            <button
              onClick={handleRegister}
              className="btn-register"
              style={{
                width: '100%',
                padding: 16,
                backgroundColor: '#2a73d4',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: 10,
                transition: 'background-color 0.2s',
              }}
            >
              Register
            </button>
          </div>

          {/* Card Footer */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              padding: 22,
              textAlign: 'center',
              fontSize: 14,
              fontWeight: 500,
              color: '#475569',
              borderTop: '1px solid #f1f5f9',
            }}
          >
            Already have an account?{' '}
            <a href="/login" style={{ color: '#2a73d4', textDecoration: 'none', fontWeight: 600 }}>Log in</a>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              padding: '32px 24px',
              width: '90%',
              maxWidth: 400,
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                background: '#e2effb',
                color: '#2a73d4',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Check Your Email</h3>
            <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.5, marginBottom: 24 }}>
              We've sent a verification link to your email address. Please verify your account to continue.
            </p>
            <button
              onClick={() => { window.location.href = '/login'; }}
              style={{
                width: '100%',
                padding: 16,
                backgroundColor: '#2a73d4',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Back to Login
            </button>
          </div>
        </div>
      )}

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setShowTermsModal(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              padding: '32px 24px',
              width: '90%',
              maxWidth: 500,
              textAlign: 'left',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Terms and Conditions</h3>
            <div style={{ maxHeight: 250, overflowY: 'auto', fontSize: 13, color: '#475569', lineHeight: 1.6, marginBottom: 24, paddingRight: 10 }}>
              <p><strong>1. Introduction</strong><br />Welcome to Telehealings. By signing up, you agree to abide by our terms of service.</p>
              <p style={{ marginTop: 12 }}><strong>2. Professional Conduct</strong><br />As a therapist on our platform, you are expected to maintain professional standards, verify your credentials, and uphold the platform's guidelines.</p>
              <p style={{ marginTop: 12 }}><strong>3. Privacy & HIPAA Compliance</strong><br />All patient data must be handled in strict accordance with HIPAA regulations and our internal privacy policy.</p>
              <p style={{ marginTop: 12 }}><strong>4. Payments</strong><br />Platform fees and payout schedules are detailed in your provider agreement. Terms are subject to change with 30 days notice.</p>
              <p style={{ marginTop: 12 }}><strong>5. Termination</strong><br />We reserve the right to suspend or terminate accounts violating these terms.</p>
              <p style={{ marginTop: 12 }}><strong>6. Liability</strong><br />Telehealings is a technology platform and does not provide medical advice. Therapists are independent contractors.</p>
              <p style={{ marginTop: 12 }}><strong>7. Dispute Resolution</strong><br />Any disputes arising from these terms will be handled in arbitration according to local laws.</p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setShowTermsModal(false)}
                style={{
                  flex: 1,
                  padding: 16,
                  backgroundColor: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#475569',
                  borderRadius: 8,
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Deny
              </button>
              <button
                onClick={() => { setTermsAccepted(true); setShowTermsModal(false); }}
                style={{
                  flex: 1,
                  padding: 16,
                  backgroundColor: '#2a73d4',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global styles for hover states */}
      <style>{`
        .btn-register:hover { background-color: #2361b5 !important; }
        select.form-control { color: #64748b; }
        select.form-control option { color: #0f172a; }
      `}</style>
    </div>
  );
};

export default RegisterPage;
