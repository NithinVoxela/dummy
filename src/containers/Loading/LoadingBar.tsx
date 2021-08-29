import { WithStyles, withStyles } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import * as React from "react";
import { connect } from "react-redux";

import loadingIcon from "assets/icons/loader.svg";
import { getLoadingStatus } from "store/loading/loading.selector";
import { IApplicationState } from "store/state.model";

import { styles } from "./styles";

interface IStateToProps {
  loading: boolean;
}

interface IProps extends WithStyles, IStateToProps {}

const LoadingBarComponent: React.FC<IProps> = ({ classes, loading }) => {
  return (
    <Modal open={loading}>
      <div className={classes.loadingContainer}>
        <img src={loadingIcon} />
      </div>
    </Modal>
  );
};

const mapStateToProps = (state: IApplicationState) => ({
  loading: getLoadingStatus(state)
});

export const LoadingBar = withStyles(styles)(
  connect<IStateToProps>(mapStateToProps, null)(React.memo(LoadingBarComponent))
);
