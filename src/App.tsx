import { useMemo, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Search, Bell, HelpCircle, Settings, LayoutDashboard, Users, ShieldCheck, FileText, BarChart3, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, Plus, SlidersHorizontal, Download, X, Check, Trash2, Mail, UserRound, LockKeyhole, Menu } from 'lucide-react'
import { seedUsers } from './data'
import { roleDescriptions } from './types'
import type { Role, User, UserStatus } from './types'

const storageKey = 'atlas-admin-users'
const readUsers = (): User[] => {
  try { const raw = localStorage.getItem(storageKey); return raw ? JSON.parse(raw) : seedUsers } catch { return seedUsers }
}
const persist = (users: User[]) => localStorage.setItem(storageKey, JSON.stringify(users))

function App() {
  const [users, setUsers] = useState<User[]>(readUsers)
  const [query, setQuery] = useState('')
  const [role, setRole] = useState('All roles')
  const [status, setStatus] = useState('All status')
  const [department, setDepartment] = useState('All departments')
  const [sortAsc, setSortAsc] = useState(true)
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState<'add' | 'edit' | null>(null)
  const [editing, setEditing] = useState<User | null>(null)
  const [menu, setMenu] = useState<string | null>(null)
  const [notice, setNotice] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const perPage = 8
  const filtered = useMemo(() => users.filter(u => (u.name + u.email).toLowerCase().includes(query.toLowerCase()) && (role === 'All roles' || u.role === role) && (status === 'All status' || u.status === status) && (department === 'All departments' || u.department === department)).sort((a, b) => sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)), [users, query, role, status, department, sortAsc])
  const pages = Math.max(1, Math.ceil(filtered.length / perPage))
  const shown = filtered.slice((page - 1) * perPage, page * perPage)
  const stats = { total: users.length, active: users.filter(u => u.status === 'Active').length, pending: users.filter(u => u.status === 'Pending').length, suspended: users.filter(u => u.status === 'Suspended').length, departments: new Set(users.map(u => u.department)).size }
  const save = (user: User) => {
    const next = editing ? users.map(u => u.id === user.id ? user : u) : [user, ...users]
    setUsers(next); persist(next); setModal(null); setEditing(null); setNotice(editing ? 'User details updated' : 'Invitation sent successfully'); setTimeout(() => setNotice(''), 3000)
  }
  const remove = (id: string) => { const target = users.find(u => u.id === id); if (!target || !window.confirm(`Delete ${target.name}? This action cannot be undone.`)) return; const next = users.filter(u => u.id !== id); setUsers(next); persist(next); setMenu(null); setNotice('User removed'); setTimeout(() => setNotice(''), 3000) }
  const updateStatus = (u: User, value: UserStatus) => save({ ...u, status: value })

  return <div className="app" onClick={() => menu && setMenu(null)}>
    {sidebarOpen && <button className="sidebar-overlay" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />}
    <aside className={`sidebar${sidebarOpen ? ' open' : ''}`} onClick={e => e.stopPropagation()}>
      <div className="brand"><div className="brand-mark">a</div><span>atlas</span></div>
      <div className="workspace-switch"><span className="workspace-dot">C</span><span>Catalog workspace</span><ChevronDown size={15}/></div>
      <nav><p className="nav-label">Workspace</p><Nav icon={<LayoutDashboard/>} label="Overview" onNavigate={() => setSidebarOpen(false)}/><Nav icon={<BarChart3/>} label="Analytics" onNavigate={() => setSidebarOpen(false)}/><Nav icon={<Users/>} label="Users" active badge={stats.total} onNavigate={() => setSidebarOpen(false)}/><Nav icon={<FileText/>} label="Content" onNavigate={() => setSidebarOpen(false)}/><p className="nav-label second">Manage</p><Nav icon={<ShieldCheck/>} label="Roles & permissions" onNavigate={() => setSidebarOpen(false)}/><Nav icon={<Settings/>} label="Settings" onNavigate={() => setSidebarOpen(false)}/></nav>
      <div className="sidebar-footer"><div className="help-card"><HelpCircle size={17}/><div><b>Need help?</b><small>Visit our help center</small></div><ChevronRight size={15}/></div><div className="profile"><div className="avatar me">OR</div><div><b>Olivia Rhye</b><small>olivia@catalogapp.io</small></div><MoreHorizontal size={18}/></div></div>
    </aside>
    <main>
      <header><div className="breadcrumb"><button className="mobile-menu icon-btn" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}><Menu/></button><span>Workspace</span><ChevronRight size={14}/><b>Users</b></div><div className="header-actions"><button className="icon-btn" aria-label="Help"><HelpCircle/></button><button className="icon-btn" aria-label="Notifications"><Bell/><i/></button><div className="header-avatar">OR</div></div></header>
      <section className="content"><div className="title-row"><div><p className="eyebrow">Workspace management</p><h1>Users</h1><p className="subtitle">Manage who has access to your workspace and what they can do.</p></div><button className="primary" onClick={() => {setEditing(null); setModal('add')}}><Plus size={18}/> Invite user</button></div>
        <div className="stats"><Stat label="Total users" value={stats.total} hint="+2.5%" good/><Stat label="Active users" value={stats.active} hint="+5.1%" good/><Stat label="Pending invites" value={stats.pending} hint="Last 30 days"/><Stat label="Suspended users" value={stats.suspended} hint="Needs review"/><Stat label="Departments" value={stats.departments} hint="Across workspace"/></div>
        <div className="panel"><div className="panel-head"><div><h2>All users <span className="count">{filtered.length}</span></h2><p>A list of all users in your workspace.</p></div><button className="export" onClick={() => { const csv = 'Name,Email,Role,Status\\n' + users.map(u => `${u.name},${u.email},${u.role},${u.status}`).join('\\n'); const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], {type:'text/csv'})); a.download='atlas-users.csv'; a.click() }}><Download size={16}/> Export</button></div>
          <div className="toolbar"><div className="search"><Search size={18}/><input aria-label="Search users" placeholder="Search by name or email..." value={query} onChange={e => {setQuery(e.target.value); setPage(1)}}/>{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X size={14}/></button>}</div><Select label={role} options={['All roles','Admin','Manager','Editor','Viewer']} onChange={setRole}/><Select label={status} options={['All status','Active','Pending','Suspended']} onChange={setStatus}/><Select label={department} options={['All departments','Operations','Engineering','Design','Marketing','Finance','Sales']} onChange={setDepartment}/><button className="filter-btn"><SlidersHorizontal size={16}/> Filters</button></div>
          <div className="table-wrap"><table><thead><tr><th><input type="checkbox" aria-label="Select all users"/></th><th><button className="sort" onClick={() => setSortAsc(v => !v)}>User <span>{sortAsc ? '↑' : '↓'}</span></button></th><th>Role</th><th>Status</th><th>Last active</th><th>Joined</th><th></th></tr></thead><tbody>{shown.map(u => <tr key={u.id}><td><input type="checkbox" aria-label={`Select ${u.name}`}/></td><td><div className="user-cell"><div className="avatar" style={{background:u.color}}>{u.initials}</div><div><b>{u.name}</b><small>{u.email}</small></div></div></td><td><span className="role">{u.role}</span></td><td><span className={`status ${u.status.toLowerCase()}`}><i/>{u.status}</span></td><td className="muted">{u.lastActive}</td><td className="muted">{u.joined}</td><td className="actions"><button aria-label={`Actions for ${u.name}`} onClick={e => {e.stopPropagation();setMenu(menu === u.id ? null : u.id)}}><MoreHorizontal size={18}/></button>{menu === u.id && <div className="menu" onClick={e => e.stopPropagation()}><button onClick={() => {setEditing(u);setModal('edit');setMenu(null)}}><UserRound size={15}/> Edit user</button><button onClick={() => updateStatus(u, u.status === 'Suspended' ? 'Active' : 'Suspended')}><LockKeyhole size={15}/> {u.status === 'Suspended' ? 'Reactivate' : 'Suspend'}</button><button className="danger" onClick={() => remove(u.id)}><Trash2 size={15}/> Delete user</button></div>}</td></tr>)}</tbody></table>{shown.length === 0 && <div className="empty"><Search size={26}/><b>No users found</b><span>Try adjusting your search or filters.</span></div>}</div>
          <div className="pagination"><span>Showing <b>{filtered.length ? (page-1)*perPage+1 : 0}–{Math.min(page*perPage,filtered.length)}</b> of <b>{filtered.length}</b> users</span><div><button disabled={page===1} onClick={() => setPage(p => p-1)} aria-label="Previous page"><ChevronLeft size={17}/></button><span className="page-number">{page}</span><button disabled={page===pages} onClick={() => setPage(p => p+1)} aria-label="Next page"><ChevronRight size={17}/></button></div></div>
        </div>
      </section>
    </main>
    {notice && <div className="toast"><Check size={17}/>{notice}</div>}{modal && <UserModal user={editing} onClose={() => {setModal(null);setEditing(null)}} onSave={save}/>}
  </div>
}

