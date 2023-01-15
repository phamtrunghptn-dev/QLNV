export const authRoles = {
  sa: ['SA'], // Only Super Admin has access
  admin: ['SA', 'ADMIN'], // Only SA & Admin has access
  leader: ['SA', 'ADMIN', 'LEADER'], // Only SA & Admin & Editor has access
  recruitment: ['SA', 'ADMIN', 'LEADER', 'RECRUITMENT'], // Everyone has access
  accountancy: ['SA', 'ADMIN', 'LEADER', 'ACCOUNTANCY'], // Everyone has access
  guest: ['SA', 'ADMIN', 'LEADER', 'RECRUITMENT', 'ACCOUNTANCY'], // Everyone has access
};
