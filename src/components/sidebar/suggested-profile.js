import PropTypes from "prop-types"
import { useState } from "react"
import { Link } from "react-router-dom"
import {updateFollowedUserFollowers,updateLoggedInUserFollowing} from '../../services/firebase'

export default function SuggestedProfile({profileDocId,username,profileId,userId,loggedInUserDocId,imageSrc}){
const [followed,setFollowed] = useState(false)
async function handleFollowUser(){
  setFollowed(true)

  //update the followers array
  await updateLoggedInUserFollowing(loggedInUserDocId,profileId,false);

  await updateFollowedUserFollowers(profileDocId,userId,false);
}

return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 object-cover h-8 flex mr-3"
          src={imageSrc}
          alt="avatars"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src="/images/default.png";
          }}  
          />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">
          {username}
          </p>
        </Link>
      </div>
      <button type="button" className="text-xs font-bold text-blue-medium" onClick={handleFollowUser}>
      Follow
      </button>
  </div>
) : null
}

SuggestedProfile.propTypes = {
profileDocId: PropTypes.string.isRequired,
username: PropTypes.string.isRequired,
profileId: PropTypes.string.isRequired,
userId: PropTypes.string.isRequired,
loggedInUserDocId: PropTypes.string.isRequired
}