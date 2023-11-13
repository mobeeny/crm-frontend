import React from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { getDocs } from 'firebase/firestore';
import { db, instancesRef, auth, } from '../config/firebase';
import { collection } from 'firebase/firestore';
import client from '../data/clients';
import { useEffect } from 'react';
import { setClient } from '../redux/reducers/clients';
import { useDispatch, useSelector } from "react-redux";

const columns = [
    { field: 'id', headerName: 'ID', flex: 1  },
    { field: 'Name', headerName: ' Name', flex: 2, },
    { field: 'email', headerName: 'Email', flex: 2 },
    {
        field: 'Contact',
        headerName: 'Contact',

        flex: 2

    },
    

];



export default function ClientsLIst() {

    const clientsRef = collection(db, instancesRef + auth.currentUser.uid + "/client");
    const clientList = useSelector((state) => state.clients.client);
    const dispatch = useDispatch();

    const getClient = async () => {
        //Read the Data
        //Set the Movie List
        try {
            const data = await getDocs(clientsRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            dispatch(setClient(filteredData));
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        getClient();
    }, []);

    return (
        <div style={{ height: 400, width: '100%', margin: "1%" }}>
            {console.log("Data", clientList)}

            <DataGrid
                rows={clientList?.map((client) => ({ id: client.clientSid, email: client.email, Name: client.name, Contact: client.phone,}))}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />

        </div>
    )
}