function Nav({icon,label,active,badge,onNavigate}:{icon:ReactNode,label:string,active?:boolean,badge?:number,onNavigate?:()=>void}) { return <a className={active ? 'nav-item active' : 'nav-item'} href={`#${label.toLowerCase()}`} onClick={onNavigate}>{icon}<span>{label}</span>{badge && <em>{badge}</em>}</a> }
function Stat({label,value,hint,good}:{label:string,value:number,hint:string,good?:boolean}) { return <div className="stat"><span>{label}</span><strong>{value}</strong><small className={good ? 'good' : ''}>{good && '↗ '}{hint}</small><div className="spark"><i/><i/><i/><i/><i/><i/><i/></div></div> }
function Select({label,options,onChange}:{label:string,options:string[],onChange:(v:string)=>void}) { return <div className="select-wrap"><select value={label} onChange={e => onChange(e.target.value)} aria-label={label}>{options.map(o => <option key={o}>{o}</option>)}</select><ChevronDown size={15}/></div> }
function UserModal({user,onClose,onSave}:{user:User|null,onClose:()=>void,onSave:(u:User)=>void}) {
  const [name,setName] = useState(user?.name ?? ''), [email,setEmail] = useState(user?.email ?? ''), [role,setRole] = useState<Role>(user?.role ?? 'Editor')
  const submit = (e: FormEvent) => { e.preventDefault(); if (!name.trim() || !email.trim()) return; const initials = name.split(' ').map(x => x[0]).join('').slice(0,2).toUpperCase(); const [firstName,...rest]=name.trim().split(' '); onSave({...user, id:user?.id ?? `u${Date.now()}`, firstName, lastName:rest.join(' '), avatar:user?.avatar ?? '', department:user?.department ?? 'Operations', phone:user?.phone ?? '', createdAt:user?.createdAt ?? new Date().toISOString(), lastLogin:user?.lastLogin ?? 'Pending invite', name:name.trim(), email:email.trim(), role, status:user?.status ?? 'Pending', joined:user?.joined ?? new Date().toLocaleDateString('en-US',{month:'short',day:'2-digit',year:'numeric'}), lastActive:user?.lastActive ?? 'Pending invite', initials, color:user?.color ?? '#e9ddff'}) }
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={e=>e.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Close"><X/></button><div className="modal-icon"><Mail size={20}/></div><h2 id="modal-title">{user ? 'Edit user' : 'Invite a new user'}</h2><p>{user ? 'Update this user’s details and permissions.' : 'They will receive an email with instructions to join your workspace.'}</p><form onSubmit={submit}><label>Full name<input required value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Alex Morgan"/></label><label>Email address<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="alex@company.com"/></label><label>Role<select value={role} onChange={e=>setRole(e.target.value as Role)}><option>Editor</option><option>Admin</option><option>Manager</option><option>Viewer</option></select><small className="role-help">{roleDescriptions[role]}</small></label><div className="modal-actions"><button type="button" className="secondary" onClick={onClose}>Cancel</button><button className="primary" type="submit">{user ? 'Save changes' : 'Send invitation'}</button></div></form></div></div>
}

export default App
