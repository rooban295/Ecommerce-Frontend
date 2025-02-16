import axios, { all } from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { LuShoppingCart } from "react-icons/lu";
import { FilterProduct } from './FilterProduct';
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

    const searchDispatch=useDispatch();


        useEffect(()=>{

            if(jwt.message ==='Login successfully'){

            axios.get(`${baseUrl}/userinfo`,{
                headers:{
                    Authorization: `Bearer ${jwt.jwt}`
                }
            })
            .then((res)=>{
                setUserInfo(res.data)
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


            if(keyword.length >= 0){
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

        const imageUrl=(url)=>{
            const newUrl=url.split("/"); 
            return newUrl[5].toString();
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
        const handelLogout=()=>{
            logNav('/login')
        }

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
    const OrderNav=useNavigate();

    const viewOrder=useNavigate();

    const viewSearch=useNavigate();


    const handelSearchList=()=>{
        searchDispatch(setSearch(searchResult))
        viewSearch('/search')
    }


  return (
    <div className='sticky top-0 z-50'>
        
        <nav className='flex justify-between px-3 md:px-10 items-center py-3 bg-slate-300 shadow-xl'>  {/**max-md:hidden max-lg:px-1 */}

            <div  className='flex gap-2 md:gap-5'>

                <div>
                <Link to={`/`} className='hover:text-lg hidden md:block text-slate-600 hover:text-slate-800'>Home</Link>
                <Link to={`/`} className=''><GrHomeRounded className='hidden max-md:block h-5 w-6 mt-2 text-slate-700 hover:text-slate-900'/></Link>
                </div>

                <div className={`${admin ? '':'hidden'}`}>
                <Link to='product' className={`hover:text-lg hidden md:block text-slate-600 hover:text-slate-800`}>Add product</Link>
                </div>

                <div className=''>
                <div className='flex relative'>
                <input onChange={handelSearch} value={keyword}  type="text" onBlur={()=>{setTimeout(()=>{setDropDownSearch(false)},200)}} className='relative outline-none ring ring-slate-500 hover:ring-2 pl-2 rounded-lg p-1 w-[200px] sm:w-[300px] md:w-[350px] mr-2 border-r-none'  placeholder='Search Product'/>
                <IoSearchOutline className='h-6 w-7 hover:h-7 hover:w-7 cursor-pointer  absolute right-4 top-1 text-slate-400 hover:text-slate-600 ' onClick={handelSearchList}/>
                </div>
                {
                    dropDownsearch && (
                        <ul className='bg-slate-200 rounded-md absolute left-7 md:left-25 lg:left-50 top-[70px] w-[300px] p-2 duration-75 shadow-2xl'>
                            {
                                searchResult.length > 0 ?(
                                searchResult.map((item,index)=>(
                                    <li key={index} className='flex justify-between my-5 hover:bg-slate-400 px-2 rounded-sm cursor-pointer'>
                                        <p onClick={()=>(viewNav(`/view/${item.id}`))}>{item.productName}</p>
                                        <img src={`https://drive.google.com/thumbnail?id=${imageUrl(item.productImg)}`} alt={item.name} className='h-[50px] w-[50px'/>
                                    </li>
                                ))
                            ):(
                            <li><p>Product not found :)</p></li>)
                            }
                        </ul>
                    )
                }
                </div>


            <div className='hidden sm:block'>
            <div className='flex gap-5'>  
            {/* <FilterProduct />      * filtering the product            */}
            <div className={`${admin ? '':'hidden'} `}>
            <Link to='/category' className={`hover:text-lg hidden md:block text-slate-600 hover:text-slate-800`}>Add Category</Link>
            </div>

            </div>
            </div>  

            </div>

            <div className='flex gap-4 relative'>

            <button onClick={()=>{setAccountPopup(!accountPopup)}} onFocus={()=>{setAccountPopup(false)}} onBlur={()=>{setTimeout(()=>{setAccountPopup(false)},200)}}> <VscAccount className='max-md:hidden h-6 w-6 cursor-pointer text-slate-500 hover:text-slate-800'/></button>

            {   
            // accountPopup 

            accountPopup ?
            <div className='relative'>
            <div className='bg-slate-300  flex flex-col gap-4 p-2 absolute top-[50px] right-[1px] rounded-md shadow-2xl w-[200px] z-50'>
                <p className='font-bold text-center '> Account </p>
                <p className={`shadow-xl cursor-pointer rounded text-green-600 px-2 ${accNotification ? 'block':'hidden'}`}> <span className='inline mr-3'>{userinfo.msg}</span> <IoMdClose className='inline w-5 h-5 text-slate-600  hover:text-slate-950 hover:h-6 hover:w-6' onClick={()=>{handeLoginNotication()}}/></p>
                <p className='tracking-normal'>{userinfo.fullName}</p>
                <p>{userinfo.email}</p>
                <p>{userinfo.role}</p>
                <Link to='/vieworder' className=' hover:text-slate-600'>Orders</Link>
                <p onClick={handleLogout} className='rounded bg-slate-600 hover:bg-slate-800 p-1 text-white w-fit'>Logout <span className='ml-2'><IoLogOutOutline className='inline h-5 w-5'/></span></p>         
            </div>
            </div> 
            :
            <></>
           }

            <div className={`max-md:hidden absolute top-[-5px] left-[15px] ${accNotification ? 'block':'hidden'}`}> {/**  Account Notification*/}
            <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-900 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-sky-700"></span>
                </span>
            </div>




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


            <div className='flex flex-col mt-20 ml-5'>
            {/* <FilterProduct /> */}
            <Link to='product' className={`hover:text-lg text-slate-600 hover:text-slate-800 mt-5 ${admin?'':'hidden'}`}>Add product</Link>
            <div className={`${admin ? '':'hidden'} `}>
            <Link to='/category' className={`text-slate-600 hover:text-slate-800`}>Add Category</Link>
            </div>
            <Link to='/vieworder' className=' hover:text-slate-600 my-3'>Orders</Link>
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
