import React, { useState } from 'react';

const ProfilePage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: 'Dr. Sarah Menon',
    email: 'sarah.menon@telehealings.com',
    phone: '+91 98765 43210',
    specialization: 'Clinical Psychology',
    experience: '8 Years',
    license: 'PYA-2024-001234',
    bio: 'Dr. Sarah Menon is a licensed clinical psychologist with 8 years of experience in cognitive behavioral therapy and trauma-informed care.',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", color: '#111111', lineHeight: 1.5, height: '100%', display: 'flex', overflow: 'hidden', background: 'linear-gradient(110deg, #ffffff 0%, #eef5fc 35%, #7aaaf6 100%)' }}>
      <div style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 24 }}>My Profile</h1>

          {/* Profile Header */}
          <div style={{ background: '#ffffff', borderRadius: 16, padding: 32, boxShadow: '0 4px 15px rgba(0,0,0,0.02)', marginBottom: 24, textAlign: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
              <img src="/user-profile.jpg" alt="Profile" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: '4px solid #fff', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <button style={{ position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderRadius: '50%', background: '#2a73d4', color: '#fff', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
              </button>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>{formData.name}</h2>
            <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>{formData.specialization} • {formData.experience}</p>
          </div>

          {/* Profile Form */}
          <div style={{ background: '#ffffff', borderRadius: 16, padding: 32, boxShadow: '0 4px 15px rgba(0,0,0,0.02)', marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Personal Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {[
                { label: 'Full Name', field: 'name', type: 'text' },
                { label: 'Email', field: 'email', type: 'email' },
                { label: 'Phone', field: 'phone', type: 'text' },
                { label: 'License Number', field: 'license', type: 'text' },
              ].map(input => (
                <div key={input.field}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>{input.label}</label>
                  <input type={input.type} value={formData[input.field as keyof typeof formData]} onChange={e => handleChange(input.field, e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />
                </div>
              ))}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>Bio</label>
                <textarea value={formData.bio} onChange={e => handleChange('bio', e.target.value)} rows={4} style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' }} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
              <button style={{ padding: '12px 24px', borderRadius: 8, border: 'none', background: '#2a73d4', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Save Changes</button>
            </div>
          </div>

          {/* Credentials */}
          <div style={{ background: '#ffffff', borderRadius: 16, padding: 32, boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Credentials & Certifications</h3>
            {[
              { title: 'Licensed Clinical Psychologist', org: 'Indian Association of Clinical Psychologists', year: '2018' },
              { title: 'CBT Certification', org: 'Beck Institute', year: '2019' },
              { title: 'Trauma-Informed Care', org: 'NICABM', year: '2021' },
            ].map((cert, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < 2 ? '1px solid #f1f5f9' : 'none' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{cert.title}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{cert.org} • {cert.year}</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#22c55e', background: '#f0fdf4', padding: '3px 10px', borderRadius: 20 }}>Verified</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
