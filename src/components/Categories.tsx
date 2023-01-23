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


function Categories() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [categories, setCategories] = useState<any>([])
  const [formData, setFormData] = useState<any>([
    {
      name:"",
      description:'',
    }
  ])

  let categoryService = new CategoryService();
  useEffect(() => {
    
    categoryService.getAll()
    .then(res => setCategories(res.data))
  }, [])

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const addCategory = () => {
    categoryService.add(formData,'/categories')
    .then(() => {
      categoryService.getAll()
      .then(res => setCategories(res.data))
    })
  }
  const deleteSupplier = (id: number) => {
    categoryService.delete(`/categories/${id}`)
    .then(() => {
      categoryService.getAll()
      .then(res => setCategories(res.data))
    })
  }
  useEffect(() => {
    console.log(formData);
  }, [formData])
  
  return (
    <div className='table'>
      <form>
        <div><input onChange={handleChange} name='name' type="text" placeholder='Name'/></div>
        <div><input onChange={handleChange} name='description' type="text" placeholder='Description'/></div>
        <Button variant="contained" onClick={addCategory} startIcon={<AddIcon />}>Add</Button>
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
                <input type="text" placeholder='Description'/>
              </Typography>
            </Box>
          </Modal>
        </div>
      <TableContainer sx={{ minWidth: 400 }}  component={Paper}>
        <Table sx={{ minWidth: 300}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Action</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories && categories.map((item:any) => (
              <TableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{item.id}</TableCell>
                <TableCell align="right">{item.name}</TableCell>
                <TableCell align="right">{item.description}</TableCell>
                <TableCell align="right">
                  <Button onClick={()=>deleteSupplier(item.id)} variant="contained" startIcon={<DeleteIcon />}>Delete</Button>
                </TableCell>
                <TableCell align="right">
                  <Button onClick={()=> handleOpen()} variant="contained" startIcon={<UpdateIcon />}>Update</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Categories