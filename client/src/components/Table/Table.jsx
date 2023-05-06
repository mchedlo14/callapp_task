import React, { useEffect } from 'react'
import './Table.css';
import useJsonDataStore from '../../zustand/store';
import DataTable from "react-data-table-component";


const Table = () => {
    const userData = useJsonDataStore((state) => state.jsonData);

    //table data 
    const columns = [
        {
            name: 'id',
            selector: (row) => row.id,
        },
        {
            name: 'name',
            selector: (row) => row.name,

        },
        {
            name: 'email',
            selector: (row) => row.email,

        },
        {
            name: 'gender',
            selector: (row) => row.gender,

        },
        {
            name: "Street",
            selector: (row) => row.address.street,
        },
        {
            name: "City",
            selector: (row) => row.address.city,
        },
        {
            name: 'phone',
            selector: (row) => row.phone,
        },
    ]

    useEffect(() => {
        console.log(userData)
    }, [userData])
    return (
        <div className='table__wrapper'>
            {
                userData === null ? <>Loading</>
                    :
                    <DataTable
                        title="User Data"
                        columns={columns}
                        data={userData}
                        pagination />
            }
        </div>
    )
}

export default Table