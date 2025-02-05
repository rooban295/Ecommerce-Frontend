import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setCategoryId } from '../slices/CategorySlices';



export const FilterProduct = () => {
    
    const categorydispatch = useDispatch();

    const[category,setCategory]=useState([]);

    const allCategory=()=>{
        axios.get('http://localhost:8080/category')
        .then((res)=>{
            setCategory(res.data);
        })
    }
    
    useEffect(()=>{
        allCategory();
    },[])


  const [categoryValue,setCategoryValue]=useState(0);


  const handelCategory=(e)=>{
      setCategoryValue(e.target.value)
      allCategory();  
  }

  useEffect(()=>{
    categorydispatch(setCategoryId(categoryValue));
  },[categoryValue])

  
  return (
    <div>
         <select className='outline-none text-slate-800 hover:text-lg' value={categoryValue} onChange={handelCategory}>
            <option value={0} >Select the Category</option>
            <option value={0}>All Category</option>
                {
                    category.map((item)=>(
                        <option value={item.id} key={item.id}>{item.categoryName}</option>
                    ))
                    
                }
            </select>
    </div>
  )
}
