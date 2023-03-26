export const authRoles = {
  admin: ['ADMIN'], // Role Admin
  leader: ['ADMIN', 'LEADER'], // Role Lãnh Đạo
  hr: ['ADMIN', 'LEADER', 'HR'], // Role HR
  accountancy: ['ADMIN', 'LEADER', 'ACCOUNTANCY'], // Role Kế Toán
  guest: ['ADMIN', 'LEADER', 'HR', 'ACCOUNTANCY'], // Role Tất cả mọi người
};
