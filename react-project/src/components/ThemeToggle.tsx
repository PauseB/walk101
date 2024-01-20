import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

function ThemeToggle(){
  const themeList = ["dark", "light"]
  
  const [themeIndex, setThemeIndex] = useState(0)

  useEffect(() => {
    const themeIndex = Number(localStorage.getItem("themeIndex"))
    if (!isNaN(themeIndex)) {
      setThemeIndex(themeIndex)
    }
  }, [])

  const toggleTheme = () => {
    const nextThemeIndex = (themeIndex+1) % themeList.length
    setThemeIndex(nextThemeIndex)
    document.querySelector("html")?.setAttribute("data-theme", themeList[nextThemeIndex])
    localStorage.setItem("themeIndex", ""+nextThemeIndex)
  }

  return (
    <label className={`swap swap-rotate ${themeIndex===1?"swap-active":""}`} onClick={() => toggleTheme()}>
      <FontAwesomeIcon className='swap-off' icon={icon({name: "moon"})} size="xl"/>
      <FontAwesomeIcon className='swap-on' icon={icon({name: "sun"})} size="xl"/>
    </label>
  )
}

export default ThemeToggle