import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Paper,
  Avatar,
  Chip,
  Divider,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Report, 
  MenuBook, 
  Security,
  Groups,
  TrendingUp,
  Star,
  CheckCircle,
  School,
  Support
} from '@mui/icons-material';

const Home: React.FC = () => {
  const theme = useTheme();

  const stats = [
    { number: '500+', label: 'Active Students', icon: <Groups /> },
    { number: '150+', label: 'Items Found', icon: <Search /> },
    { number: '200+', label: 'Problems Solved', icon: <CheckCircle /> },
    { number: '300+', label: 'Books Shared', icon: <MenuBook /> },
  ];

  const features = [
    {
      icon: <Security />,
      title: 'Secure & Safe',
      description: 'Your data is protected with industry-standard security measures and JWT authentication.'
    },
    {
      icon: <Support />,
      title: '24/7 Support',
      description: 'Our community and support team are here to help you whenever you need assistance.'
    },
    {
      icon: <School />,
      title: 'Educational Focus',
      description: 'Designed specifically for educational institutions to enhance student experience.'
    },
    {
      icon: <TrendingUp />,
      title: 'Growing Community',
      description: 'Join thousands of students who are already making their campus life better.'
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Computer Science, 3rd Year',
      content: 'Found my lost laptop within 2 days thanks to Campus Connect. The platform is amazing!',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Engineering, 4th Year',
      content: 'Sharing my textbooks with juniors has never been easier. Great way to help fellow students.',
      rating: 5
    },
    {
      name: 'Emma Davis',
      role: 'Arts, 2nd Year',
      content: 'The problem reporting feature helped fix our hostel WiFi issue in just a week!',
      rating: 5
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        {/* Hero Section */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Campus Connect
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Your all-in-one platform for lost items, problem reporting, and book sharing
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/register"
              sx={{ mr: 2 }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/login"
            >
              Login
            </Button>
          </Box>
        </Box>

        {/* Features */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Search sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Lost & Found
                </Typography>
                <Typography color="text.secondary">
                  Report lost items and help others find their belongings with image uploads and detailed descriptions.
                </Typography>
                <Button
                  variant="outlined"
                  component={Link}
                  to="/lost-items"
                  sx={{ mt: 2 }}
                >
                  View Lost Items
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Report sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Problem Reporting
                </Typography>
                <Typography color="text.secondary">
                  Report institutional problems and student requirements with voting and comment systems.
                </Typography>
                <Button
                  variant="outlined"
                  component={Link}
                  to="/problems"
                  sx={{ mt: 2 }}
                >
                  View Problems
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <MenuBook sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                  Book Sharing
                </Typography>
                <Typography color="text.secondary">
                  Seniors can share their books with juniors, making education more accessible and affordable.
                </Typography>
                <Button
                  variant="outlined"
                  component={Link}
                  to="/books"
                  sx={{ mt: 2 }}
                >
                  Browse Books
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Statistics Section */}
        <Paper 
          sx={{ 
            mt: 8, 
            p: 4, 
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            color: 'white'
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom textAlign="center" color="white">
            Platform Statistics
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box textAlign="center">
                  <Box sx={{ color: 'white', mb: 1 }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h3" component="div" color="white">
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" color="white">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Additional Features */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom textAlign="center">
            Why Choose Campus Connect?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mt: 1 }}>
                    {feature.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 8 }} />

        {/* Testimonials */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom textAlign="center">
            What Students Say
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%', p: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} sx={{ color: 'gold', fontSize: 20 }} />
                      ))}
                    </Box>
                    <Typography variant="body1" paragraph>
                      "{testimonial.content}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {testimonial.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Paper sx={{ mt: 8, p: 6, textAlign: 'center', bgcolor: 'grey.50' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Join thousands of students who are already making their campus life better.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Chip 
              label="Free to Use" 
              color="primary" 
              sx={{ mr: 2, mb: 2 }} 
            />
            <Chip 
              label="Secure Platform" 
              color="secondary" 
              sx={{ mr: 2, mb: 2 }} 
            />
            <Chip 
              label="Active Community" 
              color="success" 
              sx={{ mr: 2, mb: 2 }} 
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/register"
              sx={{ mr: 2, mb: 2 }}
            >
              Join Campus Connect
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/lost-items"
              sx={{ mb: 2 }}
            >
              Explore Features
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;
