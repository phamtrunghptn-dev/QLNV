export const navigations = [
  {
    name: 'Trang chủ',
    path: '/dashboard/default',
    icon: 'home',
    role: ['ADMIN', 'LEADER', 'HR', 'ACCOUNTANCY'],
  },
  // {
  //   name: 'Session/Auth',
  //   icon: 'security',
  //   children: [
  //     { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
  //     { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
  //     { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
  //     { name: 'Error', iconText: '404', path: '/session/404' },
  //   ],
  //   role: ['ADMIN', 'GUEST'],
  // },
  {
    name: 'Components',
    icon: 'favorite',
    badge: { value: '30+', color: 'secondary' },
    children: [
      { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
      { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
      { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
      { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
      { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
      { name: 'Form', path: '/material/form', iconText: 'F' },
      { name: 'Icons', path: '/material/icons', iconText: 'I' },
      { name: 'Menu', path: '/material/menu', iconText: 'M' },
      { name: 'Progress', path: '/material/progress', iconText: 'P' },
      { name: 'Radio', path: '/material/radio', iconText: 'R' },
      { name: 'Switch', path: '/material/switch', iconText: 'S' },
      { name: 'Slider', path: '/material/slider', iconText: 'S' },
      { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
      { name: 'Table', path: '/material/table', iconText: 'T' },
    ],
    role: ['ADMIN'],
  },
  // {
  //   name: 'Charts',
  //   icon: 'trending_up',
  //   children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }],
  //   role: ['ADMIN'],
  // },
  // {
  //   name: 'Documentation',
  //   icon: 'launch',
  //   type: 'extLink',
  //   path: 'http://demos.ui-lib.com/matx-react-doc/',
  //   role: ['ADMIN'],
  // },
  {
    name: 'Tuyển dụng',
    icon: 'person_add',
    children: [
      { name: 'Lập kế hoạch tuyển dụng', path: '/plan/recruit' },
      { name: 'Tạo hồ sơ ứng viên', path: '/plan/candidate' },
    ],
    role: ['ADMIN', 'HR'],
  },
  {
    name: 'Quản lý danh mục',
    icon: 'category',
    children: [
      { name: 'Danh sách phòng ban', path: '/manage/department' },
      { name: 'Danh sách chức vụ', path: '/manage/position' },
      { name: 'Danh sách bằng cấp', path: '/manage/certificate' },
      { name: 'Danh sách chứng chỉ', path: '/manage/language' },
    ],
    role: ['ADMIN', 'HR'],
  },
  {
    name: 'Phê duyệt',
    icon: 'check_box',
    children: [
      { name: 'Phê duyệt kế hoạch TD', path: '/leader/approval-recruit' },
      { name: 'Danh sách KH đã phê duyệt', path: '/leader/approved' },
      { name: 'Phê duyệt hồ sơ ứng viên', path: '/leader/approval-candidate' },
      { name: 'Phê duyệt hồ sơ nhân viên', path: '/leader/approval-employee' },
      { name: 'Khen thưởng / Kỷ luật', path: '/leader/commendation-and-discipline' },
    ],
    role: ['ADMIN', 'LEADER'],
  },
  {
    name: 'Quản lý nhân viên',
    icon: 'account_circle',
    children: [
      { name: 'Chấm công', path: '/manage/time-keeping' },
      { name: 'Tạo hồ sơ nhân viên', path: '/manage/create-employee' },
      { name: 'Cập nhật diễn biến', path: '/manage/employee' },
      { name: 'Báo cáo thống kê', path: '/session/signin' },
    ],
    role: ['ADMIN', 'HR'],
  },
  {
    name: 'Quản lý lương',
    icon: 'paid',
    children: [
      { name: 'Tính lương', path: '/payment-salary' },
      { name: 'Báo cáo thống kê', path: '/session/signin' },
    ],
    role: ['ADMIN', 'ACCOUNTANCY'],
  },
  {
    name: 'Danh sách hợp đồng',
    path: '/manage/contract',
    icon: 'history_edu',
    role: ['ADMIN', 'LEADER', 'HR'],
  },
  {
    name: 'Quản lý người dùng',
    path: '/manage/user',
    icon: 'person',
    role: ['ADMIN', 'LEADER'],
  },
];
