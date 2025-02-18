import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { ToastContainer, Zoom, toast } from 'react-toastify';

export const ViewOrder = () => {

    const baseUrl=import.meta.env.VITE_BASE_URL;

    const jwt =useSelector((state)=>state.jwt.jwtToken);


    const [orders,setOrdes]=useState([]);

    useEffect(()=>{
    fetchOrders()
    },[])


    const fetchOrders=()=>{

        if(jwt.jwt!=null){

        axios.get(`${baseUrl}/api/order/orders`,{
            headers:{
                Authorization: `Bearer ${jwt.jwt}`
            }
        })
        .then((res)=>{
            setOrdes(res.data);
        })
        .catch((err)=>{

            console.log(err);
        })
    }
    }

    const delteOrderApi=(id)=>{
        axios.delete(`${baseUrl}/api/order/${id}`)
        .then((res)=>{
            toast.success("Item Cancel Successfully")
            fetchOrders()
        })
        .catch((err)=>{
            console.log(err);
        })
    }
        
    const deltedOrder=(id)=>{
        delteOrderApi(id);
    }
    

    const imageUrl=(url)=>{
        const newUrl=url.split("/");
        return newUrl[5];
    }

  return (
    <div className={`flex flex-col gap-7 pt-10 px-5 items-center bg-slate-200 ${orders.length >3 ?'':'h-screen'}`}>

        <ToastContainer position={'top-center'} closeButton={false} hideProgressBar={true} closeOnClick={true} autoClose={1500} pauseOnHover={true} draggable={true} transition={Zoom} toastStyle={{backgroundColor:'#45556c  ',color:'white'}}/>

        <h1 className='text-center text-xl'>Order</h1>
        {orders.map((order) =>
        order.orderItem.map((prod,index) => (
            <div className='flex justify-center sm:w-[90%] gap-2 md:gap-10 bg-slate-300 p-2 rounded-md' key={index}>
            <img src={prod.product.productImg} alt='google drive img loading' className='h-15 w-15 '/>
            <div>
            <p>{prod.product.productName}</p>
            <p>${prod.orderItemTotal}</p>
            </div>
            <p>{prod.quantity}</p>
            <p>{order.orderStatus}</p>
            <div className='space-y-2'>
            <p>Order On {order.createdDate}</p>
            <p>Delivery On {order.deliveryDate}</p>
            </div>
            <button onClick={()=>{deltedOrder(order.id)}} className='bg-slate-500 rounded-lg text-white px-1 hover:bg-slate-700 h-fit p-1'>Cancel</button>
            </div>
        ))
    )}
    </div>
  )
}
