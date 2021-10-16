import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import { blue, orange, red } from "@material-ui/core/colors";
import { WithStyles, withStyles, WithTheme } from "@material-ui/core/styles";
import * as React from "react";
import { Doughnut } from "react-chartjs-2";
import { MoreVertical } from "react-feather";

import { styles } from "./styles";

interface IProps extends WithStyles<typeof styles>, WithTheme {}

const DoughnutChartComponent: React.FC<IProps> = ({ classes, theme }) => {
  const data = {
    labels: ["Camera 1", "Camera 2", "Camera 3", "Camera 4"],
    datasets: [
      {
        data: [260, 125, 54, 146],
        backgroundColor: [blue[500], red[500], orange[500], theme.palette.grey[200]],
        borderWidth: 5
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    cutoutPercentage: 80
  };

  return (
    <Card mb={3}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertical />
          </IconButton>
        }
        title="Weekly stats"
      />

      <CardContent>
        <div className={classes.doughnutIChartWrapper}>
          <Doughnut data={data} options={options} />
        </div>
        <Table>
          <TableHead>
            <TableRow className={classes.tableRow}>
              <TableCell className={classes.tableCell}>Camera</TableCell>
              <TableCell className={classes.tableCell} align="right">
                Count
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                Accuracy
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className={classes.tableRow}>
              <TableCell className={classes.tableCell} component="th" scope="row">
                Camera 1
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                260
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                <span className={classes.greenText}>+35%</span>
              </TableCell>
            </TableRow>
            <TableRow className={classes.tableRow}>
              <TableCell className={classes.tableCell} component="th" scope="row">
                Camera 2
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                125
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                <span className={classes.redText}>0%</span>
              </TableCell>
            </TableRow>
            <TableRow className={classes.tableRow}>
              <TableCell className={classes.tableCell} component="th" scope="row">
                Camera 3
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                54
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                <span className={classes.greenText}>+46%</span>
              </TableCell>
            </TableRow>
            <TableRow className={classes.tableRow}>
              <TableCell className={classes.tableCell} component="th" scope="row">
                Camera 4
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                146
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                <span className={classes.greenText}>+24%</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export const DoughnutChart = withStyles(styles, { withTheme: true })(DoughnutChartComponent);
