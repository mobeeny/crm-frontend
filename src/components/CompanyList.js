import React, { useState } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { getDocs } from 'firebase/firestore';
import { db, instancesRef, auth, } from '../config/firebase';
import { collection } from 'firebase/firestore';
import client from '../data/clients';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUserCompanies, setClient, } from "../redux/reducers/clients";
import { setCompanies } from '../redux/reducers/companies';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import selectedCompany, { setSelectedCompanyId } from '../redux/reducers/selectedCompany';
import { deleteDoc, doc } from 'firebase/firestore';
import AddCompanyDialog from './D_NewCompany'
import { setCompanyDialog } from '../redux/reducers/dialogFlags';


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




function EnhancedTableToolbar() {

    const selectedCompanyId = useSelector((state) => state.selectedCompany.selectedCompanyId);
    const dispatch = useDispatch();


    const handleEdit = () => {
      dispatch(setCompanyDialog(true))
 
    };



    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(selectedCompanyId.length > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {selectedCompanyId.length > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {selectedCompanyId.length} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    All Companies
                </Typography>
            )}

            {selectedCompanyId.length > 0 ? (
                <Tooltip title="Edit">
                    <IconButton >
                        <EditIcon  onClick={handleEdit}/>
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

export default function CompanyList() {
    const selectedCompanyId1= useSelector((state) => state.selectedCompany.selectedCompanyId);
    const companyRef = collection(db, instancesRef + auth.currentUser.uid + "/company");
    const companiesList = useSelector((state) => state.companies.companies);
    const dispatch = useDispatch();


    const getCompany = async () => {
        //Read the Data
        //Set the Movie List
        try {
            const data = await getDocs(companyRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            dispatch(setCompanies(filteredData));

        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        getCompany();
    }, []);


    const handleCompanySelected = (e) => {
        const selectedCompanyId = e.row.id;

        // If the selected row is already in the selectedRow array, clear the selection
        if (selectedCompanyId1.includes(selectedCompanyId)) {
            dispatch(setSelectedCompanyId([]));
        } else {
            // If the selected row is not in the selectedRow array, clear the previous selection and select the new row
            dispatch(setSelectedCompanyId([selectedCompanyId]));
        }
    };




    return (
        <div style={{ height: "auto", width: '98%', margin: "1%" }}>
            {console.log("Data", CompanyList)}
            <EnhancedTableToolbar />
            <DataGrid onRowClick={(e) => handleCompanySelected(e)}

                rows={companiesList?.map((company) => ({ id: company.companySid, companyName: company.name, ntn: company.ntn, city: company.city, Contact: company.phone, }))}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 13 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                
            />

        </div>
    )
}
