import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Role, User, UserStatus } from '../types/user'
const departments = ['Operations','Engineering','Design','Marketing','Finance','Sales']
export function UserForm({ user, onSubmit, onCancel }: { user?: Partial<User>; onSubmit: (user: Partial<User>) => void; onCancel?: () => void }) {
  const [values, setValues] = useState({ firstName: user?.firstName ?? '', lastName: user?.lastName ?? '', email: user?.email ?? '', phone: user?.phone ?? '', avatar: user?.avatar ?? '', department: user?.department ?? departments[0], role: user?.role ?? 'Editor' as Role, status: user?.status ?? 'Pending' as UserStatus })
  const [error, setError] = useState('')
  const change = (key: string, value: string) => setValues(v => ({ ...v, [key]: value }))
  const submit = (e: FormEvent) => { e.preventDefault(); if (!values.firstName.trim() || !values.lastName.trim() || !/^\S+@\S+\.\S+$/.test(values.email)) { setError('Enter a first name, last name, and valid email address.'); return }; setError(''); onSubmit(values) }
  return <form className="user-form" onSubmit={submit} noValidate aria-label="User details form">
    {error && <p role="alert" className="form-error">{error}</p>}
    <label>First name<input required value={values.firstName} onChange={e=>change('firstName',e.target.value)} /></label>
    <label>Last name<input required value={values.lastName} onChange={e=>change('lastName',e.target.value)} /></label>
    <label>Email<input required type="email" value={values.email} onChange={e=>change('email',e.target.value)} /></label>
    <label>Phone<input type="tel" value={values.phone} onChange={e=>change('phone',e.target.value)} /></label>
    <label>Avatar URL<input type="url" value={values.avatar} onChange={e=>change('avatar',e.target.value)} /></label>
    <label>Department<select value={values.department} onChange={e=>change('department',e.target.value)}>{departments.map(d=><option key={d}>{d}</option>)}</select></label>
    <label>Role<select value={values.role} onChange={e=>change('role',e.target.value)}>{(['Admin','Manager','Editor','Viewer'] as Role[]).map(r=><option key={r}>{r}</option>)}</select></label>
    <label>Status<select value={values.status} onChange={e=>change('status',e.target.value)}>{(['Active','Suspended','Pending'] as UserStatus[]).map(s=><option key={s}>{s}</option>)}</select></label>
    <div className="modal-actions"><button type="button" className="secondary" onClick={onCancel}>Cancel</button><button className="primary" type="submit">Save user</button></div>
  </form>
}
