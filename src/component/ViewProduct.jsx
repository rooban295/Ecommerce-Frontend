import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

export const ViewProduct = ({productId}) => {

    const jwt = useSelector((state)=>state.jwt.jwtToken)
    const admin=useSelector((state)=>state.admin.admin);
    const cartNav=useNavigate()
    const updateProduct=useNavigate()
    const cart=useNavigate();
    const home=useNavigate();
    const {id}=useParams();
    const[product,setProduct]=useState({});
    const deletePopup=useRef();
    

    const productById=(id)=>{
        axios.get(`http://localhost:8080/api/product/${id}`)
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

    const deleteProductRequest=async(id)=>{        
        
        await axios.delete(`http://localhost:8080/api/product/${id}`)
        .then((res)=>{
            home('/')
        })
        .catch((err)=>{
            console.log(err);     
        })
    }

    const [pop,setPop]=useState(false);

    const handelDeleteButton =()=>{
        setPop(!pop);
    }

    const imageUrl = (url) => {
        if (!url || typeof url !== "string") {
            return ""; 
        }
        const newUrl = url.split("/"); 
        
        return newUrl[5] || "";
    };

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
            
        axios.post('http://localhost:8080/api/cart/addtocart',cartitem,{
            headers:{
                Authorization:`Bearer ${jwt.jwt}`
            }
        })
        .then((res)=>{
            cartNav('/cart') 
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }
    }
    

  return (
    <div  className={`relative sm:h-screen bg-slate-200 `}>

        <div ref={deletePopup} className={`absolute h-[200px] z-10 p-2 top-[100px] left-[10px] sm:left-[180px] md:left-[350px] lg:left-[600px] 2xl:left-[40%] bg-slate-300 shadow-2xl  blur-none rounded-lg ${pop ?'bolck':'hidden'}`}>
            <p className='pt-10'>Are you sure do you want to delete this product?</p>
            <div className='flex gap-4 justify-center mt-5'>
                <button onClick={()=>{deleteProductRequest(product.id)}} className='bg-green-500 hover:bg-green-600 px-3 rounded'>Yes</button>
                <button onClick={()=>{handelDeleteButton()}} className='bg-red-500 hover:bg-red-600 px-3 rounded'>NO</button>
            </div>
        </div>

        <h1 className='text-center text-2xl pt-10 font-bold'>View Product</h1>
            {
        <div className={`mt-10 flex flex-col sm:flex-row w-[90%] py-10 items-center justify-center gap-10  bg-slate-300  mx-auto rounded-xl shadow-xl p-2 mb-10 ${pop?'blur-xl':''}`}>
            
            <img src={`https://drive.google.com/thumbnail?id=${imageUrl(`${product.productImg}`)}`} alt='google drive img' className=''/>

               <div className='text-xl flex flex-col gap-5 p-3'>
               <h1 className='text-xl'><span className=''></span>{product.productName}</h1>
               <p className='text-sm'>{product.description}</p>
               <p><span className='font-bold'>price </span> ${product.productPrice}</p>


               <div className='flex gap-2 text-white'>
               <button onClick={()=>handelCartButton(product.id)} className='rounded-md p-1 bg-green-500 hover:bg-green-700  text-sm  md:text-md'>Add To Cart</button>
               <div className={`${admin ? '':'hidden'} flex gap-2`}>
               <button onClick={()=>{handelUpdateButton(product.id)}} className='rounded-md p-1 bg-blue-500 hover:bg-blue-700 text-sm md:text-md'>Update Product</button>
               <button onClick={()=>{handelDeleteButton()}} className='rounded-md p-1 bg-neutral-500 hover:bg-neutral-700 text-sm md:text-md'>Delete Product</button>
               </div>

               </div>

               </div>
        </div>
            }
        <div>
        </div>
    </div>
  )
}
