import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'

// ── Inline styles (isolated from main site CSS) ──────────
const s = {
  page: { minHeight: '100vh', background: '#0f0f0f', color: '#e8e8e8', fontFamily: 'Inter, system-ui, sans-serif', fontSize: '14px' },
  center: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' },
  card: { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '40px', width: '360px' },
  title: { fontSize: '20px', fontWeight: '700', marginBottom: '24px', color: '#fff' },
  label: { display: 'block', fontSize: '12px', color: '#888', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' },
  input: { width: '100%', padding: '10px 12px', background: '#111', border: '1px solid #333', borderRadius: '8px', color: '#e8e8e8', fontSize: '14px', marginBottom: '14px', boxSizing: 'border-box', outline: 'none' },
  textarea: { width: '100%', padding: '10px 12px', background: '#111', border: '1px solid #333', borderRadius: '8px', color: '#e8e8e8', fontSize: '14px', marginBottom: '14px', boxSizing: 'border-box', resize: 'vertical', outline: 'none', fontFamily: 'inherit', minHeight: '80px' },
  btn: { width: '100%', padding: '11px', background: '#FDB913', color: '#111', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' },
  btnSm: { padding: '7px 14px', background: '#FDB913', color: '#111', border: 'none', borderRadius: '6px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' },
  btnGhost: { padding: '7px 14px', background: 'transparent', color: '#888', border: '1px solid #333', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' },
  btnDanger: { padding: '7px 12px', background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' },
  error: { color: '#ef4444', fontSize: '13px', marginBottom: '12px' },
  success: { color: '#22c55e', fontSize: '13px', marginBottom: '12px' },
  nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', borderBottom: '1px solid #1e1e1e', background: '#0d0d0d' },
  navTitle: { fontSize: '16px', fontWeight: '700', color: '#fff' },
  tabs: { display: 'flex', gap: '4px', padding: '0 32px', borderBottom: '1px solid #1e1e1e', background: '#0d0d0d' },
  tab: (active) => ({ padding: '12px 20px', background: 'none', border: 'none', borderBottom: active ? '2px solid #FDB913' : '2px solid transparent', color: active ? '#FDB913' : '#888', cursor: 'pointer', fontSize: '14px', fontWeight: '600', marginBottom: '-1px' }),
  body: { padding: '32px', maxWidth: '800px' },
  section: { marginBottom: '32px' },
  sectionTitle: { fontSize: '16px', fontWeight: '700', color: '#fff', marginBottom: '20px' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  itemCard: { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '10px', padding: '16px', marginBottom: '10px' },
  itemHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' },
  itemName: { fontWeight: '600', color: '#fff', fontSize: '15px' },
  flex: { display: 'flex', gap: '8px', alignItems: 'center' },
  tag: (status) => ({
    padding: '2px 8px', borderRadius: '20px', fontSize: '11px', fontWeight: '600',
    background: status === 'active' ? '#1a3a1a' : '#2a2a2a',
    color: status === 'active' ? '#22c55e' : '#888',
  }),
  divider: { borderColor: '#1e1e1e', margin: '24px 0' },
}

// ── Login ────────────────────────────────────────────────
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setLoading(false)
  }

  return (
    <div style={{ ...s.center, background: '#0f0f0f' }}>
      <div style={s.card}>
        <h1 style={s.title}>Chaologies Admin</h1>
        <form onSubmit={handleLogin}>
          <label style={s.label}>Email</label>
          <input style={s.input} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <label style={s.label}>Password</label>
          <input style={s.input} type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          {error && <p style={s.error}>{error}</p>}
          <button style={s.btn} type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ── Profile Tab ──────────────────────────────────────────
function ProfileTab() {
  const [data, setData] = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    supabase.from('profile').select('*').eq('id', 1).single()
      .then(({ data }) => setData(data))
  }, [])

  const save = async () => {
    setSaving(true)
    setMsg('')
    const { error } = await supabase.from('profile').update(data).eq('id', 1)
    setMsg(error ? '❌ ' + error.message : '✅ Saved!')
    setSaving(false)
  }

  if (!data) return <p style={{ color: '#888' }}>Loading...</p>

  const field = (label, key, multiline = false) => (
    <div key={key} style={{ marginBottom: '16px' }}>
      <label style={s.label}>{label}</label>
      {multiline
        ? <textarea style={s.textarea} value={data[key] || ''} onChange={e => setData({ ...data, [key]: e.target.value })} />
        : <input style={s.input} value={data[key] || ''} onChange={e => setData({ ...data, [key]: e.target.value })} />
      }
    </div>
  )

  return (
    <div>
      <div style={s.sectionTitle}>Profile</div>
      <div style={s.row}>
        {field('Name (EN)', 'name_en')}
        {field('Name (ZH)', 'name_zh')}
        {field('Tagline (EN)', 'tagline_en')}
        {field('Tagline (ZH)', 'tagline_zh')}
      </div>
      {field('Hook (EN)', 'hook_en', true)}
      {field('Hook (ZH)', 'hook_zh', true)}
      {field('Mission (EN)', 'mission_en', true)}
      {field('Mission (ZH)', 'mission_zh', true)}
      <div style={s.row}>
        {field('Total Followers', 'total_followers')}
        {field('Newsletter URL', 'newsletter_url')}
      </div>
      {msg && <p style={msg.startsWith('✅') ? s.success : s.error}>{msg}</p>}
      <button style={s.btnSm} onClick={save} disabled={saving}>
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}

// ── Platforms Tab ────────────────────────────────────────
function PlatformsTab() {
  const [platforms, setPlatforms] = useState([])
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({})
  const [saving, setSaving] = useState(false)
  const [adding, setAdding] = useState(false)
  const [newItem, setNewItem] = useState({ name: '', name_zh: '', handle: '', followers: '', logo_url: '', url: '', sort_order: 99 })

  const load = () => supabase.from('platforms').select('*').order('sort_order').then(({ data }) => setPlatforms(data || []))
  useEffect(() => { load() }, [])

  const startEdit = (p) => { setEditId(p.id); setEditData({ ...p }) }
  const cancelEdit = () => { setEditId(null); setEditData({}) }

  const saveEdit = async () => {
    setSaving(true)
    await supabase.from('platforms').update(editData).eq('id', editId)
    setEditId(null)
    setSaving(false)
    load()
  }

  const deletePlatform = async (id) => {
    if (!confirm('Delete this platform?')) return
    await supabase.from('platforms').delete().eq('id', id)
    load()
  }

  const saveNew = async () => {
    setSaving(true)
    await supabase.from('platforms').insert(newItem)
    setAdding(false)
    setNewItem({ name: '', name_zh: '', handle: '', followers: '', logo_url: '', url: '', sort_order: 99 })
    setSaving(false)
    load()
  }

  const inlineField = (key, placeholder, obj, setObj) => (
    <input key={key} style={{ ...s.input, marginBottom: '8px' }} placeholder={placeholder} value={obj[key] || ''}
      onChange={e => setObj({ ...obj, [key]: e.target.value })} />
  )

  return (
    <div>
      <div style={{ ...s.itemHeader, marginBottom: '20px' }}>
        <div style={s.sectionTitle}>Platforms</div>
        <button style={s.btnSm} onClick={() => setAdding(true)}>+ Add Platform</button>
      </div>

      {adding && (
        <div style={{ ...s.itemCard, border: '1px solid #FDB913' }}>
          <div style={{ ...s.sectionTitle, fontSize: '14px' }}>New Platform</div>
          <div style={s.row}>
            {inlineField('name', 'Name (EN)', newItem, setNewItem)}
            {inlineField('name_zh', 'Name (ZH)', newItem, setNewItem)}
            {inlineField('handle', 'Handle', newItem, setNewItem)}
            {inlineField('followers', 'Followers', newItem, setNewItem)}
            {inlineField('logo_url', 'Logo URL (e.g. /icons/youtube.png)', newItem, setNewItem)}
            {inlineField('url', 'URL', newItem, setNewItem)}
          </div>
          <div style={s.flex}>
            <button style={s.btnSm} onClick={saveNew} disabled={saving}>Save</button>
            <button style={s.btnGhost} onClick={() => setAdding(false)}>Cancel</button>
          </div>
        </div>
      )}

      {platforms.map(p => (
        <div key={p.id} style={s.itemCard}>
          {editId === p.id ? (
            <>
              <div style={s.row}>
                {inlineField('name', 'Name (EN)', editData, setEditData)}
                {inlineField('name_zh', 'Name (ZH)', editData, setEditData)}
                {inlineField('handle', 'Handle', editData, setEditData)}
                {inlineField('followers', 'Followers', editData, setEditData)}
                {inlineField('logo_url', 'Logo URL', editData, setEditData)}
                {inlineField('url', 'URL', editData, setEditData)}
              </div>
              <div style={s.flex}>
                <button style={s.btnSm} onClick={saveEdit} disabled={saving}>Save</button>
                <button style={s.btnGhost} onClick={cancelEdit}>Cancel</button>
              </div>
            </>
          ) : (
            <div style={s.itemHeader}>
              <div>
                <span style={s.itemName}>{p.name}</span>
                {p.name_zh && p.name_zh !== p.name && <span style={{ color: '#888', marginLeft: '8px' }}>{p.name_zh}</span>}
                <span style={{ color: '#FDB913', marginLeft: '12px', fontSize: '13px' }}>{p.followers}</span>
              </div>
              <div style={s.flex}>
                <button style={s.btnGhost} onClick={() => startEdit(p)}>Edit</button>
                <button style={s.btnDanger} onClick={() => deletePlatform(p.id)}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── Projects Tab ─────────────────────────────────────────
function ProjectsTab() {
  const [projects, setProjects] = useState([])
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({})
  const [saving, setSaving] = useState(false)
  const [adding, setAdding] = useState(false)
  const [newItem, setNewItem] = useState({ icon: '', title_en: '', title_zh: '', desc_en: '', desc_zh: '', status: 'soon', url: '', sort_order: 99, links: [] })

  const load = () => supabase.from('projects').select('*').order('sort_order').then(({ data }) => setProjects(data || []))
  useEffect(() => { load() }, [])

  const startEdit = (p) => { setEditId(p.id); setEditData({ ...p }) }
  const cancelEdit = () => { setEditId(null); setEditData({}) }

  const saveEdit = async () => {
    setSaving(true)
    await supabase.from('projects').update(editData).eq('id', editId)
    setEditId(null)
    setSaving(false)
    load()
  }

  const deleteProject = async (id) => {
    if (!confirm('Delete this project?')) return
    await supabase.from('projects').delete().eq('id', id)
    load()
  }

  const saveNew = async () => {
    setSaving(true)
    await supabase.from('projects').insert(newItem)
    setAdding(false)
    setNewItem({ icon: '', title_en: '', title_zh: '', desc_en: '', desc_zh: '', status: 'soon', url: '', sort_order: 99, links: [] })
    setSaving(false)
    load()
  }

  const statusColors = { active: '#22c55e', course: '#3b82f6', soon: '#888' }

  const editForm = (data, setData) => (
    <>
      <div style={s.row}>
        <div>
          <label style={s.label}>Icon (emoji)</label>
          <input style={{ ...s.input, marginBottom: '8px' }} value={data.icon || ''} onChange={e => setData({ ...data, icon: e.target.value })} />
        </div>
        <div>
          <label style={s.label}>Status</label>
          <select style={{ ...s.input, marginBottom: '8px' }} value={data.status || 'soon'} onChange={e => setData({ ...data, status: e.target.value })}>
            <option value="active">Active</option>
            <option value="course">Course</option>
            <option value="soon">Coming Soon</option>
          </select>
        </div>
        <div>
          <label style={s.label}>Title (EN)</label>
          <input style={{ ...s.input, marginBottom: '8px' }} value={data.title_en || ''} onChange={e => setData({ ...data, title_en: e.target.value })} />
        </div>
        <div>
          <label style={s.label}>Title (ZH)</label>
          <input style={{ ...s.input, marginBottom: '8px' }} value={data.title_zh || ''} onChange={e => setData({ ...data, title_zh: e.target.value })} />
        </div>
        <div>
          <label style={s.label}>Desc (EN)</label>
          <input style={{ ...s.input, marginBottom: '8px' }} value={data.desc_en || ''} onChange={e => setData({ ...data, desc_en: e.target.value })} />
        </div>
        <div>
          <label style={s.label}>Desc (ZH)</label>
          <input style={{ ...s.input, marginBottom: '8px' }} value={data.desc_zh || ''} onChange={e => setData({ ...data, desc_zh: e.target.value })} />
        </div>
      </div>
      <div>
        <label style={s.label}>URL</label>
        <input style={{ ...s.input, marginBottom: '8px' }} value={data.url || ''} onChange={e => setData({ ...data, url: e.target.value })} />
      </div>
    </>
  )

  return (
    <div>
      <div style={{ ...s.itemHeader, marginBottom: '20px' }}>
        <div style={s.sectionTitle}>Projects</div>
        <button style={s.btnSm} onClick={() => setAdding(true)}>+ Add Project</button>
      </div>

      {adding && (
        <div style={{ ...s.itemCard, border: '1px solid #FDB913' }}>
          <div style={{ ...s.sectionTitle, fontSize: '14px' }}>New Project</div>
          {editForm(newItem, setNewItem)}
          <div style={s.flex}>
            <button style={s.btnSm} onClick={saveNew} disabled={saving}>Save</button>
            <button style={s.btnGhost} onClick={() => setAdding(false)}>Cancel</button>
          </div>
        </div>
      )}

      {projects.map(p => (
        <div key={p.id} style={s.itemCard}>
          {editId === p.id ? (
            <>
              {editForm(editData, setEditData)}
              <div style={s.flex}>
                <button style={s.btnSm} onClick={saveEdit} disabled={saving}>Save</button>
                <button style={s.btnGhost} onClick={cancelEdit}>Cancel</button>
              </div>
            </>
          ) : (
            <div style={s.itemHeader}>
              <div style={s.flex}>
                <span style={{ fontSize: '20px' }}>{p.icon}</span>
                <span style={s.itemName}>{p.title_en}</span>
                <span style={{ ...s.tag(p.status), color: statusColors[p.status] || '#888' }}>{p.status}</span>
              </div>
              <div style={s.flex}>
                <button style={s.btnGhost} onClick={() => startEdit(p)}>Edit</button>
                <button style={s.btnDanger} onClick={() => deleteProject(p.id)}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── Dashboard ────────────────────────────────────────────
function Dashboard({ onLogout }) {
  const [tab, setTab] = useState('profile')

  return (
    <div style={s.page}>
      <div style={s.nav}>
        <span style={s.navTitle}>Chaologies Admin</span>
        <div style={s.flex}>
          <a href="/" style={{ ...s.btnGhost, textDecoration: 'none', fontSize: '13px' }}>View Site ↗</a>
          <button style={s.btnGhost} onClick={onLogout}>Logout</button>
        </div>
      </div>
      <div style={s.tabs}>
        {['profile', 'platforms', 'projects'].map(t => (
          <button key={t} style={s.tab(tab === t)} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <div style={s.body}>
        {tab === 'profile' && <ProfileTab />}
        {tab === 'platforms' && <PlatformsTab />}
        {tab === 'projects' && <ProjectsTab />}
      </div>
    </div>
  )
}

// ── Root ─────────────────────────────────────────────────
export default function AdminApp() {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setSession(session))
    return () => subscription.unsubscribe()
  }, [])

  if (session === undefined) return <div style={{ ...s.center, background: '#0f0f0f' }}><p style={{ color: '#888' }}>Loading...</p></div>
  if (!session) return <Login />
  return <Dashboard onLogout={() => supabase.auth.signOut()} />
}
