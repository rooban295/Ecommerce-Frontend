import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { RiCloseLargeFill } from "react-icons/ri";

export const Category = () => {

const [allCategory,setAllCategory]=useState([]);

const [addCat,setAddCategory]=useState({
    categoryName:''
})

useEffect(() => {
    fetchCategories();
  }, []);


const fetchCategories=()=>{
    axios.get('http://localhost:8080/category')
    .then((res)=>{
        setAllCategory(res.data)
    })
    .catch((err)=>{
        console.log(err);
        
    })
}


const addCategory= async ()=>{
   await axios.post(`http://localhost:8080/category/add`,addCat)
   .then((res)=>{
     setAllCategory(allCategory) 
     fetchCategories();    
   })
   .catch((err)=>{
       console.log(err);
       
   })
}

const [updateCategory,setUpdateCategory]=useState({
    id:null,
    categoryName:''
})

const handelUpdateInput=(e)=>{
    const{name,value}=e.target
    setUpdateCategory({...updateCategory,[name]:value})
}

const updateApi=()=>{ 
    axios.put(`http://localhost:8080/category/update/${updateCategory.id}`,updateCategory)
   .then((res)=>{
       updatePopup.current.style.top='-1000px'
       fetchCategories()
   })
   .catch((err)=>{
       console.log(err);
       
   })
}

const getCategoryApi= async (id)=>{
    await axios.get(`http://localhost:8080/category/${id}`)
   .then((res)=>{
    setUpdateCategory(res.data)
   })
   .catch((err)=>{
       console.log(err);
       
   })
}



const deleteApi= async (id)=>{
   await axios.delete(`http://localhost:8080/category/${id}`)
   .then((res)=> {
    fetchCategories()
    } )
   .catch((err)=>{
       console.log(err);
       
   })
}


const handelInput=(e)=>{
    const{name,value}=e.target
    setAddCategory({ [name] : value })
}

const handelAddCategory=(e)=>{
    e.preventDefault();
    fetchCategories();
    addCategory()
}
const updatePopup = useRef();

const handelUpdateBtn=(id)=>{
    getCategoryApi(id)
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

        <div ref={updatePopup} className='absolute bg-slate-300 top-[-1000px] left-[10%] rounded-lg w-[80%] h-[200px] duration-300'>
            <form onSubmit={handelUpdate} className='flex flex-col gap-5 p-2'>
                <div className='mt-10'>
                <label htmlFor="" className='text-slate-700'>Category Name</label>
                <input type="text" name='categoryName' value={updateCategory.categoryName} onChange={handelUpdateInput} className='p-1  pl-2 mt-2 outline-none border-none ring ring-blue-500 hover:ring-2 rounded-lg w-full'/>
                </div>
                <button className='bg-slate-400 hover:bg-slate-600 w-fit p-1 rounded-lg'>Update</button>
            </form>
            <RiCloseLargeFill className='absolute top-3 right-4 h-5 w-5 hover:h-7 hover:w-7 animate-bounce' onClick={()=>updatePopup.current.style.top='-1000px'}/>
        </div>



        <div onSubmit={handelAddCategory} className='p-2 flex justify-end mt-10'>
            <form className='flex gap-2 items-center'>
            <input type="text" required className='outline-none p-1 ring ring-blue-500 hover:ring-2 rounded' name='categoryName' value={addCat.categoryName} onChange={handelInput}/>
            <button type='submit' className='bg-slate-400 hover:bg-slate-500 w-fit p-1 rounded'>Add</button>
            </form>
        </div>

        <table className='w-full mx-auto bg-slate-300 rounded-lg shadow-xl'>
            <thead className='text-start'>
                <tr className=''>
                    <th className='uppercase text-slate-700'>Category Name</th>
                    <th className='uppercase text-slate-700'>Action</th>
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
