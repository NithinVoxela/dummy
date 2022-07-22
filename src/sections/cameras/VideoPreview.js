import PropTypes from 'prop-types';
import React, { useState } from "react";
import { Box, Paper, Popper} from '@mui/material';
import ReactPlayer from 'react-player';
import Image from '../../components/Image';


VideoPreview.propTypes = {
  name: PropTypes.string,
  thumbnailUrl: PropTypes.string,
  mediaUrl: PropTypes.string,
  childCmp: PropTypes.object
};

export default function VideoPreview(props) {
  const { name, thumbnailUrl, mediaUrl, childCmp } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      { !childCmp ? 
        <Image 
          alt={name}
          src={thumbnailUrl}
          sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0, cursor: 'pointer' }}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        />  
        : 
        <Box
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          { childCmp }
        </Box>    
      }      
      <Popper
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',           
        }}
        open={open}
        anchorEl={anchorEl}
        placement="auto"
        onClose={handlePopoverClose}
        disableRestoreFocus        
      >
        <Paper  sx={{ p: 1 }}>
          <ReactPlayer loop playing width="360px" height="100%" url={mediaUrl} />
        </Paper >
      </Popper>
    </div>
  );
}