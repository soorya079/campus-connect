import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Books: React.FC = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Book Sharing
        </Typography>
        <Typography variant="body1">
          This is the books page. Here seniors can share their books with juniors.
        </Typography>
      </Box>
    </Container>
  );
};

export default Books;
