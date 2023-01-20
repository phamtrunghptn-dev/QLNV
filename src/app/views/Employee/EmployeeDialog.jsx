import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import EmployeeInformation from './EmployeeInformation';
import RelatedInformation from './RelatedInformation';
import WorkingPosition from './WorkingPosition';
import { addEmployee } from './EmployeeService';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import { toast } from 'react-toastify';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box style={{ padding: '0 20px' }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function EmployeeDialog(props) {
  const { open, handleClose, handleCloseDialog, candidate, item } = props;
  const [value, setValue] = React.useState(0);
  const [shouldOpenConfirmDialog, setShouldOpenConfirmDialog] = useState(false);
  const [employee, setEmployee] = useState({});
  const [method, setMethod] = useState('');

  const firstRender = useRef(false);

  const formik = useFormik({
    initialValues: {
      code: '',
      fullName: candidate.id ? candidate?.fullName : '',
      dateOfBirth: candidate.id ? candidate?.dateOfBirth : null,
      phone: candidate.id ? candidate?.phone : '',
      email: candidate.id ? candidate?.email : '',
      education: candidate.id ? candidate?.education : '',
      major: candidate.id ? candidate?.major : '',
      nation: candidate.id ? candidate?.nation : '',
      religion: candidate.id ? candidate?.religion : '',
      address: candidate.id ? candidate?.address : '',
      numberIdentityCard: candidate.id ? candidate?.numberIdentityCard : '',
      issuedDateIdentityCard: candidate.id ? candidate?.issuedDateIdentityCard : null,
      placeOfGrantIdentityCard: candidate.id ? candidate?.placeOfGrantIdentityCard : '',
      numberMedicalInsurance: candidate.id ? candidate?.numberMedicalInsurance : '',
      issuedDateMedicalInsurance: candidate.id ? candidate?.issuedDateMedicalInsurance : null,
      placeOfIssueMedicalInsurance: candidate.id ? candidate?.placeOfIssueMedicalInsurance : '',
      numberSocialInsurance: candidate.id ? candidate?.numberSocialInsurance : '',
      issuedDateSocialInsurance: candidate.id ? candidate?.issuedDateSocialInsurance : null,
      placeOfIssueSocialInsurance: candidate.id ? candidate?.placeOfIssueSocialInsurance : '',
      certificate: candidate.id ? candidate?.certificate : null,
      languages: candidate.id ? candidate?.certificate : null,
      department: candidate.id ? candidate?.department : null,
      position: candidate.id ? candidate?.position : null,
    },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      code: Yup.string()
        .matches(/^MaNV[0-9]{4}$/, 'Mã bằng cấp chưa đúng format VD:(MaNV9999)')
        .required('Vui lòng nhập trường này'),
      fullName: Yup.string().required('Vui lòng nhập trường này'),
      dateOfBirth: Yup.date()
        .nullable()
        .typeError('Sai định dạng ngày!')
        .required('Vui lòng nhập trường này'),
      email: Yup.string()
        .matches(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/, 'Đây không phải là email!')
        .required('Vui lòng nhập Email!'),
      phone: Yup.string()
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ')
        .required('Vui lòng nhập số điện thoại!'),
      education: Yup.string().required('Vui lòng nhập trường này'),
      major: Yup.string().required('Vui lòng nhập trường này'),
      nation: Yup.string().required('Vui lòng nhập trường này'),
      religion: Yup.string().required('Vui lòng nhập trường này'),
      address: Yup.string().required('Vui lòng nhập trường này'),
      numberIdentityCard: Yup.number()
        .typeError('Số CCCD phải là số!')
        .required('Vui lòng nhập trường này'),
      issuedDateIdentityCard: Yup.date()
        .nullable()
        .typeError('Sai định dạng ngày!')
        .required('Vui lòng nhập trường này'),
      placeOfGrantIdentityCard: Yup.string().required('Vui lòng nhập trường này'),
      numberMedicalInsurance: Yup.number()
        .typeError('Số bảo hiểm y tế phải là số!')
        .required('Vui lòng nhập trường này'),
      issuedDateMedicalInsurance: Yup.date()
        .nullable()
        .typeError('Sai định dạng ngày!')
        .required('Vui lòng nhập trường này'),
      placeOfIssueMedicalInsurance: Yup.string().required('Vui lòng nhập trường này'),
      numberSocialInsurance: Yup.number()
        .typeError('Số bảo hiểm xã hội phải là số!')
        .required('Vui lòng nhập trường này'),
      issuedDateSocialInsurance: Yup.date()
        .nullable()
        .typeError('Sai định dạng ngày!')
        .required('Vui lòng nhập trường này'),
      placeOfIssueSocialInsurance: Yup.string().required('Vui lòng nhập trường này'),
      certificate: Yup.object().nullable().required('Vui lòng chọn trường này'),
      languages: Yup.array().nullable().required('Vui lòng chọn trường này'),
      department: Yup.object().nullable().required('Vui lòng chọn trường này'),
      position: Yup.object().nullable().required('Vui lòng chọn trường này'),
    }),
    onSubmit: (values) => {
      values.id = item?.id;
      console.log(values);
      if (method === 2) {
        setShouldOpenConfirmDialog(true);
      } else if (method === 1) {
        values.status = item?.status || method;
        setEmployee(values);
      }
    },
  });
  console.log(employee);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (Object.keys(formik.errors).length !== 0 && formik.errors.constructor === Object) {
      toast.warning('Vui lòng nhập đủ trường');
    }
  }, [formik.errors]);

  useEffect(() => {
    if (employee.id) {
      if (employee.status === 1) {
      } else if (employee.status === 12) {
      }
    } else {
      if (employee.status === 1) {
        addEmployee(employee)
          .then((res) => {
            if (res.data.statusCode === 200) {
              toast.success('Thêm mới hồ sơ thành công');
              setEmployee({});
              handleClose();
            } else {
              toast.warning('Lỗi xác thực');
            }
          })
          .catch((err) => toast.error('Có lỗi xảy ra!'));
      } else if (employee.status === 2) {
      }
    }
  }, [employee.status]);

  useEffect(() => {
    if (firstRender.current) {
      formik.handleSubmit();
    } else {
      firstRender.current = true;
    }
  }, [method]);

  return (
    <>
      <Dialog open={open} fullWidth maxWidth={'lg'}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          style={{ padding: '10px 20px' }}
        >
          <Tab label="Thông tin cơ bản" {...a11yProps(0)} />
          <Tab label="Thông tin liên quan" {...a11yProps(1)} />
          <Tab label="Thông tin vị trí làm việc" {...a11yProps(2)} />
        </Tabs>
        <Box className="icon-close" onClick={handleCloseDialog}>
          <IconButton color="error">
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={formik.handleSubmit} onError={(errors) => console.log(errors)}>
          <TabPanel value={value} index={0}>
            <EmployeeInformation formik={formik} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RelatedInformation formik={formik} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <WorkingPosition formik={formik} />
          </TabPanel>
          <DialogActions>
            <Button variant="contained" color="secondary" onClick={handleCloseDialog}>
              Hủy
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setMethod(1);
              }}
              type="submit"
            >
              Lưu nháp
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setMethod(2);
              }}
              type="submit"
            >
              Trình lãnh đạo
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {shouldOpenConfirmDialog && (
        <ConfirmationDialog
          title="Xác nhận"
          text="Bạn có muốn trình lãnh đạo hồ sơ này?"
          open={shouldOpenConfirmDialog}
          onConfirmDialogClose={() => setShouldOpenConfirmDialog(false)}
          // onYesClick={}
          Yes="Đồng ý"
          No="Hủy"
        />
      )}
    </>
  );
}
