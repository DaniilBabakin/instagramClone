import React, { useState ,useContext} from 'react';
import UserContext from "../../../context/user"
import {firebase } from '../../../lib/firebase';
import useUser from '../../../hooks/use-user';
import WarningModal from './../warning';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export default function UploadProfilePhoto ({
  setActive,
  uploadPhotoModal,
  setUploadPhotoModal,
  imageUrl,
  setImageUrl,
  selectedFile,
  setSelectedFile,
  newDocId,
  warningActive,
  setWarningActive
}) {
  const { user: loggedInUser } = useContext(UserContext);
  const [caption,setCaption] = useState("")
  const {user: {username}} = useUser();
  const handlePictureUpload = () => {
      firebase.firestore().collection('avatars').doc(username).set({
            dateCreated:Date.now(),
            name: selectedFile.name,
            imageSrc: imageUrl,
            photoId:"",
            userId:loggedInUser.uid
      })
    setUploadPhotoModal(false)
  }

  const handleButtonClick = () => {
    setUploadPhotoModal(false)
    setActive(true)
  }
  const handleInput = (event) => {
    setCaption(event.target.value)
  }
  
  return (
    <div> 
      <WarningModal warningActive={warningActive} setWarningActive={setWarningActive} selectedFile={selectedFile} setFinalActive={setUploadPhotoModal} setSelectedFile={setSelectedFile} setImageUrl={setImageUrl}/>

      <div className={` flex justify-center items-center h-full w-full bg-black-faded fixed top-0 left-0 z-40 transition duration-300 pointer-events-none ${uploadPhotoModal ? "opacity-1 pointer-events-auto" : "opacity-0"}`} onClick={()=> setWarningActive(true)}>
      
        <div className={`flex flex-col justify-center items-center rounded-xl bg-white transition duration-300 w-fit pointer-events-none ${uploadPhotoModal ? "scale-1 pointer-events-auto" : "scale-125"}`} onClick={e=>e.stopPropagation()}>

          <div className='flex flex-row w-full px-4 py-1.5 '>
            <button onClick={handleButtonClick}> 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div className='mx-auto'>
              <p className='text-lg font-medium ml-5 mr-5'>Редактирование фотографии</p>
            </div>
              <button onClick={handlePictureUpload} className="text-blue-medium font-bold ">Загрузить</button>
          </div>

          <div className='flex flex-row justify-center items-start border-t border-gray-primary'>
            <img 
              src={imageUrl} 
              style={{maxHeight: "300px"}}
              onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src="/images/default.png";
              }}/>
              
          </div>

        </div>
      </div>
    </div>
  )
}
