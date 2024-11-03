import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { createTitle, setTitlesError } from '../features/titlesSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';

const AddTitle = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const { loading, error } = useAppSelector((state) => state.titles);
    const { address } = useAppSelector(state => state.wallet);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(createTitle(title)).unwrap();
            navigate('/dashboard');
        } catch (err) {
            dispatch(setTitlesError(err.message));
            console.error('Adding title failed:', err);
        }
    };

    useEffect(() => {
        if (!address) {
            navigate(-1);
        }
    }, [address, navigate])


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
                        Add Title
                    </Typography>
                    {error && <Alert severity="error" sx={{ width: '100%', marginBottom: 2, }}>{error}</Alert>}
                    <TextField
                        name="title"
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                        {loading ? 'Adding title...' : 'Add Title'}
                    </Button>
                </Box>
            </Container>
        </Layout>
    );
};

export default AddTitle;