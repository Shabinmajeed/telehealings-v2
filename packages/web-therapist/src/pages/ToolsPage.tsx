import React from 'react';
import TherapistLayout from '../components/TherapistLayout';

const ToolsPage: React.FC = () => {
  const tools = [
    { title: 'Session Notes', desc: 'Create and manage session notes for each client', icon: '📝', color: '#3b82f6' },
    { title: 'Treatment Plans', desc: 'Build structured treatment plans with goals and milestones', icon: '📋', color: '#22c55e' },
    { title: 'Progress Tracker', desc: 'Track client progress over time with visual charts', icon: '📊', color: '#f59e0b' },
    { title: 'Assessment Forms', desc: 'Standardized psychological assessment forms', icon: '📄', color: '#8b5cf6' },
    { title: 'Homework Assignments', desc: 'Assign and review client homework between sessions', icon: '📚', color: '#ec4899' },
    { title: 'Crisis Protocols', desc: 'Quick access to crisis intervention protocols', icon: '🚨', color: '#ef4444' },
  ];

  return (
    <TherapistLayout activeNav="tools" pageTitle="Therapist Tools" headerMascot healiInsight={{ text: "Your clients completed 85% of assigned homework this week. Consider increasing engagement with interactive worksheets." }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {tools.map((tool, i) => (
          <div key={i} style={{ background: '#ffffff', borderRadius: 16, padding: 24, boxShadow: '0 4px 15px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9', cursor: 'pointer', transition: 'all 0.2s' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: tool.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 16 }}>
              {tool.icon}
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 8px 0' }}>{tool.title}</h3>
            <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5, margin: 0 }}>{tool.desc}</p>
          </div>
        ))}
      </div>
    </TherapistLayout>
  );
};

export default ToolsPage;
