import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const SkeletonLoad: React.FC = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Skeleton variant="rectangular" width="100%" height={50} /> {/* Navbar skeleton */}
      <Box sx={{ marginTop: 2 }}>
        <Skeleton variant="rectangular" width="100%" height={400} /> {/* Main content skeleton */}
        <Skeleton width="60%" />
        <Skeleton width="80%" />
        <Skeleton width="40%" />
      </Box>
    </Box>
  );
};

export default SkeletonLoad;
