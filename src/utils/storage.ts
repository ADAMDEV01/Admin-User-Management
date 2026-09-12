import type { User } from '../types'
export const USER_STORAGE_KEY='atlas-admin-users'
export function loadUsers(fallback:User[]):User[]{try{return JSON.parse(localStorage.getItem(USER_STORAGE_KEY)||'null')??fallback}catch{return fallback}}
export function saveUsers(users:User[]){localStorage.setItem(USER_STORAGE_KEY,JSON.stringify(users))}
