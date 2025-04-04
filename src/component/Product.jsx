import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import {useSelector } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import { FilterProduct } from './FilterProduct'
import { ToastContainer, Zoom } from 'react-toastify';
import { Button , message} from 'antd';
import { Rate } from 'antd';
import { Card } from 'antd';
const { Meta } = Card;
import { FaArrowUp } from "react-icons/fa6";

export const Product = ({product,cartItems,allproduct}) => {

    const baseUrl=import.meta.env.VITE_BASE_URL;

    const jwt = useSelector((state)=>state.jwt.jwtToken)

    const categoryId=Number(useSelector((state)=>state.categoryId.categoryId))

    const navigate=useNavigate();

    const [messageApi, contextHolder] = message.useMessage();

   
    

    // useEffect(()=>{
    //   allproduct();
    // },[])

    // const allproduct=()=>{
    //     axios.get(`${baseUrl}/api/product`)
    //     .then((res)=>{
    //         setProduct(res.data);
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })
    // }


    const handelProductClick=(id)=>{
        navigate(`/view/${id}`);
    }
   
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
        .then(()=>{
            messageApi.open({type: 'success',className:'mt-13 text-green-500', content: 'Product Added to Cart',} );
            cartItems()  
        })
        .catch((err)=>{
            console.log(err);  
        })
    }
    }

    const [category,setCategory]=useState({})

    useEffect(()=>{ 
        if(categoryId > 0){

        axios.get(`${baseUrl}/category/${categoryId}`)
        .then((res)=>{
            setCategory(res.data)
        })
        .catch((err)=>{
            console.log(err);  
        })

    }
    },[categoryId])


  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
       
  
    
  return (
    <div className={`px-4 md:px-20 relative ${product.length > 0 ?'':'h-screen'}`}>

        {contextHolder}

        <ToastContainer position={'top-center'} closeButton={false} hideProgressBar={true} closeOnClick={true} autoClose={1500} pauseOnHover={true} draggable={true} transition={Zoom} toastStyle={{backgroundColor:'#45556c  ',color:'white'}}/>

        <div className='pt-5'>
        <FilterProduct/>
        </div>

        <h1 className="text-3xl text-center pt-10">{categoryId == 0 ? 'Products' :category.categoryName}</h1>
        
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-20'>
        {
            product.map((item)=>(    

                <div className='mx-4 rounded-2xl shadow-2xl hover:shadow-slate-400 bg mb-5 cursor-pointer font-[lato]' key={item.id}>
                <div className=' mt-0 px-4 flex flex-col gap-5 items-center '>  
                    
                    <img  onClick={()=>{handelProductClick(item.id)}} src={item.productImg} alt={item.name} className='mt-5 h-[180px] sm:h-[200px]'/>

                    <div className='flex flex-col gap-2 sm:gap-5 items-start '>
                    <h1 className='text-slate-700'>{item.productName}</h1>
                    <p className='text-justify'>{item.description}</p>
                    <Rate disabled defaultValue={3} />
                    <h1 className='font-bold'><span>₹</span>{item.productPrice}</h1>
                    <Button type="primary" className='my-5' onClick={()=>{handelCartButton(item.id)}}>Add to Cart</Button>
                    </div>
                </div>  
                </div>
                ))
        }
        
    </div>
    {
        isVisible && (
            <button
              className="fixed bottom-5 right-5 md:bottom-7 md:right-18 p-3 rounded-full bg-white shadow shadow-blue-700  z-200 cursor-pointer transition-opacity duration-300"
              onClick={scrollToTop}
            >
              <FaArrowUp className="text-blue-600" />
            </button>
          )
    }

    </div>
  )
}
