import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { RiCloseLargeFill } from "react-icons/ri";

export const Category = () => {

const baseUrl=import.meta.env.VITE_BASE_URL;

const [allCategory,setAllCategory]=useState([]);

const [addCat,setAddCategory]=useState({
    categoryName:'',
    categoryImageUrl:'',
    bannerImageUrl:''
})

useEffect(() => {
    fetchCategories();
  }, []);


const fetchCategories=()=>{
    axios.get(`${baseUrl}/category`)
    .then((res)=>{
        setAllCategory(res.data)
    })
    .catch((err)=>{
        console.log(err);
        
    })
}


const addCategory= async ()=>{
   await axios.post(`${baseUrl}/category/add`,addCat)
   .then((res)=>{
    updatePopup.current.style.top='-1000px'
     fetchCategories();    
   })
   .catch((err)=>{
       console.log(err);
       
   })
}

const [updateCategory,setUpdateCategory]=useState({
    id:null,
    categoryName:'',
    categoryImageUrl:'',
    bannerImageUrl:''
})

//workiing .....
const handelUpdateInput=(e)=>{
    const{name,value}=e.target
    setUpdateCategory({...updateCategory,[name]:value})
    setAddCategory({...addCat,[name]:value})
}

const updateApi=()=>{
    if(updateCategory.id){
    axios.put(`${baseUrl}/category/update/${updateCategory.id}`,updateCategory)
   .then((res)=>{
       updatePopup.current.style.top='-1000px'
       fetchCategories()
   })
   .catch((err)=>{
       console.log(err);
       
   })
}
}

const getCategoryApi= async (id)=>{
    await axios.get(`${baseUrl}/category/${id}`)
   .then((res)=>{
    setUpdateCategory(res.data)
   })
   .catch((err)=>{
       console.log(err);
       
   })
}



const deleteApi= async (id)=>{
   await axios.delete(`${baseUrl}/category/${id}`)
   .then((res)=> {
    fetchCategories()
    } )
   .catch((err)=>{
       console.log(err);
       
   })
}


// working.....
const handelAddCategory=()=>{
    addCategory()
    fetchCategories();
}
const updatePopup = useRef();

const handelUpdateBtn=(id)=>{
    if(id){
    getCategoryApi(id)
    }
    else{
    setUpdateCategory({
        id:null,
        categoryName:'',
        categoryImageUrl:'',
        bannerImageUrl:''})
    }
    updatePopup.current.style.top='40px'
}
const handelDeleteBtn=(id)=>{
    deleteApi(id)
    fetchCategories();
}

const handelUpdate=(e)=>{
    e.preventDefault()
    updateApi()    
}

  return (
    <div className='px-2 sm:px-10 h-screen bg-slate-200 relative'>
        <h1 className='text-center pt-10 text-2xl uppercase'>Category</h1>

        <div ref={updatePopup} className='absolute bg-slate-300 top-[-1000px] left-[10%] rounded-lg w-[80%]  duration-300'>
            <form onSubmit={handelUpdate} className='flex flex-col gap-5 p-2'>
                <div className='mt-10'>
                <label htmlFor="" className='text-slate-700'>Category Name</label>
                <input type="text" name='categoryName' value={updateCategory.categoryName} onChange={handelUpdateInput} className='p-1  pl-2 mt-2 outline-none border-none ring ring-blue-500 hover:ring-2 rounded-lg w-full'/>
                </div>
                <div className=''>
                <label htmlFor="" className='text-slate-700'>Category Image</label>
                <input type="text" name='categoryImageUrl' value={updateCategory.categoryImageUrl} onChange={handelUpdateInput} className='p-1  pl-2 mt-2 outline-none border-none ring ring-blue-500 hover:ring-2 rounded-lg w-full'/>
                </div>
                <div className=''>
                <label htmlFor="" className='text-slate-700'>Category Banner Image</label>
                <input type="text" name='bannerImageUrl' value={updateCategory.bannerImageUrl} onChange={handelUpdateInput} className='p-1  pl-2 mt-2 outline-none border-none ring ring-blue-500 hover:ring-2 rounded-lg w-full'/>
                </div>
                {
                    updateCategory.id==null?
                    <button type='button' onClick={()=>handelAddCategory()} className='bg-slate-400 hover:bg-slate-600 w-fit p-1 rounded-lg'>Add</button>
                    :    
                    <button type='submit' className='bg-slate-400 hover:bg-slate-600 w-fit p-1 rounded-lg'>Update</button>
                }
             </form>
            <RiCloseLargeFill className='absolute top-3 right-4 h-5 w-5 hover:h-7 hover:w-7 animate-bounce' onClick={()=>updatePopup.current.style.top='-1000px'}/>
        </div>


{/* working onSubmit={handelAddCategory}  */}
        <div className='p-2 flex justify-end mt-10'>
            <button type='submit'  onClick={()=>handelUpdateBtn()} className='bg-slate-400 hover:bg-slate-500 w-fit p-1 rounded text-white'>Add</button>
        </div>

        <table className='w-full mx-auto bg-slate-300 rounded-lg shadow-xl'>
            <thead className='text-start'>
                <tr className=''>
                    <th className='text-slate-700'>Category Name</th>
                    <th className='text-slate-700'>Action</th>
                </tr>
            </thead>

            <tbody className='text-center'>
                {
                    allCategory.map((item,index)=>(
                        <tr className='' key={index}>
                            <td className='py-2'>{item.categoryName} </td>
                            <td><button className='bg-blue-500 hover:bg-blue-700 rounded text-white px-1' onClick={()=>handelUpdateBtn(item.id)}>Update</button> <button onClick={()=>handelDeleteBtn(item.id)} className='bg-red-500 hover:bg-red-700 rounded text-white px-1'>Delete</button></td>
                        </tr>    
                    ))
                }
            </tbody>
        </table>
        
    </div>
  )
}
