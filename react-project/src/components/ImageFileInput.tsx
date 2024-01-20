import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import React, { ChangeEvent, useRef, useState } from 'react'
import Webcam from 'react-webcam'


type ImageFileInputProps = {
  onImageSelected: (imageData: string|null) => void,
  horizontal?: boolean,
}
function ImageFileInput({ onImageSelected, horizontal=false }: ImageFileInputProps) {
  const [imageData, setImageData] = useState<string|null>(null)
  const [cameraMode, setCameraMode] = useState<boolean>(false)

  const webcamRef = useRef(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImageData(result);
        onImageSelected(result)
      };
      reader.readAsDataURL(file);
    }
  }

  const handleDeleteClick = (e: React.MouseEvent<any>) => {
    e.stopPropagation()
    setImageData(null)
    onImageSelected(null)
  }


  const WebcamContainer = () => {
    const [deviceIndex, setDeviceIndex] = useState(0);
    const [devices, setDevices] = useState<MediaDeviceInfo[] | null>(null);
  
    const handleDevices =(mediaDevices: MediaDeviceInfo[]) => {
      setDevices(mediaDevices.filter(d => d. kind === "videoinput"))
      setDeviceIndex(0)
    }


    const captureImage = () => {
      if (webcamRef) {
        // @ts-ignore
        const imageSrc = webcamRef.current.getScreenshot()
        setImageData(imageSrc)
        onImageSelected(imageSrc)
        setCameraMode(false)
      }
      else {
        alert("카메라가 준비되지 않았습니다.")
      }
    }
  
    React.useEffect(
      () => {
        navigator.mediaDevices.enumerateDevices().then(handleDevices);
      },
      [handleDevices]
    );

    if (devices != null) return (
      <>
        <Webcam
          ref={webcamRef}
          screenshotFormat='image/jpeg'
          videoConstraints={{
            aspectRatio: horizontal ? 16/9 : 9/16,
            deviceId: devices[deviceIndex].deviceId
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
            onClick={() => setDeviceIndex(n => (n+1) % devices.length)}
          >
            장치 변경
          </button>
          <button 
            className='flex-1 join-item btn btn-sm btn-primary'
            onClick={() => captureImage()}
          >
            촬영
          </button>
        </div>
        
      </>
    )

    else return (
      <div className={`relative ${horizontal?"aspect-[16/9]":"aspect-[9/16]"} flex flex-col justify-center items-center gap-4 rounded-box bg-base-200 hover:text-primary transition-colors`}>
        <FontAwesomeIcon icon={icon({name: "ban"})} size="2x"/>
        <span className='text-sm'>연결된 장치가 없습니다</span>
      </div>
    )
  }

  return (
    <>
      {
        imageData == null && (
          !cameraMode
            ? <div className={`grid ${horizontal?"grid-cols-[1fr_16px_1fr]":"grid-rows-[1fr_16px_1fr]"} rounded-box bg-base-200 ${horizontal?"aspect-[16/9]":"aspect-[9/16]"}`}>
              <label className={`p-2 flex flex-col justify-center items-center gap-4 cursor-pointer hover:text-primary transition-colors`}>
                <FontAwesomeIcon icon={icon({name: "upload"})} size="2x"/>
                <span className='text-xs'>사진 파일 선택</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  hidden 
                  onChange={handleFileChange}
                />
              </label>
              <div className={`divider ${horizontal?"divider-horizontal":"divider-vertical"} m-0 text-sm`}>OR</div>
              <button 
                className={`p-2 flex flex-col justify-center items-center gap-4 cursor-pointer hover:text-primary transition-colors`}
                onClick={() => setCameraMode(true)}
              >
                <FontAwesomeIcon icon={icon({name: "camera"})} size="2x"/>
                <span className='text-xs'>촬영</span>
              </button>
            </div>
          : <WebcamContainer/>

        )
      }
      {
        imageData != null &&
        <div className={`relative ${horizontal?"aspect-[16/9]":"aspect-[9/16]"} flex flex-col justify-center items-center gap-4 rounded-box bg-base-200 hover:text-primary transition-colors`}>
          {
            imageData == null
            ? <span className='loading loading-spinner'/>
            : <img src={imageData} className='w-full h-full rounded-box'/>
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

export default ImageFileInput