import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export const ViewOrder = () => {


    const jwt =useSelector((state)=>state.jwt.jwtToken);


    const [orders,setOrdes]=useState([]);

    useEffect(()=>{
    fetchOrders()
    },[])


    const fetchOrders=()=>{

        if(jwt.jwt!=null){

        axios.get('http://localhost:8080/api/order/orders',{
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
        axios.delete(`http://localhost:8080/api/order/${id}`)
        .then((res)=>{
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
        <h1 className='text-center text-xl'>Order</h1>
        {orders.map((order) =>
        order.orderItem.map((prod,index) => (
            <div className='flex justify-center sm:w-[90%] gap-2 md:gap-10 bg-slate-300 p-2 rounded-md' key={index}>
            <img src={`https://drive.google.com/thumbnail?id=${imageUrl(`${prod.product.productImg}`)}`} alt='google drive img loading' className='h-15 w-15 '/>
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
