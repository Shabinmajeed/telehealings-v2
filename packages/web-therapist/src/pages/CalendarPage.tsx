import React, { useState } from 'react';
import TherapistLayout from '../components/TherapistLayout';

const CalendarPage: React.FC = () => {
  const [currentDate] = useState(new Date());
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = currentDate.getDate();

  const events: Record<number, Array<{ time: string; title: string; color: string }>> = {
    12: [{ time: '10:30 AM', title: 'Priya Sharma - Session', color: '#3b82f6' }, { time: '2:00 PM', title: 'Anjali Krishnan - Session', color: '#f59e0b' }],
    15: [{ time: '11:00 AM', title: 'Rahul Nair - Session', color: '#22c55e' }],
    18: [{ time: '3:00 PM', title: 'Vikram Das - Session', color: '#8b5cf6' }, { time: '5:00 PM', title: 'Team Meeting', color: '#ec4899' }],
    22: [{ time: '9:00 AM', title: 'Meera Pillai - Session', color: '#14b8a6' }],
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <TherapistLayout activeNav="calendar" pageTitle="Calendar" headerMascot healiInsight={{ text: "You have 5 sessions scheduled this week. Wednesday is your busiest day with 2 back-to-back sessions." }}>
      {/* Calendar Card */}
      <div style={{ background: '#ffffff', borderRadius: 16, padding: 24, boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', margin: 0 }}>{monthNames[month]} {year}</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Today</button>
            <div style={{ display: 'flex', gap: 4 }}>
              {['<', '>'].map((arrow, i) => (
                <button key={i} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontSize: 16, cursor: 'pointer' }}>{arrow}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Day headers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, background: '#f8fafc', borderRadius: 8, padding: '8px 0', marginBottom: 4 }}>
          {daysOfWeek.map(d => (
            <div key={d} style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.5 }}>{d}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
          {cells.map((day, i) => (
            <div key={i} style={{ minHeight: 100, padding: 8, background: day ? '#fff' : 'transparent', border: day ? '1px solid #f1f5f9' : 'none', borderRadius: 4 }}>
              {day && (
                <>
                  <div style={{ fontSize: 13, fontWeight: day === today ? 700 : 500, color: day === today ? '#2a73d4' : '#334155', marginBottom: 4, ...(day === today ? { width: 24, height: 24, borderRadius: '50%', background: '#2a73d4', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' } : {}) }}>
                    {day}
                  </div>
                  {events[day]?.map((evt, j) => (
                    <div key={j} style={{ fontSize: 10, padding: '2px 4px', borderRadius: 4, background: evt.color + '15', color: evt.color, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 600 }}>
                      {evt.time} - {evt.title}
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div style={{ background: '#ffffff', borderRadius: 16, padding: 24, boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0' }}>Upcoming Events</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { date: 'Today', time: '10:30 AM', title: 'Priya Sharma - Video Session', color: '#3b82f6' },
            { date: 'Today', time: '2:00 PM', title: 'Anjali Krishnan - Video Session', color: '#f59e0b' },
            { date: 'Tomorrow', time: '11:00 AM', title: 'Rahul Nair - Audio Session', color: '#22c55e' },
            { date: 'Jun 18', time: '3:00 PM', title: 'Vikram Das - Video Session', color: '#8b5cf6' },
          ].map((evt, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 8, border: '1px solid #f1f5f9' }}>
              <div style={{ width: 4, height: 40, borderRadius: 2, background: evt.color }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{evt.title}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>{evt.date} at {evt.time}</div>
              </div>
              <button style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', fontSize: 12, fontWeight: 600, color: '#2a73d4', cursor: 'pointer' }}>Join</button>
            </div>
          ))}
        </div>
      </div>
    </TherapistLayout>
  );
};

export default CalendarPage;
