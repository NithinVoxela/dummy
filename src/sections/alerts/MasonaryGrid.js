import { Box } from '@mui/material';
import { unionBy } from 'lodash';
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import AlertCard from './AlertCard';
import { SkeletonAlertItem } from '../../components/skeleton';

// redux

const MasonaryGrid = (props) => {
  const { alertList, totalCount, nextPageCallback, clearData, setClearData } = props;
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    nextPageCallback(nextPage);
  };

  useEffect(() => {
    if (items?.length >= totalCount) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [items]);

  useEffect(() => {
    const merged = unionBy(items, alertList, 'id');
    setItems(merged);
  }, [alertList]);

  useEffect(() => {
    if (clearData) {
      setItems([]);
      setClearData(false);
      setPage(0);
    }
  }, [clearData]);

  const renderLoader = () => [...Array(12)].map((item, index) => <SkeletonAlertItem key={index} />);

  return (
    <InfiniteScroll dataLength={items.length} next={handleLoadMore} hasMore={hasMore} loader={renderLoader}>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          pb: 1,
        }}
      >
        {items?.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </Box>
    </InfiniteScroll>
  );
};

export default MasonaryGrid;
