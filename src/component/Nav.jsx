import axios, { all } from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { LuShoppingCart } from "react-icons/lu";
import { VscAccount } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import { IoMdClose } from "react-icons/io";
import { GrHomeRounded } from "react-icons/gr";
import { CiMenuBurger } from "react-icons/ci";
import { RiCloseLargeFill } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { setJwtToken } from '../slices/JwtSlices';
import { IoSearchOutline } from "react-icons/io5";
import { setSearch } from '../slices/Search';
import { Button, notification, Space , ConfigProvider, Flex, Popover, Popconfirm , message } from 'antd';
import { AddProduct } from './AddProduct';



export const Nav = () => {

    const baseUrl=import.meta.env.VITE_BASE_URL;

    const viewNav=useNavigate();
    const admin=useSelector((state)=>state.admin.admin);
    

    const jwt = useSelector((state)=>state.jwt.jwtToken)

    const[cartTotalItem,setCartTotalItem]=useState(0);
    
    const cartItemTotal=useSelector((state)=>state.ItemTotal.cartTotalItem)

    const jwtDispatch=useDispatch();
    
    const [userinfo,setUserInfo] = useState({})

    const [menuAcc,setMenuAcc] = useState(false)

    const [api, contextHolder] = notification.useNotification();

    const searchDispatch=useDispatch();

    const openNotificationWithIcon = (type) => {
        api[type]({
          message: 'Login Successfully',
          description:'',
          duration:2
        });
      };

    useEffect(()=>{
        if(jwt.message ==='Login successfully'){  
           openNotificationWithIcon('success')
        }
    },[])

        useEffect(()=>{

            if(jwt.message ==='Login successfully'){

            axios.get(`${baseUrl}/userinfo`,{
                headers:{
                    Authorization: `Bearer ${jwt.jwt}`
                }
            })
            .then((res)=>{
            setUserInfo(res.data);
            })
            .catch((err)=>{
                console.log(err);  
            })

        }
        },[jwt])

        
        
        const[accountPopup,setAccountPopup]=useState(false) //Accout popup

        const[keyword,setkeyword]=useState('')

        const[dropDownsearch,setDropDownSearch]=useState(false);

        const[searchResult,setSearchResult]=useState([]);

        const handelSearch= async(e)=>{

            setkeyword(e.target.value)


            if(keyword.length >= 2){
                setDropDownSearch(true)
            }
            else{
                setDropDownSearch(false)
            }

            await axios.get(`${baseUrl}/api/product/search?keyword=${keyword}`)
            .then((res)=>{
                setSearchResult(res.data);
            })
            .catch((err)=>{
                console.log(err);
                
            })
        }


        useEffect(()=>{
            if(jwt.message ==='Login successfully'){
        
            axios.get(`${baseUrl}/api/cart/getcartitem`,{
              headers:{
                Authorization: `Bearer ${jwt.jwt}`
              }
            })
            .then((res)=>{
              setCartTotalItem(res.data.length)      
            })
            .catch((err)=>{
              console.log(err); 
            })
        
          }
          },[cartTotalItem,jwt])

          const logNav=useNavigate();

    const[accNotification,setAccNotification]=useState(true);

    
    const handeLoginNotication=()=>{
        setAccNotification(false)
    }

    const menu=useRef();

    const showMenu = () => {
        if (menu.current) {
          menu.current.classList.remove('hidden');
          menu.current.classList.add('block');
        }
      };
    
      const hideMenu = () => {
        if (menu.current) {
          menu.current.classList.remove('block');
          menu.current.classList.add('hidden');
        }
      };

      //logout code
    const handleLogout = () => { 
     jwtDispatch(setJwtToken({}))
    }

    const viewOrder=useNavigate();

    const viewSearch=useNavigate();


    const handelSearchList=()=>{
        searchDispatch(setSearch(searchResult))
        viewSearch('/search')
    }

      const cancel = () => {
        message.error('Click on No');
      };

//............................

  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const handleHoverChange = (open) => {
    setHovered(open);
    setClicked(false);
  };
  const handleClickChange = (open) => {
    setHovered(false);
    setClicked(open);
  };

  const hoverContent = <div>{userinfo.email}</div>;

  const clickContent = 
  <div>
  <p>{userinfo.fullName}</p>
  <p className='my-2'>{userinfo.email}</p>
  <p className='my-2'>{userinfo.role}</p>
  <p className='my-2 hover:text-red-500' onClick={()=>viewOrder('/vieworder')}>Orders</p>
  <Popconfirm placement="left" title="Logout" description="Are you sure to do want to Logout"
  onConfirm={()=>handleLogout()}
  onCancel={cancel}
  okText="Yes"
  cancelText="No">
  <p className='my-2 hover:text-red-500'>Logout</p>
</Popconfirm>
</div>


const [clicked2, setClicked2] = useState(false);
const [hovered2, setHovered2] = useState(false);
const handleHoverChange2 = (open) => {
  setHovered2(open);
  setClicked2(false);
};
const handleClickChange2 = (open) => {
  setHovered2(false);
  setClicked2(open);
};

const hoverContent2 = <div>Add Product</div>;

const addProductContent = 
<div>
<AddProduct/>
</div>

    
  return (
    <div className='sticky top-0 z-50'>
        {contextHolder}
        <nav className='flex justify-between px-3 md:px-10 xl:px-20 items-center py-3 bg-white shadow-sm'>  {/**max-md:hidden max-lg:px-1 */}

            <div  className='flex gap-2 md:gap-5'>

                <div>
                <Link to={`/`} className='hidden md:block  hover:text-slate-800'>Home</Link> {/**text-slate-600 */}
                <Link to={`/`} className=''><GrHomeRounded className='hidden max-md:block h-5 w-6 mt-2 text-slate-700 hover:text-slate-900'/></Link>
                </div>

               
                <div>
                <div className='flex relative'>
                <input onChange={handelSearch} value={keyword}  type="text" onBlur={()=>{setTimeout(()=>{setDropDownSearch(false)},200)}} className='relative outline-none ring ring-blue-500 hover:ring-2 pl-5 rounded-lg p-1 w-[230px] sm:w-[300px] md:w-[350px] xl:w-[600px]'  placeholder='Search Product'/>
                <IoSearchOutline className='h-6 w-7 hover:h-7 hover:w-7 cursor-pointer  absolute right-2 top-1 text-slate-400 hover:text-slate-600 ' onClick={handelSearchList}/>
                </div>
                {
                    dropDownsearch && (
                        <ul className='bg-white rounded-md absolute left-7 md:left-20 lg:left-25 top-[70px] w-[300px] xl:w-[600px] p-2 duration-75 shadow-2xl'>
                            {
                                searchResult.length > 0 ?(
                                searchResult.map((item,index)=>(
                                    <li key={index} className='flex justify-between my-5 hover:bg-slate-200 px-2 rounded-sm cursor-pointer'>
                                        <p onClick={()=>(viewNav(`/view/${item.id}`))}>{item.productName}</p>
                                        <img src={item.productImg} alt={item.name} className='h-[50px] w-[50px'/>
                                    </li>
                                ))
                            ):(
                            <li><p>Product not found :)</p></li>)
                            }
                        </ul>
                    )
                }
                </div>

            </div>


            <div className='flex gap-4 relative'>

            <div className='hidden sm:block'>
            <div className='flex gap-5'>  
            {/* <FilterProduct />      * filtering the product            */}
            <div className={`${admin ? '':'hidden'} `}>
            <Link to='/category' className={`hover:text-lg hidden md:block text-slate-600 hover:text-slate-800`}>Add Category</Link>
            </div>

            <div className={`${admin ? '':'hidden'}`}>
                {/* <Link to='product' className={`hover:text-lg hidden md:block text-slate-600 hover:text-slate-800`}>Add product</Link> */}
            <Popover content={hoverContent2} title="Add Product" trigger="hover" open={hovered2} onOpenChange={handleHoverChange2}>
            <Popover
            content={
            <div>
            {addProductContent}
            </div>
            }
            title="Add Product"
            trigger="click"
            open={clicked2}
            onOpenChange={handleClickChange2}>
            <p>Add Product</p>
            </Popover>
            </Popover>
            </div> 

            </div>
            </div>


            
            <Popover content={hoverContent} title="Login Info" trigger="hover" open={hovered} onOpenChange={handleHoverChange}>
            <Popover
            content={
            <div>
            {clickContent}
            </div>
            }
            title="Login Info"
            trigger="click"
            open={clicked}
            onOpenChange={handleClickChange}>
            <VscAccount className='max-md:hidden h-6 w-6 cursor-pointer text-slate-500 hover:text-slate-800'/>
            </Popover>
            </Popover>

  
            <div className='relative'>  {/** Shoping cart */}
            <Link to='cart'><LuShoppingCart className='h-6 w-6 text-slate-600 hover:text-slate-800'/></Link>
            {
            cartItemTotal > 0 ?
            <div className='absolute top-[-11px] left-[7px] py-[3px] px-[6px] text-[8px] rounded-full bg-red-600 text-white font-bold'>{cartItemTotal}</div>
            :<></>
            }
            </div>



            <div className='max-md:block  hidden'>  {/**  menu */}


            <CiMenuBurger  className='h-5 w-5 mt-1 text-slate-900 hover:text-slate-900' onClick={()=>showMenu()}/>


            <div ref={menu} className='absolute right-[0px] bg-slate-300 h-screen w-[250px] mt-5 shadow-xl rounded hidden'>

            <button className='absolute top-10 left-5' onClick={()=>{setMenuAcc(!menuAcc)}} onFocus={()=>{setMenuAcc(false)}} onBlur={()=>{setTimeout(()=>{setMenuAcc(false)},200)}}> <VscAccount className='h-6 w-6 cursor-pointer text-slate-500 hover:text-slate-800'/></button>
            {   
            menuAcc ?
            <div className='bg-slate-300 flex flex-col gap-4 p-2 rounded-md shadow-2xl w-[200px] absolute top-18 left-3'>
                <p className='font-bold text-center '>Account </p>
                <p className={`shadow-xl cursor-pointer rounded text-green-600 px-2 ${accNotification ? 'block':'hidden'}`}> <span className='inline mr-3'>{userinfo.msg}</span> <IoMdClose className='inline w-5 h-5 text-slate-600  hover:text-slate-950 hover:h-6 hover:w-6' onClick={()=>{handeLoginNotication()}}/></p>
                <p className='tracking-normal'>{userinfo.fullName}</p>
                <p>{userinfo.email}</p>
                <p>{userinfo.role}</p>
                <p onClick={handleLogout} className='rounded bg-slate-600 hover:bg-slate-800 p-1 text-white w-fit'>Logout <span className='ml-2'><IoLogOutOutline className='inline h-5 w-5'/></span></p>         
            </div>:<></>
           }
   
            <RiCloseLargeFill className='absolute right-5 top-5 h-7 w-7 text-slate-600 hover:w-8 hover:h-8 animate-bounce transition duration-100' onClick={hideMenu}/>


            <div className='flex flex-col gap-3 mt-20 ml-5'>
            {/* <FilterProduct /> */}
            <Link to='product' className={`hover:text-lg text-slate-600 hover:text-slate-800 mt-5 ${admin?'':'hidden'}`}>Add product</Link>
            <div className={`${admin ? '':'hidden'} `}>
            <Link to='/category' className={`text-slate-600 hover:text-slate-800`}>Add Category</Link>
            </div>
            <Link to='/vieworder' className='text-slate-600 hover:text-slate-600 '>Orders</Link>
            </div>

           <div className={`absolute top-9 left-9  ${accNotification ? 'block':'hidden'}`}> {/**  Account Notification*/}
            <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-900 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-sky-700"></span>
                </span>
            </div>


            </div>

            </div>
            
            </div>
        </nav>
    </div>
  )
}
