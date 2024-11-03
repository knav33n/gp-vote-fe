import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { registerUser } from '../features/authSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';

const Register = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState<string | null>(null)
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(registerUser({ username, email, password })).unwrap();
      setUsername('')
      setPassword('')
      setEmail('')
      setSuccess("Registration successful. Please login to continue.");
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
            Register
          </Typography>
          {error && <Alert severity="error" sx={{ width: '100%', marginBottom: 2, }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ width: '100%', marginBottom: 2, }}>{success}</Alert>}
          <TextField
            name="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
            fullWidth
            margin="normal"
            variant="outlined"
          />
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
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

export default Register;
