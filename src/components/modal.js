import React, { useState ,useContext} from 'react';
import UserContext from "../context/user"
import axios from 'axios'
import { storage,firebase } from '../lib/firebase';
import {getDownloadURL} from 'firebase/storage'
import random from 'random-string-generator'

export default function Modal ({active,setActive,children}) {
  const { user: loggedInUser } = useContext(UserContext);
  const [selectedFile,setSelectedFile] = useState(null)
  const [imageUrl,setImageUrl] = useState(null)
  const [newDocId,setNewDocId] = useState(null)
  const handleFileSet = (event) => {
    setSelectedFile(event.target.files[0])
    setNewDocId(random(20))
  }
  const handleFileUpload = () => {
    console.log(newDocId)
    console.log(selectedFile)
    const uploadTask = storage.ref(`/images/${selectedFile.name}`).put(selectedFile)
    uploadTask.on(
      snapshot => {},
    () => {
      storage 
        .ref("images")
        .child(selectedFile.name)
        .getDownloadURL()
        .then((url) => {
          console.log(url)
          setImageUrl(url)
          firebase.firestore().collection('photos').doc(newDocId).set({
            caption:"Photo of my girlfriend",
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
    setActive(false)
  }
  console.log(imageUrl)
  return (
    <div className={` flex justify-center items-center h-screen w-screen bg-black-faded fixed top-0 left-0 z-50 transition duration-300 pointer-events-none ${active ? "opacity-1 pointer-events-auto" : "opacity-0"}`} onClick={()=> setActive(false)}>
      <div className={`flex flex-col justify-center items-center rounded-xl bg-white transition duration-300 w-fit pointer-events-none ${active ? "scale-1 pointer-events-auto" : "scale-125"}`} onClick={e=>e.stopPropagation()}>
        <p className='text-lg font-medium py-1.5'>Создание публикации</p>
        <div className='px-10 py-24  flex flex-col justify-center items-center border-t border-gray-primary'>
          <img className="w-24 mb-5" src='/images/imageicon.png' alt="icon image"/>
          <p className='text-2xl font-light mb-5'>Загрузить фото или видео</p>
          <input type="file" name="file" id="input__file" onChange={handleFileSet}/>
          <label htmlFor="input__file" className='cursor-pointer bg-blue-medium font-bold text-sm rounded text-white text-center px-5 py-1.5'>Выберите файл</label>
          <button onClick={handleFileUpload}>Загрузить</button>
        </div>
      </div>
    </div>
  )
}
