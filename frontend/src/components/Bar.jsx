import React from 'react'
import Barchart from "../components/Barchart";
function Bar() {

  return (
    <div className=' flex flex-col justify-center items-center bg-white text-black w-screen h-screen m-auto text-center '>
        <h1 className="font-mono text-2xl">Articles vs Likes</h1>
        <Barchart/>
    </div>
  )
}
export default Bar;
