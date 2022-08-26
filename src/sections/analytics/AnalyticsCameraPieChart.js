import { useEffect, useState } from 'react';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../utils/formatNumber';
//
import { BaseOptionChart } from '../../components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------


export default function AnalyticsCameraPieChart(props) {
  const theme = useTheme();
  const { title, data } = props;
  const [chartData, setChartData] = useState([0, 0, 0]);
  const [chartLabels, setChartLabels] = useState([]);

  useEffect(() => {
    if (data?.length > 0) {
     const newData = [];
     const labels = [];
     // eslint-disable-next-line no-plusplus
     for (let i=0; i<data.length; i++) {
       const obj = data[i];
       newData.push(obj.groupCount);
       labels.push(obj.name);
     } 
      setChartData(newData);
      setChartLabels(labels);
    }
  }, [data])

  const chartOptions = merge(BaseOptionChart(), {    
    labels: chartLabels,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  });

  return (
    <Card>
      <CardHeader title={title} />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={chartData} options={chartOptions} height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
