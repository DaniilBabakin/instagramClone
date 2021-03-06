import React, { useState ,useContext} from 'react';
import UserContext from "../../context/user"
import {firebase } from '../../lib/firebase';
import useUser from '../../hooks/use-user';
import WarningModal from './warning';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ProfileInFollow from '../profile/profile-in-follow';

export default function FollowersModal ({
  setActive,
  active,
  followers
}) {
  const { user: loggedInUser } = useContext(UserContext);
  const [caption,setCaption] = useState("")
  const {user: {username}} = useUser();
  return (
    <div>
    <div className={` flex justify-center items-center h-screen w-screen bg-black-faded fixed top-0 left-0 z-40 transition duration-300 pointer-events-none ${active ? "opacity-1 pointer-events-auto" : "opacity-0"}`} onClick={()=> setActive(false)}>
    
    <div className={`flex flex-col justify-center items-center rounded-xl bg-white transition duration-300 w-fit pointer-events-none ${active ? "scale-1 pointer-events-auto" : "scale-125"}`} onClick={e=>e.stopPropagation()}>
        <div className='flex flex-row w-full px-3 items-center justify-center py-1.5 '>
            <p className='text-lg font-medium'>Подписчики</p>
        </div>
        
          <div className='flex flex-row justify-center items-start border-t border-gray-primary'>
            <div className='py-5 px-5 flex flex-col justify-start items-start '>
            {!followers ? (
              <Skeleton count={1} height={150} className="mt-5"/>) 
              : followers.length > 0 
              ? (<div className='mb-4 grid gap-5'>
                {followers.map((profile)=> (
                
                  <ProfileInFollow
                  key={profile.docId}
                  profileDocId={profile.docId}
                  username={profile.username}
                  profileId={profile.userId}
                  userId={profile.userId}
                  />
                ))}
              </div>) : null}
              
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
