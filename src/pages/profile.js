import { useState,useEffect } from "react"
import {useParams,useNavigate, Navigate} from "react-router-dom"
import { getUserByUsername } from "../services/firebase"
import * as ROUTES from '../constants/routes'
import Header from "../components/header"
import UserProfile from "../components/profile"
import MobileHeader from "../components/mobile-header"
import { firebase } from "../lib/firebase"

export default function Profile() {
  const {username} = useParams()
  const [user,setUser] = useState(null)
  const navigate = useNavigate()
  const [avatars,setAvatars] = useState(null)

  useEffect(() => {
    document.title = "Instagram"
    
    const getMarker= async() => {
    const snapshot = await firebase.firestore().collection('avatars').get()
    setAvatars(snapshot.docs.map(doc => doc.data()))
    }
    getMarker()
  }, [])

  useEffect(() => {
    async function checkUserExists(){
      const [user] = await getUserByUsername(username)
      if (user?.userId) {
        setUser(user);
      }  else {
        navigate(ROUTES.NOT_FOUND)
      }
    }
    checkUserExists()
  }, [username,navigate])
  
  return user?.username ? (
    <div className="bg-gray-background">
      <Header avatars={avatars}/>
      
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user}/>
      </div>
      <div >
        <MobileHeader/>
      </div>
    </div>
  ) : null
};
