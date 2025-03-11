import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Button,message,Result} from 'antd';
import { Rate } from 'antd';
import { FaArrowUp } from "react-icons/fa6";



export const SearchProduct = ({cartItems}) => {

  const baseUrl=import.meta.env.VITE_BASE_URL;

  const jwt = useSelector((state)=>state.jwt.jwtToken)

  const cartNav =useNavigate();

  const navigate=useNavigate();

  const searchProduct=useSelector((state)=>state.search.searchProduct)

  const [messageApi, contextHolder] = message.useMessage();

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
      
  axios.post(`${baseUrl}/api/cart/addtocart`,cartitems,{
      headers:{
          Authorization:`Bearer ${jwt.jwt}`
      }
  })
  .then((res)=>{
    messageApi.open({type: 'success',className:'mt-13 text-green-500', content: 'Product Added to Cart',} );
    // cartNav('/cart')
    cartItems();   
  })
  .catch((err)=>{
      console.log(err); 
  })
}
}


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
    <div className={`px-6 md:px-20 relative font-[lato] ${searchProduct.length > 0 ?'':'h-screen'}`}>

      {contextHolder}

    <h1 className="text-3xl text-center pt-10">Search Result</h1>

    {
    searchProduct.length > 0 ?
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-20'>
        {
            searchProduct.map((item,index)=>(

                <div className='rounded-2xl shadow-xl hover:shadow-slate-400  mb-5 cursor-pointer' key={index}>
                <div  className=' mt-0 px-4 flex flex-col gap-5 items-center '>  
                    
                    <img onClick={()=>{handelProductClick(item.id)}} src={item.productImg} alt={item.name} className='mt-5 h-[180px] sm:h-[200px]'/>

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
    :
    <>
    <div className='flex justify-center items-center !w-full '>
        <Result className='' status="404" title="search result not found"  extra={<Button onClick={()=>navigate('/')} type="primary">Back Home</Button>}/>
    </div>
    </>

      }

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
