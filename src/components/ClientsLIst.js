import React from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Name', headerName: ' Name', width: 330 },
    { field: 'email', headerName: 'Email', width: 330 },
    {
        field: 'Contact',
        headerName: 'Contact',
    
        width: 330,
        
    },
    {
        field: 'company',
        headerName: 'Company',
     
        width: 330,
        
    }

];

const rows = [
    { id: 1, email: 'Snow', Name: 'Jon', Contact: 35,company:"abc" },
    { id: 2, email: 'Lannister', Name: 'Cersei', Contact: 42 ,company:"abc"},
    { id: 3, email: 'Lannister', Name: 'Jaime', Contact: 45,company:"abc" },
    { id: 4, email: 'Stark', Name: 'Arya', Contact: 16,company:"abc" },
    { id: 5, email: 'Targaryen', Name: 'Daenerys', Contact: null },
    { id: 6, email: 'Melisandre', Name: null, Contact: 150,company:"abc" },
    { id: 7, email: 'Clifford', Name: 'Ferrara', Contact: 44,company:"abc" },
    { id: 8, email: 'Frances', Name: 'Rossini', Contact: 36,company:"abc" },
    { id: 9, email: 'Roxie', Name: 'Harvey', Contact: 65,company:"abc" },
];

export default function ClientsLIst() {


    return (
        <div style={{ height: 400, width: '100%',margin:"1%"}}>
            <DataGrid
                rows={rows}
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
