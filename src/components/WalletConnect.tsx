import { Button, Tooltip } from '@mui/material';
import { setWalletAddress, setWalletError } from '../features/walletSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';

const WalletConnect = () => {
    const { address, error } = useAppSelector(state => state.wallet);
    const { authToken } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                if (accounts.length > 0) {
                    dispatch(setWalletAddress(accounts[0]));
                }
            } catch (error) {
                dispatch(setWalletError(error.message));
                console.error("Error connecting to wallet:", error);
            }
        }
    };

    if (!authToken || address)
        return null

    if (!window.ethereum) {
        return <Tooltip title={error} arrow>
            <span>
                <Button
                    onClick={connectWallet}
                    disabled={true}
                    variant="outlined"
                    sx={{ background: theme => theme.palette.common.white, marginRight: 1 }}
                >
                    Connect Wallet
                </Button>
            </span>
        </Tooltip>

    }

    return (
        <Button
            onClick={connectWallet}
            variant="outlined"
            sx={{ background: theme => theme.palette.common.white, marginRight: 1 }}
        >
            Connect Wallet
        </Button>
    );
};

export default WalletConnect;
