import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../features/authSlice';
import { AppDispatch, RootState } from '../store';
import Layout from '../components/Layout';

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <Layout>
      <Container>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: 400,
              margin: 'auto',
              padding: 2,
              boxShadow: 3,
              borderRadius: 1,
              bgcolor: 'background.paper',
              marginTop: '100px'
            }}
          >
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            {error && <Alert severity="error" sx={{ width: '100%', marginBottom: 2, }}>{error}</Alert>}
            <TextField
              name="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Button
              type='submit'
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ marginTop: 2 }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Box>
      </Container>
    </Layout>
  );
};

export default Login;