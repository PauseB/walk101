import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import OLegPage from './prediction/OLegPage'
import FlatFeetPage from './prediction/FlatFeetPage'

function PredictionPage() {
  const navLinkClass = ({isActive}: {isActive: boolean}) => isActive ? "active" : "" 

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
      <div className="drawer-content p-3">
        {/* Navbar */}
        <div className="w-full navbar rounded-box bg-base-300 mb-4">
          <div className="flex-none md:hidden">
            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div> 
          <div className="flex-1 px-2 mx-2">
            <a className="btn btn-ghost text-xl">WALK101</a>
          </div>
          <div className="flex-none hidden md:block">
            <ul className="menu menu-horizontal">
              <li><NavLink 
                to="/prediction/oleg" 
                className={navLinkClass}
              >
                오다리
              </NavLink></li>
              <li><NavLink 
                to="/prediction/flatfeet" 
                className={navLinkClass}
              >
                평발
              </NavLink></li>
              <li><NavLink 
                to="/prediction/kneeangle" 
                className={navLinkClass}
              >
                무릎 운동각도
              </NavLink></li>
            </ul>
          </div>
          <div className='btn btn-sm btn-ghost mx-2 rounded-full'>
            <ThemeToggle/>
          </div>
        </div>
        
        <div className='max-w-[900px] mx-auto'>
          <Routes>
            <Route path='/oleg' element={<OLegPage/>}/>
            <Route path='/flatfeet' element={<FlatFeetPage/>}/>
            <Route path='/kneeangle'/>
          </Routes>
        </div>

      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          <li><NavLink 
            to="/prediction/oleg" 
            className={navLinkClass}
          >
            오다리
          </NavLink></li>
          <li><NavLink 
            to="/prediction/flatfeet" 
            className={navLinkClass}
          >
            평발
          </NavLink></li>
          <li><NavLink 
            to="/prediction/kneeangle" 
            className={navLinkClass}
          >
            무릎 운동각도
          </NavLink></li>
        </ul>
      </div>
    </div>
  )
}

export default PredictionPage