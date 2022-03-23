import React, {useState,useContext,useRef} from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import UserContext from '../../../../context/user';
import usePhotos from '../../../../hooks/use-photos';
import useUser from '../../../../hooks/use-user';
import '../../../../styles/header.css'
import Comments from '../../../post/comments';
import Footer from '../../../post/footer';
import ComputerVisible from './computer-visible';
import MobileVisible from './mobile-visible';
import {format, formatDistance} from 'date-fns'

export default function CurrentProfileImage ({
  active,
  setActive,
  image,
  setImageUrl
}) {
  const { user: loggedInUser } = useContext(UserContext);
  const [caption,setCaption] = useState("")
  const {user: {username}} = useUser();
  console.log(image)
  const handleInput = (event) => {
    setCaption(event.target.value)
  }
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  return (
    <div> 

      <div className={` flex justify-center items-center h-full w-full bg-black-faded fixed top-0 left-0 z-40 transition duration-300 pointer-events-none ${active ? "opacity-1 pointer-events-auto" : "opacity-0"}`} onClick={()=> { setActive(false)}} >

        <div className={`flex flex-col justify-center items-center rounded-xl bg-white transition duration-300 pointer-events-none ${active ? "scale-1 pointer-events-auto" : "scale-125"}`} onClick={e=>e.stopPropagation()}>
          <div className='flex flex-row w-full px-3 justify-center py-1.5 relative'>
              <p className='text-lg font-medium'>Ваша публикация</p>
              <button className='absolute right-2 top-2 text-red-primary' onClick={()=>setActive(false)}>Закрыть</button>
          </div>
        
          <div className='flex flex-col sm:flex-row justify-center items-start border-t border-gray-primary'>
            <ComputerVisible active={active} setActive={setActive} image={image} setImageUrl={setImageUrl}/>
            <MobileVisible active={active} setActive={setActive} image={image} setImageUrl={setImageUrl}/>

          </div>

        </div>
      </div>
    </div>
  )
}
