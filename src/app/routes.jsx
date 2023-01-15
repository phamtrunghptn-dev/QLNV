import AuthGuard from 'app/auth/AuthGuard';
import chartsRoute from 'app/views/charts/ChartsRoute';
import departmentRoute from 'app/views/Department/DepartmentRoute';
import positionRoute from 'app/views/Position/PositionRoute';
import certificateRoute from 'app/views/Certificate/CertificateRoute';
import languageRoute from 'app/views/Language/LanguageRoute';
import recruitRoute from 'app/views/Recruit/RecruitRoute';
import userRoute from 'app/views/User/UserRoute';
import approveRoute from 'app/views/Approve/ApproveRoute';
import listRecruitApprovedRoute from 'app/views/ListRecruitApproved/ListRecruitApprovedRoute';
import candidateProfileRoute from 'app/views/CandidateProfile/CandidateProfileRoute';
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import NotFound from 'app/views/sessions/NotFound';
import sessionRoutes from 'app/views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...dashboardRoutes,
      ...chartsRoute,
      ...materialRoutes,
      ...departmentRoute,
      ...positionRoute,
      ...certificateRoute,
      ...languageRoute,
      ...recruitRoute,
      ...userRoute,
      ...approveRoute,
      ...listRecruitApprovedRoute,
      ...candidateProfileRoute,
    ],
  },
  ...sessionRoutes,
  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
