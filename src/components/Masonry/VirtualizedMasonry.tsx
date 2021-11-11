import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  WithStyles
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as React from "react";
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
  AutoSizer,
  InfiniteLoader,
  WindowScroller
} from "react-virtualized";

import { NUMBERS } from "configs/constants";
import { translationService } from "services/translation/translation.service";

import { styles } from "./styles";

export const CARD = {
  WIDTH: 335,
  HEIGHT: 350
};

export const SEVERITY_COLORS = {
  High: "#ed6c02",
  Critical: "#d32f2f",
  Low: "#0288d1"
};

export interface IBaseVirtualizedMasonryProps {
  list: any[];
  limit?: number;
  totalCount?: number;
  offset?: number;
  nextPageCallback?: (offset: number) => void;
}

interface IProps extends IBaseVirtualizedMasonryProps, WithStyles<typeof styles> {}

class MasonryComponent extends React.Component<IProps> {
  public cache: any = new CellMeasurerCache({
    fixedHeight: true,
    fixedWidth: true,
    defaultHeight: CARD.HEIGHT
  });

  public config: any = {
    columnWidth: CARD.WIDTH,
    gutterSize: 20,
    overscanByPixels: CARD.HEIGHT
  };


  public getPositionerConfig = (width: number) => {
    const { gutterSize } = this.config;
    const columnCount = this.getColumnCount(width);
    return {
      columnCount,
      columnWidth: CARD.WIDTH,
      spacer: gutterSize
    };
  };

  public resetCellPositioner = (width: number) => {
    const config = this.getPositionerConfig(width);
    this._cellPositioner.reset(config);
  };

  public getColumnCount = (width: number) => {
    const { columnWidth, gutterSize } = this.config;
    const columnCount = Math.floor(width / (columnWidth + gutterSize));
    this.setState({ columnCount });
    return columnCount;
  };

  public initCellPositioner(width: number) {
    if (typeof this._cellPositioner === "undefined") {
      const config = this.getPositionerConfig(width);
      this._cellPositioner = createMasonryCellPositioner({
        cellMeasurerCache: this.cache,
        ...config
      });
    }
  }

  public onResize = ({ width }: { width: number }) => {
    this.resetCellPositioner(width);
    this._masonry.recomputeCellPositions();
  };

  public isRowLoaded = ({ index }: { index: number }) => {
    const { list } = this.props;
    return !!list[index];
  };

  public loadMoreRows = ({ startIndex }: { startIndex: number; stopIndex: number }): any => {
    const { nextPageCallback, offset } = this.props;
    if (nextPageCallback && offset !== startIndex) {
      nextPageCallback(startIndex);
    }
  };

  public cellRenderer = config => {
    const { classes, list, viewDetails, markAsRead } = this.props;
    const { index, key, parent, style } = config;
    const {
      media = null,
      cameraName = null,
      location = null,
      type = null,
      alertTime = null,
      severity = null,
      id,
      hasRead
    } = list?.[index] || {};

    const handleCardClick = () => {
      viewDetails(id);
    };

    const handleReadClick = () => {
      markAsRead(id);
    };
    const content = media ? (
      <Card className={classes.card} raised>
        {!hasRead && (
          <Badge
            color="secondary"
            className={classes.newBadge}
            badgeContent={translationService.getMessageTranslation("alert-new", "NEW")}
          />
        )}
        <CardMedia className={classes[type]} component={type} controls image={media} />
        <CardContent style={{ padding: "6px 16px" }}>
          <div className={classes.header}>
            <Typography gutterBottom variant="headline" component="h3" className={classes.alertTime}>
              {alertTime}
            </Typography>
            <Typography component="p" className={classes.severity}>
              <Chip
                label={severity}
                style={{ backgroundColor: SEVERITY_COLORS[severity], color: "#fff" }}
                size="small"
              />
            </Typography>
          </div>
          <Typography component="p" className={classes.cardInfo} title={cameraName}>
            <b>{translationService.getMessageTranslation("alert-camera-details", "Camera")}:</b> {cameraName}
          </Typography>
          <Typography component="p" className={classes.cardInfo} title={location}>
            <b>{translationService.getMessageTranslation("alert-location-details", "Location")}:</b> {location}
          </Typography>
        </CardContent>
        <CardActions style={{ padding: "4px 8px" }}>
          {!hasRead && (
            <Button size="small" color="primary" onClick={handleReadClick}>
              {translationService.getMessageTranslation("alert-mark-read", "Mark As Read")}
            </Button>
          )}
          <Button size="small" color="primary" onClick={handleCardClick}>
            {translationService.getMessageTranslation("alert-view-details", "View Details")}
          </Button>
        </CardActions>
      </Card>
    ) : null;
    return (
      <CellMeasurer cache={this.cache} index={index} key={key} parent={parent}>
        <div
          style={{
            ...style,
            width: CARD.WIDTH,
            height: CARD.HEIGHT
          }}
        >
          {content}
        </div>
      </CellMeasurer>
    );
  };

  public renderMasonry = (registerChild, onRowsRendered, height, scrollTop) => ({ width }) => {
    this.initCellPositioner(width);
    const { list } = this.props;

    return (
      <Masonry
        cellCount={list.length}
        cellMeasurerCache={this.cache}
        cellPositioner={this._cellPositioner}
        cellRenderer={this.cellRenderer}
        autoHeight
        height={height}
        scrollTop={scrollTop}
        overscanByPixels={CARD.HEIGHT}
        ref={ref => (this._masonry = ref)}
        onCellsRendered={onRowsRendered}
        width={width}
      />
    );
  };

  public renderAutoSizer = () => ({ registerChild, onRowsRendered }) => {
    return (
      <WindowScroller overscanByPixels={CARD.HEIGHT}>
        {({ height, scrollTop }) => (
          <AutoSizer disableHeight onResize={this.onResize} height={height} scrollTop={scrollTop}>
            {this.renderMasonry(registerChild, onRowsRendered, height, scrollTop)}
          </AutoSizer>
        )}
      </WindowScroller>
    );
  };

  public renderInfiniteLoader = () => {
    const { list, totalCount, limit } = this.props;
    const threshold = limit > list.length ? Math.floor(list.length / NUMBERS.TWO) : Math.floor(limit / NUMBERS.TWO);
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={totalCount}
        threshold={threshold}
      >
        {this.renderAutoSizer()}
      </InfiniteLoader>
    );
  };

  public render() {
    const { list } = this.props;
    if (!list) {
      return null;
    }

    return <div>{this.renderInfiniteLoader()}</div>;
  }
}

export const VirtualizedMasonry = withStyles(styles)(MasonryComponent);
