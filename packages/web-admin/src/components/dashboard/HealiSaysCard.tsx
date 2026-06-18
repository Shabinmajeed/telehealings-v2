import React from 'react';
import { Lightbulb } from 'lucide-react';

interface HealiSaysCardProps {
  text?: string;
  accentColor?: string;
}

const HealiSaysCard: React.FC<HealiSaysCardProps> = ({
  text = '',
  accentColor = '#2a73d4',
}) => {
  return (
    <div style={{
      background: '#fff', borderRadius: 16, padding: 24,
      boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', gap: 12,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 700, color: accentColor,
        textTransform: 'uppercase', letterSpacing: 0.5,
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <Lightbulb size={16} />
        Heali says
      </div>
      <p style={{ fontSize: 14, fontStyle: 'italic', color: '#334155', lineHeight: 1.6, margin: 0 }}>
        {text}
      </p>
    </div>
  );
};

export default HealiSaysCard;
