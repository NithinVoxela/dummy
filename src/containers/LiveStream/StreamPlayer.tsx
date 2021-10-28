import { Card, CardContent, CardHeader, IconButton } from "@material-ui/core";
import { WithStyles, withStyles, WithTheme } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import * as React from "react";
import { MoreVertical } from "react-feather";
import ReactHlsPlayer from "react-hls-player";

import { styles } from "./styles";

interface IProps extends WithStyles<typeof styles>, WithTheme {}

class StreamPlayerComponent extends React.Component<IProps> {
  public options: any;
  public data: any;

  public constructor(props: IProps) {
    super(props);
    const { theme } = this.props;
    this.data = (canvas: any) => {
      const ctx = canvas.getContext("2d");

      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, fade(theme.palette.secondary.main, 0.0875));
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      return {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Alerts",
            fill: true,
            backgroundColor: gradient,
            borderColor: theme.palette.secondary.main,
            data: [2115, 1562, 1584, 1892, 1587, 1923, 2566, 2448, 2805, 3438, 2917, 3327]
          }
        ]
      };
    };

    this.options = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        intersect: false
      },
      hover: {
        intersect: true
      },
      plugins: {
        filler: {
          propagate: false
        }
      },
      scales: {
        xAxes: [
          {
            reverse: true,
            gridLines: {
              color: "rgba(0,0,0,0.0)"
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              stepSize: 500
            },
            display: true,
            borderDash: [5, 5],
            gridLines: {
              color: "rgba(0,0,0,0.0375)",
              fontColor: "#fff"
            }
          }
        ]
      }
    };
  }

  public render() {
    const { classes } = this.props;
    return (
      <Card style={{ marginBottom: 3 }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertical />
            </IconButton>
          }
          title="Alerts Trend"
        />
        <CardContent>
          <div className={classes.chartWrapper}>
            <ReactHlsPlayer
              src="rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov"
              autoPlay={false}
              controls
              width="100%"
              height="auto"
            />
            {/* <video
              id="test_video"
              controls
              autoPlay
              src="rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov"
            /> */}
          </div>
        </CardContent>
      </Card>
    );
  }
}

export const StreamPlayer = withStyles(styles, { withTheme: true })(StreamPlayerComponent);
