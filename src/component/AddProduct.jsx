import axios from 'axios';

import React, { useEffect, useState } from 'react'

import { ToastContainer, Zoom } from 'react-toastify';

import {Button,Form,Input,Select,message ,InputNumber, Popover  } from 'antd';

export const AddProduct = ({allproduct}) => {


    const baseUrl=import.meta.env.VITE_BASE_URL;

    const [messageApi, contextHolder] = message.useMessage();
     

    const[product,setProduct]=useState({
        productName:'',
        description:'',
        productImg:'',
        productPrice:0,
        category:{
            id: 0
        }
    });


    const[AllCategoryList,setAllCategoryList]=useState([]);

    const allCategory=()=>{
        axios.get(`${baseUrl}/category`)
        .then((res)=>{
            setAllCategoryList(res.data);
        })
    }

    useEffect(()=>{
        allCategory();
    },[])


    
    //add Product
    const AddProducts= async (product)=>{
        
        await axios.post(`${baseUrl}/api/product/add`,product)
        .then(()=>{
            messageApi.open({type:'success',content:"Product Added Successfully", className:'text-green-500 mt-13'});
            allproduct()
        })
        .catch((err)=>{
            console.log(err);   
        })
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
      const [Products] = Form.useForm();
    
      const onProduct = (pro) => {
        pro.category = {id : parseInt(pro.category) }
        AddProducts(pro)
        Products.resetFields();
        setProductImageUrl('')        
    };

    const [productImageUrl,setProductImageUrl]=useState('')
    
    const handelProductImg=(e)=>{ 
      setProductImageUrl(e.target.value)
    }


  return (
    
    <div className='h-screen sm:h-full'>

    {contextHolder}


    <ToastContainer position={'top-center'} closeOnClick={true} closeButton={false} hideProgressBar={true} autoClose={1500} pauseOnHover={true} draggable={true} transition={Zoom} toastStyle={{backgroundColor:'#45556c  ',color:'white'}}/>

    <p className='block sm:hidden my-4 text-center'>Add Product</p>

    <Form className='flex flex-col items-center' {...formItemLayout} form={Products} name="register" onFinish={onProduct}
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
        
      <Popover placement="left" content={<img className='h-23 w-23' src={productImageUrl} alt="Product Image" />}  title="Product Image">
        <Form.Item
        className='w-full flex justify-center'
        name="productImg"
        tooltip="What do you want others to call you?"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Enter Product Image url',
            whitespace: true,
          },
          {
            // min: 3,
            message: 'Enter min 3 Charcter',
          },
        ]}
        validateFirst
      >
       <Input placeholder='Enter Your Product Image Url'  className='!text-md !w-[300px] h-9' onChange={handelProductImg}/>
      </Form.Item >
      </Popover>


      <Form.Item
        className='w-full flex justify-center'
        name="productName"
        tooltip="What do you want others to call you?"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Enter Product Name',
            whitespace: true,
          },
          {
            min: 3,
            message: 'Enter min 4 Charcter',
          },
        ]}
        validateFirst
      >
      <Input placeholder='Enter Your Product Name'  className=' !text-md !w-[300px] h-9' />

      </Form.Item >

      <Form.Item
        hasFeedback
        name="description"
        rules={[{ required: true, message: 'Please Enter Description' }]}
      >
      <Input.TextArea placeholder='Enter Product Description' className='!text-md !w-[300px]'/>
      </Form.Item>

    <Form.Item
      hasFeedback
      name='productPrice'
      rules={[
        {
          type: 'number',
          required: true,
          message: 'Please Enter Price',
        },
      ]}
    >
      <InputNumber placeholder='Enter Product price' className='!text-md !w-[300px] h-9'/>
    </Form.Item>

      <Form.Item
        name="category"
        rules={[
          {
            required: true,
            message: 'Please select Category',
          },
        ]}
        hasFeedback
      >
        <Select placeholder="select your Category" className=' !text-md !w-[300px] !bg-slate-100 rounded-2xl h-9'>
        {
        AllCategoryList.map((item)=>(
        <Option key={item.id} value={item.id}>{item.categoryName}</Option>
        ))
        }
        </Select>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button className='mr-35' type="primary" htmlType="submit">
          Add Product
        </Button>
      </Form.Item>

    </Form>

    </div>
  )
}
