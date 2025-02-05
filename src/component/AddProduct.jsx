import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { GrView } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

export const AddProduct = () => {

    const msg=useRef(null);
    
    const home=useNavigate();

    const[product,setProduct]=useState({
        productName:'',
        description:'',
        productImg:'',
        productPrice:0,
        category:{
            id: 0
        }
    });


    const[AllCategoryList,setAllCategoryList]=useState([]);
    const allCategory=()=>{
        axios.get('http://localhost:8080/category')
        .then((res)=>{
            setAllCategoryList(res.data);
        })
    }
    useEffect(()=>{
        allCategory();
    },[])


    const handelInput=(e)=>{

        const { name , value } = e.target;
        
        if(name==='category'){

            setProduct({ ...product, category: { id: parseInt(value) } });
        }
        else{
            
            setProduct({...product , [name] : value} )
        }

    }
    
    //add Product
    const AddProduct=(product)=>{
        
        axios.post('http://localhost:8080/api/product/add',product)
        .then((res)=>{
            home('/')
        })
        .catch((err)=>{
            console.log(err);   
        })
    }

    const showNotification=()=>{
        if (msg.current) {
        msg.current.style.top='0px'
        setTimeout(()=>{
        msg.current.style.top='-1000px'  
        },1000)
    }
    }

    const handelsubmit=(e)=>{
        e.preventDefault(); 
        AddProduct(product)  
        showNotification();   
    }

    const imageUrl=(url)=>{
        const newUrl=url.split("/");
        return newUrl[5];
    }
    const[preview ,setPreview]=useState(false);

  return (
    
    <div className='flex flex-col items-center relative bg-slate-200'>

        <div ref={msg} className='absolute top-[-100px] duration-75'>
            <p className='flex justify-center items-center gap-2'>Data Added Successfully <IoCheckmarkCircleOutline  className='h-6 w-6 text-green-400 rounded-full'/></p>
        </div>

        <h1 className='my-2 text-2xl font-bold mt-5'>Add Product</h1>

        <form onSubmit={handelsubmit} className='flex flex-col gap-5 p-5 mt-5 w-[90%] md:w-[70%] rounded-lg shadow-2xl bg-slate-300 mb-10'>

            
            <div className='flex justify-between gap-4'>

            <div className='relative w-full'>
            <label htmlFor="productImg">Image url</label>
            <input type="url" name='productImg' onChange={handelInput} value={product.productImg}  className='mt-4 w-full outline-none ring-2 ring-slate-500 border-none p-2 rounded pl-4' placeholder='google drive Image link' required/>
            <GrView className='absolute right-4 top-13' onClick={()=>{setPreview(!preview)}}/>
            </div>

            <div className={`p-2 bg-neutral-200 rounded-2xl ${preview?'block':'hidden'}`}>
            <img src={`https://drive.google.com/thumbnail?id=${imageUrl(`${product.productImg}`)}`} alt='google drive img loading' className='mt-5 '/>
            </div>

            </div>

            <label htmlFor="productname">Product Name</label>
            <input type="text" name='productName' value={product.productName} onChange={handelInput} placeholder='Enter a Product name' className='outline-none ring-2 ring-slate-500 border-none p-2 rounded pl-4' required/>

            <label htmlFor="description">Product Description</label>
            <textarea rows="4" cols="50" name='description' value={product.description} onChange={handelInput} placeholder='Enter a Product description' className='outline-none ring-2 ring-slate-500 border-none p-2 rounded pl-4' required/>

            <label htmlFor="productPrice">Product Price</label>
            <input type="number" name='productPrice' value={product.productPrice} onChange={handelInput} className='outline-none ring-2 ring-slate-500 border-none p-2 rounded pl-4' required/>


            <label htmlFor="category">Category</label>
            <select name='category' value={product.category.id||""} onChange={handelInput} className='outline-none ring-2 ring-slate-500 border-none p-2 rounded pl-4' required>
                <option value="">Select the Category</option>
                {
                    AllCategoryList.map((item)=>(
                        <option value={item.id} key={item.id} className=''>{item.categoryName}</option>
                    ))
                }
            </select>
        
            <button className='border p-2 rounded-lg w-fit mx-auto bg-slate-600 hover:bg-slate-800 text-white' type='submit'>Add Product</button>
        </form>

    </div>
  )
}
