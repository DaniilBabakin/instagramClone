import React from 'react';
import { storage} from '../../lib/firebase';

export default function WarningModal ({warningActive,setWarningActive,selectedFile,setFinalActive,setSelectedFile,setImageUrl}) {

  const handleDelete = (event) => {
    if(selectedFile !== null) {
      const uploadTask = storage.ref(`/images/${selectedFile.name}`)
      uploadTask.delete(selectedFile)
    }
    setImageUrl(null)
    setSelectedFile(null)
    setFinalActive(false)
    setWarningActive(false)
  }
  const handleCancel = () => {
    setWarningActive(false)
  }
  
  return (
    <div className={` flex justify-center items-center h-screen w-screen bg-black-faded fixed top-0 left-0 z-50 transition duration-300 pointer-events-none ${warningActive ? "opacity-1 pointer-events-auto" : "opacity-0"}`} onClick={()=> {setWarningActive(false)}}>
    
      <div className={`flex flex-col justify-center items-center rounded-xl bg-white transition duration-300 w-fit pointer-events-none ${warningActive ? "scale-1 pointer-events-auto" : "scale-125"}`} onClick={e=>e.stopPropagation()}>

        <div className='w-full px-10  py-6'>
          <p className='text-lg font-medium mb-1'>Отменить публикацию?</p>
          <p className='text-base text-gray-base font-light mb-2'>Если вы выйдете,изменения не будут сохранены.</p>
        </div>

         <button className='w-full text-red-primary text-sm font-bold py-3 border border-gray-primary' onClick={handleDelete}>Удалить</button>
         <button className='w-full text-sm py-3' onClick={handleCancel}>Отмена</button>
         
      </div>
    </div>
  )
}
