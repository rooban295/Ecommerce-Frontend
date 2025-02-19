import React, { createContext, useContext, useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setJwtToken } from '../slices/JwtSlices';
import { MdOutlineMailLock } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { setAdmin } from '../slices/Admin';
import { ToastContainer, Zoom } from 'react-toastify';
import { message } from 'antd';
import {Button,Form,Input,Select,} from 'antd';
import { Alert } from 'antd';


export const Login = () => {
    
    const baseUrl=import.meta.env.VITE_BASE_URL;

    const jwtDispatch=useDispatch();

    const adminDispatch=useDispatch();

    const [jwtToken ,setJwtTokenObject]=useState({})
    const [noticationMsg,setNoticationMsg]=useState([])
    const [loginfrom,setloginfrom]=useState(false)

    const [messageApi, contextHolder] = message.useMessage();

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


    //working


    // ---------------------------------

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
  const [form] = Form.useForm();

  const onFinish = (values) => {
    createAccountApi(values);
  };


  const onLogin=(value)=>{
    loginApi(value) 
  }


    //login 
    const loginApi=(logDetails)=>{        
        axios.post(`${baseUrl}/api/auth/signin`,logDetails)
        .then((res)=>{

            messageApi.open({type:'loading',content:'Verifying...', className:'text-blue-500'})
            setTimeout(()=>{
            messageApi.open({type:'success',content:"Login successfully", className:'text-green-500'})
            setTimeout(()=>{
            setJwtTokenObject(res.data)
            if(res.data.role === 'ROLE_ADMIN'){
                adminDispatch(setAdmin(true))
            }
            else{
                adminDispatch(setAdmin(false))
            }
           },2000)

           },3000)  
        })
        .catch((err)=>{
           messageApi.open({type:'error',content:'Login Failed', className:'text-bg-red'})
        })
    }


    //creating account
    const createAccountApi=(accDetails)=>{
        axios.post(`${baseUrl}/api/auth/signup`,accDetails)
        .then(()=>{
            messageApi.open({type:'success',content:'Register successfully'})
            setTimeout(()=>{
                setloginfrom(!loginfrom)
            },3000)
        })
        .catch(()=>{
            messageApi.open({type:'warning',content:'This Email is already taken'})
        })
    }


  return (
    <div>
        <div className='h-screen w-screen relative bg-gradient-to-r bg-slate-200 '> {/**from-slate-700 to-slate-400 */}

        <div className='bg-red-500 '>
        {contextHolder}
        </div>

        <ToastContainer position={'top-center'} closeOnClick={true} autoClose={1500} pauseOnHover={true} draggable={true} closeButton={false} hideProgressBar={true} transition={Zoom} toastStyle={{backgroundColor:'#314158',color:'white'}}/>
        
        {

        loginfrom ?
   
        <Form  className='outline-none flex flex-col gap-2 rounded-lg absolute top-[25%] left-[10%] sm:left-[20%] md:left-[30%] lg:left-[35%] xl:left-[40%]  w-[320px] md:w-[400px] p-5 items-center shadow-2xl' {...formItemLayout} form={form} name="register" onFinish={onLogin}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        style={{
          maxWidth: 600,
          color:'blue'
        }}
        scrollToFirstError
      >
        <p className='text-slate-900 text-3xl animate-bounce  my-5'>Hey, Welcome back </p>

        <Form.Item
          name="userName"
          hasFeedback
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
         <Input placeholder='Enter Your Username' className='!placeholder-slate-500 !text-slate-600 !text-md !w-[300px] !bg-slate-100 h-9'/>
        </Form.Item>
  
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'password with min 6 character',
              min:6
            },
          ]}
          hasFeedback
        >
        <Input.Password placeholder='Enter Your Password' className='!placeholder-slate-500 !text-slate-800 !text-md !w-[300px] !bg-slate-100 h-9'/>
        </Form.Item>
  
        <Form.Item className='w-full '> 
          <button onClick={handelSignInButton} className=' text-slate-500 pl-12 cursor-pointer hover:text-slate-700'>Register account</button>
        </Form.Item>
  
        <Form.Item {...tailFormItemLayout}>
          <Button className='mr-35' type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
  
      </Form>

        :
    <div className='rounded-xl absolute top-[20%] left-[10%] sm:left-[20%] md:left-[30%] lg:left-[35%] xl:left-[40%] w-[320px] md:w-[400px]  shadow-2xl'>

    <p className='text-slate-900 pt-10 text-3xl animate-bounce text-center mb-5'>Create Account</p>
  
      <Form className='flex flex-col items-center' {...formItemLayout} form={form} name="register" onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      style={{
        maxWidth: 600,
        color:'blue'
      }}
      scrollToFirstError
    >
        
        <Form.Item
        className='w-full flex justify-center'
        name="fullName"
        tooltip="What do you want others to call you?"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please input your Full Name!',
            whitespace: true,
          },
          {
            min: 3,
            message: 'Enter min 3 Charcter',
          },
        ]}
        validateFirst
      >
      <Input placeholder='Enter Your Full Name'  className='!placeholder-slate-500 !text-slate-600 !text-md !w-[300px] !bg-slate-100 h-9' />
      </Form.Item >

      <Form.Item
        name="email"
        hasFeedback
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
       <Input placeholder='Enter Your Email' className='!placeholder-slate-500 !text-slate-600 !text-md !w-[300px] !bg-slate-100 h-9'/>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'password with min 6 character',
            min:6
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder='Enter Your Password' className='!placeholder-slate-500 !text-slate-800 !text-md !w-[300px] !bg-slate-100 h-9'/>
      </Form.Item>

      <Form.Item name="confirm"  dependencies={['password']} hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('password does not match!'));
            },
          }),
        ]}
      >
      <Input.Password placeholder="Re Enter Your password" className='!placeholder-slate-500 !text-slate-600 !text-md !w-[300px] !bg-slate-100 h-9' />

      </Form.Item>

      <Form.Item
        name="role"
        rules={[
          {
            required: true,
            message: 'Please select role',
          },
        ]}
        hasFeedback
      >
        <Select placeholder="select your Role" className='!placeholder-slate-500 !text-slate-600 !text-md !w-[300px] !bg-slate-100 rounded-2xl h-9'>
          <Option value="ROLE_CUSTOMER">Customer</Option>
          <Option value="ROLE_ADMIN">Admin</Option>
        </Select>
      </Form.Item>

      <Form.Item className='w-full '> 
        <button onClick={handelLoginInButton}  className=' text-slate-500 pl-12 cursor-pointer hover:text-slate-700'>Login account</button>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button className='mr-35' type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>

    </Form>
    </div>
        }    
    </div>
    </div>
  )
}
