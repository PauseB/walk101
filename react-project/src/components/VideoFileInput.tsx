import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import React, { ChangeEvent, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import MediaDeviceModal from './MediaDeviceModal'


type VideoFileInputProps = {
  onVideoSelected: (videoData: string|null) => void,
  horizontal?: boolean,
}
function VideoFileInput({ onVideoSelected, horizontal=false }: VideoFileInputProps) {
  const [videoData, setVideoData] = useState<string|null>(null)
  const [cameraMode, setCameraMode] = useState<boolean>(false)


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setVideoData(result);
        onVideoSelected(result)
      };
      reader.readAsDataURL(file);
    }
  }

  const handleDeleteClick = (e: React.MouseEvent<any>) => {
    e.stopPropagation()
    setVideoData(null)
    onVideoSelected(null)
  }


  const WebcamContainer = () => {
    const [device, setDevice] = useState<MediaDeviceInfo | null>(null);
    const [modal, setModal] = useState<boolean>(true)

    const webcamRef = useRef(null)
  
    return (
      <>
        {
          device != null
          ? <>
            <Webcam
              className={`w-full ${horizontal ? "aspect-[16/9]" : "aspect-[9/16]"}`}
              ref={webcamRef}
              screenshotFormat='image/jpeg'
              videoConstraints={{
                aspectRatio: horizontal ? 16/9 : 9/16,
                deviceId: device.deviceId
              }}
            />
            <div className='join flex flex-row'>
              <button 
                className='flex-1 join-item btn btn-sm btn-error'
                onClick={() => setCameraMode(false)}
              >
                취소
              </button>
              <button 
                className='flex-1 join-item btn btn-sm btn-neutral'
                onClick={() => setModal(true)}
              >
                장치 변경
              </button>
            </div>
          </>
          : <>
            <div className={`relative ${horizontal?"aspect-[16/9]":"aspect-[9/16]"} flex flex-col justify-center items-center gap-4 rounded-box bg-base-200 hover:text-primary transition-colors`}>
              <FontAwesomeIcon icon={icon({name: "ban"})} size="2x"/>
              <span className='text-sm'>선택한 장치가 없습니다</span>
            </div>

            <div className='join flex flex-row'>
              <button 
                className='flex-1 join-item btn btn-sm btn-error'
                onClick={() => setCameraMode(false)}
              >
                취소
              </button>
              <button 
                className='flex-1 join-item btn btn-sm btn-neutral'
                onClick={() => setModal(true)}
              >
                장치 변경
              </button>
            </div>
          </>
        }

        {
          modal && <MediaDeviceModal 
            onDeviceSelected={setDevice} 
            onClose={() => setModal(false)}
          />
        }
      </>
    )
  }

  return (
    <>
      {
        videoData == null && (
          !cameraMode
            ? <div className={`grid ${horizontal?"grid-cols-[1fr_16px_1fr]":"grid-rows-[1fr_16px_1fr]"} rounded-box bg-base-200 ${horizontal?"aspect-[16/9]":"aspect-[9/16]"}`}>
              <label className={`p-2 flex flex-col justify-center items-center gap-4 cursor-pointer hover:text-primary transition-colors`}>
                <FontAwesomeIcon icon={icon({name: "upload"})} size="2x"/>
                <span className='text-xs'>영상 파일 선택</span>
                <input 
                  type="file" 
                  accept="video/*" 
                  hidden 
                  onChange={handleFileChange}
                />
              </label>
              <div className={`divider ${horizontal?"divider-horizontal":"divider-vertical"} m-0 text-sm`}>OR</div>
              <button 
                className={`p-2 flex flex-col justify-center items-center gap-4 cursor-pointer hover:text-primary transition-colors`}
                onClick={() => setCameraMode(true)}
              >
                <FontAwesomeIcon icon={icon({name: "video"})} size="2x"/>
                <span className='text-xs'>촬영</span>
              </button>
            </div>
          : <WebcamContainer/>

        )
      }
      {
        videoData != null &&
        <div className={`relative ${horizontal?"aspect-[16/9]":"aspect-[9/16]"} flex flex-col justify-center items-center gap-4 rounded-box bg-base-200 hover:text-primary transition-colors`}>
          {
            videoData == null
            ? <span className='loading loading-spinner'/>
            : <video src={videoData} className='w-full h-full rounded-box'/>
          }
          <FontAwesomeIcon 
            className='absolute top-2 right-2 text-base-content hover:text-base-300 hover:scale-110 transition-all cursor-pointer' 
            onClick={handleDeleteClick}
            icon={icon({name: "xmark"})} 
            size="2x"
          />
        </div>
      }


    </>
  )
}

export default VideoFileInput