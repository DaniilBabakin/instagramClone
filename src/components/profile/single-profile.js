import PropTypes from "prop-types"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function SingleProfile({profileDocId,username,profileId,userId,loggedInUserDocId,setActive}){

return (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt="avatars"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src="/images/default.png";
          }}  
          />
        <Link to={`/p/${username}`} onClick={()=> setActive(false)}>
          <p className="font-bold text-sm">
          {username}
          </p>
        </Link>
      </div>
      
  </div>
) 
}

SingleProfile.propTypes = {
profileDocId: PropTypes.string.isRequired,
username: PropTypes.string.isRequired,
profileId: PropTypes.string.isRequired,
userId: PropTypes.string.isRequired,
loggedInUserDocId: PropTypes.string.isRequired
}