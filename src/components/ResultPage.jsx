import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const ResultPage = () => {
    const result = useSelector(store =>store.result.Data)
    const [value,setValue]= useState()
    useEffect(()=>{
        setValue(result)
    },[])
    console.log("data in result page",result,Array.isArray(result));
  return (
    <div className='flex  p-10 shadow-2xl shadow-slate-800'>
      <div className='uppercase font-bold'>Voting Result</div>
      {
      value?.map((data)=>
     <div className='ml-8'>
        CandidateName : {data.candidateName}
         TotalVotes : {data.result}
     </div>
    )
      }
    </div>
  )
}

export default ResultPage
