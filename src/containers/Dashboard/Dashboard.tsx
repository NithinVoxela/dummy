import { Grid, Typography } from "@material-ui/core";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import * as React from "react";
import { Actions } from "./Actions";
import { Stats } from "./Stats";
import { green, red } from "@material-ui/core/colors";

import { styles } from "./styles";
import { LineChart } from "./LineChart";
import { DoughnutChart } from "./DoughnutChart";
import { IUserAccount } from "models/user.model";
import { connect } from "react-redux";
import { getUserAccount } from "store/userAccount/userAccount.selector";
import { IApplicationState } from "store/state.model";

interface IStateToProps {
  user: IUserAccount;
}

interface IProps extends IStateToProps, WithStyles<typeof styles> {}

const DashboardComponent: React.FC<IProps> =  ({ classes, user }) => {
  return(
    <>
      <Grid justify="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" display="inline" className={classes.typography}>
          Welcome back, {user.userName}! 
          </Typography>
          <Typography variant="body2" display="inline" className={classes.typography}>
            We've missed you.
          </Typography>
        </Grid>

        <Grid item>
          <Actions />
        </Grid>

        <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Alerts Today"
            amount="2532"
            chip="Today"
            percentageText="+26% since last week"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Visitors"
            amount="170.212"
            chip="Annual"
            percentageText="-14% since last week"
            percentagecolor={red[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Total Alerts"
            amount="24300"
            chip="Monthly"
            percentageText="+18% since last week"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Storage Used"
            amount="12/15 GB"
            chip="Yearly"
            percentageText="20% Remaining"
            percentagecolor={red[500]}
          />
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          <LineChart />
        </Grid>
        <Grid item xs={12} lg={4}>
          <DoughnutChart />
        </Grid>
      </Grid>
      </Grid>
    </>
  )
}

const mapStateToProps = (state: IApplicationState) => ({
  user: getUserAccount(state)
});

export const Dashboard = withStyles(styles)(connect<IStateToProps>(mapStateToProps, null)(DashboardComponent));
