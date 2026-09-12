import type { ReactNode } from 'react'
export function FilterBar({ children }: { children: ReactNode }) { return <div className="toolbar" aria-label="User filters">{children}</div> }
