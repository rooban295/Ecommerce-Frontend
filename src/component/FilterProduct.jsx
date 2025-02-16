import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setCategoryId } from '../slices/CategorySlices';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';




export const FilterProduct = () => {
    
    const baseUrl=import.meta.env.VITE_BASE_URL;
    
    const categorydispatch = useDispatch();

    const[category,setCategory]=useState([]);

    const allCategory=()=>{
        axios.get(`${baseUrl}/category`)
        .then((res)=>{
            setCategory(res.data);
        })
    }
    
    useEffect(()=>{
        allCategory();
    },[])


  const [categoryValue,setCategoryValue]=useState(null);


  const handelCategory=(id)=>{
      setCategoryValue(id)
      allCategory();  
  }

  useEffect(()=>{
    categorydispatch(setCategoryId(categoryValue));
  },[categoryValue])

  const imageUrl=(url)=>{
    if(url!=null){
    const newUrl=url.split("/"); 
    return newUrl[5].toString();
    }
}

  
  return (
    <div className='hidden md:block'>
         {/* <select className='outline-none text-slate-800 hover:text-lg' value={categoryValue} onChange={handelCategory}>
            <option value={0} >Select the Category</option>
            <option value={0}>All Category</option>
                {
                    category.map((item)=>(
                        <option value={item.id} key={item.id}>{item.categoryName}</option>
                    ))
                    
                }
            </select> */}

            <div className='flex justify-evenly shadow-2xl rounded-sm bg-slate-200 mx-2 py-3'>

            <div className='cursor-pointer flex flex-col gap-2' onClick={()=>handelCategory(0)}>
                        <img src={``} alt='home img' className='h-[50px] w-[50px] rounded-full '/>
                        <p className='text-slate-600'>Home</p>
                    </div>
            {
                category.map((item,index)=>(
                    <div className='cursor-pointer flex flex-col gap-2' onClick={()=>handelCategory(item.id)} key={item.id}>
                        <img src={`https://drive.google.com/thumbnail?id=${imageUrl(item.categoryImageUrl)}`} alt={item.name} className='h-[60px] w-[60px] object-contain rounded-full '/>
                        <p className='text-slate-600 hover:text-lg hover:text-slate-800'>{item.categoryName}</p>
                    </div>
                ))
            }
            </div>


            {/* <div className='flex overflow-hidden relative w-full border'>
            {
                category.map((item,index)=>(
                    <div key={index} className='cursor-pointer w-full h-full' onClick={()=>handelCategory(item.id)}>
                        <img src={`https://drive.google.com/thumbnail?id=${imageUrl(item.bannerImageUrl)}`} alt='banner Img' className='w-full h-full'/>
                    </div>
                ))
            }
            
            </div> */}
        {/* <div className='mx-2 relative'> */}
        <Swiper spaceBetween={30} centeredSlides={true} autoplay={{delay: 2000 , disableOnInteraction: false,}} pagination={{clickable: true,}}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper mt-5 rounded-md shadow-2xl h-[300px]"
      >
        {
        category.map((item,index)=>(
        <div key={item.id} className='w-full h-full' onClick={()=>handelCategory(item.id)}>
        <SwiperSlide><img src={`https://drive.google.com/thumbnail?id=${imageUrl(item.bannerImageUrl)}`} alt='banner Img' className='w-full h-full cursor-pointer object-fill' onClick={()=>handelCategory(item.id)}/></SwiperSlide>
        </div>
        ))
        }
      </Swiper>
      {/* </div> */}

    </div>
  )
}
