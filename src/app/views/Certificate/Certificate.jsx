import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { Breadcrumb } from 'app/components';
import MaterialTable from 'material-table';
import { getListCertificate, deleteCertificate } from './CertificateService';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { toast } from 'react-toastify';
import CertificateDialog from './CertificateDialog';
import ConfirmationDialog from '../../components/ConfirmationDialog';

export default function Certificate() {
  const [listCertificate, setListCertificate] = useState([]);
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
      title: 'Mã bằng cấp',
      field: 'code',
      render: (rowData) => rowData?.code,
      cellStyle: {
        width: '10%',
        textAlign: 'center',
      },
    },
    {
      title: 'Tên bằng cấp',
      field: 'name',
      render: (rowData) => rowData?.name,
      cellStyle: {
        width: '7%',
        textAlign: 'left',
      },
      headerStyle: {
        textAlign: 'left',
      },
    },
    {
      title: 'Chuyên nghành',
      field: 'majors',
      render: (rowData) => rowData?.majors,
      cellStyle: {
        width: '15%',
        textAlign: 'left',
      },
      headerStyle: {
        textAlign: 'left',
      },
    },
    {
      title: 'Được cấp bởi',
      field: 'grantedBy',
      render: (rowData) => rowData?.grantedBy,
      cellStyle: {
        width: '15%',
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
    getListCertificate()
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListCertificate(res.data.data);
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
    deleteCertificate(item.id).then((res) => {
      toast.success('Xóa thành công');
      handleClose();
    });
  };

  return (
    <>
      <Box style={{ margin: 20 }}>
        <Breadcrumb
          routeSegments={[
            { name: 'Danh sách danh mục', path: '/manage' },
            { name: 'Danh sách bằng cấp' },
          ]}
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
          title="Danh sách bằng cấp"
          columns={columns}
          data={listCertificate}
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
        <CertificateDialog
          open={shouldOpenDialog}
          handleClose={handleClose}
          item={item}
          readOnly={readOnly}
        />
      )}
      {shouldOpenConfirmDialog && (
        <ConfirmationDialog
          title="Xác nhận"
          text="Bạn có muốn xóa bằng cấp này?"
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
