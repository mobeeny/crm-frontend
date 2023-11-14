import React from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { getDocs } from 'firebase/firestore';
import { db, instancesRef, auth, } from '../config/firebase';
import { collection } from 'firebase/firestore';
import client from '../data/clients';
import { useEffect } from 'react';
import { setproductDetails } from '../redux/reducers/proposal';
import { useDispatch, useSelector } from "react-redux";

const columns = [
    { field: 'name', headerName: ' Name', flex: 1, },
    { field: 'id', headerName: 'ID', flex: 1  },
 
    { field: 'email', headerName: 'Email', flex: 2 },
    {
        field: 'Contact',
        headerName: 'Contact',

        flex: 2

    },
    

];



export default function QuotationLIst() {

    const quotationsRef = collection(db, instancesRef + auth.currentUser.uid + "/products&services");
    const quotationList = useSelector((state) => state.proposal. productDetails);
    const dispatch = useDispatch();

    const getQuotation = async () => {
        //Read the Data
        //Set the Movie List
        try {
            const data = await getDocs(quotationsRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            dispatch(setproductDetails(filteredData));
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        getQuotation();
    }, []);

    return (
        <div style={{ height: 400, width: '100%', margin: "1%" }}>
            {console.log("Data", clientList)}

            <DataGrid
                rows={productDetails?.map((product) => ({ id: client.clientSid, email: client.email, Name: client.name, Contact: client.phone,}))}
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
