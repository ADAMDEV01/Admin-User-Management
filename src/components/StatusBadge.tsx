import type { UserStatus } from '../types/user'
export function StatusBadge({ status }: { status: UserStatus }) { return <span className={`status ${status.toLowerCase()}`}><i/>{status}</span> }
