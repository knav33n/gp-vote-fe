import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import TitlesTable from '../components/TitlesTable';
import { useAppSelector } from '../hooks/useAppSelector';

const Dashboard = () => {
  const { address } = useAppSelector(state => state.wallet);

  return (
    <Layout>
      <Container maxWidth="md">
        <Typography variant="h4">Dashboard</Typography>
        {address ? <Typography variant='subtitle1'>Wallet Address: {address}</Typography> :
          <Typography>
            Please connect your wallet to add/delete your titles.
          </Typography>}
        <Box display="flex" justifyContent="flex-end">
          <Button component={Link}
            to="/dashboard/add-title"
            disabled={!address} >
            Add Title
          </Button>
        </Box>
        <TitlesTable />
      </Container>
    </Layout>
  );
};

export default Dashboard;
