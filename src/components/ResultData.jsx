import React, { useState,useEffect } from 'react'
 import {useNavigate} from "react-router-dom"
 import { useDispatch } from 'react-redux'
import { addResult } from './utils/ResultSlice'

const ResultData = () => {
    const [data,setData]= useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const current = new Date().toISOString()
    const [result,setResult]= useState({
        candidateName:"",
        partyName:"",
        result:""
    })
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
        console.log(' data in voting page',value);
        setData(value.data)
      }
      const handleVote = async (val) => {
        console.log('in handleVote', val);

        try {
            const updatedResults = [];

            for (let x = 0; x < val.partyName[0].split(",").length; x++) {
                console.log("onClick the result", x);

                const response = await fetch("v1/result/get", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        partyName: val.partyName[0].split(',')[x],
                        id: val._id
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch result');
                }

                const data = await response.json();
                console.log("getData on each", data);

                setResult(prevResult => ({
                    ...prevResult,
                    partyName: val.partyName[0].split(',')[x],
                    candidateName: val.candidateName[0].split(",")[x],
                    result: data.result
                }));

                updatedResults.push({
                    partyName: val.partyName[0].split(',')[x],
                    candidateName: val.candidateName[0].split(",")[x],
                    result: data.result
                });
            }

            setResult(updatedResults);
            dispatch(addResult(updatedResults));
            navigate(`/result/${val.title}`);
        } catch (error) {
            console.error('Error handling vote:', error);
            // Handle error, maybe show a message to the user
        }
    }

      console.log("for result on page",result);
  return (
    <div>

         {

            data.map((val,i)=>
            <div className='flex justify-center text-center pt-10 ' key={i}>{
              current>val.endTime &&
                <div  >
                   <h3 className='p-2'>
        Result Timing
        <span className='ml-2 p-2   rounded-md  bg-red-300'>
        {new Date(val.endTime).toLocaleString('en-GB')}
        </span>
      </h3>
                <div   onClick={()=>handleVote(val)} className='flex gap-6 border-4 border-blue-700 p-4 justify-center rounded-lg  m-3  '>
                <h1 className='uppercase text-2xl font-bold w-[50vw]'> {val.title}</h1>

                </div>

             </div>
}
            </div>
            )

         }

    </div>
  )
}

export default ResultData
