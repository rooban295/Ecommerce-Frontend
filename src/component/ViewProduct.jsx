import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { message,Popconfirm,Button} from 'antd';



export const ViewProduct = ({cartItems,allproduct}) => {

    const baseUrl=import.meta.env.VITE_BASE_URL;

    const jwt = useSelector((state)=>state.jwt.jwtToken)

    const admin=useSelector((state)=>state.admin.admin);

    const updateProduct=useNavigate()

    const home=useNavigate();

    const {id}=useParams();

    const[product,setProduct]=useState({});

    const [messageApi, contextHolder] = message.useMessage();

    

    const productById=(id)=>{
        axios.get(`${baseUrl}/api/product/${id}`)
        .then((res)=>{ 
            setProduct(res.data);   
        })
        .catch((err)=>{
            console.log(err);  
        })
    }

    useEffect(()=>{
        if(id){
            productById(id);
        }
    },[id])


    const handelUpdateButton =(productId)=>{
        updateProduct(`/updateproduct/${id}`)
    }

    const deleteProductRequest=async(productId)=>{         
        await axios.delete(`${baseUrl}/api/product/${productId}`)
        .then((res)=>{
            messageApi.open({ type: 'success', content: "Product Deleted Successfully", className:'mt-11 text-green-500'});
            allproduct()
            console.log(typeof allproduct); 
            setTimeout(()=>{
            home('/')
            },2000)
        })
        .catch((err)=>{
            console.log(err);     
        })
    }

    const [pop,setPop]=useState(false);


    const[cartitem ,setcartItem]=useState({
        productId:null,
        quantity:1
    })

    useEffect(()=>{
        addToCart()
    },[cartitem])

    const handelCartButton=(id)=>{
        setcartItem({...cartitem,productId:id})    
    }

    const addToCart=()=>{
        
        if(cartitem.productId != null){ 
            
        axios.post(`${baseUrl}/api/cart/addtocart`,cartitem,{
            headers:{
                Authorization:`Bearer ${jwt.jwt}`
            }
        })
        .then((res)=>{
        messageApi.open({ type: 'success', content: "Item Added to cart", className:'mt-11 text-green-500'});
        cartItems()
        })
        .catch((err)=>{
            console.log(err);    
        })
    }
    }

    const confirm = (proId) => {       
        deleteProductRequest(proId)
      };
      const cancel = (e) => {
        messageApi.open({ type: 'error', content: "Click on No", className:'mt-11 text-red-500'});
      };
    

  return (
    <div  className={`relative sm:h-screen`}>

        {contextHolder}
       
        <h1 className='text-center text-2xl pt-10 font-bold'>View Product</h1>
            {
        <div className={`mt-10 flex flex-col sm:flex-row w-[90%] py-10 items-center justify-center gap-10 mx-auto rounded-xl shadow-xl inset-shadow-sm p-2 mb-10 ${pop?'blur-xl':''}`}>
            
            <img src={product.productImg} alt='google drive img' className=''/>

               <div className='text-xl flex flex-col gap-5 p-3'>
               <h1 className='text-xl'><span className=''></span>{product.productName}</h1>
               <p className='text-sm'>{product.description}</p>
               <p><span className='font-bold'>price </span> ₹{product.productPrice}</p>


               <div className='flex gap-2 text-white'>
               <button onClick={()=>handelCartButton(product.id)} className='rounded-md p-1 bg-green-500 hover:bg-green-700  text-sm  md:text-md'>Add To Cart</button>
               <div className={`${admin ? '':'hidden'} flex gap-2`}>
               <button onClick={()=>{handelUpdateButton(product.id)}} className='rounded-md p-1 text-blue-500 border border-blue-500 text-sm md:text-md'>Update Product</button>
               <Popconfirm placement="topLeft" title="Delete the task" description="Are you sure to delete this task?" onConfirm={()=>confirm(product.id)} onCancel={cancel} okText="Yes" cancelText="No">
                <Button danger>Delete</Button>
                </Popconfirm>
               </div>

               </div>

               </div>
        </div>
            }
    </div>
  )
}
