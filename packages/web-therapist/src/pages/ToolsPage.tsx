import React from 'react';
import TherapistLayout from '../components/TherapistLayout';

const ToolsPage: React.FC = () => {
  const tools = [
    {
      title: 'PHQ-9 Depression Scale',
      desc: 'The Patient Health Questionnaire-9 is a widely used 9-item instrument for screening, diagnosing, and monitoring the severity of depression.',
      iconClass: 'depression',
      iconBg: '#eff6ff',
      iconColor: '#2563eb',
      iconSvg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12h6M9 16h6M9 8h6M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
    },
    {
      title: 'GAD-7 Anxiety Scale',
      desc: 'The Generalized Anxiety Disorder 7-item scale is a validated self-report tool for measuring anxiety symptom severity in clinical practice.',
      iconClass: 'anxiety',
      iconBg: '#fef3c7',
      iconColor: '#d97706',
      iconSvg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
    },
    {
      title: 'Sleep Quality Index',
      desc: 'The Pittsburgh Sleep Quality Index assesses sleep quality and disturbances over a one-month interval to guide treatment planning.',
      iconClass: 'sleep',
      iconBg: '#f0fdf4',
      iconColor: '#16a34a',
      iconSvg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          <path d="M12 2a7 7 0 00-7 7c0 2 2 4 2 6h10c0-2 2-4 2-6a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      title: 'Stress Assessment',
      desc: 'The Perceived Stress Scale measures the degree to which situations in your life are appraised as stressful, helping identify coping strategies.',
      iconClass: 'stress',
      iconBg: '#fef2f2',
      iconColor: '#dc2626',
      iconSvg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          <line x1="4" y1="22" x2="20" y2="22" />
        </svg>
      ),
    },
    {
      title: 'Mood Tracker',
      desc: 'Track and visualize patient mood patterns over time with daily logging, trend analysis, and customizable mood categories.',
      iconClass: 'mood',
      iconBg: '#f5f3ff',
      iconColor: '#7c3aed',
      iconSvg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
          <path d="M12 2v2" /><path d="M12 20v2" />
          <path d="M2 12h2" /><path d="M20 12h2" />
        </svg>
      ),
    },
    {
      title: 'Session Notes Template',
      desc: 'Structured SOAP and DAP note templates for consistent, thorough session documentation with guided prompts and fields.',
      iconClass: 'notes',
      iconBg: '#ecfeff',
      iconColor: '#0891b2',
      iconSvg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
  ];

  const arrowIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );

  return (
    <TherapistLayout
      activeNav="tools"
      pageTitle="Tools / Practice"
      headerMascot
      healiInsight={{
        text: 'Regular use of clinical assessment tools improves patient outcomes by 34%. Keep your assessments up to date for the best care.',
      }}
    >
      {/* Clinical Assessment Tools Card */}
      <div style={{
        background: '#ffffff',
        borderRadius: 16,
        padding: 24,
        boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>
          Clinical Assessment Tools
        </div>
        <div style={{ fontSize: 13, color: '#64748b', margin: '0 0 20px 0' }}>
          Standardized instruments for patient evaluation and monitoring
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }}>
          {tools.map((tool, i) => (
            <div
              key={i}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = '#93c5fd';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(42,115,212,0.1)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = '#e2e8f0';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLDivElement).style.transform = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 8,
                  background: tool.iconBg,
                  color: tool.iconColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {tool.iconSvg}
                  </span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', lineHeight: 1.3 }}>
                  {tool.title}
                </div>
              </div>
              <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.55 }}>
                {tool.desc}
              </div>
              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  padding: '10px 20px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#fff',
                  background: '#2a73d4',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  alignSelf: 'flex-start',
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#2361b5';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#2a73d4';
                }}
                onClick={() => console.log(`Open ${tool.title}`)}
              >
                {arrowIcon}
                Open Tool
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Card */}
      <div style={{
        background: '#ffffff',
        borderRadius: 16,
        padding: 24,
        boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>
          Quick Actions
        </div>
        <div style={{ fontSize: 13, color: '#64748b', margin: '0 0 20px 0' }}>
          Common tasks and shortcuts for your clinical workflow
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 22px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: '#2a73d4',
              color: '#fff',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '#2361b5';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '#2a73d4';
            }}
            onClick={() => console.log('New Assessment')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Assessment
          </button>

          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 22px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              border: '1px solid #e2e8f0',
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: '#ffffff',
              color: '#111111',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '#f8fafc';
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#94a3b8';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '#ffffff';
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#e2e8f0';
            }}
            onClick={() => console.log('View History')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            View History
          </button>

          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 22px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              border: '1px solid #e2e8f0',
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: '#ffffff',
              color: '#111111',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '#f8fafc';
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#94a3b8';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '#ffffff';
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#e2e8f0';
            }}
            onClick={() => console.log('Export Results')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 18, height: 18 }}>
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export Results
          </button>
        </div>
      </div>
    </TherapistLayout>
  );
};

export default ToolsPage;
