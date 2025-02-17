import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setCartTotal } from '../slices/CartItemTotal';
import { SlCheck } from "react-icons/sl";
import { ToastContainer, Zoom, toast } from 'react-toastify';

export const Cart = () => {

  const baseUrl=import.meta.env.VITE_BASE_URL;

  const jwt =useSelector((state)=>state.jwt.jwtToken);
  
  const[cart , setCart]=useState({});

  const[cartitem,setCartItems]=useState([])

  const[cartItem,setCartItem]=useState({ //for cart update
    id:null,
    quantity:1
  })

  const cartItemTotal = useDispatch()

  const viewNav=useNavigate();

  const cartNav = useNavigate();

  const[deleteMsg,setDeleteMsg]=useState('')



  useEffect(()=>{
    cartPrice()
    cartItems()
    cartItemTotal(setCartTotal(cartitem.length))
    removeCartItem()
  },[])

  useEffect(()=>{
    cartItemTotal(setCartTotal(cartitem.length))
  },[cartitem,jwt,cart])

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


//getting all the item in cart
  const cartItems=()=>{

    if(jwt.message ==='Login successfully'){
      
    axios.get(`${baseUrl}/api/cart/getcartitem`,{
      headers:{
        Authorization: `Bearer ${jwt.jwt}`
      }
    })
    .then((res)=>{
      setCartItems(res.data)
      cartItemTotal(setCartTotal(cartitem.length))
    })
    .catch((err)=>{
      console.log(err); 
    })
  }

  }


const imageUrl=(url)=>{
  const newUrl=url.split("/"); 
  return newUrl[5].toString();
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
    .then((res)=>{
      toast.success("Item Removed successfully")
      cartItems()
      cartPrice()
      cartItemTotal(setCartTotal(cartitem.length))
      
    })
    .catch((err)=>{
      console.log(err);
    })

  }
}
 
const handelRemoveCartItem=(cartItemId)=>{
  removeCartItem(cartItemId);
}

const deleteMess=useRef();

const deleteMsgPopup=(msg)=>{
  setDeleteMsg(msg);
  deleteMess.current.style.top='20px'
  setTimeout(()=>{
    deleteMess.current.style.top='-1000px'
  },2000)
}




// updating cart

const updateCart=(c)=>{
  if(c.id != null){

   axios.put(`${baseUrl}/api/cart/update`,c,{
    headers:{
      Authorization: `Bearer ${jwt.jwt}` 
    }
  })
  .then((res)=>{
    
    cartItems();
    cartPrice();
    cartItemTotal(setCartTotal(cartitem.length))

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
    toast.success("Quantity Increased")
  }
};

const handleReduceQuantity = (cartItemId, quantity) => {
  if (quantity >= 2) {
    const updatedCartItem = { id: cartItemId, quantity: quantity - 1 };
    updateCart(updatedCartItem); // Directly pass the updated object
    toast.success("Quantity Decreased")
  }
};

const orderNav=useNavigate()
const handelCartPlaceOrder=()=>{
  orderNav('/order')
}
  
  return (
    <div className={`px-2 md:px-10 bg-slate-200 relative ${cartitem.length >3 ? '':'h-screen'} `}>

      <ToastContainer position={'top-center'} closeOnClick={true} autoClose={1500} pauseOnHover={true} draggable={true} transition={Zoom} toastStyle={{backgroundColor:'#45556c  ',color:'white'}}/>
      

      <div className='absolute top-[-1000px] left-[25%] p-1 bg-slate-300 rounded-lg duration-75' ref={deleteMess} >
        <p className=''>{deleteMsg}<SlCheck className='inline text-green-400 h-5 w-5'/></p>
      </div>
      
      <div className='flex flex-col items-center md:items-start md:flex-row  justify-between gap-5 pt-5 pb-5 h-full'>

      <div className='flex flex-col gap-5 w-full sm:w-[60%] md:ml-20 overflow-y-scroll scroll-smooth'>

        <h1 className='text-center text-2xl'>Cart Item</h1>
        
        {
          cartitem.map((item,index)=>(    

            <div className='flex gap-8 md:gap-10 rounded-md bg-slate-300 shadow-md hover:shadow-2xl' key={index}>

              <div className='flex justify-center items-center' onClick={()=>{handelImg(item.product.id)}}>
              <img src={item.product ? `${item.product.productImg}` :'https://images.app.goo.gl/TDXnWh18KyRJhhzj9'} alt="" className='w-28 md:w-30 h-30 p-1 cursor-pointer' />
              </div>

              <div className='flex flex-col gap-1 p-2'>
                <p className=''>{item.product ? item.product.productName :''}</p>
                <div className='flex gap-4'>
                <p className='font-bold'>₹{item.cartItemTotal}</p>

                <span>

                <button onClick={()=>handleAddQuantity(item.id ,item.quantity)} className='bg-slate-400 rounded py-[1px] px-[4px] font-bold hover:bg-slate-600'>+</button> 
                
                <span className='px-1'>{item.quantity}</span>
                
                <button onClick={()=>handleReduceQuantity(item.id,item.quantity)} className='bg-slate-400 rounded py-[1px] px-[6px] font-bold hover:bg-slate-600'>-</button>

                </span>
                </div>

                <button onClick={()=>handelRemoveCartItem(item.id)} className='w-fit rounded my-2 bg-slate-400 hover:bg-slate-600 p-1 text-slate-800'>Remove</button>
              </div>
            </div>
          ))
        }

      </div>

      <div className='mt-10 mr-10 w-full md:w-fit'>   {/**cart Price */}
        {
        <div className=' p-1 rounded-md bg-slate-200 shadow-2xl px-7 py-7'>
        <h1 className='text-center font-bold'>Price details</h1>
        <p className='mt-5'><span className='font-bold'>Total Amount : ₹</span> {cart.cartTotal}</p>
        <button onClick={handelCartPlaceOrder} className='p-1 mt-2 rounded-sm bg-slate-500 hover:bg-slate-700 text-white '>Place Order</button>
        </div>
        }
        </div>

      </div>

    </div>
  )
}
