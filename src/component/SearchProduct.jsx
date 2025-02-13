import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export const SearchProduct = () => {

  const jwt = useSelector((state)=>state.jwt.jwtToken)

  const cartNav =useNavigate();

  const navigate=useNavigate();

  const searchProduct=useSelector((state)=>state.search.searchProduct)

  const imageUrl=(url)=>{
    const newUrl=url.split("/"); 
    return newUrl[5].toString();
}

const handelProductClick=(id)=>{
  navigate(`/view/${id}`);
}


const[cartitem ,setcartItem]=useState({
  productId:null,
  quantity:1
 })
    
const handelCartButton=(id)=>{  
  const updateCartitems=({...cartitem,productId:id})
  setcartItem(updateCartitems)
  addToCart(updateCartitems)    
}

const addToCart=(cartitems)=>{
  
  if(cartitems.productId != null){ 
      
  axios.post('http://localhost:8080/api/cart/addtocart',cartitems,{
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
    <div className={`px-6 md:px-20 bg-slate-200 ${searchProduct.length > 0 ?'':'h-screen'}`}>

        <h1 className="text-3xl text-center pt-10">Search Result</h1>
        
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-20'>
        {
            searchProduct.map((item,index)=>(

                <div className='rounded-2xl shadow-xl hover:shadow-slate-400 bg-slate-300 mb-5 cursor-pointer' key={index}>
                <div  className=' mt-0 px-4 flex flex-col gap-5 items-center '>  
                    
                    <img onClick={()=>{handelProductClick(item.id)}} src={`https://drive.google.com/thumbnail?id=${imageUrl(item.productImg)}`} alt={item.name} className='mt-5 h-[180px] sm:h-[200px]'/>

                    <div className='flex flex-col gap-2 sm:gap-5 items-start '>
                    <h1 className='text-slate-700'>{item.productName}</h1>
                    <p className='text-justify'>{item.description}</p>
                    <h1 className='font-bold'><span>₹</span>{item.productPrice}</h1>
                    <button  className=' bg-slate-400 rounded-lg p-1 px-3 my-5 hover:bg-slate-600' onClick={()=>handelCartButton(item.id)}>Add to cart</button>
                    </div>
                </div>  
                </div>
            ))
        }
        
    </div>

    </div>
  )
}
