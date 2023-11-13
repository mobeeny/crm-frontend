import React from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { getDocs } from 'firebase/firestore';
import { db, instancesRef, auth, } from '../config/firebase';
import { collection } from 'firebase/firestore';
import client from '../data/clients';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    setSelectedClient,
    setSelectedCompany,
    setSelectedUserCompaniesIds,
    setSelectedUserCompanies,
    setClient,
} from "../redux/reducers/clients";
const columns = [
    { field: 'id', headerName: 'ID', flex: 1, headerClassName: 'bold-header' },
    {
        field: 'companyName',
        headerName: 'Company Name',

        flex: 2

    },
    { field: 'ntn', headerName: ' NTN', flex: 2 },
    { field: 'city', headerName: 'City', flex: 2 },
    {
        field: 'Contact',
        headerName: 'Contact',

        flex: 2

    },
    

];

const styles = {
    boldHeader: {
        fontWeight: 'bold',
    },
};

export default function CompanyList() {

    const companyRef = collection(db, instancesRef + auth.currentUser.uid + "/company");
    const companiesList = useSelector((state) => state.clients.selectedUserCompanies);
    
    const dispatch = useDispatch();

    const getCompany = async () => {
        //Read the Data
        //Set the Movie List
        try {
            const data = await getDocs(companyRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            
            dispatch(setSelectedUserCompanies(filteredData));
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        getCompany();
    }, []);

    return (
        <div style={{ height: "auto", width: '98%', margin: "1%" }}>
            {console.log("Data", CompanyList)}

            <DataGrid
                rows={companiesList?.map((company) => ({ id: company.companySid, companyName: company.name, ntn: company.ntn, city: company.city, Contact: company.phone, }))}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 14 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />

        </div>
    )
}
