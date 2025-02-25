import React from 'react'
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';


export const OrderResult = () => {

    const view = useNavigate()
  return (
    <div className='h-screen'>
        <Result
        className='h-full'
        status="success"
        title="Successfully Purchased"
        subTitle="Order number: 2017182818828182881. Thankyou for Purchasing"
        extra={[
          <Button type="primary" onClick={()=>view('/')} key="console">Buy Again</Button>,
          <Button onClick={()=>view('/vieworder')} key="buy">View Order</Button>,
        ]}
      />
    </div>
  )
}
