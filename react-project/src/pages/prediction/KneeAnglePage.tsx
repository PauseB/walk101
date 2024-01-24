import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react"
import Webcam from "react-webcam"
import VideoFileInput from "../../components/VideoFileInput";

function KneeAnglePage() {
  return (
    <>
      <h2 className='text-xl font-bold text-center mb-4'>무릎 운동각도 측정</h2>
      <VideoFileInput 
        horizontal
        onVideoSelected={(videoData) => {
        
        }}
      />
    </>
  )
}

export default KneeAnglePage