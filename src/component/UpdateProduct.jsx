import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import {Button,Form,Input,Select,InputNumber, Popover ,message } from 'antd';

export const UpdateProduct = () => {
  
  const baseUrl=import.meta.env.VITE_BASE_URL;
  
  const {id} =useParams();
  
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
    
    
    const [messageApi, contextHolder] = message.useMessage();
    
    const [uProduct,setUProduct]=useState({})


    const productById=()=>{
         axios.get(`${baseUrl}/api/product/${id}`)
        .then((res)=>{
          setUProduct(res.data)  
          updateProductFrom.setFieldsValue(res.data);  
          updateProductFrom.setFieldsValue({category:res.data.category.id});  
          setUProduct(res.data)    
        })
        .catch((err)=>{
            console.log(err);  
        })
    }

    useEffect(()=>{
        if(id){
        productById(id)
        }
    },[id])

// Updating the product 

    const updateProduct=(product)=>{

        axios.put(`${baseUrl}/api/product/update/${id}`,product)
        .then(()=>{
            messageApi.open({type: 'success',className:'mt-13 text-green-500', content: 'Product Updated Successfully',} );
            setTimeout(()=>{
                // home('/')
            },2000)    
        })
        .catch((err)=>{
            console.log(err);   
        })
    }

    const [updateProductFrom] = Form.useForm();

    const onsubmitUpdateForm=(updatedProduct)=>{
        updatedProduct.category={id:parseInt(updatedProduct.category)}
        updateProduct(updatedProduct) 
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
            

  return (
    <div className='flex flex-col items-center relative bg-white'>

        {contextHolder}

        <h1 className='pt-8 mb-8 text-md lg:text-xl font-bold'>Update Product</h1>

    <Form className='flex flex-col items-center !w-[90%]' {...formItemLayout} form={updateProductFrom} name="register" onFinish={onsubmitUpdateForm}
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
        
      <Popover placement="left" content={<img className='h-23 w-23' src={uProduct.productImg} alt="Product Image" />}  title="Product Image">
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
       <Input placeholder='Enter Your Product Image Url'  className='!text-md !w-[300px] sm:!w-[500px] lg:!w-[700px] h-9'/>
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
      <Input placeholder='Enter Your Product Name'  className='!text-md !w-[300px] sm:!w-[500px] lg:!w-[700px] h-9' />

      </Form.Item >

      <Form.Item
        hasFeedback
        name="description"
        rules={[{ required: true, message: 'Please Enter Description' }]}
      >
      <Input.TextArea placeholder='Enter Product Description' className='!text-md !w-[300px] sm:!w-[500px] lg:!w-[600px] '/>
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
      <InputNumber placeholder='Enter Product price' className='!text-md lg:!ml-25 !w-[300px] sm:!w-[500px] lg:!w-[700px] h-9'/>
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
        <Select placeholder="select your Category" className='!text-md lg:!ml-25 !w-[300px] sm:!w-[500px] lg:!w-[700px] h-9'>
        {
        AllCategoryList.map((item)=>(
        <Option key={item.id} value={item.id}>{item.categoryName}</Option>
        ))
        }
        </Select>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button className='mr-35' type="primary" htmlType="submit">
          Update Product
        </Button>
      </Form.Item>

    </Form>

    </div>
  )
}
