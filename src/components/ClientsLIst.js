import React, { useState } from 'react';
import { getDocs } from 'firebase/firestore';
import { db, instancesRef, auth } from '../config/firebase';
import { collection } from 'firebase/firestore';
import { useEffect } from 'react';
import { setClients } from '../redux/reducers/clients';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#1976D2",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'Name', headerName: ' Name', flex: 2 },
    { field: 'email', headerName: 'Email', flex: 2 },
    {
        field: 'Contact',
        headerName: 'Contact',
        flex: 2,
    },
];

export default function ClientsList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Set your initial rows per page
    const clientsRef = collection(db, instancesRef + auth.currentUser.uid + '/client');
    const clientList = useSelector((state) => state.clients.clients);
    const dispatch = useDispatch();

    const getClient = async () => {
        try {
            const data = await getDocs(clientsRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            dispatch(setClients(filteredData));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getClient();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div style={{ height: 400, width: '100%', margin: '1%' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="left">Email</StyledTableCell>
                            <StyledTableCell align="left">Contact</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? clientList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : clientList
                        ).map((client) => (
                            <StyledTableRow key={client.clientSid}>
                                <TableCell component="th" scope="row">
                                    {client.clientSid}
                                </TableCell>
                                <StyledTableCell align="left">{client.name}</StyledTableCell>
                                <StyledTableCell align="left">{client.email}</StyledTableCell>
                                <StyledTableCell align="left">{client.phone}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={clientList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
}
