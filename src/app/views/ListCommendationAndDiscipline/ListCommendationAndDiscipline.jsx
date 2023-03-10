import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { Breadcrumb } from 'app/components';
import MaterialTable from 'material-table';
import { getListCommendationAndDiscipline } from './ListCommendationAndDisciplineService';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { toast } from 'react-toastify';
import LoopIcon from '@mui/icons-material/Loop';
import CommendationAndDisciplineDialog from './CommendationAndDisciplineDialog';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import { checkStatus } from 'app/constant';
import { colorTable } from 'app/constant';
export default function ListCommendationAndDiscipline() {
  const [listCommendationAndDiscipline, setListCommendationAndDiscipline] = useState([]);
  const [shouldOpenViewDialog, setShouldOpenViewDialog] = useState(false);
  const [shouldOpenConfirmDialog, setShouldOpenConfirmDialog] = useState(false);
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);

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
              setShouldOpenViewDialog(true);
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
      title: 'Số quyết định',
      field: 'decisionNumber',
      render: (rowData) => rowData?.decisionNumber,
      cellStyle: {
        width: '10%',
        textAlign: 'center',
      },
    },
    {
      title: 'Họ và tên nhân viên',
      field: 'staffName',
      render: (rowData) => rowData?.staffName,
      cellStyle: {
        width: '10%',
        textAlign: 'left',
      },
      headerStyle: {
        textAlign: 'left',
      },
    },
    {
      title: 'Loại',
      field: 'type',
      render: (rowData) => (rowData?.type === 1 ? 'Khen thưởng' : 'Kỷ luật'),
      cellStyle: {
        width: '10%',
        textAlign: 'left',
      },
      headerStyle: {
        textAlign: 'left',
      },
    },
    {
      title: 'Ngày quyết định',
      field: 'day',
      render: (rowData) => rowData?.day + '/' + rowData?.month + '/' + rowData?.year,
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
    setLoading(true);
    updatePageData();
  }, []);

  const updatePageData = () => {
    getListCommendationAndDiscipline()
      .then((res) => {
        if (res.data.statusCode === 200) {
          setLoading(false);
          setListCommendationAndDiscipline(
            res.data.data.filter(
              (item) =>
                (item?.status === 4 || item?.status === 5) && (item?.type === 1 || item?.type === 2)
            )
          );
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

  const handleClose = () => {
    setShouldOpenViewDialog(false);
    setShouldOpenConfirmDialog(false);
    updatePageData();
    setItem({});
  };
  return (
    <>
      <Box style={{ margin: 20 }}>
        <Breadcrumb
          routeSegments={[
            { name: 'Phê duyệt', path: '/leader' },
            { name: 'Quyết định Khen thưởng - Kỷ luật' },
          ]}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
            title="Danh sách quyết định khen thưởng - kỷ luật "
            columns={columns}
            data={listCommendationAndDiscipline}
            options={{
              sorting: false,
              maxBodyHeight: '60vh',
              draggable: false,
              pageSize: 10,
              pageSizeOptions: [10, 20, 50],
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
      {shouldOpenViewDialog && (
        <CommendationAndDisciplineDialog
          open={shouldOpenViewDialog}
          readOnly={shouldOpenViewDialog}
          handleClose={handleClose}
          item={item}
        />
      )}
    </>
  );
}
