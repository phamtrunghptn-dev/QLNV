import { authRoles } from 'app/auth/authRoles';
import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const Employee = Loadable(lazy(() => import('./Employee')));

const createEmployeeRoute = [
  { path: '/manage/create-employee', element: <Employee />, auth: authRoles.recruitment },
];

export default createEmployeeRoute;
