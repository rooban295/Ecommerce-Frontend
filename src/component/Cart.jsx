import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import {message} from 'antd';


export const Cart = ({cartitem,cartItems}) => {

  const baseUrl=import.meta.env.VITE_BASE_URL;

  const jwt =useSelector((state)=>state.jwt.jwtToken);
  
  const[cart , setCart]=useState({});

  const viewNav=useNavigate();

  const [messageApi, contextHolder] = message.useMessage();



  useEffect(()=>{
    cartPrice()
  },[])
  

  //cart price details
 const cartPrice=()=>{
    if(jwt.message ==='Login successfully'){
    axios.get(`${baseUrl}/api/cart`,{
      headers:{
        Authorization: `Bearer ${jwt.jwt}`
      }
    })
    .then((res)=>{
      setCart(res.data)
    })
    .catch((err)=>{
      console.log(err); 
    })
  }
  }



const handelImg=(productId)=>{
  viewNav(`/view/${productId}`)
}


//remove item form the cart
const removeCartItem=(id)=>{

  if(id != null){

    axios.delete(`${baseUrl}/api/cart/deletecartitem/${id}`,{
      headers:{
        Authorization: `Bearer ${jwt.jwt}` 
      }
    })
    .then(()=>{
      messageApi.open({type:'success',content:'Item Removed successfully', className:'text-green-500 mt-13'})
      cartPrice()  
      cartItems()
    })
    .catch((err)=>{
      console.log(err);
    })

  }
}
 
const handelRemoveCartItem=(cartItemId)=>{
  removeCartItem(cartItemId);
}




// updating cart

const updateCart=(c)=>{
  if(c.id != null){

   axios.put(`${baseUrl}/api/cart/update`,c,{
    headers:{
      Authorization: `Bearer ${jwt.jwt}` 
    }
  })
  .then(()=>{
    cartPrice();
    cartItems();
  })
  .catch((err)=>{
    console.log(err);
  })

  }
}
  


const handleAddQuantity = (cartItemId, quantity) => {
  if (quantity >= 1) {
    const updatedCartItem = { id: cartItemId, quantity: quantity + 1 };
    updateCart(updatedCartItem); // Directly pass the updated object
    messageApi.open({type:'success',content:'Quantity Increased', className:'text-green-500 mt-13'})

  }
};

const handleReduceQuantity = (cartItemId, quantity) => {
  if (quantity >= 2) {
    const updatedCartItem = { id: cartItemId, quantity: quantity - 1 };
    updateCart(updatedCartItem); // Directly pass the updated object
    messageApi.open({type:'success',content:'Quantity Decreased', className:'text-green-500 mt-13'})
  }
};

const orderNav=useNavigate()
const handelCartPlaceOrder=()=>{
  orderNav('/order')
}
  
  return (
    <div className={`px-2 md:px-10  relative ${cartitem.length >3 ? '':'h-screen'} `}>


      {contextHolder}

      <ToastContainer position={'top-center'} closeButton={false} hideProgressBar={true} closeOnClick={true} autoClose={1500} pauseOnHover={true} draggable={true} transition={Zoom} toastStyle={{backgroundColor:'#45556c  ',color:'white'}}/>
      
      
      <div className='flex flex-col items-center md:items-start md:flex-row  justify-between gap-5 pt-5 pb-5 h-full'>

      <div className='flex flex-col gap-7 w-full sm:w-[60%] md:ml-20 h-screen overflow-y-scroll scroll-smooth'>

        <h1 className='text-center text-2xl'>Cart Item</h1>
        {/* working */}
        {
          cartitem.map((item,index)=>(    

            <div className='flex gap-8 md:gap-10 rounded-md  shadow-md hover:shadow-xl' key={index}>

              <div className='flex justify-center items-center' onClick={()=>{handelImg(item.product.id)}}>
              <img src={item.product ? `${item.product.productImg}` :'https://images.app.goo.gl/TDXnWh18KyRJhhzj9'} alt="" className='w-28 md:w-30 h-30 p-1 cursor-pointer' />
              </div>

              <div className='flex flex-col gap-1 p-2'>
                <p className=''>{item.product ? item.product.productName :''}</p>
                <div className='flex gap-4'>
                <p className='font-bold'>₹{item.cartItemTotal}</p>

                <span>

                <button onClick={()=>handleAddQuantity(item.id ,item.quantity)} className='bg-blue-400 text-white rounded py-[1px] px-[4px] font-bold hover:bg-blue-600'>+</button> 
                
                <span className='px-1'>{item.quantity}</span>
                
                <button onClick={()=>handleReduceQuantity(item.id,item.quantity)} className='bg-blue-400 text-white rounded py-[1px] px-[6px] font-bold hover:bg-blue-600'>-</button>

                </span>
                </div>

                <button onClick={()=>handelRemoveCartItem(item.id)} className='w-fit rounded my-2 bg-blue-500 text-white hover:bg-blue-600 p-[1.5px] '>Remove</button>
              </div>
            </div>
          ))
        }

      </div>

      <div className='mt-10 mr-10 w-full md:w-fit'>   {/**cart Price */}
        {
        <div className=' p-1 rounded-md bg-white shadow-2xl px-7 py-7'>
        <h1 className='text-center font-bold'>Price details</h1>
        <p className='mt-5'><span className='font-bold'>Total Amount : ₹</span> {cart.cartTotal}</p>
        <button onClick={handelCartPlaceOrder} className='p-1 mt-2 rounded-sm bg-blue-500 hover:bg-blue-700 text-white '>Place Order</button>
        </div>
        }
        </div>

      </div>

    </div>
  )
}
