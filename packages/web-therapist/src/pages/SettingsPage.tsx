import React, { useState } from 'react';

const SettingsPage: React.FC = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    sessionReminders: true,
    newMessages: true,
  });

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", color: '#111111', lineHeight: 1.5, height: '100%', display: 'flex', overflow: 'hidden', background: 'linear-gradient(110deg, #ffffff 0%, #eef5fc 35%, #7aaaf6 100%)' }}>
      <div style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 24 }}>Settings</h1>

          {/* Notification Settings */}
          <div style={{ background: '#ffffff', borderRadius: 16, padding: 24, boxShadow: '0 4px 15px rgba(0,0,0,0.02)', marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Notification Preferences</h3>
            {[
              { key: 'email', label: 'Email Notifications', desc: 'Receive email updates about your sessions' },
              { key: 'sms', label: 'SMS Notifications', desc: 'Get text messages for urgent updates' },
              { key: 'push', label: 'Push Notifications', desc: 'Browser and mobile push notifications' },
              { key: 'sessionReminders', label: 'Session Reminders', desc: 'Reminders 30 minutes before sessions' },
              { key: 'newMessages', label: 'New Message Alerts', desc: 'Alerts when clients send messages' },
            ].map(item => (
              <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #f1f5f9' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{item.desc}</div>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                  style={{ width: 44, height: 24, borderRadius: 12, border: 'none', background: notifications[item.key as keyof typeof notifications] ? '#2a73d4' : '#cbd5e1', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}
                >
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: notifications[item.key as keyof typeof notifications] ? 22 : 2, transition: 'left 0.2s' }} />
                </button>
              </div>
            ))}
          </div>

          {/* Session Settings */}
          <div style={{ background: '#ffffff', borderRadius: 16, padding: 24, boxShadow: '0 4px 15px rgba(0,0,0,0.02)', marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Session Settings</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>Default Session Duration</label>
                <select style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', background: '#fff' }}>
                  <option>30 minutes</option>
                  <option>45 minutes</option>
                  <option>60 minutes</option>
                  <option>90 minutes</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>Cancellation Policy</label>
                <select style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', background: '#fff' }}>
                  <option>24 hours notice</option>
                  <option>12 hours notice</option>
                  <option>6 hours notice</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security */}
          <div style={{ background: '#ffffff', borderRadius: 16, padding: 24, boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Security</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>Change Password</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>Last changed 30 days ago</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
              <button style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>Two-Factor Authentication</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>Add an extra layer of security</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
