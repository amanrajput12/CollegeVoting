import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeVoting } from './utils/VotingPanelSlice.jsx'


const Vote = () => {
    const data = useSelector((store)=>store.vote)
    const email = useSelector((store)=>store.user.email)
    console.log("check email ",email);
    const dispatch = useDispatch()
    const navigate = useNavigate()
     const [name,setName] = useState([])
     const [party,setParty] = useState([])
     const [result,setResult]= useState({
      partyName:"",
      candidateName:"",
      id:"",
      email
     })

     console.log("check",Array.isArray(name));
     useEffect(()=>{
      handleAdd()
     },[data])
       const handleAdd =()=>{
       for(let i=0;i<data?.candidateName[0]?.split(",")?.length;i++){
        setName(data?.candidateName[0]?.split(","))
        setParty(data?.partyName[0]?.split(","))
       }
       }
    console.log( " name in the ",name,party,data)
    const handleSubmit =async()=>{
      console.log("click on the ",result);
      const data = await fetch("/v1/result/add",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"

        },
        body:JSON.stringify(result)
      })

      if(data.status===201){
        console.log(" sucesss");
        alert('success')
        dispatch(removeVoting())
        navigate("/vote/voting")
      }
    }
  return (
    <div className='flex flex-col w-[60vw] justify-around '>

     {name.map((voting,i)=>
      <div onClick={()=>setResult({candidateName:voting,partyName:party[i],id:data.VotingId,email:email})} className='flex justify-center gap-10 p-4 border-4 rounded-2xl m-5 bg-sky-200 shadow-2xl text-stone-700' key={i}>

            <div>
               <input type="radio" name="candidate" id="" />
               </div>
               <div>
               <div className='gap-5 text-yellow-800'>
                {voting}
                <span className='uppercase text-red-600'> ({party[i]}) </span>
                </div>
                </div>
      </div>
     )}
     <button onClick={handleSubmit} className='bg-green-500 rounded-lg p-3 w-40 self-center text-yellow-50'>Submit</button>
    </div>
  )
}

export default Vote
