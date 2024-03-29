import React, { useEffect, useState, useRef } from 'react';
import { Box, Button } from '@mui/material';
import { Breadcrumb } from 'app/components';
import MaterialTable from 'material-table';
import { getListEmployee, importFileExcel } from './TimeKeepingService';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { toast } from 'react-toastify';
import TimeKeepingTable from './TimeKeepingTable';
import LoopIcon from '@mui/icons-material/Loop';
import { colorTable } from 'app/constant';

export default function Employee() {
  const [listEmployee, setListEmployee] = useState([]);
  const [shouldOpenTimeKeepingTable, setShouldOpenTimeKeepingTable] = useState(false);
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

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
              setShouldOpenTimeKeepingTable(true);
              setItem(rowData);
            }}
          >
            <RemoveRedEyeIcon />
          </IconButton>
        </>
      ),
      cellStyle: {
        width: '10%',
        textAlign: 'center',
      },
    },
    {
      title: 'Mã nhân viên',
      field: 'code',
      render: (rowData) => rowData?.code,
      cellStyle: {
        width: '10%',
        textAlign: 'center',
      },
    },
    {
      title: 'Họ và tên',
      field: 'name',
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
      title: 'Số điện thoại',
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
  ];

  useEffect(() => {
    setLoading(true);
    updatePageData();
  }, []);

  const updatePageData = () => {
    getListEmployee()
      .then((res) => {
        if (res.data.statusCode === 200) {
          setLoading(false);
          setListEmployee(res.data.data.filter((item) => item.status === 12 || item.status === 14));
        } else {
          setLoading(false);
          toast.warning('Lỗi xác thực!');
        }
      })
      .catch((err) => {
        toast.error('Có lỗi xảy ra!');
        setLoading(false);
      });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    fileInputRef.current.previousFile = file;
    importFileExcel(file)
      .then((res) => {
        if (res?.data?.statusCode === 200) {
          toast.success('Tải file thành công');
        } else {
          toast.warning('Có lỗi xảy ra!');
        }
      })
      .catch((err) => {
        toast.error('Tải file không thành công');
      });
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleClose = () => {
    setShouldOpenTimeKeepingTable(false);
    setItem({});
    updatePageData();
  };

  const handleButtonReset = () => {
    fileInputRef.current.value = '';
    fileInputRef.current.previousFile = null;
  };

  return (
    <>
      <Box style={{ margin: 20 }}>
        <Breadcrumb
          routeSegments={[
            { name: 'Danh sách danh mục', path: '/manage' },
            { name: 'Danh sách chấm công nhân viên' },
          ]}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 0 10px' }}>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={handleFileUpload}
          />
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={handleButtonClick}
            onBlur={handleButtonReset}
          >
            Nhập file excel
          </Button>
          <IconButton
            color="primary"
            onClick={() => {
              updatePageData();
            }}
          >
            <LoopIcon />
          </IconButton>
        </div>
        <div>
          <MaterialTable
            title="Danh sách nhân viên"
            columns={columns}
            data={listEmployee}
            options={{
              sorting: false,
              maxBodyHeight: '60vh',
              pageSize: 10,
              pageSizeOptions: [10, 20, 50],
              draggable: false,
              headerStyle: {
                textAlign: 'center',
                backgroundColor: colorTable.HEADER,
                color: colorTable.TEXTHEADER,
              },
              rowStyle: {
                backgroundColor: colorTable.ROW,
                color: colorTable.TEXTROW,
              },
            }}
            isLoading={loading}
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
        </div>
      </Box>
      {shouldOpenTimeKeepingTable && (
        <TimeKeepingTable open={shouldOpenTimeKeepingTable} item={item} handleClose={handleClose} />
      )}
    </>
  );
}
