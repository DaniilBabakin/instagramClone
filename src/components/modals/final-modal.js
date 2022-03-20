import React, { useState ,useContext} from 'react';
import UserContext from "../../context/user"
import {firebase } from '../../lib/firebase';
import useUser from '../../hooks/use-user';
import WarningModal from './warning';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export default function FinalModal ({
  setActive,
  finalActive,
  setFinalActive,
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
      firebase.firestore().collection('photos').doc(newDocId).set({
            caption:caption,
            comments:[],
            dateCreated:Date.now(),
            name: selectedFile.name,
            imageSrc: imageUrl,
            likes:[],
            photoId:"",
            userId:loggedInUser.uid
            })
       
      
    
    setFinalActive(false)
  }

  const handleButtonClick = () => {
    setFinalActive(false)
    setActive(true)
  }
  const handleInput = (event) => {
    setCaption(event.target.value)
  }
  
  return (
    <div> 
      <WarningModal warningActive={warningActive} setWarningActive={setWarningActive} selectedFile={selectedFile} setFinalActive={setFinalActive} setSelectedFile={setSelectedFile} setImageUrl={setImageUrl}/>

      <div className={` flex justify-center items-center h-full w-full bg-black-faded fixed top-0 left-0 z-40 transition duration-300 pointer-events-none ${finalActive ? "opacity-1 pointer-events-auto" : "opacity-0"}`} onClick={()=> setWarningActive(true)}>

        <div className={`flex flex-col justify-center items-center rounded-xl bg-white transition duration-300 w-fit pointer-events-none ${finalActive ? "scale-1 pointer-events-auto" : "scale-125"}`} onClick={e=>e.stopPropagation()}>
        <div className='flex flex-row w-full px-3  py-1.5 '>
          <button onClick={handleButtonClick}> 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className='mx-auto'>
            <p className='text-lg font-medium ml-5'>Создание публикации</p>
          </div>
            <button onClick={handlePictureUpload} className="text-blue-medium font-bold ">Загрузить</button>
        </div>
        
          <div className='flex flex-row justify-center items-start border-t border-gray-primary'>
          <img 
            src={imageUrl} 
            style={{maxHeight: "800px"}}
            onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src="/images/default.png";
            }}/>
            <div className='py-5 px-5 flex flex-col justify-start items-start border-b border-gray-primary'>
              <div className="flex items-center justify-start mb-3">
                <img
                  className="rounded-full w-8 flex mr-3 "
                  src={`/images/avatars/${username}.jpg`}
                  alt="avatars"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src="/images/default.png";
                  }}  
                  />
                <p className="font-bold text-sm">
                    {username}
                </p>
              </div>
              <input type="text" onChange={handleInput} placeholder="Ваш комментарий!" className='mb-3'></input>
            
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
