import {useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import useUser from '../../hooks/use-user'
import { getUserFollowersByUsername, isUserFollowingProfile,toggleFollow } from '../../services/firebase'
import {Link}  from "react-router-dom"
import * as ROUTES from '../../constants/routes'
import FollowersModal from '../modals/followers'

export default function Header ({
  photosCount,
  followerCount,
  setFollowerCount,
  loggedInUsername,
  profile:{docId:profileDocId,userId:profileUserId,fullName,following=[],followers=[],username:profileUsername}
}){
  const {user} = useUser()
  const [isFollowingProfile,setIsFollowingProfile] = useState(null)
  const activeBtnFollow = user.username && user.username !== profileUsername
  const [followersModalActive,setFollowersModalActive] = useState(false)
  const [followersList,setFollowersList] = useState(null)
  useEffect(() => {

    async function getFollowers(){
      const response= await getUserFollowersByUsername(user.userId,user.following)
      console.log(response)
      setFollowersList(response) // "Some User token"
    }
  
    if(user.userId){
      getFollowers()
    }
  
  }, [user.userId])
  
  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount:isFollowingProfile  ? followerCount - 1 : followerCount + 1
    })
    await toggleFollow(isFollowingProfile,user.docId,profileDocId,profileUserId,user.userId)
  }

  useEffect(()=>{
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(user.username,profileUserId)
      setIsFollowingProfile(!!isFollowing)
    }

    if(user?.username && profileUserId){
      isLoggedInUserFollowingProfile()
    }
  },[user?.username, profileUserId])
  return (
    <div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
      <div className='container flex items-center justify-center px-2'>
       {!profileUsername ? <Skeleton circle={true} count={1} height={160} width={160}/>:(
        <img
          className='rounded-full w-40 flex text-center '
          alt={`${profileUsername} profile pic`}
          src={`/images/avatars/${profileUsername}.jpg`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src="/images/default.png";
          }}  
          />
        
       )} 
      </div>
      <div className='flex items-center justify-center flex-col col-span-2'>
        <div className='container flex items-center'>
          <p className='text-2xl mr-4'>{profileUsername}</p>
          {activeBtnFollow && (
            <button
              className='bg-blue-medium font-bold text-sm rounded text-white w-20 h-8'
              type="button"
              onClick={handleToggleFollow}
              onKeyDown={(event)=>{
                if(event.key === "Enter"){
                  handleToggleFollow()
                }
              }}
              >{isFollowingProfile ? "Unfollow" : "Follow"}</button>
          )}
        </div>
        <div className='container flex flex-wrap mt-4'>
          {followers === undefined || following === undefined ? (
            <Skeleton count={1} width={677} height={24}/>
          ) : (
            <>
              <p className='mr-10'>
                <span className='font-bold'>{photosCount}</span> photos
              </p>

              <button onClick={()=>setFollowersModalActive(true)}>
                <p className='mr-10'>
                  <span className='font-bold'>{followerCount}</span> {` `} {followerCount === 1 ? "follower" : "followers"}
                </p>
                <FollowersModal active={followersModalActive} setActive={setFollowersModalActive} followers={followersList}/>
              </button>
              
              <Link to={ROUTES.FOLLOWING} aria-label="Dashboard">
                <p className='mr-10'>
                  <span className='font-bold'>{following.length}</span> following
                </p>
              </Link>
            </>
          )}
        </div>
        <div className='container mt-4'>
          <p className='font-medium'>{!fullName ? (<Skeleton count={1} height={24} width={300}/>) : fullName}</p>
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
  photosCount:PropTypes.number.isRequired,
  followersCount:PropTypes.number.isRequired,
  setFollowerCount:PropTypes.func.isRequired,
  profile:PropTypes.shape({
    docId:PropTypes.string,
    userId:PropTypes.string,
    fullName:PropTypes.string,
    following:PropTypes.array,
    followers:PropTypes.array,
    username:PropTypes.string
  }).isRequired
}
