import React, { useState } from 'react'
import ImageFileInput from '../../components/ImageFileInput'
import { OLegAnalysis, predictOLeg } from '../../requests'
import AsyncButton from '../../components/AsyncButton'
import { getErrorMessage } from '../../util'

function OLegPage() {
  const [inputImageData, setInputImageData] = useState<string|null>(null)
  const [result, setResult] = useState<OLegAnalysis|null>(null)

  const predict = async () => {
    if (!inputImageData) return
    try {
      const analysis = await predictOLeg(inputImageData)
      setResult(analysis)
    }
    catch (e) {
      alert("일시적으로 서비스 이용이 불가능합니다.")
      console.log(getErrorMessage(e))
    }

  }

  return (
    <div className='flex flex-col items-center'>
      <div className='p-4 flex flex-col gap-4'>
        <h2 className='text-xl font-bold text-center'>오다리 예측</h2>
        {
          !result
          ? <>
            <ImageFileInput onImageSelected={imageData => setInputImageData(imageData)}/>

            <div>
              <AsyncButton 
                className={`btn ${inputImageData ? "btn-primary" : "btn-disabled"} w-full`}
                disabled={!inputImageData} 
                onClickAsync={predict}>
                분석하기
              </AsyncButton>
            </div>
          </>
          : <>
            <img src={result.image} className='w-[300px] aspect-[9/16]'/>
            <table className='table'>
              <thead>
                <tr>
                  <th className='col-span-2'>우측</th>
                  <th className='col-span-2'>좌측</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{ result['right-type'] }</td>
                  <td>{ result['right-angle'] }도</td>
                  <td>{ result['left-type'] }도</td>
                  <td>{ result['left-angle'] }도</td>
                </tr>
              </tbody>
            </table>

            <button className='btn' onClick={() => {
              setResult(null)
              setInputImageData(null)
            }}>
              다시 시작하기
            </button>
          </>
        }

      </div>

      <div className='w-[300px] mx-auto'>


      </div>

    </div>
  )
}

export default OLegPage