import React, { useContext, useEffect, useState} from 'react';
import { storage} from '../../../lib/firebase';
import random from 'random-string-generator'
import UserContext from "../../../context/user"
import UploadProfilePhoto from './upload-photo';

export default function ProfileSettingsModal ({active,setActive}) {
  const { user: loggedInUser } = useContext(UserContext); 
  const [uploadPhotoModal,setUploadPhotoModal] = useState(false)
  const [imageUrl,setImageUrl] = useState(null)
  const [selectedPhoto,setSelectedPhoto] = useState(null)
  const [newDocId,setNewDocId] = useState(null)
  const [warningActive,setWarningActive] = useState(false)
  useEffect(() => {
    if(selectedPhoto!==null){
      const uploadTask = storage.ref(`/images/${selectedPhoto.name}`)
    uploadTask.put(selectedPhoto).then(function() {
      uploadTask.getDownloadURL().then(function(downloadURL) {
          setImageUrl(downloadURL)
          setActive(false)
          setUploadPhotoModal(true)
      });
  });
    }
  }, [selectedPhoto])
  const handleFileSet = (event) => {
    setSelectedPhoto(event.target.files[0])
    setNewDocId(random(20))
  }
  return (
    <div>

      <UploadProfilePhoto setActive={setActive} uploadPhotoModal={uploadPhotoModal} setUploadPhotoModal={setUploadPhotoModal} newDocId={newDocId} imageUrl={imageUrl} selectedFile={selectedPhoto} warningActive={warningActive} setWarningActive={setWarningActive} setSelectedFile={setSelectedPhoto} setImageUrl={setImageUrl}/>

    <div className={` flex justify-center items-center h-screen w-screen bg-black-faded fixed top-0 left-0 z-40 transition duration-300 pointer-events-none ${active ? "opacity-1 pointer-events-auto" : "opacity-0"}`} onClick={()=> setActive(false)}>
      <div className={`flex flex-col justify-center items-center rounded-xl bg-white transition duration-300 w-fit pointer-events-none ${active ? "scale-1 pointer-events-auto" : "scale-125"}`} onClick={e=>e.stopPropagation()}>
      <div className='flex flex-row w-full px-3  py-1.5 '>
        <div className='w-full'>
          <p className='text-lg font-medium ml-5'>Редактирование профиля</p>
        </div>
      </div>
        <div className='flex flex-col justify-center items-center border-t border-gray-primary'>
          {loggedInUser && (
          <img
              className="rounded-full w-24 mt-2 mb-2 flex"
              src={`/images/avatars/${loggedInUser.displayName}.jpg`}
              alt={`${loggedInUser.displayName} profile`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src="/images/default.png";
              }}  
            />
          )}
          <input type="file" name="photo" id="input__photo" onChange={handleFileSet} className="hidden"/>
            <label htmlFor="input__photo" className='cursor-pointer text-blue-medium font-bold mb-2'>Изменить фотографию</label>
          </div>
      </div>

    </div>
    </div>
  )
}
