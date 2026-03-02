import React from 'react'
import { useTheme } from '../state/ThemeContext'

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
  return (
   <button className='bg-amber-800' onClick={toggleTheme} >
    Curent Theme : {theme}
   </button>
  )
}

export default ThemeToggle