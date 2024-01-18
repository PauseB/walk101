import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import React, { ChangeEvent, useState } from 'react'


type ImageFileInputProps = {
  onImageSelected: (imageData: string|null) => void,
}
function ImageFileInput({ onImageSelected }: ImageFileInputProps) {
  const [file, setFile] = useState<File|null>(null)
  const [imageData, setImageData] = useState<string|null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      setFile(file)
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
    setFile(null)
    setImageData(null)
    onImageSelected(null)
  }

  return (
    <>
      {
        file == null &&
        <label>
          <div className='w-[300px] aspect-[9/16] flex flex-col justify-center items-center gap-4 cursor-pointer rounded-box bg-base-200 hover:text-primary transition-colors'>
            <FontAwesomeIcon icon={icon({name: "upload"})} size="2x"/>
            <span className='text-sm'>사진을 선택해주세요</span>
          </div>
          <input 
            type="file" 
            accept="image/*" 
            hidden 
            onChange={handleFileChange}
          />
        </label>
      }
      {
        file != null &&
        <div className='relative w-[300px] aspect-[9/16] flex flex-col justify-center items-center gap-4 rounded-box bg-base-200 hover:text-primary transition-colors'>
          {
            imageData == null
            ? <span className='loading loading-spinner'/>
            : <img src={imageData} className='w-full h-full'/>
          }
          <FontAwesomeIcon 
            className='absolute top-2 right-2 text-red-600 cursor-pointer' 
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