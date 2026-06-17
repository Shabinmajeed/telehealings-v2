import React, { useState } from 'react';
import TherapistLayout from '../components/TherapistLayout';

const ResourcesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('articles');

  const tabs = [
    { key: 'articles', label: 'Articles' },
    { key: 'worksheets', label: 'Worksheets' },
    { key: 'videos', label: 'Videos' },
  ];

  const resources = activeTab === 'articles' ? [
    { title: 'Understanding Cognitive Behavioral Therapy', category: 'CBT', date: 'Jun 10, 2025', views: 1240 },
    { title: 'Managing Anxiety: A Comprehensive Guide', category: 'Anxiety', date: 'May 28, 2025', views: 890 },
    { title: 'Mindfulness Techniques for Daily Practice', category: 'Mindfulness', date: 'May 15, 2025', views: 2100 },
    { title: 'Building Resilience in Adolescents', category: 'Youth', date: 'Apr 30, 2025', views: 650 },
  ] : activeTab === 'worksheets' ? [
    { title: 'Thought Record Worksheet', category: 'CBT', date: 'Jun 5, 2025', views: 3200 },
    { title: 'Anxiety Trigger Mapping', category: 'Anxiety', date: 'May 20, 2025', views: 1800 },
    { title: 'Mood Diary Template', category: 'General', date: 'May 1, 2025', views: 2500 },
  ] : [
    { title: 'Guided Meditation for Beginners', category: 'Mindfulness', date: 'Jun 1, 2025', views: 4500 },
    { title: 'Breathing Exercises Demo', category: 'Techniques', date: 'May 15, 2025', views: 3800 },
    { title: 'Progressive Muscle Relaxation', category: 'Relaxation', date: 'Apr 20, 2025', views: 2100 },
  ];

  return (
    <TherapistLayout activeNav="resources" pageTitle="Resources" headerMascot>
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #e2e8f0' }}>
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ padding: '10px 20px', fontSize: 14, fontWeight: 600, color: activeTab === tab.key ? '#2a73d4' : '#64748b', border: 'none', borderBottom: activeTab === tab.key ? '2px solid #2a73d4' : '2px solid transparent', marginBottom: -1, background: 'none', cursor: 'pointer' }}>
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {resources.map((res, i) => (
          <div key={i} style={{ background: '#ffffff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', cursor: 'pointer' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#2a73d4', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>{res.category}</div>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', margin: '0 0 8px 0', lineHeight: 1.4 }}>{res.title}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b' }}>
              <span>{res.date}</span>
              <span>{res.views.toLocaleString()} views</span>
            </div>
          </div>
        ))}
      </div>
    </TherapistLayout>
  );
};

export default ResourcesPage;
