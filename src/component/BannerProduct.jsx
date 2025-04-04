import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import { Space, Table, Button, Popover,message,Popconfirm ,Form,Input,Select ,Rate} from 'antd';
import { FaArrowUp } from "react-icons/fa6";


export const BannerProduct = ({cartItems}) => {
  const baseUrl=import.meta.env.VITE_BASE_URL;

    const jwt = useSelector((state)=>state.jwt.jwtToken)

    const categoryId=Number(useSelector((state)=>state.categoryId.categoryId))

    const navigate=useNavigate();

    const cartNav=useNavigate();

    const [selectedCategory,setSelectedCategory]=useState(0);

    const[product,setProduct]=useState([])

    const [messageApi, contextHolder] = message.useMessage();
    


    

    const allproduct=()=>{
        axios.get(`${baseUrl}/api/product`)
        .then((res)=>{
            setProduct(res.data);
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    useEffect(()=>{
        allproduct();
    },[selectedCategory])

    

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
        .then((res)=>{
            messageApi.open({ type: 'success', content: 'Item Added to Cart',className:'mt-11 text-green-500'});
            cartItems();
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
    <div className={`px-4 md:px-20 font-[lato] ${product.length ?'':'h-screen'}`}>


        {contextHolder}

        <ToastContainer position={'top-center'} closeButton={false} hideProgressBar={true} closeOnClick={true} autoClose={1500} pauseOnHover={true} draggable={true} transition={Zoom} toastStyle={{backgroundColor:'#314158',color:'white'}}/>
        
        {
        category.bannerImageUrl?   
       <div className='rounded-2xl  shadow-2xl h-[250px] md:h-[450px] lg:h-[550px] pt-10'>
        <img src={category.bannerImageUrl} alt='banner Img' className='w-full h-full object-fill rounded-xl'/> 
       </div>
       :<></>
       }
            
        <h1 className="text-xl md:text-2xl text-center pt-10">{categoryId == 0 ? 'Products' :category.categoryName}</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-20'>
            {
                product.filter((item)=>categoryId > 0 ? item.category.id===categoryId : item).map((item,index)=>(
    
                    <div className='mx-4 rounded-2xl shadow-2xl hover:shadow-slate-400  mb-5 cursor-pointer' key={item.id}>
                    <div className=' mt-0 px-4 flex flex-col gap-5 items-center '>  
                        
                        <img  onClick={()=>{handelProductClick(item.id)}} src={item.productImg} alt={item.name} className='mt-5 h-[180px] sm:h-[200px]'/>
    
                        <div className='flex flex-col gap-2 sm:gap-5 items-start '>
                        <h1 className='text-slate-700'>{item.productName}</h1>
                        <p className='text-justify'>{item.description}</p>
                        <Rate disabled defaultValue={3} />
                        <h1 className='font-bold'><span>₹</span>{item.productPrice}</h1>
                        {/* <button  className=' bg-slate-400 rounded-lg p-1 px-3 my-5 hover:bg-slate-?600' onClick={()=>{handelCartButton(item.id)}}>Add to cart</button> */}
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
