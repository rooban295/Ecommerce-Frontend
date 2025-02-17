import { AddProduct } from './component/AddProduct'
import { Cart } from './component/Cart'
import { Footer } from './component/Footer'
import { Nav } from './component/Nav'
import { Product } from './component/Product'
import {BrowserRouter, Routes,Route } from 'react-router-dom'
import { ViewProduct } from './component/ViewProduct'
import { UpdateProduct } from './component/UpdateProduct'
import { FilterProduct } from './component/FilterProduct'
import { Login } from './component/Login'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Order } from './component/Order'
import { ViewOrder } from './component/ViewOrder'
import { Category } from './component/Category'
import { SearchProduct } from './component/SearchProduct'
import { BannerProduct } from './component/BannerProduct'

function App() {
  
const jwt = useSelector((state)=>state.jwt.jwtToken)

const[login,setLogin]=useState(true);


useEffect(()=>{
  if(jwt.message ==='Login successfully'){
    setLogin(true)
  }
  else{
    setLogin(false)
  }
},[jwt])


  return (
    <>
    {   
    
    login ?

    (<BrowserRouter>
    <Nav jwtToken={jwt}/>
    <Routes>
      <Route path='/login' element={<Login/>}></Route>  
      <Route path='/'  element={<Product/>}></Route>  
      <Route path='/product' element={<AddProduct />}></Route>
      <Route path='/filter/:id' element={<FilterProduct/>}></Route>
      <Route path='/view/:id' element={<ViewProduct/>}></Route>
      <Route path='/updateproduct/:id' element={<UpdateProduct/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
      <Route path='/order' element={<Order/>}></Route>
      <Route path='/vieworder' element={<ViewOrder/>}></Route>
      <Route path='/category' element={<Category/>}></Route>
      <Route path='/search' element={<SearchProduct/>}></Route>
      <Route path='/bannerproduct' element={<BannerProduct/>}></Route>
    </Routes>
    <Footer/>
    </BrowserRouter>)
    :
    
    <Login/>

    }
    </>
  )
}

export default App
