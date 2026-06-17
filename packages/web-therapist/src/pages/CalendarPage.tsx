import React, { useState, useMemo } from 'react';
import TherapistLayout from '../components/TherapistLayout';

interface Session {
  name: string;
  type: string;
  day: number; // 0=Mon ... 6=Sun
  hour: number;
  duration: number; // in hours
  status: 'upcoming' | 'ongoing' | 'completed';
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];

const ALL_SESSIONS: Session[] = [
  { name: 'Rajesh Nair', type: 'Video Call', day: 0, hour: 9, duration: 1, status: 'upcoming' },
  { name: 'Anjali Krishnan', type: 'In-Person', day: 1, hour: 11, duration: 1, status: 'ongoing' },
  { name: 'Priya Sharma', type: 'Video Call', day: 2, hour: 14, duration: 1, status: 'completed' },
  { name: 'Amit Desai', type: 'Phone Session', day: 3, hour: 10, duration: 1, status: 'upcoming' },
  { name: 'Deepa Menon', type: 'Video Call', day: 4, hour: 15, duration: 1, status: 'completed' },
  { name: 'Vikram Rao', type: 'In-Person', day: 5, hour: 13, duration: 1, status: 'upcoming' },
];

function getMonday(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function formatWeekLabel(start: Date): string {
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  if (start.getMonth() === end.getMonth()) {
    return `${MONTHS[start.getMonth()]} ${start.getDate()} – ${end.getDate()}, ${start.getFullYear()}`;
  }
  return `${MONTHS[start.getMonth()]} ${start.getDate()} – ${MONTHS[end.getMonth()]} ${end.getDate()}, ${start.getFullYear()}`;
}

function formatHour(hour: number): string {
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
  return `${displayHour} ${ampm}`;
}

const CalendarPage: React.FC = () => {
  const today = useMemo(() => new Date(), []);
  const [weekStart, setWeekStart] = useState<Date>(() => getMonday(new Date()));

  const goToPrevWeek = () => {
    setWeekStart(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 7);
      return d;
    });
  };

  const goToNextWeek = () => {
    setWeekStart(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 7);
      return d;
    });
  };

  const goToToday = () => {
    setWeekStart(getMonday(today));
  };

  // Build the 7 dates of the current week
  const weekDates = useMemo(() => {
    return DAYS.map((_, i) => {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [weekStart]);

  const todayColIndex = weekDates.findIndex(d => isSameDay(d, today));

  // Filter sessions for the visible week
  const activeSessions = useMemo(() => {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    return ALL_SESSIONS.filter(s => {
      const sessDate = new Date(weekStart);
      sessDate.setDate(sessDate.getDate() + s.day);
      sessDate.setHours(0, 0, 0, 0);
      return sessDate >= weekStart && sessDate <= weekEnd;
    });
  }, [weekStart]);

  // Count by status
  const counts = useMemo(() => {
    const c = { upcoming: 0, ongoing: 0, completed: 0 };
    activeSessions.forEach(s => { c[s.status]++; });
    return c;
  }, [activeSessions]);

  // Session color styles by status
  const sessionStyles: Record<string, React.CSSProperties> = {
    upcoming: { background: '#eff6ff', color: '#1d4ed8', borderLeft: '3px solid #3b82f6' },
    ongoing: { background: '#fffbeb', color: '#92400e', borderLeft: '3px solid #f59e0b' },
    completed: { background: '#f0fdf4', color: '#166534', borderLeft: '3px solid #22c55e' },
  };

  return (
    <TherapistLayout
      activeNav="calendar"
      pageTitle="Calendar"
      headerMascot
      healiInsight={{ text: "You have 6 sessions scheduled this week. Your next session with Rajesh Nair is tomorrow at 9:00 AM. Your calendar looks well-balanced — great job spacing out your appointments to avoid burnout!" }}
    >
      {/* Calendar Card */}
      <div style={{ background: '#ffffff', borderRadius: 16, padding: 24, boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>

        {/* Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Prev Week */}
            <button onClick={goToPrevWeek} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 8, border: '1px solid #e2e8f0', background: '#ffffff', color: '#64748b', cursor: 'pointer', transition: 'all 0.2s' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            {/* Today */}
            <button onClick={goToToday} style={{ display: 'inline-flex', alignItems: 'center', padding: '0 16px', height: 36, borderRadius: 8, border: '1px solid #e2e8f0', background: '#ffffff', fontSize: 13, fontWeight: 600, color: '#111111', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>
              Today
            </button>
            {/* Next Week */}
            <button onClick={goToNextWeek} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 8, border: '1px solid #e2e8f0', background: '#ffffff', color: '#64748b', cursor: 'pointer', transition: 'all 0.2s' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Week Indicator */}
          <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>
            {formatWeekLabel(weekStart)}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 12, paddingLeft: 12, borderLeft: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 500, color: '#64748b' }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: '#3b82f6' }} />
                Upcoming
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 500, color: '#64748b' }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: '#f59e0b' }} />
                Ongoing
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 500, color: '#64748b' }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: '#22c55e' }} />
                Completed
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)', minWidth: 800 }}>

            {/* Header Row: empty time-col + 7 day headers */}
            <div style={{ padding: '12px 8px', textAlign: 'center', background: '#f1f5f9', borderBottom: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0' }} />
            {DAYS.map((dayName, i) => {
              const isToday = todayColIndex === i;
              return (
                <div
                  key={dayName}
                  style={{
                    padding: '12px 8px',
                    textAlign: 'center',
                    background: '#f8fafc',
                    borderBottom: '1px solid #e2e8f0',
                    borderRight: i < 6 ? '1px solid #f1f5f9' : 'none',
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 700, color: isToday ? '#2a73d4' : '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {dayName}
                  </div>
                  <div style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: isToday ? '#2a73d4' : '#0f172a',
                    marginTop: isToday ? 0 : 2,
                    ...(isToday ? {
                      background: '#eff6ff',
                      borderRadius: '50%',
                      width: 32,
                      height: 32,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    } : {}),
                  }}>
                    {weekDates[i].getDate()}
                  </div>
                </div>
              );
            })}

            {/* Time Rows */}
            {HOURS.map((hour, hIdx) => {
              const isLast = hIdx === HOURS.length - 1;
              return (
                <React.Fragment key={hour}>
                  {/* Time label */}
                  <div style={{
                    padding: '0 8px',
                    paddingTop: 2,
                    textAlign: 'right',
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#94a3b8',
                    borderRight: '1px solid #e2e8f0',
                    borderBottom: isLast ? 'none' : '1px solid #f1f5f9',
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    background: '#f8fafc',
                  }}>
                    {formatHour(hour)}
                  </div>

                  {/* Day cells */}
                  {DAYS.map((_, dIdx) => {
                    const isTodayCell = todayColIndex === dIdx;
                    return (
                      <div
                        key={`${hour}-${dIdx}`}
                        style={{
                          height: 56,
                          borderRight: dIdx < 6 ? '1px solid #f1f5f9' : 'none',
                          borderBottom: isLast ? 'none' : '1px solid #f1f5f9',
                          position: 'relative',
                          ...(isTodayCell ? {
                            background: 'rgba(42, 115, 212, 0.08)',
                            boxShadow: 'inset 0 0 0 2px rgba(42, 115, 212, 0.3)',
                          } : {}),
                        }}
                      >
                        {/* Session blocks for this cell */}
                        {activeSessions
                          .filter(s => s.day === dIdx && s.hour === hour)
                          .map((sess, sIdx) => (
                            <div
                              key={sIdx}
                              title={`${sess.name} — ${sess.type} (${sess.status})`}
                              style={{
                                position: 'absolute',
                                left: 3,
                                right: 3,
                                top: 2,
                                height: sess.duration > 1 ? (sess.duration * 56 - 4) : 52,
                                borderRadius: 6,
                                padding: '4px 6px',
                                fontSize: 10,
                                fontWeight: 600,
                                lineHeight: 1.3,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                zIndex: 2,
                                cursor: 'pointer',
                                transition: 'transform 0.1s, box-shadow 0.1s',
                                ...sessionStyles[sess.status],
                              }}
                            >
                              <span style={{ fontWeight: 700, fontSize: 10, display: 'block' }}>{sess.name}</span>
                              <span style={{ fontSize: 9, fontWeight: 500, opacity: 0.85, display: 'block' }}>{sess.type}</span>
                            </div>
                          ))}
                      </div>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Session Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderRadius: 8, background: '#f8fafc', border: '1px solid #f1f5f9' }}>
            <div style={{ width: 12, height: 12, borderRadius: 4, background: '#3b82f6', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>{counts.upcoming}</div>
              <div style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>Upcoming</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderRadius: 8, background: '#f8fafc', border: '1px solid #f1f5f9' }}>
            <div style={{ width: 12, height: 12, borderRadius: 4, background: '#f59e0b', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>{counts.ongoing}</div>
              <div style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>Ongoing</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderRadius: 8, background: '#f8fafc', border: '1px solid #f1f5f9' }}>
            <div style={{ width: 12, height: 12, borderRadius: 4, background: '#22c55e', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>{counts.completed}</div>
              <div style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>Completed</div>
            </div>
          </div>
        </div>
      </div>
    </TherapistLayout>
  );
};

export default CalendarPage;
