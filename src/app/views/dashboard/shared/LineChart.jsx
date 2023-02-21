import { useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';
import { useState, useEffect } from 'react';

const LineChart = ({ height, color = [], data = [] }) => {
  const theme = useTheme();

  const [list, setList] = useState([]);

  useEffect(() => {
    let newList = [];
    data.map((item) => {
      newList.push({
        data: item?.value,
        type: 'line',
        stack: item?.name,
        name: item?.name,
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
      });
    });
    setList(newList);
  }, [data]);

  const option = {
    grid: { top: '10%', bottom: '10%', left: '5%', right: '5%' },
    legend: {
      itemGap: 20,
      icon: 'circle',
      textStyle: { color: theme.palette.text.secondary, fontSize: 13, fontFamily: 'roboto' },
    },
    xAxis: {
      type: 'category',
      data: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 14,
        fontFamily: 'roboto',
        color: theme.palette.text.secondary,
      },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { color: theme.palette.text.secondary, opacity: 0.15 },
      },
      axisLabel: { color: theme.palette.text.secondary, fontSize: 13, fontFamily: 'roboto' },
    },
    series: list,
    // [
    //   {
    //     data: [30, 40, 20, 50, 40, 80, 90],
    //     type: 'line',
    //     stack: 'Tiếp nhận',
    //     name: 'Tiếp nhận',
    //     smooth: true,
    //     symbolSize: 4,
    //     lineStyle: { width: 4 },
    //   },
    //   {
    //     data: [20, 50, 15, 50, 30, 70, 95],
    //     type: 'line',
    //     stack: 'Nghỉ  việc',
    //     name: 'Nghỉ  việc',
    //     smooth: true,
    //     symbolSize: 4,
    //     lineStyle: { width: 4 },
    //   },
    // ],
  };

  return <ReactEcharts style={{ height: height }} option={{ ...option, color: [...color] }} />;
};

export default LineChart;
