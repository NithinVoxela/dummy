import { Card, CardContent, CardMedia, Typography, WithStyles } from "@material-ui/core";
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

import { styles } from "./styles";

export const CARD = {
  WIDTH: 300,
  HEIGHT: 350
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
    gutterSize: 40,
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
    const { classes, list } = this.props;
    const { index, key, parent, style } = config;
    const { media = null, cameraName = null, location = null, type = null, alertTime = null, severity = null } =
      list?.[index] || {};
    const content = media ? (
      <Card className={classes.card} raised>
        <CardMedia className={classes[type]} component={type} controls image={media} />
        <CardContent>
          <div className={classes.header}>
            <Typography gutterBottom variant="headline" component="h3" className={classes.alertTime}>
              {alertTime}
            </Typography>
            <Typography component="p" className={classes.severity}>
              {severity}
            </Typography>
          </div>
          <Typography component="p" className={classes.cardInfo}>{cameraName}</Typography>
          <Typography component="p" className={classes.cardInfo} title={location}><b>Location:</b> {location}</Typography>
        </CardContent>
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
