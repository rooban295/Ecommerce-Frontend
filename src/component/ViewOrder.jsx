import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { message,Popconfirm,Button} from 'antd';

export const ViewOrder = () => {

    const baseUrl=import.meta.env.VITE_BASE_URL;

    const jwt =useSelector((state)=>state.jwt.jwtToken);


    const [orders,setOrdes]=useState([]);

    useEffect(()=>{
    fetchOrders()
    },[])
    
    const [messageApi, contextHolder] = message.useMessage();


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
            messageApi.open({ type: 'success', content: "Item Cancel Successfully", className:'mt-11 text-green-500'});

            fetchOrders()
        })
        .catch((err)=>{
            console.log(err);
        })
    }
        
    const deltedOrder=(id)=>{
        delteOrderApi(id);
    }

      const cancel = (e) => {
        messageApi.open({ type: 'error', content: "Click on No", className:'mt-11 text-red-500'});
      };
    
    

  return (
    <div className={`flex flex-col gap-7 pt-10 px-5 items-center ${orders.length >= 2 ?'':'h-screen'}`}>

        {contextHolder}

        {/* <ToastContainer position={'top-center'} closeButton={false} hideProgressBar={true} closeOnClick={true} autoClose={1500} pauseOnHover={true} draggable={true} transition={Zoom} toastStyle={{backgroundColor:'#45556c  ',color:'white'}}/> */}

        <h1 className='text-center text-xl'>Order</h1>
        {orders.map((order) =>
        order.orderItem.map((prod,index) => (
            <div className='flex justify-center sm:w-[90%] gap-2 md:gap-10 bg-white shadow-2xl p-2 rounded-md' key={index}>
            <img src={prod.product.productImg} alt='google drive img loading' className='h-15 w-15 '/>
            <div>
            <p className='text-sm'>{prod.product.productName}</p>
            <p className='text-sm my-1'>${prod.orderItemTotal}</p>
            </div>
            <p>{prod.quantity}</p>
            <p className='text-sm'>{order.orderStatus}</p>
            <div className='space-y-2 text-sm'>
            <p>Order On {order.createdDate}</p>
            <p>Delivery On {order.deliveryDate}</p>
            </div>
            <Popconfirm placement="bottom" title="Delete the task" description="Are you sure to delete this task?" onConfirm={()=>{deltedOrder(order.id)}} onCancel={cancel} okText="Yes" cancelText="No">
            <Button danger>Cancel</Button>
            </Popconfirm>
            </div>
        ))
    )}
    </div>
  )
}
