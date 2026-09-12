import type { Role } from '../types/user'
export function RoleBadge({ role }: { role: Role }) { return <span className="role">{role}</span> }
