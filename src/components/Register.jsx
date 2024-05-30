import React, { useState } from 'react'
import Login from './Login';
import { Link } from 'react-router-dom';
import "react-toastify/ReactToastify.css"
import { ToastContainer,toast } from 'react-toastify';


const Register = () => {
  const [data,setData]= useState({
    email:"",
    password:"",
    userName:""
  })
  const toastOption={
    position:"bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:"light"
  }
  console.log(data);
  const handleRegister = async()=>{
   const register = await fetch("/v1/register",{
    method:"POST",
    headers:{
     "Content-Type": "application/json"
    },
    body:JSON.stringify(data)
   })
   const value = await register.json()
   if(register.status===400)
    {
      toast.error(value.message,toastOption);
      alert(value.message)

    }
    else alert(value.message)
   console.log("register data",value.message,register.status);

  }
  return (
    <div className='flex w-full items-center h-screen '>
    <div className='flex justify-center bg-white  border-2   shadow-2xl shadow-black  w-[45vw] h-96 rounded-lg items-center mx-auto' >
        <form onSubmit={(e)=>e.preventDefault()} className='flex flex-col ' >
          <input onChange={(e)=>setData({...data,userName:e.target.value})} className='text-center   border-none outline-none shadow-2xl shadow-black  mb-6 h-8 w-[40vw] rounded-xl' type="text" placeholder='UserName' />
          <input onChange={(e)=>setData({...data,email:e.target.value})} className='text-center   border-none outline-none shadow-2xl shadow-black  mb-6 h-8 w-[40vw] rounded-xl' type="email"  placeholder='Email'/>
          <input onChange={(e)=>setData({...data,password:e.target.value})} className='text-center   border-none outline-none shadow-2xl shadow-black  mb-6 h-8 w-[40vw] rounded-xl' type="password" name=""  placeholder='Password'/>
          <input onClick={handleRegister} className='text-center border-none hover:bg-slate-900   border-indigo-400  mb-3 rounded-xl bg-cyan-900 text-slate-200  h-8' type="submit" value="Register" />
          <div className='flex justify-center'>
          Already Register? <Link to='/' className='text-blue-800'>Login</Link>
        </div>
        </form>
    </div>
    </div>
  )
}

export default Register
