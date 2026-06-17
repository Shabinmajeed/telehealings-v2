import React, { useState } from 'react';
import TherapistLayout from '../components/TherapistLayout';

const ToggleSwitch: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
  <label style={{ position: 'relative', width: 44, height: 24, flexShrink: 0, marginLeft: 16, display: 'inline-block' }}>
    <input type="checkbox" checked={checked} onChange={onChange} style={{ opacity: 0, width: 0, height: 0 }} />
    <span style={{
      position: 'absolute',
      cursor: 'pointer',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: checked ? '#2a73d4' : '#cbd5e1',
      borderRadius: 24,
      transition: '0.3s',
    }}>
      <span style={{
        position: 'absolute',
        height: 18,
        width: 18,
        left: checked ? 23 : 3,
        bottom: 3,
        backgroundColor: '#fff',
        borderRadius: '50%',
        transition: '0.3s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
      }} />
    </span>
  </label>
);

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'notifications'>('general');

  // General tab state
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [language, setLanguage] = useState('en');
  const [dateFormat, setDateFormat] = useState('dd/mm/yyyy');
  const [availability, setAvailability] = useState([
    { day: 'Monday', enabled: true, from: '09:00', to: '17:00' },
    { day: 'Tuesday', enabled: true, from: '09:00', to: '17:00' },
    { day: 'Wednesday', enabled: true, from: '09:00', to: '17:00' },
    { day: 'Thursday', enabled: true, from: '09:00', to: '17:00' },
    { day: 'Friday', enabled: true, from: '09:00', to: '17:00' },
  ]);
  const [maxSessions, setMaxSessions] = useState(6);
  const [sessionDuration, setSessionDuration] = useState(50);
  const [bufferMinutes, setBufferMinutes] = useState(10);
  const [autoAccept, setAutoAccept] = useState(false);

  // Security tab state
  const [email, setEmail] = useState('sarah.menon@telehealings.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFA, setTwoFA] = useState(false);

  // Notifications tab state
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifNewMessage, setNotifNewMessage] = useState(true);
  const [notifSessionReminders, setNotifSessionReminders] = useState(true);
  const [notifSMS, setNotifSMS] = useState(false);
  const [notifMarketing, setNotifMarketing] = useState(false);

  const updateAvailability = (index: number, field: string, value: boolean | string) => {
    setAvailability(prev => prev.map((row, i) => i === index ? { ...row, [field]: value } : row));
  };

  const tabStyle = (tab: string): React.CSSProperties => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '10px 20px',
    borderRadius: 12,
    fontSize: 13,
    fontWeight: 600,
    color: activeTab === tab ? '#2a73d4' : '#64748b',
    background: activeTab === tab ? '#e2effb' : 'transparent',
    transition: 'all 0.2s',
    cursor: 'pointer',
    border: 'none',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  });

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: 14,
    color: '#111111',
    outline: 'none',
    background: '#fff',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    cursor: 'pointer',
    appearance: 'none' as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    paddingRight: 36,
  };

  const cardStyle: React.CSSProperties = {
    background: '#ffffff',
    borderRadius: 16,
    padding: 24,
    boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  };

  return (
    <TherapistLayout activeNav="settings">
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, marginBottom: 8 }}>
        <div style={{
          fontSize: 20,
          fontWeight: 700,
          color: '#0f172a',
          padding: '0 0 8px 0',
          position: 'relative',
          borderBottom: '2px solid #e2e8f0',
        }}>
          <span style={{
            position: 'absolute',
            bottom: -2,
            left: 0,
            right: 0,
            height: 3,
            background: '#0f172a',
            borderRadius: '2px 2px 0 0',
          }} />
          Settings
        </div>
      </div>

      {/* Settings Tabs */}
      <div style={{
        display: 'flex',
        gap: 0,
        background: '#ffffff',
        borderRadius: 16,
        padding: 6,
        boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
        border: '1px solid #f1f5f9',
      }}>
        <button style={tabStyle('general')} onClick={() => setActiveTab('general')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          General
        </button>
        <button style={tabStyle('security')} onClick={() => setActiveTab('security')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Security
        </button>
        <button style={tabStyle('notifications')} onClick={() => setActiveTab('notifications')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          Notifications
        </button>
      </div>

      {/* ==================== GENERAL TAB ==================== */}
      {activeTab === 'general' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* General Settings Card */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2a73d4" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              General Settings
            </h2>
            <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Manage your regional and platform preferences.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: '1 / -1' }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>Timezone</label>
                <select style={selectStyle} value={timezone} onChange={e => setTimezone(e.target.value)}>
                  <option value="Asia/Kolkata">(GMT+05:30) India Standard Time — Kolkata</option>
                  <option value="America/New_York">(GMT-04:00) Eastern Time — New York</option>
                  <option value="Europe/London">(GMT+01:00) British Summer Time — London</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>Language</label>
                <select style={selectStyle} value={language} onChange={e => setLanguage(e.target.value)}>
                  <option value="en">English (US)</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>Date Format</label>
                <select style={selectStyle} value={dateFormat} onChange={e => setDateFormat(e.target.value)}>
                  <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                  <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                  <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>

          {/* Availability Card */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2a73d4" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Availability
            </h2>
            <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Set your working hours for each day. Clients will only be able to book within these times.</p>
            <table style={{ width: '100%', borderCollapse: 'separate' as const, borderSpacing: 0 }}>
              <thead>
                <tr>
                  <th style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: 0.5, padding: '0 0 10px 0', textAlign: 'left' as const }}>Day</th>
                  <th style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: 0.5, padding: '0 0 10px 0', textAlign: 'center' as const }}>Enabled</th>
                  <th style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: 0.5, padding: '0 0 10px 0', textAlign: 'center' as const }}>From</th>
                  <th style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: 0.5, padding: '0 0 10px 0', textAlign: 'center' as const }}>To</th>
                </tr>
              </thead>
              <tbody>
                {availability.map((row, i) => (
                  <tr key={row.day}>
                    <td style={{ padding: '8px 0', verticalAlign: 'middle', borderBottom: '1px solid #f1f5f9' }}>
                      <span style={{ fontSize: 14, fontWeight: 500, color: '#0f172a' }}>{row.day}</span>
                    </td>
                    <td style={{ padding: '8px 0', verticalAlign: 'middle', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                      <ToggleSwitch checked={row.enabled} onChange={() => updateAvailability(i, 'enabled', !row.enabled)} />
                    </td>
                    <td style={{ padding: '8px 0', verticalAlign: 'middle', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                      <input
                        type="time"
                        value={row.from}
                        onChange={e => updateAvailability(i, 'from', e.target.value)}
                        style={{ width: 110, padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: 8, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", fontSize: 13, color: '#111111', outline: 'none', background: '#fff', textAlign: 'center', boxSizing: 'border-box' }}
                      />
                    </td>
                    <td style={{ padding: '8px 0', verticalAlign: 'middle', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                      <input
                        type="time"
                        value={row.to}
                        onChange={e => updateAvailability(i, 'to', e.target.value)}
                        style={{ width: 110, padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: 8, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", fontSize: 13, color: '#111111', outline: 'none', background: '#fff', textAlign: 'center', boxSizing: 'border-box' }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Session Preferences Card */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2a73d4" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Session Preferences
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>Max Sessions Per Day</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="number"
                  value={maxSessions}
                  min={1}
                  max={20}
                  onChange={e => setMaxSessions(Number(e.target.value))}
                  style={{ ...inputStyle, width: 80, textAlign: 'center' }}
                />
                <span style={{ fontSize: 13, color: '#64748b' }}>sessions</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>Session Duration</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="number"
                  value={sessionDuration}
                  min={15}
                  max={180}
                  step={5}
                  onChange={e => setSessionDuration(Number(e.target.value))}
                  style={{ ...inputStyle, width: 80, textAlign: 'center' }}
                />
                <span style={{ fontSize: 13, color: '#64748b' }}>minutes</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>Buffer Between Sessions</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="number"
                  value={bufferMinutes}
                  min={0}
                  max={60}
                  step={5}
                  onChange={e => setBufferMinutes(Number(e.target.value))}
                  style={{ ...inputStyle, width: 80, textAlign: 'center' }}
                />
                <span style={{ fontSize: 13, color: '#64748b' }}>minutes</span>
              </div>
            </div>
            <div style={{ height: 1, background: '#f1f5f9', margin: '4px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#0f172a', display: 'block' }}>Auto-Accept Bookings</span>
                <span style={{ fontSize: 12, color: '#64748b' }}>Automatically accept session requests within your availability</span>
              </div>
              <ToggleSwitch checked={autoAccept} onChange={() => setAutoAccept(!autoAccept)} />
            </div>
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
            <button style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              color: '#64748b',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background = '#f1f5f9'; (e.target as HTMLElement).style.color = '#111111'; (e.target as HTMLElement).style.borderColor = '#94a3b8'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background = '#ffffff'; (e.target as HTMLElement).style.color = '#64748b'; (e.target as HTMLElement).style.borderColor = '#e2e8f0'; }}
            >
              Cancel
            </button>
            <button style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: 'none',
              background: '#2a73d4',
              color: '#fff',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background = '#2361b5'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background = '#2a73d4'; }}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* ==================== SECURITY TAB ==================== */}
      {activeTab === 'security' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2a73d4" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Security &amp; Password
            </h2>
            <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Update your password and secure your account.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>Phone Number</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: '1 / -1' }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>Current Password</label>
                <div style={{ position: 'relative' }}>
                  <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="Enter current password" style={{ ...inputStyle, paddingRight: 44 }} />
                  <button type="button" style={{ position: 'absolute', right: 12, bottom: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: '#64748b' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>New Password</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Enter new password" style={inputStyle} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>Confirm New Password</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm new password" style={inputStyle} />
              </div>
            </div>
            <div style={{ height: 1, background: '#f1f5f9', margin: '4px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#0f172a', display: 'block' }}>Two-Factor Authentication (2FA)</span>
                <span style={{ fontSize: 12, color: '#64748b' }}>Add an extra layer of security to your account using an authenticator app.</span>
              </div>
              <ToggleSwitch checked={twoFA} onChange={() => setTwoFA(!twoFA)} />
            </div>
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
            <button style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              color: '#64748b',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background = '#f1f5f9'; (e.target as HTMLElement).style.color = '#111111'; (e.target as HTMLElement).style.borderColor = '#94a3b8'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background = '#ffffff'; (e.target as HTMLElement).style.color = '#64748b'; (e.target as HTMLElement).style.borderColor = '#e2e8f0'; }}
            >
              Cancel
            </button>
            <button style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: 'none',
              background: '#2a73d4',
              color: '#fff',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background = '#2361b5'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background = '#2a73d4'; }}
            >
              Update Password
            </button>
          </div>
        </div>
      )}

      {/* ==================== NOTIFICATIONS TAB ==================== */}
      {activeTab === 'notifications' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Heali Insight */}
          <div style={{
            background: '#ffffff',
            borderRadius: 16,
            padding: '16px 20px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <img src="/Heali.png" alt="Heali" style={{ width: 40, height: 40, flexShrink: 0 }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#2a73d4', textTransform: 'uppercase', letterSpacing: 0.5 }}>Heali says</div>
              <p style={{ fontSize: 13, color: '#334155', lineHeight: 1.5, margin: 0 }}>Keep your notification preferences up to date so you never miss an important message or booking!</p>
            </div>
          </div>

          {/* Notification Settings Card */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2a73d4" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              Notification Settings
            </h2>
            <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Control when and how you are notified.</p>

            {/* Email Notifications */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#0f172a', display: 'block' }}>Email Notifications</span>
                <span style={{ fontSize: 12, color: '#64748b' }}>Receive daily summaries and important account updates via email.</span>
              </div>
              <ToggleSwitch checked={notifEmail} onChange={() => setNotifEmail(!notifEmail)} />
            </div>

            <div style={{ height: 1, background: '#f1f5f9', margin: '4px 0' }} />

            {/* New Message Alerts */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#0f172a', display: 'block' }}>New Message Alerts (Push)</span>
                <span style={{ fontSize: 12, color: '#64748b' }}>Get instant browser push notifications when a client sends a message.</span>
              </div>
              <ToggleSwitch checked={notifNewMessage} onChange={() => setNotifNewMessage(!notifNewMessage)} />
            </div>

            <div style={{ height: 1, background: '#f1f5f9', margin: '4px 0' }} />

            {/* Session Reminders */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#0f172a', display: 'block' }}>Session Reminders</span>
                <span style={{ fontSize: 12, color: '#64748b' }}>Get reminded 15 min before scheduled sessions.</span>
              </div>
              <ToggleSwitch checked={notifSessionReminders} onChange={() => setNotifSessionReminders(!notifSessionReminders)} />
            </div>

            <div style={{ height: 1, background: '#f1f5f9', margin: '4px 0' }} />

            {/* SMS Notifications */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#0f172a', display: 'block' }}>SMS Notifications</span>
                <span style={{ fontSize: 12, color: '#64748b' }}>Get SMS alerts for urgent communications.</span>
              </div>
              <ToggleSwitch checked={notifSMS} onChange={() => setNotifSMS(!notifSMS)} />
            </div>

            <div style={{ height: 1, background: '#f1f5f9', margin: '4px 0' }} />

            {/* Marketing & Updates */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#0f172a', display: 'block' }}>Marketing &amp; Updates</span>
                <span style={{ fontSize: 12, color: '#64748b' }}>Receive news, tips, and platform announcements.</span>
              </div>
              <ToggleSwitch checked={notifMarketing} onChange={() => setNotifMarketing(!notifMarketing)} />
            </div>
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
            <button style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              color: '#64748b',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background = '#f1f5f9'; (e.target as HTMLElement).style.color = '#111111'; (e.target as HTMLElement).style.borderColor = '#94a3b8'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background = '#ffffff'; (e.target as HTMLElement).style.color = '#64748b'; (e.target as HTMLElement).style.borderColor = '#e2e8f0'; }}
            >
              Cancel
            </button>
            <button style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              border: 'none',
              background: '#2a73d4',
              color: '#fff',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background = '#2361b5'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background = '#2a73d4'; }}
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </TherapistLayout>
  );
};

export default SettingsPage;
