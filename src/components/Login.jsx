import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addUser } from './utils/UserSlice'
import Register from './Register'


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [data,setData]= useState({
    email:"",
    password:""
  })



  const fetchLogin= async()=>{
    const login = await fetch("/v1/user/login",{
      method:"POST",
      headers: {
        "Content-Type": "application/json"
    },
      body:JSON.stringify(data)
    })
    const value = await login.json()
    console.log('datain login',value);
    if(value.data.verfied){
       dispatch(addUser({email:value.data.email,userName:value.data.userName,verified:value.data.verfied}))
      navigate("/vote/voting")
    }

  }


  return (
    <div className='flex w-full items-center h-screen'>
    <div className='flex justify-center bg-white  border-2   shadow-2xl shadow-black  w-[45vw] h-96 rounded-lg items-center mx-auto' >
        <form onClick={(e)=>e.preventDefault()} className='flex flex-col  ' >

          <input onChange={(e)=>setData({...data,email:e.target.value})} className='text-center   border-none outline-none shadow-2xl shadow-black  mb-6 h-8 w-[40vw] rounded-xl'  type="email"  placeholder='Email'/>
          <input onChange={(e)=>setData({...data,password:e.target.value})} className='text-center   border-none outline-none shadow-2xl shadow-black  mb-6 h-8 w-[40vw] rounded-xl' type="password" name=""  placeholder='Password'/>
          <input onClick={fetchLogin} className='text-center border-none hover:bg-slate-900   border-indigo-400  mb-3 rounded-xl bg-cyan-900 text-slate-200  h-8' type="submit" value="Login" />
        <div className='flex justify-center'>
          New User? <Link to='/register' className='text-blue-800'>Register</Link>
        </div>
        </form>
    </div>
    </div>
  )
}

export default Login
