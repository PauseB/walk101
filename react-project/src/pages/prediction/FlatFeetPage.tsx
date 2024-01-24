import React from 'react'
import Predictor from '../../components/Predictor'
import { FeetArchResponse } from '../../../../apiTypedef'

function FlatFeetPage() {
  return (
    <>
      <Predictor<FeetArchResponse> 
        title="좌측 아치"
        horizontal
        predictFunction={async ({file}) => {
          return {}
        }}
        isReportValid={() => true}
        reportElement={({ data }) => (
          <table className='table text-center'>
            <thead>
              <tr>
                <th>각도</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>XX도</td>
              </tr>
            </tbody>
          </table>
        )}
      />

      <Predictor<FeetArchResponse> 
        title="우측 아치"
        horizontal
        predictFunction={async ({file}) => {
          return {}
        }}
        isReportValid={() => true}
        reportElement={({ data }) => (
          <table className='table text-center'>
            <thead>
              <tr>
                <th>각도</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>XX도</td>
              </tr>
            </tbody>
          </table>
        )}
      />
        
      <div className='grid grid-cols-2'>
        <Predictor<FeetArchResponse> 
          title="좌측 뒤꿈치"
          predictFunction={async ({file}) => {
            return {}
          }}
          isReportValid={() => true}
          reportElement={({ data }) => (
            <table className='table text-center'>
              <thead>
                <tr>
                  <th>각도</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>XX도</td>
                </tr>
              </tbody>
            </table>
          )}
        />
        <Predictor<FeetArchResponse> 
          title="우측 뒤꿈치"
          predictFunction={async ({file}) => {
            return {}
          }}
          isReportValid={() => true}
          reportElement={({ data }) => (
            <table className='table text-center'>
              <thead>
                <tr>
                  <th>각도</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>XX도</td>
                </tr>
              </tbody>
            </table>
          )}
        />
      </div>
    </>
  )
}

export default FlatFeetPage