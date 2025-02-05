import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { setJwtToken } from '../slices/JwtSlices';
import { MdOutlineMailLock } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { setAdmin } from '../slices/Admin';
import { FcOk } from "react-icons/fc";


export const Login = () => {

    const jwtDispatch=useDispatch();

    const adminDispatch=useDispatch();

    const [jwtToken ,setJwtTokenObject]=useState({})
    const [noticationMsg,setNoticationMsg]=useState([])
    const [loginfrom,setloginfrom]=useState(false)

    useEffect(()=>{
        jwtDispatch(setJwtToken(jwtToken))
    },[jwtToken])

    const handelSignInButton=()=>{
        setloginfrom(false)
    }
    const handelLoginInButton=()=>{
        setloginfrom(true)
    }

    const[accountDetails,setAccountDetails]=useState({
        fullName:'',
        email:'',
        password:'',
        role:''
    })

    const[loginDetails,setLoginDetails]=useState({
        userName:'',
        password:''
    })


    const handelLoginInput=(e)=>{
        const{name,value}=e.target;

        setLoginDetails((preState)=>{

            return{
                ...preState,[name]:value
            } 
                
        })
            
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault()

            loginApi()
        
    };

    const handelAccountDetailsInput=(e)=>{
        const{name,value}=e.target;

        setAccountDetails((preState)=>{
            return{
                ...preState,[name]:value
            }
        })
    }

    const handelAccountDetails=(e)=>{
        e.preventDefault();
        createAccountApi();
    }

    const loginApi=()=>{
        axios.post('http://localhost:8080/api/auth/signin',loginDetails)
        .then((res)=>{
            setJwtTokenObject(res.data)
            if(res.data.role === 'ROLE_ADMIN'){
                adminDispatch(setAdmin(true))
            }
            else{
                adminDispatch(setAdmin(false))
            } 
        })
        .catch((err)=>{
            showNotication(err.response.data.message,<IoIosCloseCircleOutline className='inline h-7 w-7 text-red-600'/>)
        })
    }


    //creating account
    const createAccountApi=()=>{
        axios.post('http://localhost:8080/api/auth/signup',accountDetails)
        .then((res)=>{
            showNotication(res.data.message,<FcOk className='inline h-7 w-7'/>)
        })
        .catch((err)=>{
            showNotication(err.response.data.message,<IoIosCloseCircleOutline className='inline h-7 w-7 text-red-600'/>)
        })
    }


   
   const msg = useRef()

   const showNotication=(message,svg)=>{
    setNoticationMsg([message,svg])
    msg.current.style.top ='20px';

    setTimeout(()=>{
        msg.current.style.top ='-1000px';
        msg.current.style.display ='hidden';
    },2500)
   }

  return (
    <div>
        <div className='h-screen w-screen relative bg-gradient-to-r from-slate-700 to-slate-400'>


        <div ref={msg} className='absolute top-[-1000px] left-[20%] sm:left-[30%] md:left-[40%] lg:left-[40%] xl:left-[42%] p-5 rounded-md duration-75'>
            {
             <p className='text-white'> {noticationMsg[0]} {noticationMsg[1]}</p>
            }
        </div>

        {
            loginfrom ?
            <form onSubmit={handleLoginSubmit}  className='outline-none flex flex-col gap-8 rounded-lg absolute top-[25%] left-[10%] sm:left-[20%] md:left-[30%] lg:left-[35%] xl:left-[40%]  w-[400px] p-5 items-center shadow-2xl'>
                <p className='text-slate-900 text-3xl animate-bounce'>Hey, Welcome back </p>

            <div className='w-full relative'>
            <input type="text" name='userName' value={loginDetails.userName} onChange={handelLoginInput} placeholder='Enter Email' required className='text-slate-300 text-md h-10  w-full pl-5 rounded outline-none ring hover:ring-slate-400' />
            <MdOutlineMailLock className='absolute top-3 right-5 h-5 w-5 ' />
            </div>


            <div className='relative w-full'>
            <input type="password" name='password' value={loginDetails.password} onChange={handelLoginInput} placeholder='Enter password' required className='text-white text-md h-10 w-full pl-5 rounded outline-none ring hover:ring-slate-400' />
            <TbLockPassword className='absolute top-3 right-5 h-5 w-5'/>
            </div>

            <div className='w-full'> 
            <button onClick={handelSignInButton} className='text-white pl-2 cursor-pointer hover:text-slate-700'>create account</button>
            </div>

            <button  className='text-white px-5 bg-slate-700 hover:bg-slate-900 w-fit p-1 rounded'>Sigin</button>
        </form>

        :

        <form onSubmit={handelAccountDetails} className='flex flex-col gap-8 rounded-lg absolute top-[20%] left-[10%] sm:left-[20%] md:left-[30%] lg:left-[35%] xl:left-[40%] w-[400px] p-5 items-center shadow-2xl'>

            <p className='text-slate-900 text-3xl animate-bounce'>Create Account</p>
            <input type="text" name='fullName' placeholder='Enter fullname' value={accountDetails.fullName} onChange={handelAccountDetailsInput} required className='text-white text-md h-10 w-full pl-5 rounded outline-none ring hover:ring-slate-400' />

            <input type="text" name='email' placeholder='Enter Email'  value={accountDetails.email} onChange={handelAccountDetailsInput} required className='text-white text-md h-10  w-full pl-5 rounded outline-none ring hover:ring-slate-400' />

            <input type="password" name='password' placeholder='create password' value={accountDetails.password} onChange={handelAccountDetailsInput} required className='text-white text-md h-10 w-full pl-5 rounded outline-none ring hover:ring-slate-400' />

            <select name='role' value={accountDetails.role} onChange={handelAccountDetailsInput} required className='w-full text-white text-md pl-5 rounded h-10 outline-none ring hover:ring-slate-400 '>
                <option value="" className='bg-black opacity-0 text-lg'>Select Role</option>
                <option value="ROLE_CUSTOMER" className='bg-black opacity-0 text-lg'>Customer</option>
                <option value="ROLE_ADMIN" className='bg-black opacity-0 text-lg'>Admin</option>
            </select>

            <div className='w-full'> 
            <button onClick={handelLoginInButton}  href="" className='text-white pl-2 cursor-pointer hover:text-slate-700'>Login account</button>
            </div>

            <button className='text-white px-5 bg-slate-700 hover:bg-slate-800 w-fit p-1 rounded '>Create account</button>
        </form>

        }
        
        </div>
    </div>
  )
}
