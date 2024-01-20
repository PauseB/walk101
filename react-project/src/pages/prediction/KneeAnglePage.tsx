import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react"
import Webcam from "react-webcam"

function KneeAnglePage() {
  const [deviceIndex, setDeviceIndex] = useState(0);
  const [devices, setDevices] = useState<MediaDeviceInfo[] | null>(null);

  const handleDevices =(mediaDevices: MediaDeviceInfo[]) => {
    setDevices(mediaDevices.filter(d => d. kind === "videoinput"))
    setDeviceIndex(0)
  }

  React.useEffect(
    () => {
      navigator.mediaDevices.enumerateDevices().then(handleDevices);
    },
    [handleDevices]
  );



  if (devices != null) return (
    <>
      <h2 className='text-xl font-bold text-center mb-4'>무릎 운동각도 측정</h2>
      <Webcam
        className="w-full"
        videoConstraints={{
          aspectRatio: 16/9,
          deviceId: devices[deviceIndex].deviceId
        }}
      />    
    </>
  )

  else return (
    <div className={`relative aspect-[16/9] flex flex-col justify-center items-center gap-4 rounded-box bg-base-200 hover:text-primary transition-colors`}>
      <FontAwesomeIcon icon={icon({name: "ban"})} size="2x"/>
      <span className='text-sm'>연결된 장치가 없습니다</span>
    </div>
  )
}

export default KneeAnglePage