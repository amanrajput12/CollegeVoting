import React, { useState } from 'react'

import { Outlet } from 'react-router-dom'
import DatePicker from '../utils/DatePicker'


const VotingSetup = () => {

  return (
    <div className='flex items-center justify-center h-screen'>


         <Outlet/>
    </div>
  )
}

export default VotingSetup
