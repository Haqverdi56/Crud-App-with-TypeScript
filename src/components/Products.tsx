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

function Products() {
  const [products, setProducts] = useState<any>([])

  useEffect(() => {
    
    let productService = new ProductService();
    
    productService.getAll('/products')
    .then(res => setProducts(res.data))
    console.log(products);
  }, [])
  
  
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Unit Price</TableCell>
              <TableCell align="left">Units in Stock</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Products 