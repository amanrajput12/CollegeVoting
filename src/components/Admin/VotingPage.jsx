import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addVoting} from   '../utils/VotingPanelSlice.jsx'
import { Link, useNavigate } from 'react-router-dom'


const VotingPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
    const [data,setData]= useState([])
          const current = new Date().toISOString()
          const mydate = new Date("2024-04-04T04:51:00.000Z")
          console.log("work on data",mydate);
    useEffect(()=>{
getdata()
    },[])
    const getdata=async()=>{
      const data = await fetch("/v1/voting/getvote",{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      })
      const value = await data.json()

         const mydata = value.data.sort((a,b)=>new Date(a.startTime)-new Date(b.startTime))
      console.log(' data in voting page',mydata,new Date(mydata[0].endTime));
      setData(value.data)
    }
    const handleVote =(data)=>{
       console.log(" on click the title get ",data._id,current>=data.startTime,current<data.endTime);
       if(current>=data.startTime && current<data.endTime ){
        console.log("click is work");
       dispatch(addVoting({
        candidateName:data.candidateName,
        partyName:data.partyName,
        startTime:data.startTime,
        endTime:data.endTime,
        id:data._id
       }))
 navigate("/dashboard")
      }
    }
 console.log("check id",data);
  return (
    <div className='w-[90vw] '>

     {
  data.map((val, i) => (
    <div  key={i}>
      {current >= val.startTime && current < val.endTime && (
        <div >
          <h3 className='flex  justify-center  text-2xl font-bold items-center '>
            Timing
            <p className='ml-2 p-2 rounded-md bg-red-300'>
              {" "}
              From {new Date(val.startTime).toLocaleString("en-GB")}{" "}
            </p>
            <p className='ml-2 p-2 rounded-md bg-red-300'>
              {" "}
              To {new Date(val.endTime).toLocaleString("en-GB")}
            </p>
          </h3>
          <div
            onClick={() => handleVote(val)}
            className='flex gap-6 border-4 border-green-700 p-4 justify-center rounded-lg m-3'
          >
            <h1 className='uppercase text-2xl font-bold'>{val.title}</h1>
          </div>

        </div>
      )}

    </div>
  ))
}

<div className='flex justify-center bg-indigo-400 text-4xl align-middle text-center  h-20 display-2 uppercase mb-10 mt-10 items-center rounded-md shadow-md shadow-black'>
           <Link to='/result' >
           link Check Results
           </Link>
           </div>
 <div className=' flex  shadow-md  shadow-black bg-teal-600 h-20 justify-center  text-4xl align-middle  items-center rounded-md '>

           <Link to='/vote/addvote'> Want to create Poll? <span className='text-yellow-500'>click here</span></Link>
 </div>
    </div>
  )
}

export default VotingPage
