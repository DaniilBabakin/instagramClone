import React, {useState,useContext,useRef} from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import UserContext from '../../../../context/user';
import usePhotos from '../../../../hooks/use-photos';
import useUser from '../../../../hooks/use-user';
import '../../../../styles/header.css'
import CommentsInProfilePhoto from './comments';

export default function MobileVisible ({
  active,
  setActive,
  image,
  setImageUrl
}) {
  const [caption,setCaption] = useState("")
  const {user: {username}} = useUser();
  const handleInput = (event) => {
    setCaption(event.target.value)
  }
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  return (
    <div> 
          {image !== null && (
            <>
            <img 
            src={image.imageSrc} 
            className="mobileHidden"
            style={{height:"45vh", width: "90vw", objectFit: "cover"}}
            onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src="/images/default.png";
            }}/>
            
            <div className='py-5 px-5 flex flex-col justify-start items-start mobileHidden'>
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
              <div className="pt-2 pb-1">
                <span className="mr-1 font-bold">{username}</span>
                <span className="italic">{image.caption}</span>
              </div>
              <CommentsInProfilePhoto
                docId={image.docId}
                commentsInProfile={image.comments}
                posted={image.dateCreated}
                commentInput={commentInput}
              />
            </div>
            </>
            )}

    </div>
  )
}
