import React, { useEffect, useState } from 'react'
import { Product } from '../models/Product'
import { ProductService } from '../service/product/ProductService'
import './styles/product.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import AddIcon from '@mui/icons-material/Add';
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


function Products() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [products, setProducts] = useState<any>([])
  const [formData, setFormData] = useState<any>([
    {
      name:"",
      unitPrice:'',
      unitsInStock:""
    }
  ])

  let productService = new ProductService();
  useEffect(() => {
    productService.getAll('/products')
    .then(res => setProducts(res.data))
    console.log(products);
  }, [])
  
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  const addProduct = () => {
    productService.add(formData,'/products')
    .then(() => {
      productService.getAll()
      .then(res => setProducts(res.data))
    })
  }
  const deleteProduct = (id: number) => {
    productService.delete(`/products/${id}`)
    .then(() => {
      productService.getAll()
      .then(res => setProducts(res.data))
    })
  }
  useEffect(() => {
    console.log(formData);
  }, [formData])
  return (
    <div>
      <form>
          <div><input onChange={handleChange} name='name' type="text" placeholder='Name'/></div>
          <div><input onChange={handleChange} name='unitPrice' type="text" placeholder='Unit Price'/></div>
          <div><input onChange={handleChange} name='unitsInStock' type="text" placeholder='Units in Stock'/></div>
          <Button variant="contained" onClick={addProduct} startIcon={<AddIcon />}>Add</Button>
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
                <input type="text" placeholder='Name'/>
                <input type="text" placeholder='Unit Price'/>
                <input type="text" placeholder='Units in Stock'/>
              </Typography>
            </Box>
          </Modal>
        </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Unit Price</TableCell>
              <TableCell align="left">Units in Stock</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products && products.map((product:any) => (
              <TableRow
                key={product.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {/* <TableCell component="th" scope="row">
                  {row.name}
                </TableCell> */}
                <TableCell align="left">{product.id}</TableCell>
                <TableCell align="left">{product.name}</TableCell>
                <TableCell align="left">{product.unitPrice}</TableCell>
                <TableCell align="left">{product.unitsInStock}</TableCell>
                <TableCell align="right">
                  <Button onClick={()=>deleteProduct(product.id)} variant="contained" startIcon={<DeleteIcon />}>Delete</Button>
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

export default Products 