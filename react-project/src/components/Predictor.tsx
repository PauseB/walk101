import React, { ReactNode, useState } from 'react'
import { getErrorMessage } from '../util'
import ImageFileInput from './ImageFileInput'
import AsyncButton from './AsyncButton'


type Predictor<T> = {
  title: string,
  predictFunction: (req: {file: string}) => Promise<T>,
  reportElement: (props: {data: T, horizontal: boolean}) => React.JSX.Element,
  horizontal?: boolean,
}
function Predictor<T>(props: Predictor<T>) {
  const [inputImageData, setInputImageData] = useState<string|null>(null)
  const [result, setResult] = useState<T|null>(null)

  const horizontal = props.horizontal ?? false

  const predict = async () => {
    if (!inputImageData) return
    try {
      const res = await props.predictFunction({file: inputImageData})
      setResult(res)
    }
    catch (e) {
      alert("일시적으로 서비스 이용이 불가능합니다.")
      console.log(getErrorMessage(e))
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <div className={`p-4 flex flex-col gap-4 w-full ${horizontal ? "max-w-[450px]" : "max-w-[300px]"}`}>
        <h2 className='text-xl font-bold text-center'>{ props.title }</h2>
        {
          !result
          ? <>
            <ImageFileInput onImageSelected={imageData => setInputImageData(imageData)} horizontal={horizontal}/>

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
            <props.reportElement data={result} horizontal={horizontal}/>

            <button className='btn' onClick={() => {
              setResult(null)
              setInputImageData(null)
            }}>
              다시 시작하기
            </button>
          </>
        }

      </div>

    </div>
  )
}

export default Predictor