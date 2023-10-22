import React from 'react'
import Layout from '../components/Layout'
import { Button, Modal, Space, Table,Form,Input,message } from 'antd'
import { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
function Home() {

  const [showModal,setShowModal]=useState(false);
  const [allContact,setAllContact]=useState([]);
  const [editAble,setEditAble]=useState(null);
  const [searchInput,setSearchInput]=useState('');

  const handleSubmit=async(values)=>{
    try{

        const userDet=JSON.parse(localStorage.getItem('user'));
        console.log(values);
        console.log(userDet.user._id)
      if(editAble) {
        
        await axios.post('http://127.0.0.1:3000/contact/updateContact',
        {payload:{...values,userId:userDet.user._id},contactId:editAble._id })
        message.success("Contact added successfully")
        setEditAble(null);
        setShowModal(false);
        location.reload();
      }else{
        await axios.post('http://127.0.0.1:3000/contact/addNewContact',{...values,userid:userDet.user._id})
        message.success("Contact added successfully")
        setShowModal(false);
        location.reload();
      }
        
    }
    catch(err){
      console.log(err);
      message.error("failed to add contact")

    }

    location.reload();
}

const getAllContact=async()=>{
  try{
    const userIdFetch=JSON.parse(localStorage.getItem('user'));
    //console.log(typeof userIdFetch.user._id)
    const userId=userIdFetch.user._id
    const res=await axios.post('http://127.0.0.1:3000/contact/getAllContactDetails',{userid:userId})
    setAllContact(res.data);
  }
  catch(err){
    console.log(err);
    message.error("Fetch issue with transaction");
  }
}
const handleDeleteContact=async(values)=>{
    
     try{
        await axios.post('http://127.0.0.1:3000/contact/deleteContact',{contactId:values._id});
        message.error("Deleted successfully")
        location.reload();
     }
     catch(err){
      message.error("Fail to delete contact");
     }
}
  const columns=[
    {
      title:'Name',
      dataIndex:'contactName',
      width:200
    },{
      title:'Email',
      dataIndex:'contactEmail',
      width:200

    },
    {
      title:'Mobile Number',
      dataIndex:'contactPhoneNumber',
      width:200
    },
    {
      title:'Actions',
      width:200,
      
      render:(text,record)=>(
        <Space>
          <Button type="primary" onClick={()=>{setEditAble(record); setShowModal(true)}}>Edit</Button>
          <Button type="primary" danger onClick={()=>{handleDeleteContact(record)}} >Delete</Button>
        </Space>
      )
  }
  ]

const handleSearchInput=(e)=>{
  e.preventDefault();
  const newSearchInput=allContact.filter(contact=>contact.contactName.toLowerCase().includes(searchInput.toLowerCase()));
  console.log(newSearchInput)
  setAllContact(newSearchInput);
}

  useEffect(() => {
    getAllContact();
  },[]);
  
  return (
    <Layout>
        <div className='filters'>
          <form style={{display:"flex"}} onSubmit={handleSearchInput}>
          
              <input type="text" name="searchInput" id="searchInput" value={searchInput} 
              onChange={(e)=>setSearchInput(e.target.value)} 
              placeholder='Search Contact' style={{width:"40vw"}} />
            
              <button className="btn btn-primary" type="submit" style={{marginLeft:"10px"}}  >Search</button>
          </form>
          <div>
          {/* <a className='btn btn-danger' href="/" >Reload Contact</a> */}
          <button className='btn btn-danger me-4' onClick={()=>{location.reload();}} >Reload Contact</button>
            <button type="submit" className='btn btn-primary' onClick={()=>{setShowModal(true)}} >Add New</button>
          </div>
        </div>

        <div className="content-table">
        
        {allContact.length == 0 ?(
            <h3>No Contacts created</h3>
        ):
        (<>
          <p>Your Total Contacts : {allContact.length}</p>
            <Table  columns={columns} dataSource={allContact}/>
        </>
        )
        
        }
        
        </div>
    <Modal 
      title={editAble?"Edit Contact":"Add Contact"}
      open={showModal}
      onCancel={()=>{ setEditAble(null);setShowModal(false)}}
      footer={false}
    >
      <Form layout="vertical" onFinish={handleSubmit} initialValues={editAble}>

      <Form.Item label="Name" name="contactName" >
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Email" name="contactEmail" >
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Mobile Number" name="contactPhoneNumber" >
          <Input type="text" />
        </Form.Item>

           
<div className="d-flex justify-content-end">
<button className="btn btn-primary" >
    Save
</button>
</div>

      </Form>      

    </Modal>
    </Layout>
        
  )
}

export default Home