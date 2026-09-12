import type { User } from './types'

const make = (id:string,name:string,email:string,role:User['role'],status:User['status'],department:string,joined:string,lastActive:string,color:string): User => { const [firstName,...rest]=name.split(' '); return {id,firstName,lastName:rest.join(' '),avatar:`https://i.pravatar.cc/80?u=${id}`,department,phone:'+1 (555) 010-2020',createdAt:joined,lastLogin:lastActive,name,email,role,status,joined,lastActive,initials:name.split(' ').map(x=>x[0]).join(''),color} }
export const seedUsers: User[] = [
  make('u1','Olivia Rhye','olivia@catalogapp.io','Admin','Active','Operations','Jan 12, 2023','Just now','#d9f4eb'),
  make('u2','Phoenix Baker','phoenix@catalogapp.io','Manager','Active','Engineering','Feb 18, 2023','5 min ago','#e9ddff'),
  make('u3','Lana Steiner','lana@catalogapp.io','Editor','Active','Design','Mar 02, 2023','1 hour ago','#fce4c5'),
  make('u4','Demi Wilkinson','demi@catalogapp.io','Editor','Pending','Marketing','Apr 14, 2023','Pending invite','#dce9ff'),
  make('u5','Candice Wu','candice@catalogapp.io','Viewer','Active','Finance','May 06, 2023','Yesterday','#f9d9dd'),
  make('u6','Natali Craig','natali@catalogapp.io','Editor','Suspended','Engineering','May 28, 2023','Jun 18, 2024','#d9e4c5'),
  make('u7','Drew Cano','drew@catalogapp.io','Admin','Active','Operations','Jun 10, 2023','3 hours ago','#f6e0d2'),
  make('u8','Orlando Diggs','orlando@catalogapp.io','Viewer','Active','Sales','Jul 22, 2023','2 days ago','#d8e7f3'),
  make('u9','Andi Lane','andi@catalogapp.io','Editor','Pending','Design','Aug 01, 2023','Pending invite','#efdcf1'),
  make('u10','Kate Morrison','kate@catalogapp.io','Editor','Active','Marketing','Sep 19, 2023','4 days ago','#f6e7c9'),
  make('u11','Korra Green','korra@catalogapp.io','Viewer','Active','Finance','Oct 03, 2023','Last week','#d8f0e7'),
  make('u12','Caitlin Blanchard','caitlin@catalogapp.io','Editor','Suspended','Sales','Nov 07, 2023','Aug 08, 2024','#f2dddd'),
]
