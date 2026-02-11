import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Problems: React.FC = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Problems & Requirements
        </Typography>
        <Typography variant="body1">
          This is the problems page. Here you can report institutional problems and student requirements.
        </Typography>
      </Box>
    </Container>
  );
};

export default Problems;
