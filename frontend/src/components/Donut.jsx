import React from 'react'
import Donutchart from "../components/Donutchart";
function Donut() {

  return (
    <div className=' flex flex-col justify-center items-center bg-white text-black w-screen h-screen m-auto text-center '>
        <h1 className="font-mono text-2xl">Words</h1>
        <Donutchart/>
    </div>
  )
}
export default Donut;