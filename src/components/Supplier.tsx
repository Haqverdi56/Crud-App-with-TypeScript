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
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'black'
};

function Supplier() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [suppliers, setSuppliers] = useState<any>([])
  const [formData, setFormData] = useState<any>([
    {
      companyName:"",
      contactName:'',
      contactTitle:""
    }
  ])

  let supplierService = new SupplierService();
  useEffect(() => {
    supplierService.getAll('/suppliers')
    .then(res => setSuppliers(res.data))
  }, [])

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  const addSupplier = () => {
    supplierService.add(formData,'/suppliers')
    .then(() => {
      supplierService.getAll()
      .then(res => setSuppliers(res.data))
    })
  }
  const deleteSupplier = (id: number) => {
    supplierService.delete(`/suppliers/${id}`)
    .then(() => {
      supplierService.getAll()
      .then(res => setSuppliers(res.data))
    })
  }
  useEffect(() => {
    console.log(formData);
  }, [formData])
  
  return (
    <div>
      <div>
        <form>
          <div><input onChange={handleChange} name='companyName' type="text" placeholder='Company Name'/></div>
          <div><input onChange={handleChange} name='contactName' type="text" placeholder='Contact Name'/></div>
          <div><input onChange={handleChange} name='contactTitle' type="text" placeholder='Contact Title'/></div>
          <Button variant="contained" onClick={addSupplier} startIcon={<AddIcon />}>Add</Button>
        </form>
        <div>
          {/* <Button onClick={handleOpen}>Open modal</Button> */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <input type="text" placeholder='Company Name'/>
                <input type="text" placeholder='Company Name'/>
                <input type="text" placeholder='Company Name'/>
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Company Name</TableCell>
              <TableCell align="left">Contact Name</TableCell>
              <TableCell align="left">Contact Title</TableCell>
              <TableCell align="left">Action</TableCell>
              <TableCell align="left">Action</TableCell>
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
                <TableCell align="left">
                  <Button onClick={()=>deleteSupplier(supplier.id)} variant="contained" startIcon={<DeleteIcon />}>Delete</Button>
                </TableCell>
                <TableCell align="left">
                  <Button onClick={()=>handleOpen()} variant="contained" startIcon={<UpdateIcon />}>Update</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Supplier