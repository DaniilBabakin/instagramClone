import {useEffect, useState} from "react"
import Header from "../components/header"
import MobileHeader from "../components/mobile-header"
import Sidebar from "../components/sidebar"
import Timeline from "../components/timeline"
import { firebase } from "../lib/firebase"

export default function Dashboard(){
  const [avatars,setAvatars] = useState(null)
  useEffect(() => {
    document.title = "Instagram"
    
    const getMarker= async() => {
    const snapshot = await firebase.firestore().collection('avatars').get()
    setAvatars(snapshot.docs.map(doc => doc.data()))
    }
    getMarker()
  }, [])
  
  return(
    <div className="bg-gray-background w-full">
      <Header avatars={avatars}/>
      <div className="lg:grid grid-cols-3 gap-4 justify-between max-w-xl lg:max-w-screen-lg mx-auto">
        <Timeline avatars={avatars}/>
        <Sidebar avatars={avatars}/>
      </div>
      <div >
        <MobileHeader/>
      </div>
    </div>
  )
}