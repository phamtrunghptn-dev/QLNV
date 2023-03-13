import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { Breadcrumb } from 'app/components';
import MaterialTable from 'material-table';
import {
  getCertificationPercentage,
  getSalaryCalculateTotalSalaryByMonth,
} from './StatisticSalaryReportService';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { toast } from 'react-toastify';
import LoopIcon from '@mui/icons-material/Loop';
import { colorTable } from 'app/constant';
import { Card, Grid, styled, useTheme } from '@mui/material';
import ComparisonChart from './ComparisonChart';
import DoughnutChart from './Doughnut';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

export default function StatisticSalaryReport() {
  const { palette } = useTheme();

  const [listSalaryCalculateTotalSalaryByMonth, setListSalaryCalculateTotalSalaryByMonth] =
    useState([]);
  const [listCertificationPercentage, setListCertificationPercentage] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const columns2 = [
    {
      title: 'STT',
      field: 'stt',
      render: (rowData) => rowData.tableData.id + 1,
      cellStyle: {
        width: '5%',
        textAlign: 'center',
      },
    },
    {
      title: 'Số lượng văn bằng',
      field: 'name',
      render: (rowData) => rowData.name,
      headerStyle: {
        textAlign: 'left',
      },
      cellStyle: {
        width: '20%',
        textAlign: 'left',
      },
    },
    {
      title: 'Số lượng',
      field: 'count',
      render: (rowData) => rowData.count,
      cellStyle: {
        width: '15%',
        textAlign: 'center',
      },
    },
  ];

  useEffect(() => {
    setLoading1(true);
    setLoading2(true);
  }, []);

  useEffect(() => {
    if (loading1) {
      updatePageData1();
    }
  }, [loading1]);

  useEffect(() => {
    if (loading2) {
      updatePageData2();
    }
  }, [loading2]);

  const updatePageData1 = () => {
    getSalaryCalculateTotalSalaryByMonth()
      .then((res) => {
        if (res.data.statusCode === 200) {
          setLoading1(false);
          setListSalaryCalculateTotalSalaryByMonth(res.data.data);
        } else {
          setLoading1(false);
          toast.warning('Lỗi xác thực!');
        }
      })
      .catch((err) => {
        toast.error('Có lỗi xảy ra!');
        setLoading1(false);
      });
  };

  const updatePageData2 = () => {
    getCertificationPercentage()
      .then((res) => {
        if (res.data.statusCode === 200) {
          setLoading2(false);
          setListCertificationPercentage(res.data.data);
        } else {
          setLoading2(false);
          toast.warning('Lỗi xác thực!');
        }
      })
      .catch((err) => {
        toast.error('Có lỗi xảy ra!');
        setLoading2(false);
      });
  };

  return (
    <>
      <Box style={{ margin: 20 }}>
        <Breadcrumb
          routeSegments={[{ name: 'Quản lý lương', path: '/manage' }, { name: 'Báo cáo thống kê' }]}
        />
        <ContentBox className="analytics">
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Card sx={{ px: 3, py: 2, mb: 3 }}>
                <Title>Số tiền lương của công ty trả cho nhân viên theo từng tháng</Title>
                <SubTitle>Công ty Oceantech</SubTitle>

                <ComparisonChart
                  height="350px"
                  color={[palette.primary.dark]}
                  data={listSalaryCalculateTotalSalaryByMonth}
                />
              </Card>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Card sx={{ px: 3, py: 2, mb: 3 }}>
                <Title>Tỉ lệ số lượng văn bằng của nhân viên</Title>
                <SubTitle>Công ty Oceantech</SubTitle>

                <DoughnutChart
                  height="500px"
                  color={[
                    '#FFB84C',
                    '#F16767',
                    '#A459D1',
                    '#4D455D',
                    '#E96479',
                    '#F5E9CF',
                    '#7DB9B6',
                    '#F9F54B',
                    '#8BF5FA',
                    '#F2CD5C',
                    '#A7727D',
                    '#F5EAEA',
                  ]}
                  data={listCertificationPercentage}
                />
              </Card>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <MaterialTable
                title="Bảng thống kê số lượng văn bằng của nhân viên"
                columns={columns2}
                data={listCertificationPercentage}
                options={{
                  doubleHorizontalScroll: false,
                  sorting: false,
                  search: false,
                  paging: false,
                  pageSize: 4,
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
                isLoading={loading1}
                localization={{
                  body: { emptyDataSourceMessage: 'Không có bản ghi nào' },
                }}
              />
            </Grid>
          </Grid>
        </ContentBox>
      </Box>
    </>
  );
}
