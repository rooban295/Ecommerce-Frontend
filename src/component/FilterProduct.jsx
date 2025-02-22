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
import { useNavigate } from 'react-router-dom';

export const FilterProduct = () => {
    
    const baseUrl=import.meta.env.VITE_BASE_URL;
    
    const categorydispatch = useDispatch();

    const bannerProduct=useNavigate();

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
    if(id!=null){
    setCategoryValue(id)
    allCategory();
    } 
  }

  useEffect(()=>{
    categorydispatch(setCategoryId(categoryValue));
  },[categoryValue])

 

  const handelBanner=(id)=>{
    setCategoryValue(id)
    bannerProduct("/bannerproduct")
  }

  
  return (
    <div className=''>
      
            <div className='flex justify-evenly flex-wrap shadow-2xl rounded-lg bg-white py-3 mt-1 inset-shadow-sm'>
            {
                category.map((item,index)=>(
                    <div className='cursor-pointer flex flex-col gap-2' onClick={()=>handelBanner(item.id)} key={item.id}>
                      {item.categoryImageUrl !=''?
                        <div className='mx-1'>
                        <img src={item.categoryImageUrl} alt={item.name} className='h-[50px] w-[50px] sm:h-[60px] sm:w-[60px] object-contain rounded-full '/>
                        <p className='text-slate-600 text-[12px] md:text-sm  hover:text-slate-800'>{item.categoryName}</p>
                        </div>
                        :<></>
                      }
                    </div>
                ))
            }
            </div>

            <Swiper
  spaceBetween={30}
  centeredSlides={true}
  autoplay={{ delay: 2000, disableOnInteraction: false }}
  pagination={{ clickable: true }}
  navigation={true}
  modules={[Autoplay, Pagination, Navigation]}
  className="mySwiper mt-5 rounded-md shadow-2xl h-[260px] md:h-[550px]"
>
  {category.map((item) =>
    item.bannerImageUrl !== "" ? (
      <SwiperSlide key={item.id || item.bannerImageUrl}>
        <img
          src={item.bannerImageUrl}
          alt="banner Img"
          className="w-full h-full cursor-pointer object-fill"
          onClick={() => handelBanner(item.id)}
        />
      </SwiperSlide>
    ) : null
  )}
</Swiper>

    </div>
  )
}
