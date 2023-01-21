import { useEffect, useState } from 'react';
import { CategoryService } from '../service/category/CategoryService';
import '././styles/category.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Categories() {
  const [categories, setCategories] = useState<any>([])

  useEffect(() => {
    let categoryervice = new CategoryService();
    
    categoryervice.getAll()
    .then(res => setCategories(res.data))
  }, [])
  return (
    <div className='table'>
      <TableContainer sx={{ minWidth: 400, maxWidth: 700 }}  component={Paper}>
        <Table sx={{ minWidth: 300}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories && categories.map((category:any) => (
              <TableRow
                key={category.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{category.id}</TableCell>
                <TableCell align="right">{category.name}</TableCell>
                <TableCell align="right">{category.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Categories