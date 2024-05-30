import { useState } from 'react'

import './App.css'

import { Outlet } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)
    console.log("count",count);
  return (
    <>
    <img className='absolute w-screen h-screen z-[-2]' src="\src\assets\WhatsApp Image 2024-05-25 at 13.14.17_0d64ab52.jpg" alt="" />
      {/* <h2 className='bg-gray-950 text-pink-300'>Hello</h2> */}
      <Outlet/>
    </>
  )
}

export default App
