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
import axios from 'axios'
import { OrderResult } from './component/OrderResult'
import { AddProduct } from './component/AddProduct'


function App() {

const baseUrl=import.meta.env.VITE_BASE_URL;
  
const jwt = useSelector((state)=>state.jwt.jwtToken)

const[product,setProduct]=useState([])

const[login,setLogin]=useState(true);

const[cartitem,setCartItems]=useState([])

useEffect(()=>{
  if(jwt.message ==='Login successfully'){
    setLogin(true)
  }
  else{
    setLogin(false)
  }
},[jwt])


useEffect(() => {
  if (login) {
    allproduct();
    cartItems();
  }
}, [login]);


 const allproduct = async () =>{

    await axios.get(`${baseUrl}/api/product`)
    .then((res)=>{
        setProduct(res.data);
    })
    .catch((err)=>{
        console.log(err)
    })
}

//cart
const cartItems = async ()=>{ 
  if(jwt.message ==='Login successfully'){
    
   await axios.get(`${baseUrl}/api/cart/getcartitem`,{
      headers:{
        Authorization: `Bearer ${jwt.jwt}`
      }
    })
    .then((res)=>{
    setCartItems(res.data)
  })
  .catch((err)=>{
    console.log(err); 
  })
}
}

  return (
    <>
    {   
    
    login ?

    (<BrowserRouter>
    <Nav jwtToken={jwt} cartitem={cartitem} allproduct={allproduct}/>
    <Routes>
      <Route path='/login' element={<Login/>}></Route>  
      <Route path='/'  element={<Product product={product} allproduct={allproduct} cartItems={cartItems}/>}></Route>  
      <Route path='/product'  element={<AddProduct allproduct ={allproduct}/>}></Route>  
      <Route path='/filter/:id' element={<FilterProduct/>}></Route>
      <Route path='/view/:id' element={<ViewProduct cartItems={cartItems} allproduct={allproduct}/>}></Route>
      <Route path='/updateproduct/:id' element={<UpdateProduct/>}></Route>
      <Route path='/cart' element={<Cart cartitem={cartitem} cartItems={cartItems}/>}></Route>
      <Route path='/order' element={<Order/>}></Route>
      <Route path='/vieworder' element={<ViewOrder/>}></Route>
      <Route path='/category' element={<Category/>}></Route>
      <Route path='/search' element={<SearchProduct/>}></Route>
      <Route path='/bannerproduct' element={<BannerProduct/>}></Route>
      <Route path='/orderresult' element={<OrderResult/>}></Route>
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
