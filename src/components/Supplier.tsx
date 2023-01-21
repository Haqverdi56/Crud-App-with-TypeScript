import React, { useEffect, useState } from 'react'
import { SupplierService } from '../service/supplier/SupplierService';
import './styles/supplier.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Supplier() {
  const [suppliers, setSuppliers] = useState<any>([])

  useEffect(() => {
    let supplierService = new SupplierService();
    
    supplierService.getAll('/suppliers')
    .then(res => setSuppliers(res.data))
  }, [])
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Company Name</TableCell>
              <TableCell align="left">Contact Name</TableCell>
              <TableCell align="left">Contact Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers && suppliers.map((supplier:any) => (
              <TableRow
                key={supplier.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {/* <TableCell component="th" scope="row">
                  {row.name}
                </TableCell> */}
                <TableCell align="left">{supplier.id}</TableCell>
                <TableCell align="left">{supplier.companyName}</TableCell>
                <TableCell align="left">{supplier.contactName}</TableCell>
                <TableCell align="left">{supplier.contactTitle}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Supplier