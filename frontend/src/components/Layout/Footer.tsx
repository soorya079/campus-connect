import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 3,
        px: 2,
        backgroundColor: 'primary.main',
        color: 'white',
        textAlign: 'center'
      }}
    >
      <Typography variant="body2">
        © 2024 Campus Connect. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
