import { Alert, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useAppSelector } from "../hooks/useAppSelector";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchTitlesByUser, removeTitle } from "../features/titlesSlice";

const TitlesTable = () => {
    const dispatch = useAppDispatch();
    const { titles, loading, error } = useAppSelector((state) => state.titles);

    useEffect(() => {
        dispatch(fetchTitlesByUser());
    }, [dispatch]);

    const deleteTitle = (uuid: string) => {
        // This does not persist the changes, since the backend did not have the api to handle deletion
        dispatch(removeTitle(uuid));
    }

    if(loading) {
        return <CircularProgress />
    }

    return (
        <>
            {error ? <Alert severity="error">{error}</Alert> :
                <TableContainer component={Paper} sx={{ maxWidth: 400, margin: "auto" }}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {titles?.map((title) => (
                                <TableRow key={title.uuid}>
                                    <TableCell>{title.title}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => deleteTitle(title.uuid)}
                                        >
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>}

        </>
    )
}
export default TitlesTable;