import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import React from 'react'
import ThemeToggle from '../components/ThemeToggle'
import { Link } from 'react-router-dom'

function MainPage() {
  return (
    <>
      <div className='h-16 px-4 flex flex-row items-center'>
        <div className='flex-auto'/>
        <div className='flex-0'>
          <ThemeToggle/>
        </div>
      </div>
      
      <div className='max-w-[576px] mx-auto px-8 py-4'>
        <h1 className='text-6xl font-bold text-center mb-8'>WALK101</h1>
        
        <div className='flex flex-row justify-center mb-16'>
          <button data-toggle-theme="dark,light" data-act-class="ACTIVECLASS"></button>
        </div>

        <div className='flex flex-col align-center gap-12'>
          <Link to="/prediction/oleg">
            <button className='btn text-lg w-full'>
              오다리 예측
            </button>
          </Link>
          <Link to="/prediction/flatfeet">
            <button className='btn text-lg w-full'>
              평발 예측
            </button>
          </Link>
          <Link to="/prediction/kneeangle">
            <button className='btn text-lg w-full '>
              무릎 운동각도 측정
            </button>
          </Link>
        </div>
      </div>
    </>

  )
}

export default MainPage