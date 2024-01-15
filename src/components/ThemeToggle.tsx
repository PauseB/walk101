import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

function ThemeToggle(){
  const themeList = ["dark", "light"]
  
  const [themeIndex, setThemeIndex] = useState(0)

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", themeList[themeIndex])
  }, [themeIndex])

  return (
    <label className="swap swap-rotate">
      <input type="checkbox" onClick={() => setThemeIndex(prev => (prev+1) % themeList.length)}/>
      <FontAwesomeIcon className='swap-off' icon={icon({name: "moon"})} size="xl"/>
      <FontAwesomeIcon className='swap-on' icon={icon({name: "sun"})} size="xl"/>
    </label>
  )
}

export default ThemeToggle