import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/authSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import LinkButton from './LinkButton';
import WalletConnect from './WalletConnect';

const Layout = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authToken } = useAppSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
    navigate('/')
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              GP Vote
            </Link>
          </Typography>
          {authToken ? (
            <>
              <WalletConnect />
              <Button
                onClick={handleLogout}
                variant="outlined"
                sx={{ background: theme => theme.palette.common.white }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <LinkButton label="Register" to="/register" sx={{ marginRight: 1 }} />
              <LinkButton label="Login" to="/login" />
            </>
          )}
        </Toolbar>
      </AppBar>
      <main style={{ marginTop: 20 }}>{children}</main>
    </>
  );
};

export default Layout;
