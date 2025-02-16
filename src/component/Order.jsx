import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { MdOutlineAccountCircle } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import { SlCheck } from "react-icons/sl";
import { CiCreditCard1 } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { IoLocationOutline } from "react-icons/io5";

export const Order = () => {

const baseUrl=import.meta.env.VITE_BASE_URL;

const jwt =useSelector((state)=>state.jwt.jwtToken);

const[cartitem,setCartItems]=useState([])

const [userinfo,setUserInfo] = useState({})

const[cartItem,setCartItem]=useState({ //for cart update
    id:null,
    quantity:1
  })
  
  
  const[removeCartItemId,setRemoveCartItem]=useState(null);

  const[deleteMsg,setDeleteMsg]=useState('')

  const[cart , setCart]=useState({});

  const viewOrder=useNavigate();


        useEffect(()=>{
          userInfo();
          cardPriceDetais();
          fetchAllItem();
          updatingCart();
          removeOrderItem()
        },[])

        const userInfo=()=>{
          if(jwt.message ==='Login successfully'){
            axios.get(`${baseUrl}/userinfo`,{
                headers:{
                    Authorization: `Bearer ${jwt.jwt}`
                }
            })
            .then((res)=>{
                setUserInfo(res.data)
            })
            .catch((err)=>{
                console.log(err);  
            })
        }
        }
            
        

  //cart price details
  const cardPriceDetais=()=>{
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
  const fetchAllItem=()=>{
    if(jwt.message ==='Login successfully'){
      axios.get(`${baseUrl}/api/cart/getcartitem`,{
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
    
  


  // updating cart
const updatingCart=(c)=>{
  if(c){
    axios.put(`${baseUrl}/api/cart/update`,c,{
     headers:{
       Authorization: `Bearer ${jwt.jwt}` 
     }
   })
   .then((res)=>{
    fetchAllItem()
    cardPriceDetais()

   })
   .catch((err)=>{
     console.log(err);
   })
   }
}
    
  

  const handelAddQuantity=(cartItemid,quan)=>{   ///working

    if(quan >= 1){
      
    const cartItem={id:cartItemid,quantity:quan + 1}
    updatingCart(cartItem) 
    }
  
  }
  
  const handelReducedQuantity=(cartItemid,quan)=>{
    if(quan >= 2){
  
    const cartItem={id:cartItemid,quantity: quan - 1}
    updatingCart(cartItem);
    }
  }


//remove item form the cart
const removeOrderItem=(id)=>{
  if(id){
    axios.delete(`${baseUrl}/api/cart/deletecartitem/${id}`,{
      headers:{
        Authorization: `Bearer ${jwt.jwt}` 
      }
    })
    .then((res)=>{
      deleteMsgPopup(res.data);
      fetchAllItem();
      cardPriceDetais();
    })
    .catch((err)=>{
      console.log(err);
    })
  }
}
    
  
  const handelRemoveCartItem=(cartItemId)=>{ 
    removeOrderItem(cartItemId)
  }

  const deleteMess=useRef();
  
  const deleteMsgPopup=(msg)=>{
    setDeleteMsg(msg);
    deleteMess.current.style.top='20px'
    setTimeout(()=>{
      deleteMess.current.style.top='-1000px'
    },2000)
  }
  
  const [address,setAddress] = useState({
    city:'',
    street:'',
    pincode:0,
    state:'',
    country:'',
    mobile:0
  })

  const handelAddressEvent=(e)=>{
    const {name,value} = e.target
    setAddress((preAddress)=>({
      ...preAddress,
      [name]:value
    }));
  }

  const handelAddressFrom=(e)=>{
    e.preventDefault(); 

    console.log(address);
  }

  
  const orderApi=()=>{
    axios.post(`${baseUrl}/api/order/placeorder`,{address},{
      headers:{
        Authorization: `Bearer ${jwt.jwt}`
      }
    })
    .then((res)=>{
      viewOrder('/vieworder')
    })
    .catch((err)=>{
      console.log(err);
      
    })
  }

  // const [creditCart,setCreditCard]=useState({
  //   cartNo:'',
  //   holderName:"",
  //   cvvPin:null
  // })

  // const handelCardEvent=(e)=>{
  //   const {name,value} = e.target
  //   setCreditCard((preCard)=>({
  //     ...preCard,
  //     [name]:value
  //   }));
  // }

  const [paymentMode,setPaymenMode]=useState('')

  const handelPayment=(e)=>{
    setPaymenMode(e.target.value)
    
  }

  const handelPaymentMode=(e)=>{
    e.preventDefault();
    console.log('payment selected');
  }

 

  const imageUrl=(url)=>{
    const newUrl=url.split("/");
    return newUrl[5];
}

const[orderMsg,setOrderMsg]=useState('');

const[handelOrderNoti,setOrderNoti]=useState(false)

const Onot=()=>{
  setOrderNoti(true)
      setTimeout(()=>{
        setOrderNoti(false)
      },1000)
}
  const handelPlaceOrder=()=>{

    if(address.city.length > 0 &&
       address.street.length > 0 &&
       address.pincode &&
       address.country.length > 0 && paymentMode !=''){
      setAddress({
    city:'',
    street:'',
    pincode:0,
    state:'',
    country:'',
    mobile:0
      })
      orderApi()
      setOrderMsg("Order Placed Successfully")
      Onot()
    }
    else{
      setOrderMsg("Order Not Placed")
      Onot()  
    }

  }

  

  return (
    <div className=''>

      {
        handelOrderNoti ?
        <div className='mt-5 relative'>
          <p className='absolute left-[42%] shadow-2xl text-center bg-slate-300 w-fit p-1 px-10 rounded-lg'>{orderMsg}</p>
        </div>
        :<></>
      }
      
        <h1 className=' mt-5 sm:mt-8 text-center text-xl'>Order Summary</h1>
    
        <section className='max-sm:flex-col flex p-1 gap-10 mt-10 px-3 sm:px-10'>

        <div className='w-full'>

        {/* account details */}
        <div className='bg-slate-300 rounded pl relative p-1 px-5 shadow-2xl'>
        <p className='text-slate-500 inline'>Login</p> <FcApproval className='inline right-5 top-4'/>
        <div className='flex gap-10 mt-1'>
        <MdOutlineAccountCircle className='h-10 w-10 fill-slate-700 mt-1' />
        <div>
        <p className='tracking-normal text-slate-500'>{userinfo.fullName}</p>
        <p className='text-slate-700'>{userinfo.email}</p>
        </div>
        </div>
        
        </div>


            {/*Address Details  */}
        <div className='mt-8  bg-slate-200 px-5 rounded shadow-2xl'>

        <p className='text-start inline-block text-slate-800 pt-2'>Delivery Address</p> <IoLocationOutline className={`${address ?"inline":"hidden"} text-slate-800`}/>

        <form onSubmit={handelAddressFrom} className='flex flex-col justify-center items-center  p-2  gap-5'>
            <input type="text" name='city' value={address.city} placeholder='Enter city' className='w-full pl-5 p-1 outline-none ring ring-blue-300 hover:ring-2 rounded ' required onChange={handelAddressEvent}/>
            <input type="text" name='street' value={address.street} placeholder='Enter Street' className='w-full pl-5 p-1 outline-none ring ring-blue-300 hover:ring-2 rounded ' required onChange={handelAddressEvent}/>
            <input type="number" name='pincode' value={address.pincode} placeholder='Enter pincode' className='w-full pl-5 p-1 outline-none ring ring-blue-300 hover:ring-2 rounded ' required onChange={handelAddressEvent}/>
            <input type="text" name='state' value={address.state} placeholder='Enter State' className='w-full pl-5 p-1 outline-none ring ring-blue-300 hover:ring-2 rounded ' required onChange={handelAddressEvent}/>
            <input type="text"name='country' value={address.country} placeholder='Enter Country' className='w-full pl-5 p-1 outline-none ring ring-blue-300 hover:ring-2 rounded ' required onChange={handelAddressEvent}/>
            <input type="text" name='mobile' value={address.mobile} placeholder='Enter mobile no' className='w-full pl-5 p-1 outline-none ring ring-blue-300 hover:ring-2 rounded ' required onChange={handelAddressEvent}/>
        </form>

        </div>


        {/* Cart Item */}

        <div className='flex flex-col gap-5 mt-4 shadow-2xl'>
          <div className='absolute top-[-1000px] left-[45%] p-1 bg-slate-300 rounded-lg duration-75' ref={deleteMess} >
                  <p className=''>{deleteMsg}<SlCheck className='inline text-green-400 h-5 w-5'/></p>
            </div>

        <h1 className='text-center text-2xl'>products</h1>
        {
          cartitem.map((item,index)=>(

            <div className='flex  gap-4 rounded-md bg-slate-300 shadow-md hover:shadow-2xl' key={index}>

              <div className='flex justify-center items-center' onClick={()=>{handelImg(item.product.id)}}>
              <img src={item.product ? `https://drive.google.com/thumbnail?id=${imageUrl(item.product.productImg)}` :'https://images.app.goo.gl/TDXnWh18KyRJhhzj9'} alt="" className=' w-24 p-1 cursor-pointer' />
              </div>

              <div className='flex-col gap-5 md:gap-10 p-2 items-center'>
                <div>
                <p className='my-2'>{item.product ? item.product.productName :''}</p>
              </div>

                <div className='flex flex-row gap-5 mb-2'>

                <p className='font-bold'>${item.cartItemTotal}</p>

                <p className=''>

                <button onClick={()=>{handelAddQuantity(item.id ,item.quantity)}} className='bg-slate-400 rounded py-[1px] px-[4px] font-bold hover:bg-slate-600'>+</button> 
                
                {item.quantity}  
                
                <button onClick={()=>{handelReducedQuantity(item.id,item.quantity)}} className='bg-slate-400 rounded py-[1px] px-[6px] font-bold hover:bg-slate-600'>-</button>

                </p>

                </div>

                <button onClick={()=>handelRemoveCartItem(item.id)} className='w-fit rounded h-fit bg-slate-400 hover:bg-slate-600 px-1 text-slate-800'>Remove</button>
              </div>
            </div>
          ))
        }

      </div>

      {/* payment method */}

      <section className='bg-slate-300 mt-10 rounded-md p-2'>

      <form onSubmit={handelPaymentMode}>
        <h1 className='text-slate-500 pb-4 inline-block'>Payment details</h1> <FcApproval className='inline right-5 top-4'/>

        <div className='mb-2'>
        <label htmlFor="" className='pr-2 text-slate-800'>Cash on delivery</label>
        <input name='radio' type="radio" value='CashOnDelivery' onChange={handelPayment} required/>
        </div>


        <div className=''>
        <label htmlFor="" className='mr-3 text-slate-800'>Card</label>
        <input name='radio' type="radio" value="Card" onChange={handelPayment} required/>
        </div>
        </form>

        <div>
          <form action="text-slate-400" className='text-slate-700 '>
            <div className='relative flex gap-5 mb-3 max-sm:flex-col'>
            <input type="number" placeholder='Enter Card Number' className='mt-2 pl-5 p-1 outline-none ring bg-blue-100 ring-blue-300 hover:ring-2 rounded '/>
            <input type="text" placeholder='Enter CardHolder name' className=' pl-5 p-1 outline-none ring bg-blue-100 ring-blue-300 hover:ring-2 rounded '/>
            <CiCreditCard1 className='absolute left-45 top-2 h-5 w-5 max-sm:left-80 mt-1' />
            </div>
            <div className='flex gap-5'>
            <input type="number" placeholder='Enter Cvv' className=' pl-5 p-1 outline-none ring bg-blue-100 ring-blue-300 hover:ring-2 rounded '/>
            <button className='bg-green-400 rounded p-1 hover:bg-green-600'>Pay now</button>
            </div>
          </form>
        </div>

      </section>

        </div>


        <div className='mt-5 w-80 max-sm:w-full '>
        {
        <div className='p-1 rounded-md bg-slate-200 shadow-xl py-7 px-5'>
        <h1 className='text-center font-bold'>Price details</h1>
        <p className='mt-5'><span className='font-bold'>Total Amount : $</span> {cart.cartTotal}</p>
        <button onClick={()=>handelPlaceOrder()} className='p-1 mt-2 rounded-sm bg-slate-500 hover:bg-slate-900 cursor-pointer text-white '>Place Order</button>
        </div>
        }
        </div>


        </section>

    </div>
  )
}
