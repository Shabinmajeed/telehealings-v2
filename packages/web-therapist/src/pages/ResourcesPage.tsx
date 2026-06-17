import React, { useState } from 'react';
import TherapistLayout from '../components/TherapistLayout';

type ResourceType = 'pdf' | 'video' | 'audio' | 'doc' | 'image' | 'link';

interface MyResource {
  type: ResourceType;
  title: string;
  category: string;
  date: string;
}

interface SharedResource {
  type: ResourceType;
  name: string;
  typeName: string;
  category: string;
  sharedBy: string;
  dateShared: string;
}

const myResources: MyResource[] = [
  { type: 'pdf', title: 'Anxiety Management Worksheet', category: 'CBT', date: 'Jun 10, 2026' },
  { type: 'video', title: 'Guided Breathing Exercise', category: 'Mindfulness', date: 'Jun 8, 2026' },
  { type: 'audio', title: 'Sleep Meditation Audio', category: 'Relaxation', date: 'Jun 5, 2026' },
  { type: 'doc', title: 'Depression Screening Checklist', category: 'Assessment', date: 'May 28, 2026' },
  { type: 'image', title: 'Emotion Wheel Infographic', category: 'Psychoeducation', date: 'May 22, 2026' },
  { type: 'link', title: 'Stress Management Guide', category: 'Self-Help', date: 'May 15, 2026' },
];

const sharedResources: SharedResource[] = [
  { type: 'pdf', name: 'DBT Skills Handout', typeName: 'PDF Document', category: 'DBT', sharedBy: 'Dr. Ananya Rao', dateShared: 'Jun 11, 2026' },
  { type: 'video', name: 'Progressive Muscle Relaxation', typeName: 'Video', category: 'Relaxation', sharedBy: 'Dr. Vikram Nair', dateShared: 'Jun 9, 2026' },
  { type: 'audio', name: 'Body Scan Meditation', typeName: 'Audio', category: 'Mindfulness', sharedBy: 'Dr. Meera Krishnan', dateShared: 'Jun 7, 2026' },
  { type: 'doc', name: 'Trauma-Informed Care Checklist', typeName: 'Document', category: 'Trauma', sharedBy: 'Dr. Arjun Pillai', dateShared: 'Jun 4, 2026' },
  { type: 'link', name: 'Burnout Prevention Toolkit', typeName: 'External Link', category: 'Wellness', sharedBy: 'Dr. Priya Sharma', dateShared: 'Jun 1, 2026' },
];

const typeStyles: Record<ResourceType, { bg: string; color: string }> = {
  pdf: { bg: '#fef2f2', color: '#dc2626' },
  video: { bg: '#eff6ff', color: '#2563eb' },
  audio: { bg: '#f0fdf4', color: '#16a34a' },
  doc: { bg: '#fffbeb', color: '#d97706' },
  image: { bg: '#f5f3ff', color: '#7c3aed' },
  link: { bg: '#ecfeff', color: '#0891b2' },
};

const typeIcons: Record<ResourceType, JSX.Element> = {
  pdf: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 20, height: 20 }}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 20, height: 20 }}>
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  audio: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 20, height: 20 }}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 20, height: 20 }}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  image: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 20, height: 20 }}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 20, height: 20 }}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
};

const sharedTypeIcons: Record<ResourceType, JSX.Element> = {
  pdf: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  audio: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  image: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
};

const ResourcesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'my-library' | 'shared'>('my-library');
  const [myLibrarySearch, setMyLibrarySearch] = useState('');
  const [sharedSearch, setSharedSearch] = useState('');

  const filteredMyResources = myResources.filter(r =>
    r.title.toLowerCase().includes(myLibrarySearch.toLowerCase()) ||
    r.category.toLowerCase().includes(myLibrarySearch.toLowerCase())
  );

  const filteredSharedResources = sharedResources.filter(r =>
    r.name.toLowerCase().includes(sharedSearch.toLowerCase()) ||
    r.category.toLowerCase().includes(sharedSearch.toLowerCase()) ||
    r.sharedBy.toLowerCase().includes(sharedSearch.toLowerCase())
  );

  return (
    <TherapistLayout
      activeNav="resources"
      pageTitle="Resources"
      headerMascot
      healiInsight={{ text: 'You have 12 resources in your library. Consider sharing your anxiety management worksheet — it could help other therapists on the platform. New shared resources are available this week!' }}
    >
      {/* Card Wrapper */}
      <div style={{
        background: '#ffffff',
        borderRadius: 16,
        padding: 24,
        boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Card Title */}
        <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>Content Library</div>
        <div style={{ fontSize: 13, color: '#64748b', margin: '0 0 20px 0' }}>Manage and share your therapeutic resources</div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: 0,
          marginBottom: 20,
          borderBottom: '1px solid #e2e8f0',
        }}>
          <button
            onClick={() => setActiveTab('my-library')}
            style={{
              padding: '10px 20px',
              fontSize: 14,
              fontWeight: 600,
              color: activeTab === 'my-library' ? '#2a73d4' : '#64748b',
              border: 'none',
              borderBottom: activeTab === 'my-library' ? '2px solid #2a73d4' : '2px solid transparent',
              marginBottom: -1,
              background: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.2s',
            }}
          >
            My Library
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              background: activeTab === 'my-library' ? '#eff6ff' : '#f1f5f9',
              color: activeTab === 'my-library' ? '#2a73d4' : '#64748b',
              padding: '2px 8px',
              borderRadius: 10,
            }}>{myResources.length}</span>
          </button>
          <button
            onClick={() => setActiveTab('shared')}
            style={{
              padding: '10px 20px',
              fontSize: 14,
              fontWeight: 600,
              color: activeTab === 'shared' ? '#2a73d4' : '#64748b',
              border: 'none',
              borderBottom: activeTab === 'shared' ? '2px solid #2a73d4' : '2px solid transparent',
              marginBottom: -1,
              background: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.2s',
            }}
          >
            Shared Resources
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              background: activeTab === 'shared' ? '#eff6ff' : '#f1f5f9',
              color: activeTab === 'shared' ? '#2a73d4' : '#64748b',
              padding: '2px 8px',
              borderRadius: 10,
            }}>{sharedResources.length}</span>
          </button>
        </div>

        {/* ═══ TAB: My Library ═══ */}
        {activeTab === 'my-library' && (
          <div>
            {/* Toolbar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
              gap: 12,
              flexWrap: 'wrap',
            }}>
              <div style={{
                position: 'relative',
                flex: '1 1 100%',
                maxWidth: 400,
              }}>
                <svg style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 16,
                  height: 16,
                  color: '#64748b',
                }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={myLibrarySearch}
                  onChange={e => setMyLibrarySearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 38px',
                    borderRadius: 8,
                    border: '1px solid #e2e8f0',
                    background: '#f8fafc',
                    fontSize: 13,
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '10px 18px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#fff',
                  background: '#2a73d4',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Upload Resource
                </button>
              </div>
            </div>

            {/* Resource Cards Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16,
            }}>
              {filteredMyResources.map((resource, i) => (
                <div
                  key={i}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 12,
                    padding: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = '#93c5fd';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 15px rgba(42,115,212,0.08)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = '#e2e8f0';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      background: typeStyles[resource.type].bg,
                      color: typeStyles[resource.type].color,
                    }}>
                      {typeIcons[resource.type]}
                    </div>
                    <button style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#64748b',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', lineHeight: 1.4 }}>{resource.title}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{
                      display: 'inline-flex',
                      alignSelf: 'flex-start',
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#2a73d4',
                      background: '#eff6ff',
                      padding: '3px 10px',
                      borderRadius: 20,
                    }}>{resource.category}</span>
                    <span style={{
                      fontSize: 12,
                      color: '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      Added {resource.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ TAB: Shared Resources ═══ */}
        {activeTab === 'shared' && (
          <div>
            {/* Toolbar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
              gap: 12,
              flexWrap: 'wrap',
            }}>
              <div style={{
                position: 'relative',
                flex: '1 1 100%',
                maxWidth: 400,
              }}>
                <svg style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 16,
                  height: 16,
                  color: '#64748b',
                }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search shared resources..."
                  value={sharedSearch}
                  onChange={e => setSharedSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 38px',
                    borderRadius: 8,
                    border: '1px solid #e2e8f0',
                    background: '#f8fafc',
                    fontSize: 13,
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '10px 18px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#fff',
                  background: '#2a73d4',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Upload Resource
                </button>
              </div>
            </div>

            {/* Shared Resources Table */}
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
            }}>
              <thead>
                <tr>
                  {['Resource', 'Category', 'Shared By', 'Date Shared', 'Actions'].map(header => (
                    <th key={header} style={{
                      textAlign: 'left',
                      fontSize: 11,
                      fontWeight: 700,
                      color: '#94a3b8',
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      padding: '10px 12px',
                      borderBottom: '1px solid #f1f5f9',
                    }}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredSharedResources.map((resource, i) => (
                  <tr key={i} style={{ transition: 'background 0.2s' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLTableRowElement).style.background = '#f8fafc';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLTableRowElement).style.background = 'transparent';
                    }}
                  >
                    <td style={{ padding: '14px 12px', fontSize: 13, color: '#334155', borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                          width: 36,
                          height: 36,
                          borderRadius: 8,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          background: typeStyles[resource.type].bg,
                          color: typeStyles[resource.type].color,
                        }}>
                          {sharedTypeIcons[resource.type]}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <span style={{ fontWeight: 600, color: '#0f172a', fontSize: 13 }}>{resource.name}</span>
                          <span style={{ fontSize: 11, color: '#64748b' }}>{resource.typeName}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 12px', fontSize: 13, color: '#334155', borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' }}>
                      <span style={{
                        display: 'inline-flex',
                        fontSize: 11,
                        fontWeight: 600,
                        color: '#7c3aed',
                        background: '#f5f3ff',
                        padding: '3px 10px',
                        borderRadius: 20,
                      }}>{resource.category}</span>
                    </td>
                    <td style={{ padding: '14px 12px', fontSize: 13, color: '#334155', borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          objectFit: 'cover',
                          background: '#e2e8f0',
                          flexShrink: 0,
                        }} />
                        <span style={{ fontSize: 13, color: '#334155' }}>{resource.sharedBy}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 12px', fontSize: 13, color: '#334155', borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' }}>
                      {resource.dateShared}
                    </td>
                    <td style={{ padding: '14px 12px', fontSize: 13, color: '#334155', borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {/* Download / Open Link */}
                        <button title={resource.type === 'link' ? 'Open Link' : 'Download'} style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 30,
                          height: 30,
                          borderRadius: 6,
                          border: '1px solid #e2e8f0',
                          background: '#ffffff',
                          color: '#64748b',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}>
                          {resource.type === 'link' ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                          )}
                        </button>
                        {/* Preview */}
                        <button title="Preview" style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 30,
                          height: 30,
                          borderRadius: 6,
                          border: '1px solid #e2e8f0',
                          background: '#ffffff',
                          color: '#64748b',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                        {/* Save to Library */}
                        <button title="Save to Library" style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 30,
                          height: 30,
                          borderRadius: 6,
                          border: '1px solid #e2e8f0',
                          background: '#ffffff',
                          color: '#64748b',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 40,
              borderTop: '1px solid #f1f5f9',
              marginTop: 8,
            }}>
              <span style={{ fontSize: 12, color: '#64748b' }}>
                Showing 1–{filteredSharedResources.length} of {filteredSharedResources.length} shared resources
              </span>
              <div style={{ display: 'flex', gap: 2 }}>
                <button style={{
                  width: 30,
                  height: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#475569',
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  cursor: 'pointer',
                }}>‹</button>
                <button style={{
                  width: 30,
                  height: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#fff',
                  border: '1px solid #2a73d4',
                  background: '#2a73d4',
                  cursor: 'pointer',
                }}>1</button>
                <button style={{
                  width: 30,
                  height: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#475569',
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  cursor: 'pointer',
                }}>›</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TherapistLayout>
  );
};

export default ResourcesPage;
