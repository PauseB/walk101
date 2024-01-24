import React, { useState } from 'react'
import ImageFileInput from '../../components/ImageFileInput'
import { predictOLegCallable } from '../../requests'
import AsyncButton from '../../components/AsyncButton'
import { getErrorMessage } from '../../util'
import type { OLegAnalysis, OLegResponse } from "../../../../apiTypedef"
import Predictor from '../../components/Predictor'

function OLegPage() {

  return (
    <Predictor<OLegResponse>
      title="오다리 예측"
      predictFunction={async ({file}) => {
        const res = await predictOLegCallable({file})
        return res.data
      }}
      isReportValid={result => result.analysis != null}
      reportElement={({data, horizontal}) => (
        <>
          <img src={data.analysis.image} className={`w-[300px] ${horizontal ? "aspect-[16/9]" : "aspect-[9/16]"} rounded-box`}/>
          <table className='table text-center'>
            <thead>
              <tr>
                <th colSpan={2}>우측</th>
                <th colSpan={2}>좌측</th>
              </tr>
              <tr>
                <th>형태</th>
                <th>각도</th>
                <th>형태</th>
                <th>각도</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{ data.analysis['right-type'] }</td>
                <td>{ data.analysis['right-angle'] }도</td>
                <td>{ data.analysis['left-type'] }</td>
                <td>{ data.analysis['left-angle'] }도</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    />
  )
}

export default OLegPage