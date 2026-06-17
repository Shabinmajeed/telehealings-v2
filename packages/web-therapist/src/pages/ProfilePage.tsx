import React, { useState } from 'react';
import TherapistLayout from '../components/TherapistLayout';

const ProfilePage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: 'Sarah',
    lastName: 'Menon',
    email: 'sarah.menon@telehealings.com',
    phone: '+91 98765 43210',
    specialization: 'cbt',
    licenseNumber: 'KL-2023-PSY-04521',
    bio: 'Licensed Clinical Psychologist with over 8 years of experience in cognitive behavioral therapy, anxiety management, and trauma-informed care. Passionate about making mental healthcare accessible through telehealth platforms.',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    alert('Profile changes saved successfully!');
  };

  const credentials = [
    { name: 'Licensed Clinical Psychologist', issuer: 'RCI, India', year: '2018' },
    { name: 'CBT Certification', issuer: 'Beck Institute', year: '2019' },
    { name: 'Trauma-Informed Care', issuer: 'NIMHANS', year: '2020' },
  ];

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: 8,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", fontSize: 14,
    color: '#111111', outline: 'none', background: '#fff', boxSizing: 'border-box' as const,
  };

  return (
    <TherapistLayout activeNav="profile">

      {/* Profile Header Card */}
      <div style={{ background: '#ffffff', borderRadius: 16, boxShadow: '0 4px 15px rgba(0,0,0,0.02)', padding: 32, display: 'flex', alignItems: 'center', gap: 28 }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <img src="/user-profile.jpg" alt="Dr. Sarah Menon" style={{ width: 110, height: 110, borderRadius: '50%', objectFit: 'cover', border: '4px solid #fff', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', background: '#e2e8f0' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <button aria-label="Change photo" style={{ position: 'absolute', bottom: 4, right: 4, width: 32, height: 32, borderRadius: '50%', background: '#2a73d4', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid #fff' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
          </button>
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0', lineHeight: 1.2 }}>Dr. {formData.firstName} {formData.lastName}</h1>
          <p style={{ fontSize: 14, color: '#64748b', margin: '0 0 12px 0' }}>Clinical Psychologist · Telehealings</p>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#4b4b4b' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Kochi, Kerala
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#4b4b4b' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              {formData.email}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#4b4b4b' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {formData.phone}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', background: '#ffffff', color: '#64748b', border: '1px solid #e2e8f0', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Message
          </button>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', background: '#2a73d4', color: '#fff', border: 'none', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
            Edit Profile
          </button>
        </div>
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20, alignItems: 'start' }}>

        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Personal Info Card */}
          <section style={{ background: '#ffffff', borderRadius: 16, padding: 24, boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2a73d4" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Personal Information
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }} htmlFor="firstName">First Name</label>
                <input style={inputStyle} type="text" id="firstName" value={formData.firstName} placeholder="Enter first name" onChange={e => handleChange('firstName', e.target.value)} onFocus={e => { e.target.style.borderColor = '#2a73d4'; e.target.style.boxShadow = '0 0 0 3px rgba(42,115,212,0.1)'; }} onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }} htmlFor="lastName">Last Name</label>
                <input style={inputStyle} type="text" id="lastName" value={formData.lastName} placeholder="Enter last name" onChange={e => handleChange('lastName', e.target.value)} onFocus={e => { e.target.style.borderColor = '#2a73d4'; e.target.style.boxShadow = '0 0 0 3px rgba(42,115,212,0.1)'; }} onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }} htmlFor="email">Email</label>
                <input style={inputStyle} type="email" id="email" value={formData.email} placeholder="you@example.com" onChange={e => handleChange('email', e.target.value)} onFocus={e => { e.target.style.borderColor = '#2a73d4'; e.target.style.boxShadow = '0 0 0 3px rgba(42,115,212,0.1)'; }} onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }} htmlFor="phone">Phone</label>
                <input style={inputStyle} type="tel" id="phone" value={formData.phone} placeholder="+91 XXXXX XXXXX" onChange={e => handleChange('phone', e.target.value)} onFocus={e => { e.target.style.borderColor = '#2a73d4'; e.target.style.boxShadow = '0 0 0 3px rgba(42,115,212,0.1)'; }} onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }} htmlFor="specialization">Specialization</label>
                <select style={{ ...inputStyle, cursor: 'pointer', appearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', paddingRight: 36 }} id="specialization" value={formData.specialization} onChange={e => handleChange('specialization', e.target.value)} onFocus={e => { e.target.style.borderColor = '#2a73d4'; e.target.style.boxShadow = '0 0 0 3px rgba(42,115,212,0.1)'; }} onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}>
                  <option value="">Select specialization</option>
                  <option value="clinical">Clinical Psychology</option>
                  <option value="cbt">Cognitive Behavioral Therapy</option>
                  <option value="trauma">Trauma Therapy</option>
                  <option value="child">Child & Adolescent Psychology</option>
                  <option value="couples">Couples & Family Therapy</option>
                  <option value="addiction">Addiction Counseling</option>
                  <option value="psych">Psychiatry</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }} htmlFor="licenseNumber">License Number</label>
                <input style={inputStyle} type="text" id="licenseNumber" value={formData.licenseNumber} placeholder="Enter license number" onChange={e => handleChange('licenseNumber', e.target.value)} onFocus={e => { e.target.style.borderColor = '#2a73d4'; e.target.style.boxShadow = '0 0 0 3px rgba(42,115,212,0.1)'; }} onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: '1 / -1' }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }} htmlFor="bio">Bio</label>
                <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 90, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }} id="bio" value={formData.bio} placeholder="Write a brief bio about yourself..." onChange={e => handleChange('bio', e.target.value)} onFocus={e => { e.target.style.borderColor = '#2a73d4'; e.target.style.boxShadow = '0 0 0 3px rgba(42,115,212,0.1)'; }} onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 20, borderTop: '1px solid #f1f5f9', marginTop: 20 }}>
              <button onClick={handleSave} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', background: '#2a73d4', color: '#fff', border: 'none', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
                Save Changes
              </button>
            </div>
          </section>

          {/* Credentials Card */}
          <section style={{ background: '#ffffff', borderRadius: 16, padding: 24, boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2a73d4" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              Credentials & Certifications
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {credentials.map((cred, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{cred.name}</div>
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{cred.issuer} · {cred.year}</div>
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 700, color: '#16a34a', background: '#f0fdf4', padding: '3px 8px', borderRadius: 10 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Stats Card */}
          <section style={{ background: '#ffffff', borderRadius: 16, padding: 24, boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2a73d4" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              Stats
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: '#f8fafc', borderRadius: 8 }}>
                <span style={{ fontSize: 13, color: '#64748b' }}>Sessions Completed</span>
                <span style={{ fontSize: 20, fontWeight: 700, color: '#2a73d4' }}>248</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: '#f8fafc', borderRadius: 8 }}>
                <span style={{ fontSize: 13, color: '#64748b' }}>Years Experience</span>
                <span style={{ fontSize: 20, fontWeight: 700, color: '#2a73d4' }}>8+</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: '#f8fafc', borderRadius: 8 }}>
                <span style={{ fontSize: 13, color: '#64748b' }}>Average Rating</span>
                <span style={{ fontSize: 20, fontWeight: 700, color: '#2a73d4' }}>4.9 ★</span>
              </div>
            </div>
          </section>

          {/* About Card */}
          <section style={{ background: '#ffffff', borderRadius: 16, padding: 24, boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 20px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2a73d4" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              About
            </h2>
            <p style={{ fontSize: 14, color: '#4b4b4b', lineHeight: 1.7, margin: 0 }}>
              Licensed Clinical Psychologist with over 8 years of experience in cognitive behavioral therapy, anxiety management, and trauma-informed care. Passionate about making mental healthcare accessible through telehealth platforms.
            </p>
          </section>
        </div>
      </div>
    </TherapistLayout>
  );
};

export default ProfilePage;
