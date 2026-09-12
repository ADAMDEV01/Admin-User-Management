import type { User } from '../types'
export function UserTable({users}:{users:User[]}) { return <table><caption className="sr-only">Workspace users</caption><thead><tr><th>Name</th><th>Role</th><th>Status</th></tr></thead><tbody>{users.map(u=><tr key={u.id}><td>{u.firstName} {u.lastName}</td><td>{u.role}</td><td>{u.status}</td></tr>)}</tbody></table> }
