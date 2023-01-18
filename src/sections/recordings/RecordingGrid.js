import { Box } from '@mui/material';
import { unionBy } from 'lodash';
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import RecordingCard from './RecordingCard';
import { SkeletonProductItem } from '../../components/skeleton';

// redux

const RecordingGrid = (props) => {
  const { recordingList, totalCount, nextPageCallback, clearData, setClearData } = props;
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
    const merged = unionBy(items, recordingList, 'id');
    setItems(merged);
  }, [recordingList]);

  useEffect(() => {
    if (clearData) {
      setItems([]);
      setClearData(false);
      setPage(0);
    }
  }, [clearData]);

  const renderLoader = () => [...Array(12)].map((item, index) => <SkeletonProductItem key={index} />);

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
        {items?.map((recording) => (
          <RecordingCard key={recording.id} recording={recording} />
        ))}
      </Box>
    </InfiniteScroll>
  );
};

export default RecordingGrid;
