import React from 'react'
import Linechart from "../components/LineChart";
function Line() {

  return (
    <div className=' flex flex-col justify-center items-center bg-white text-black w-screen h-screen m-auto text-center '>
        <h1 className="font-mono text-2xl">Authors vs Likes</h1>
        <Linechart/>
    </div>
  )
}
export default Line;