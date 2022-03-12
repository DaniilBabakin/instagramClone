import React, { useState ,useContext} from 'react';
import UserContext from "../../context/user"
import axios from 'axios'
import { storage,firebase } from '../../lib/firebase';
import {getDownloadURL} from 'firebase/storage'
import random from 'random-string-generator'
import useUser from '../../hooks/use-user';

export default function FinalModal ({finalActive,setFinalActive,imageUrl}) {
  const { user: loggedInUser } = useContext(UserContext);
  const [selectedFile,setSelectedFile] = useState(null)
  const [newDocId,setNewDocId] = useState(null)
  const [caption,setCaption] = useState("")
  const {user: {fullName,username}} = useUser();

  const handleFileUpload = () => {
    console.log(newDocId)
    console.log(selectedFile)
    const uploadTask = storage.ref(`/images/${selectedFile.name}`)
    uploadTask.on(
      snapshot => {},
    () => {
      storage 
        .ref("images")
        .child(selectedFile.name)
        .getDownloadURL()
        .then((url) => {
          firebase.firestore().collection('photos').doc(newDocId).set({
            caption:{caption},
            comments:[],
            dateCreated:Date.now(),
            name: selectedFile.name,
            imageSrc: url,
            likes:[],
            photoId:"",
            userId:loggedInUser.uid
            })
        })
      }
    )
    setFinalActive(false)
  }

  const handleInput = (event) => {
    setCaption(event.target.value)
  }
  
  console.log(imageUrl)
  return (
    <div className={` flex justify-center items-center h-screen w-screen bg-black-faded fixed top-0 left-0 z-50 transition duration-300 pointer-events-none ${finalActive ? "opacity-1 pointer-events-auto" : "opacity-0"}`} onClick={()=> setFinalActive(false)}>

      <div className={`flex flex-col justify-center items-center rounded-xl bg-white transition duration-300 w-fit pointer-events-none ${finalActive ? "scale-1 pointer-events-auto" : "scale-125"}`} onClick={e=>e.stopPropagation()}>
      <div className='flex flex-row w-full px-3  py-1.5 '>
        <button> 
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"           stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div className='w-full'>
          <p className='text-lg font-medium ml-5'>Создание публикации</p>
        </div>
          <button onClick={handleFileUpload} className="text-blue-medium font-bold ">Загрузить</button>
      </div>
      
        <div className='flex flex-row justify-center items-start border-t border-gray-primary'>
        <img src={imageUrl} style={{maxHeight: "800px"}}/>
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
  )
}
