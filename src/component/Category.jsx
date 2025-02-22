import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { RiCloseLargeFill } from "react-icons/ri";
import { ToastContainer, Zoom } from 'react-toastify';
import { Space, Table, Button, Popover,message,Popconfirm ,Form,Input,Select } from 'antd';
import { GrView } from "react-icons/gr";


export const Category = () => {

const baseUrl=import.meta.env.VITE_BASE_URL;

const [allCategory,setAllCategory]=useState([]);

const [messageApi, contextHolder] = message.useMessage();

const [updateBtn,setUpdateBtn]=useState(false);

useEffect(() => {
    fetchCategories();
  }, []);


const fetchCategories=()=>{
    axios.get(`${baseUrl}/category`)
    .then((res)=>{
        setAllCategory(res.data)
    })
    .catch((err)=>{
        console.log(err);
        
    })
}


const addCategory= async (category)=>{
   await axios.post(`${baseUrl}/category/add`,category)
   .then(()=>{

    updatePopup.current.style.top='-1000px'

    messageApi.open({ type: 'success', content: 'Category Added Successfully', className:'mt-11 text-green-500'});

    fetchCategories(); 

   })
   .catch((err)=>{
       console.log(err);
       
   })
}

const [updateCategory,setUpdateCategory]=useState({
    id:null,
    categoryName:'',
    categoryImageUrl:'',
    bannerImageUrl:''
})


const updateApi=(upData)=>{
    if(updateCategory.id){
    axios.put(`${baseUrl}/category/update/${updateCategory.id}`,upData)
   .then(()=>{
    updatePopup.current.style.top='-1000px'

    messageApi.open({ type: 'success', content: 'Category Updated Successfully',className:'mt-11 text-green-500'});

    fetchCategories()
   })
   .catch((err)=>{
    console.log('id not found');
    
       console.log(err);
       
   })
}
}

const getCategoryApi= async (id)=>{
    await axios.get(`${baseUrl}/category/${id}`)
   .then((res)=>{
    setUpdateCategory(res.data) 
    categoryFrom.setFieldsValue(res.data); 
   })
   .catch((err)=>{
       console.log(err);
       
   })
}



const deleteApi= async (id)=>{
   await axios.delete(`${baseUrl}/category/${id}`)
   .then(()=> {
    messageApi.open({ type: 'success', content: "Deleted Successfully", className:'mt-11 text-green-500'});
    fetchCategories()
    } )
   .catch((err)=>{
       console.log(err);  
   })
}



const updatePopup = useRef();

const handelUpdateBtn=(id)=>{
    if(id){
    getCategoryApi(id)
    setUpdateBtn(true)
    }
    else{
    categoryFrom.resetFields()
    setUpdateBtn(false)
    }
   updatePopup.current.style.top='10px'
}
const handelDeleteBtn=(id)=>{
    deleteApi(id)
    fetchCategories();
}


const columns = [
    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'id',
      render: (text) => <p>{text}</p>,
    },
    {
        title: 'Category Image',
        dataIndex: 'categoryImageUrl',
        key: 'id',
        render: (text,record) => <div> 
           <Popover content={<div><img className='h-10 w-10 object-fill' src={text} alt=""/> <img className='h-20 w-full object-fill' src={record.bannerImageUrl} alt=""/></div>} title="Category & Banner Image">
           <GrView />
          </Popover>
            </div>  ,
      },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'id',
      render: (_, record) => (
        <Space size="middle">
         <div>
            <button className='bg-blue-500 hover:bg-blue-700 rounded text-white px-1 mr-2' onClick={()=>handelUpdateBtn(record.id)}>Update</button> 
            <Popconfirm title="Delete the task"  description="Are you sure to delete this task?"
            onConfirm={()=>handelDeleteBtn(record.id)}
            onCancel={()=>messageApi.open({ type: 'error', content: "Clicked No",})}
            okText="Yes"
            cancelText="No">
                <button className='bg-red-500 hover:bg-red-700 rounded text-white px-1 my-1'>Delete</button>
                </Popconfirm>
            </div>
        </Space>
      ),
    }

]


    const [categoryFrom] = Form.useForm();

    const onsubmitCategoryForm=(category)=>{

        if(updateBtn){
            updateApi(category)    
        }
        else{
            addCategory(category)
        }
        
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

    const handelCategotyImage=(e)=>{
      const {name,value}=e.target
      setUpdateCategory({...updateCategory,[name]:value})
    }


  return (
    <div className='px-2 sm:px-10 h-screen relative'>

        {contextHolder}
        
        <ToastContainer position={'top-center'} closeButton={false} hideProgressBar={true} closeOnClick={true} autoClose={1500} pauseOnHover={true} draggable={true} transition={Zoom} toastStyle={{backgroundColor:'#45556c  ',color:'white'}}/>

        <h1 className='text-center pt-10 text-2xl uppercase'>Category</h1>

        <div ref={updatePopup}  className='absolute bg-white shadow-lg top-[-1000px] left-[10%] rounded-lg w-[80%]  duration-300 z-50'>

              {updateBtn?<p className='text-center mt-2'>Update Categroy</p>:<p className='text-center mt-2'>Add Category</p>}
              <Form className='flex flex-col items-center lg:!ml-15 xl:!ml-55 !mt-10 duration-100' {...formItemLayout} form={categoryFrom} name="register" onFinish={onsubmitCategoryForm}
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
                     name="categoryName"
                     hasFeedback
                     rules={[
                       {
                         required: true,
                         message: 'Enter categoryName',
                         whitespace: true,
                       },
                       {
                         // min: 3,
                         message: 'Enter min 3 Charcter',
                       },
                     ]}
                     validateFirst
                   >
                    <Input placeholder='Enter categoryName'  className='!text-md !w-[300px] sm:!w-[500px] lg:!w-[700px] h-9' />
                   </Form.Item >



                   <Popover placement="left" content={<img className='h-23 w-23' src={updateCategory.categoryImageUrl} alt="Product Image" />}  title="Product Image">
                   <Form.Item
                     className='w-full flex justify-center'
                     name="categoryImageUrl"
                     hasFeedback
                     rules={[
                         {
                             required: true,
                             message: 'Enter categoryImageUrl',
                             whitespace: true,
                            },
                            {
                                 min: 3,
                                 message: 'Enter min 4 Charcter',
                            },
                        ]}
                        validateFirst
                        >
                   <Input placeholder='Enter categoryImageUrl' name='categoryImageUrl'  className='!text-md !w-[300px] sm:!w-[500px] lg:!w-[700px] h-9' onChange={handelCategotyImage}/>
             
                   </Form.Item >
                   </Popover>



                   <Popover placement="left" content={<img className='h-23 w-23' src={updateCategory.bannerImageUrl} alt="Product Image" />}  title="Banner Image">
                   <Form.Item
                     className='w-full flex justify-center'
                     name="bannerImageUrl"
                    //  tooltip="What do you want others to call you?"
                     hasFeedback
                     rules={[
                       {
                         required: true,
                         message: 'Enter bannerImageUrl',
                         whitespace: true,
                       },
                       {
                        //  min: 3,
                        //  message: 'Enter min 4 Charcter',
                       },
                     ]}
                     validateFirst
                   >
                   <Input placeholder='Enter bannerImageUrl' name='bannerImageUrl'  className='!text-md !w-[300px] sm:!w-[500px] lg:!w-[700px] h-9' onChange={handelCategotyImage}/>
             
                   </Form.Item >
                   </Popover>
             
             
                   <Form.Item {...tailFormItemLayout}>
                     {
                         updateBtn ?
                         <Button className='mr-35' htmlType="submit" name='update' type="primary">update</Button>
                         :    
                         <Button type='primary' htmlType="submit" name='add' className='bg-slate-400 hover:bg-slate-600 w-fit p-1 rounded-lg'>Add</Button>
                    }
                   </Form.Item>
             
              </Form>
            <RiCloseLargeFill className='absolute top-3 right-4 h-5 w-5 hover:h-7 hover:w-7 animate-bounce' onClick={()=>updatePopup.current.style.top='-1000px'}/>
        </div>

        <div className='p-2 flex justify-end mt-10'>
            <Button type="primary" className='my-5' onClick={()=>{handelUpdateBtn()}}>Add</Button>  
        </div>

        <Table pagination={false} columns={columns} dataSource={allCategory} className='!shadow-xl'/>
        
    </div>
  )
}
