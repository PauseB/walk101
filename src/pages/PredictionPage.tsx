import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'

function PredictionPage() {

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
      <div className="drawer-content p-3">
        {/* Navbar */}
        <div className="w-full navbar rounded-box bg-base-300 mb-4">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div> 
          <div className="flex-1 px-2 mx-2">
            <a className="btn btn-ghost text-xl">WALK101</a>
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              <li><a>오다리</a></li>
              <li><a>평발</a></li>
              <li><a>무릎 운동각도</a></li>
            </ul>
          </div>
          <div className='btn btn-sm btn-ghost mx-2 rounded-full'>
            <ThemeToggle/>
          </div>
        </div>
        
        <div className='max-w-[576px] mx-auto'>
          <Routes>
            <Route path='/oleg'/>
            <Route path='/flatfeet'/>
            <Route path='/kneeangle'/>
          </Routes>
        </div>

      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          {/* Sidebar content here */}
          <li><a>오다리</a></li>
          <li><a>평발</a></li>
          <li><a>무릎 운동각도</a></li>
        </ul>
      </div>
    </div>
  )
}

export default PredictionPage