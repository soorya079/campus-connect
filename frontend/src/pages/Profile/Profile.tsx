import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Typography variant="body1">
          Name: {user?.name}
        </Typography>
        <Typography variant="body1">
          Email: {user?.email}
        </Typography>
        <Typography variant="body1">
          Student ID: {user?.studentId}
        </Typography>
        <Typography variant="body1">
          Department: {user?.department}
        </Typography>
        <Typography variant="body1">
          Year: {user?.year}
        </Typography>
      </Box>
    </Container>
  );
};

export default Profile;
