import React, { useState } from 'react';
import {
  Plus, Edit, Trash2, Upload, X
} from 'lucide-react';

interface Article {
  id: number;
  title: string;
  category: string;
  author: string;
  lastModified: string;
  status: 'published' | 'draft' | 'archived';
}

interface Resource {
  id: number;
  fileName: string;
  type: string;
  size: string;
  uploaded: string;
  status: 'published' | 'draft';
}

const articlesData: Article[] = [
  { id: 1, title: 'Managing Anxiety in Daily Life', category: 'Mental Health', author: 'Dr. Sarah Smith', lastModified: '25/04/2026', status: 'published' },
  { id: 2, title: 'Better Sleep Hygiene Guide', category: 'Wellness', author: 'Dr. Emily Chen', lastModified: '24/04/2026', status: 'draft' },
  { id: 3, title: 'Understanding Depression', category: 'Mental Health', author: 'Dr. Ajesh Anand', lastModified: '22/04/2026', status: 'published' },
  { id: 4, title: 'Relationship Communication Tips', category: 'Relationships', author: 'Dr. Marcus Reed', lastModified: '20/04/2026', status: 'archived' },
];

const resourcesData: Resource[] = [
  { id: 1, fileName: 'mindfulness_breathing.mp4', type: 'Video', size: '45 MB', uploaded: '24/04/2026', status: 'published' },
  { id: 2, fileName: 'stress_management.pdf', type: 'PDF', size: '2.3 MB', uploaded: '22/04/2026', status: 'published' },
  { id: 3, fileName: 'sleep_meditation.mp3', type: 'Audio', size: '18 MB', uploaded: '20/04/2026', status: 'draft' },
];

const articleStatusConfig: Record<string, { bg: string; text: string; border: string }> = {
  published: { bg: '#dcfce7', text: '#166534', border: '#bbf7d0' },
  draft: { bg: '#fef9c3', text: '#854d0e', border: '#fef08a' },
  archived: { bg: '#f1f5f9', text: '#475569', border: '#e2e8f0' },
};

const ContentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'articles' | 'resources'>('articles');
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [articleForm, setArticleForm] = useState({ title: '', category: 'Mental Health', status: 'Draft', content: '' });

  return (
    <div style={{ padding: '0 32px 16px', overflowY: 'auto', flex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', paddingBottom: 40 }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 40, marginBottom: 12 }}>
          <h1 style={{
            fontSize: 20, fontWeight: 700, color: '#0f172a',
            position: 'relative', padding: '0 0 8px 0',
            borderBottom: '2px solid #e2e8f0', margin: 0,
          }}>
            Content Management
            <span style={{
              position: 'absolute', bottom: -2, left: 0, right: 0,
              height: 3, background: '#0f172a', borderRadius: '2px 2px 0 0',
            }} />
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              border: '1px solid #bfdbfe', borderRadius: 8, flexShrink: 0,
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%', background: '#2563eb', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/>
                  <path d="M9 21h6"/>
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: 0.3, lineHeight: 1.2 }}>Heali Insight</span>
                <span style={{ fontSize: 11, color: '#1e40af', lineHeight: 1.3, whiteSpace: 'nowrap' }}>3 drafts pending review. <strong style={{ fontWeight: 700, color: '#1e3a8a' }}>Sleep Guide</strong> is trending — consider publishing.</span>
              </div>
            </div>
            <img src="/Heali.png" alt="Heali" style={{ height: 32, flexShrink: 0 }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 24, borderBottom: '1px solid #e2e8f0', marginBottom: 16 }}>
          <button
            onClick={() => setActiveTab('articles')}
            style={{
              background: 'transparent', border: 'none', padding: '10px 4px', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', position: 'relative', color: activeTab === 'articles' ? '#2a73d4' : '#64748b',
            }}
          >
            Articles <span style={{ background: activeTab === 'articles' ? '#eff6ff' : '#f1f5f9', color: activeTab === 'articles' ? '#2563eb' : '#94a3b8', borderRadius: 99, padding: '1px 6px', fontSize: 10, fontWeight: 700, marginLeft: 4 }}>4</span>
            {activeTab === 'articles' && <span style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 2, background: '#2a73d4', borderRadius: '2px 2px 0 0' }} />}
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            style={{
              background: 'transparent', border: 'none', padding: '10px 4px', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', position: 'relative', color: activeTab === 'resources' ? '#2a73d4' : '#64748b',
            }}
          >
            Resources <span style={{ background: activeTab === 'resources' ? '#eff6ff' : '#f1f5f9', color: activeTab === 'resources' ? '#2563eb' : '#94a3b8', borderRadius: 99, padding: '1px 6px', fontSize: 10, fontWeight: 700, marginLeft: 4 }}>3</span>
            {activeTab === 'resources' && <span style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 2, background: '#2a73d4', borderRadius: '2px 2px 0 0' }} />}
          </button>
        </div>

        {activeTab === 'articles' ? (
          <>
            {/* Articles Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12, gap: 10 }}>
              <button
                onClick={() => setShowArticleModal(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
                  borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  border: 'none', background: '#2a73d4', color: '#fff',
                }}
              >
                <Plus size={14} /> New Article
              </button>
            </div>

            {/* Articles Table */}
            <div style={{
              background: '#fff', borderRadius: 16, padding: '24px 32px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column',
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Title', 'Category', 'Author', 'Last Modified', 'Status', 'Actions'].map((h, i) => (
                      <th key={i} style={{
                        textAlign: i === 5 ? 'center' : 'left',
                        fontSize: 12, fontWeight: 500, color: '#64748b',
                        padding: '8px 12px', borderBottom: '1px solid #f1f5f9',
                        textTransform: 'uppercase', whiteSpace: 'nowrap',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {articlesData.map((a) => {
                    const sc = articleStatusConfig[a.status];
                    return (
                      <tr key={a.id}>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{a.title}</td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#334155' }}>{a.category}</td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#334155' }}>{a.author}</td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#334155' }}>{a.lastModified}</td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>
                          <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600, background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}>
                            {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                          </span>
                        </td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                          <button style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: 8, borderRadius: '50%', display: 'inline-flex' }}>
                            <Edit size={16} />
                          </button>
                          <button style={{ background: 'transparent', border: 'none', color: '#dc2626', cursor: 'pointer', padding: 8, borderRadius: '50%', display: 'inline-flex' }}>
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {/* Pagination */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid #f1f5f9', marginTop: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', letterSpacing: 0.05, textTransform: 'uppercase' }}>SHOWING 1-4 OF 12</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[1, 2, 3].map(p => (
                    <button key={p} style={{
                      width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 8, border: 'none', background: p === 1 ? '#2563eb' : '#f1f5f9',
                      color: p === 1 ? '#fff' : '#334155', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    }}>{p}</button>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Resources Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
                borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                border: 'none', background: '#2a73d4', color: '#fff',
              }}>
                <Upload size={14} /> Upload Resource
              </button>
            </div>

            {/* Resources Table */}
            <div style={{
              background: '#fff', borderRadius: 16, padding: '24px 32px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column',
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['File Name', 'Type', 'Size', 'Uploaded', 'Status', 'Actions'].map((h, i) => (
                      <th key={i} style={{
                        textAlign: i === 5 ? 'center' : 'left',
                        fontSize: 12, fontWeight: 500, color: '#64748b',
                        padding: '8px 12px', borderBottom: '1px solid #f1f5f9',
                        textTransform: 'uppercase', whiteSpace: 'nowrap',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {resourcesData.map((r) => (
                    <tr key={r.id}>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{r.fileName}</td>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#334155' }}>{r.type}</td>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#334155' }}>{r.size}</td>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#334155' }}>{r.uploaded}</td>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{
                          display: 'inline-block', padding: '4px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600,
                          background: r.status === 'published' ? '#dcfce7' : '#fef9c3',
                          color: r.status === 'published' ? '#166534' : '#854d0e',
                          border: `1px solid ${r.status === 'published' ? '#bbf7d0' : '#fef08a'}`,
                        }}>{r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span>
                      </td>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                        <button style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: 8, borderRadius: '50%', display: 'inline-flex' }}>
                          <Upload size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* New Article Modal */}
      {showArticleModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000,
        }} onClick={() => setShowArticleModal(false)}>
          <div style={{
            background: '#fff', width: 500, maxWidth: '90%', borderRadius: 16,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>New Article</div>
              <button onClick={() => setShowArticleModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b', padding: 4, borderRadius: '50%' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>Title</label>
                <input type="text" value={articleForm.title} onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })} placeholder="Article title" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>Category</label>
                  <select value={articleForm.category} onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14, outline: 'none', boxSizing: 'border-box', background: '#fff' }}>
                    <option>Mental Health</option><option>Wellness</option><option>Relationships</option><option>Self Esteem</option>
                  </select>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>Status</label>
                  <select value={articleForm.status} onChange={(e) => setArticleForm({ ...articleForm, status: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14, outline: 'none', boxSizing: 'border-box', background: '#fff' }}>
                    <option>Draft</option><option>Published</option><option>Archived</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>Content</label>
                <textarea value={articleForm.content} onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })} rows={4} placeholder="Write article content..." style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} />
              </div>
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: 12, background: '#fafafa' }}>
              <button onClick={() => setShowArticleModal(false)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: '1px solid #e2e8f0', background: '#fff', color: '#64748b' }}>Cancel</button>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', background: '#2a73d4', color: '#fff' }}>Save Article</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentPage;
