import React, { useEffect } from 'react'


type MediaDeviceModalProps = {
  onDeviceSelected: (deviceInfo: MediaDeviceInfo) => void,
  onClose: () => void
}
function MediaDeviceModal({ onDeviceSelected, onClose }: MediaDeviceModalProps) {
  const [devices, setDevices] = React.useState<MediaDeviceInfo[] | null>(null);
  
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices()
    .then(d => setDevices(d.filter(d => d. kind === "videoinput")))
    .catch(() => setDevices(null))
  }, []);

  return (
    <dialog className="modal" open onClose={onClose}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">장치 선택</h3>
        {
          devices != null
          ? <table className='table'>
            <tbody>
              {
                devices.map(d => (
                  <tr 
                    className='hover' 
                    onClick={() => {
                      onDeviceSelected(d)
                      onClose()
                    }} 
                    key={d.deviceId}
                  >
                    <td>{ d.label }</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          : <span>장치를 찾을 수 없습니다</span>
        }
      </div>

      <form method="dialog" className="modal-backdrop backdrop-brightness-50">
        <button>close</button>
      </form>
    </dialog>
  )
}

export default MediaDeviceModal