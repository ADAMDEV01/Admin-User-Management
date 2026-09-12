export type Role = 'Admin' | 'Manager' | 'Editor' | 'Viewer'
export type UserStatus = 'Active' | 'Suspended' | 'Pending'
export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string
  role: Role
  status: UserStatus
  department: string
  phone: string
  createdAt: string
  lastLogin: string
  name: string
  joined: string
  lastActive: string
  initials: string
  color: string
}
export const roleDescriptions: Record<Role, string> = {
  Admin: 'Manage users, content, and settings',
  Manager: 'Manage teams and workspace content',
  Editor: 'Create and manage workspace content',
  Viewer: 'View workspace content only',
}
