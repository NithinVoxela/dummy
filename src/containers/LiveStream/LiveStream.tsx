import { Grid } from "@material-ui/core";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import * as React from "react";
import { connect } from "react-redux";

import { IUserAccount } from "models/user.model";
import { IApplicationState } from "store/state.model";
import { getUserAccount } from "store/userAccount/userAccount.selector";

import { StreamPlayer } from "./StreamPlayer";
import { styles } from "./styles";

interface IStateToProps {
  user: IUserAccount;
}

interface IProps extends IStateToProps, WithStyles<typeof styles> {}

const LiveStreamComponent: React.FC<IProps> = ({ classes, user }) => {
  return (
    <Grid justify="space-between" container spacing={6}>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          <StreamPlayer />
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: IApplicationState) => ({
  user: getUserAccount(state)
});

export const LiveStream = withStyles(styles)(connect<IStateToProps>(mapStateToProps, null)(LiveStreamComponent));
