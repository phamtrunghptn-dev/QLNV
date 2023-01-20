import { authRoles } from 'app/auth/authRoles';
import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const Position = Loadable(lazy(() => import('./Position')));

const positionRoute = [
  { path: '/manage/position', element: <Position />, auth: authRoles.recruitment },
];

export default positionRoute;
