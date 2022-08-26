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


export default function AppAlertsPieChart(props) {
  const { title, actions, data } = props;
  const theme = useTheme();
  const [chartData, setChartData] = useState([0, 0, 0]);

  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.error.main,
      theme.palette.primary.warning,
      theme.palette.primary.info,      
    ],
    labels: ['High', 'Medium', 'Low'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
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
      pie: {
        donut: {
          size: '90%',
          labels: {
            value: {
              formatter: (val) => fNumber(val),
            },
            total: {
              formatter: (w) => {
                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return fNumber(sum);
              },
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    if (data?.length > 0) {
      const high = data.find(item => item.severity === "HIGH")?.groupCount || 0;
      const medium = data.find(item => item.severity === "MEDIUM")?.groupCount || 0;
      const low = data.find(item => item.severity === "LOW")?.groupCount || 0;
      setChartData([high, medium, low]);
    }
  }, [data])

  return (
    <Card>
      <CardHeader title={title} action={actions} />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="donut" series={chartData} options={chartOptions} height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
