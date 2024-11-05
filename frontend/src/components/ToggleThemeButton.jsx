import React from 'react'
import { Button } from 'antd'
import {HiMoon, HiSun} from 'react-icons/hi'
const ToggleThemeButton = ({darkTheme,toggleTheme}) => {
  return (
    <div className='toggle-theme-btn m-auto text-center mt-6'><Button  className = "text-black w-20 border-none text-2xl  focus:border-none" onClick={toggleTheme}>{darkTheme? <HiSun/>: <HiMoon/>}
    </Button></div>
  )
}

export default ToggleThemeButton;