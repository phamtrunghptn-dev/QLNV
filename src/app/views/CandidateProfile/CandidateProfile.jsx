import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { Breadcrumb } from 'app/components';
import MaterialTable from 'material-table';
import { getListCandidate, deleteCandidate } from './CandidateProfileService';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { toast } from 'react-toastify';
import { checkStatus } from 'app/constant';
import CandidateProfileDialog from './CandidateProfileDialog';
import ConfirmationDialog from '../../components/ConfirmationDialog';

export default function CandidateProfile() {
  const [listCandidate, setListCandidate] = useState([]);
  const [shouldOpenDialog, setShouldOpenDialog] = useState(false);
  const [shouldOpenConfirmDialog, setShouldOpenConfirmDialog] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [item, setItem] = useState({});

  const columns = [
    {
      title: 'STT',
      field: 'STT',
      render: (rowData) => rowData.tableData.id + 1,
      cellStyle: {
        width: '3%',
        textAlign: 'center',
      },
    },
    {
      title: 'Thao tác',
      field: 'action',
      render: (rowData) => (
        <>
          <IconButton
            color="primary"
            onClick={() => {
              setShouldOpenDialog(true);
              setItem(rowData);
              setReadOnly(true);
            }}
          >
            <RemoveRedEyeIcon />
          </IconButton>
          <IconButton
            color="success"
            onClick={() => {
              setShouldOpenDialog(true);
              setItem(rowData);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              setShouldOpenConfirmDialog(true);
              setItem(rowData);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
      cellStyle: {
        width: '10%',
        textAlign: 'center',
      },
    },
    {
      title: 'Mã hồ sơ',
      field: 'code',
      render: (rowData) => rowData?.code,
      cellStyle: {
        width: '10%',
        textAlign: 'center',
      },
    },
    {
      title: 'Họ và tên',
      field: 'fullName',
      render: (rowData) => rowData?.fullName,
      cellStyle: {
        width: '10%',
        textAlign: 'left',
      },
      headerStyle: {
        textAlign: 'left',
      },
    },
    {
      title: 'Email',
      field: 'email',
      render: (rowData) => rowData?.email,
      cellStyle: {
        width: '10%',
        textAlign: 'left',
      },
      headerStyle: {
        textAlign: 'left',
      },
    },
    {
      title: 'SĐT',
      field: 'phone',
      render: (rowData) => rowData?.phone,
      cellStyle: {
        width: '10%',
        textAlign: 'left',
      },
      headerStyle: {
        textAlign: 'left',
      },
    },
    {
      title: 'Trạng thái',
      field: 'status',
      render: (rowData) => {
        let message = checkStatus(rowData.status).message;
        let color = checkStatus(rowData.status).color;
        return <div className={color}>{message}</div>;
      },
      cellStyle: {
        width: '10%',
        textAlign: 'left',
      },
      headerStyle: {
        textAlign: 'left',
      },
    },
  ];

  useEffect(() => {
    updatePageData();
  }, []);

  const updatePageData = () => {
    getListCandidate()
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListCandidate(res.data.data);
        } else {
          toast.warning('Lỗi xác thực!');
        }
      })
      .catch((err) => toast.error('Có lỗi xảy ra!'));
  };

  const handleClose = () => {
    setShouldOpenDialog(false);
    setShouldOpenConfirmDialog(false);
    setItem({});
    updatePageData();
    setReadOnly(false);
  };

  const handleDelete = () => {
    deleteCandidate(item.id).then((res) => {
      toast.success('Xóa thành công');
      handleClose();
    });
  };

  return (
    <>
      <Box style={{ margin: 20 }}>
        <Breadcrumb
          routeSegments={[{ name: 'Tuyển dụng', path: '/manage' }, { name: 'Danh sách hồ sơ' }]}
        />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          style={{ margin: '20px 0', padding: '5px 20px' }}
          onClick={() => setShouldOpenDialog(true)}
        >
          Thêm
        </Button>
        <MaterialTable
          title="Danh sách hồ sơ ứng viên"
          columns={columns}
          data={listCandidate}
          options={{
            sorting: false,
            draggable: false,
            headerStyle: {
              textAlign: 'center',
            },
          }}
          localization={{
            toolbar: {
              searchTooltip: 'Tìm kiếm',
              searchPlaceholder: 'Tìm kiếm',
            },
            pagination: {
              labelDisplayedRows: '{from}-{to} của {count}',
              labelRowsSelect: 'hàng',
              labelRowsPerPage: 'Số hàng mỗi trang:',
              firstAriaLabel: 'Trang đầu',
              firstTooltip: 'Trang đầu',
              previousAriaLabel: 'Trang trước',
              previousTooltip: 'Trang trước',
              nextAriaLabel: 'Trang sau',
              nextTooltip: 'Trang sau',
              lastAriaLabel: 'Trang cuối',
              lastTooltip: 'Trang cuối',
            },
            body: { emptyDataSourceMessage: 'Không có bản ghi nào' },
          }}
        />
      </Box>
      {shouldOpenDialog && (
        <CandidateProfileDialog
          open={shouldOpenDialog}
          handleClose={handleClose}
          item={item}
          readOnly={readOnly}
        />
      )}
      {shouldOpenConfirmDialog && (
        <ConfirmationDialog
          title="Xác nhận"
          text="Bạn có muốn xóa hồ sơ này?"
          open={shouldOpenConfirmDialog}
          onConfirmDialogClose={handleClose}
          onYesClick={handleDelete}
          Yes="Đồng ý"
          No="Hủy"
        />
      )}
    </>
  );
}
