import { authRoles } from 'app/auth/authRoles';
import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const StatisticSalaryReport = Loadable(lazy(() => import('./StatisticSalaryReport')));

const statisticSalaryReportRoute = [
  {
    path: '/manage-payment/statistic-report',
    element: <StatisticSalaryReport />,
    auth: authRoles.accountancy,
  },
];

export default statisticSalaryReportRoute;
