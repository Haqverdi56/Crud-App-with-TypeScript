import React from 'react'
import { Route, Routes } from 'react-router'
import Categories from './components/Categories'
import Header from './components/Header'
import Products from './components/Products'
import Supplier from './components/Supplier'


function App() {
  return (
    <div>
        <Header />
        <Routes>
          <Route path='category' element={<Categories/>}/>
          <Route path='product' element={<Products/>}/>
          <Route path='supplier' element={<Supplier/>}/>
        </Routes>
    </div>
  )
}

export default App