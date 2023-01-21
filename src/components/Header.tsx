import { Link } from 'react-router-dom'
import './styles/header.css'

function Header() {
  return (
    <div className='Header'>
        <div className='links'>
          <Link to='category'>Categories</Link>
          <Link to='supplier'>Supplier</Link>
          <Link to='product'>Product</Link>
        </div>
    </div>
  )
}

export default Header