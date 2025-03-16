import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setJwtToken } from '../slices/JwtSlices';
import { setAdmin } from '../slices/Admin';
import { ToastContainer, Zoom } from 'react-toastify';
import {Button,Form,Input,Select,notification,message,Popover,QRCode} from 'antd';
import spo from '/public/assets/image/spo.png'
import bg from '/public/assets/image/bg.png'
import ai from '/public/assets/image/ai.png'


export const Login = () => {
    
    const baseUrl=import.meta.env.VITE_BASE_URL;

    const jwtDispatch=useDispatch();

    const adminDispatch=useDispatch();

    const [jwtToken ,setJwtTokenObject]=useState({})
    
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

  const [forms] = Form.useForm();

  const onFinish = (values) => {
    createAccountApi(values);
  };


  const onLogin=(value)=>{
    loginApi(value) 
  }


    //login 
    const loginApi=(logDetails)=>{
        // messageApi.open({type:'loading',content:'Sever Loading...', className:'text-blue-500 mt-9'})        
        axios.post(`${baseUrl}/api/auth/signin`,logDetails)
        .then((res)=>{
            messageApi.open({type:'loading',content:'Verifying...', className:'text-blue-500 mt-9'})
            setTimeout(()=>{
            messageApi.open({type:'success',content:"Login successfully", className:'text-green-500 mt-9'})
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
        .catch(()=>{
           messageApi.open({type:'error',content:'Login Failed', className:'text-bg-red mt-9 text-red-500'})
        })
    }


    //creating account
    const createAccountApi=(accDetails)=>{
        axios.post(`${baseUrl}/api/auth/signup`,accDetails)
        .then(()=>{
            messageApi.open({type:'success',content:'Register successfully', className:'mt-9 text-green-500'})
            setTimeout(()=>{
                setloginfrom(!loginfrom)
            },3000)
        })
        .catch(()=>{
            messageApi.open({type:'warning',content:'This Email is already taken', className:'mt-9 text-yellow-500'})
        })
    }

    const [api,contextHolder2] = notification.useNotification();

    const openNotification = () => {
      api.open({
        message: 'Hi, User',
        description: <><p>To create an account, click on the "Register Account" button and fill in the required details, such as your name, email, and password. Make sure to use a valid email, as you may need to verify it. Choose a strong password for security. Once you submit the form, click on "Login".</p> 
         <span className='mt-2 block'> <span className='font-bold'>Note:</span> It may take some time to load the server, so please be patient while the process completes.</span></>,
        duration: 0,
      });
    };

    const handelGuestButton=()=>{

      const log={
        "userName":"guest@gmail.com",
        "password":"123456"
    }
      loginApi(log)
    }


  return (
    <div className='relative h-screen overflow-y-hidden'>
        <div className='h-screen w-screen relative bg-gradient-to-r bg-slate-100 '> {/**from-slate-700 to-slate-400 */}
  
        {contextHolder2}
        {contextHolder}
     
        <nav className='h-12 shadow flex justify-between items-center px-2 xl:px-5'>
        <Popover content={<QRCode type="canvas" value="ecommerce-rho-khaki.vercel.app" />} title="E-commerce">
        <div className='h-25 w-25'>
        <img className='object-fill' src="https://res.cloudinary.com/depfu1w0f/image/upload/v1740230755/Logo_jhvjoj.png" alt="" />
        </div>
        </Popover>
        <a className='text-sm text-slate-500' onClick={openNotification}>Need Help ?</a>
        </nav>

        <ToastContainer position={'top-center'} closeOnClick={true} autoClose={1500} pauseOnHover={true} draggable={true} closeButton={false} hideProgressBar={true} transition={Zoom} toastStyle={{backgroundColor:'#314158',color:'white'}}/>
        
        {

        loginfrom ?
        <Form  {...formItemLayout} form={forms} name="register" onFinish={onLogin}  className='outline-none flex flex-col rounded-lg absolute z-500 top-[25%] left-[8%] sm:left-[20%] md:left-[30%] lg:left-[35%] xl:left-[40%]  w-[320px] md:w-[400px] p-5 items-center shadow-2xl'
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
        <p className='text-slate-600 text-3xl font-[lato]  my-6'>Hey, Welcome back </p>

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
  
        <Form.Item className='w-full'> 
          <button onClick={handelSignInButton} className=' text-slate-500 pl-5 lg:pl-14 cursor-pointer hover:text-slate-600'>Register account</button>
        </Form.Item>
  
        <Form.Item {...tailFormItemLayout}>
          <Button className='mr-35' type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>

        <p onClick={()=>handelGuestButton()} className='my-1 text-slate-500 cursor-pointer text-[13px] hover:text-slate-700'><span className='inline-block mr-1 text-slate-900'>Don’t have an account? </span><span className='text-blue-500 hover:text-blue-700'>Continue as Guest</span></p>

      {/* <img src={spo} className='absolute opacity-30 -z-100' alt="" /> */}
      </Form>



        :
    <div className='rounded-xl absolute top-[20%] left-[8%] sm:left-[20%] md:left-[30%] lg:left-[35%] xl:left-[40%] w-[320px] md:w-[400px]  shadow-2xl'>

    <p className='text-slate-500 pt-10 text-3xl text-center mb-5 font-[lato]'>Create Account</p>
  
    <Form className='flex flex-col items-center relative z-100 !bg-transparent' {...formItemLayout} form={form} name="register" onFinish={onFinish}
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
        <button onClick={handelLoginInButton}  className=' text-slate-500 pl-5 lg:pl-14 cursor-pointer hover:text-slate-700'>Login account</button>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button className='mr-35' type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
      {/* <img src={ai} className='absolute -top-10 opacity-75 -z-100' alt="" /> */}
    </Form>
    </div>
        }    
    </div>
    </div>
  )
}
