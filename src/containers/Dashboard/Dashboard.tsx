import { Grid, Typography } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import * as React from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";

import { IUserAccount } from "models/user.model";
import { IApplicationState } from "store/state.model";
import { getUserAccount } from "store/userAccount/userAccount.selector";

import { Actions } from "./Actions";
import { DoughnutChart } from "./DoughnutChart";
import { LineChart } from "./LineChart";
import { Stats } from "./Stats";
import { styles } from "./styles";

interface IStateToProps {
  user: IUserAccount;
}

interface IProps extends IStateToProps, WithStyles<typeof styles> {}

const DashboardComponent: React.FC<IProps> = ({ classes, user }) => {
  return (
    <>
      <Helmet title="Dashboard" />
      <Grid justify="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" display="inline" className={classes.typography}>
            Welcome back, {user.userName}!
          </Typography>
        </Grid>

        <Grid item>
          <Actions />
        </Grid>

        <Grid container spacing={6}>
          <Grid item xs={12} sm={12} md={6} lg={4} xl>
            <Stats
              title="Alerts Today"
              amount="2532"
              chip="Today"
              percentageText="+26% since last week"
              percentagecolor={green[500]}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl>
            <Stats
              title="Total Alerts"
              amount="24300"
              chip="Monthly"
              percentageText="+18% since last week"
              percentagecolor={green[500]}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl>
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
  );
};

const mapStateToProps = (state: IApplicationState) => ({
  user: getUserAccount(state)
});

export const Dashboard = withStyles(styles)(connect<IStateToProps>(mapStateToProps, null)(DashboardComponent));
