import type { ReactNode } from 'react'
export type Permission = 'users.read' | 'users.create' | 'users.update' | 'users.delete'
export function PermissionGate({ permission, children, fallback = null }: { permission: Permission; children: ReactNode; fallback?: ReactNode }) {
  const granted: Permission[] = ['users.read', 'users.create', 'users.update', 'users.delete']
  return granted.includes(permission) ? <>{children}</> : <>{fallback}</>
}
