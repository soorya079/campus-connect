import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const LostItems: React.FC = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Lost Items
        </Typography>
        <Typography variant="body1">
          This is the lost items page. Here you can report and search for lost items.
        </Typography>
      </Box>
    </Container>
  );
};

export default LostItems;
