import React, { useEffect, useState} from 'react';
import { storage} from '../../lib/firebase';
import random from 'random-string-generator'
import FinalModal from './final-modal';

export default function Modal ({active,setActive}) {
  const [finalModalActive,setFinalModalActive] = useState(false)
  const [imageUrl,setImageUrl] = useState(null)
  const [selectedFile,setSelectedFile] = useState(null)
  const [newDocId,setNewDocId] = useState(null)
  const [warningActive,setWarningActive] = useState(false)
  useEffect(() => {
    if(selectedFile!==null){
      const uploadTask = storage.ref(`/images/${selectedFile.name}`)

    uploadTask.put(selectedFile).then(function() {
      uploadTask.getDownloadURL().then(function(downloadURL) {
          setImageUrl(downloadURL)
          setActive(false)
          setFinalModalActive(true)
      });
  });
    }
  }, [selectedFile])
  const handleFileSet = (event) => {
    setSelectedFile(event.target.files[0])
    setNewDocId(random(20))
  }
  return (
    <div>

      <FinalModal setActive={setActive} finalActive={finalModalActive} setFinalActive={setFinalModalActive} newDocId={newDocId} imageUrl={imageUrl} selectedFile={selectedFile} warningActive={warningActive} setWarningActive={setWarningActive} setSelectedFile={setSelectedFile} setImageUrl={setImageUrl}/>

    <div className={` flex justify-center items-center h-screen w-screen bg-black-faded fixed top-0 left-0 z-40 transition duration-300 pointer-events-none ${active ? "opacity-1 pointer-events-auto" : "opacity-0"}`} onClick={()=> setActive(false)}>
    
      <div className={`flex flex-col justify-center items-center rounded-xl bg-white transition duration-300 w-fit pointer-events-none ${active ? "scale-1 pointer-events-auto" : "scale-125"}`} onClick={e=>e.stopPropagation()}>
      <div className='flex flex-row w-full px-3  py-1.5 '>
       
        <div className='w-full'>
          <p className='text-lg font-medium ml-5'>Создание публикации</p>
        </div>
      </div>
        <div className='px-10 py-24  flex flex-col justify-center items-center border-t border-gray-primary'>
          <img className="w-24 mb-5" src='/images/imageicon.png' alt="icon"/>
          <p className='text-2xl font-light mb-5'>Загрузить фото или видео</p>
          <input type="file" name="file" id="input__file" onChange={handleFileSet} className="hidden"/>
          <label htmlFor="input__file" className='cursor-pointer bg-blue-medium font-bold text-sm rounded text-white text-center px-5 py-1.5'>Выберите файл</label>
        </div>
      </div>

    </div>
    </div>
  )
}
