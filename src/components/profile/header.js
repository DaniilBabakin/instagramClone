import {useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import useUser from '../../hooks/use-user'
import { getUserFollowersByUsername, getUserFollowingByUsername, isUserFollowingProfile,toggleFollow } from '../../services/firebase'
import FollowersModal from '../modals/followers'
import FollowingModal from '../modals/following'
import '../../styles/header.css'
import ProfileSettingsModal from '../modals/profile-modals/profile-settings'
import { storage ,firebase} from '../../lib/firebase'

export default function Header ({
  photosCount,
  followerCount,
  setFollowerCount,
  loggedInUsername,
  profile:{docId:profileDocId,userId:profileUserId,fullName,following=[],followers=[],username:profileUsername}
}){
  console.log(profileUsername)
  const {user} = useUser()
  const [isFollowingProfile,setIsFollowingProfile] = useState(null)
  const isLoggedInUserProfile = user.username && user.username !== profileUsername // false изначально
  const [followersModalActive,setFollowersModalActive] = useState(false)
  const [followersList,setFollowersList] = useState(null)
  const [followingModalActive,setFollowingModalActive] = useState(false)
  const [followingList,setFollowingList] = useState(null)
  const [settingsModal,setSettingsModal] = useState(false)
  const [profileImage,setProfileImage] = useState(null)
  //Получение списка подписчиков и подписок
  useEffect(() => {
    //Список подписчиков
    async function getFollowers(){
      const response= await getUserFollowersByUsername(profileUserId,followers)
      setFollowersList(response) 
    }
    //Список подписок
    async function getFollowing(){
      const response= await getUserFollowingByUsername(profileUserId,following)
      setFollowingList(response) 
    }
    async function getProfilePhoto(){
      const result = await firebase.firestore().collection('avatars').where('userId', '==', profileUserId).get();
      setProfileImage(result.docs.map((item)=>({
        ...item.data(),
        docId:item.id
      }))[0].imageSrc)
    }
    if(user.userId){
      getProfilePhoto()
      getFollowers()
      getFollowing()
    }
  
  }, [profileUserId])

  //Управление состоянием подписки
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
    <>
    <FollowersModal active={followersModalActive} setActive={setFollowersModalActive} followers={followersList}/>
    <FollowingModal active={followingModalActive} setActive={setFollowingModalActive} following={followingList}/>
    <ProfileSettingsModal active={settingsModal} setActive={setSettingsModal}/>
    <div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg px-2'>
      <div className='container flex items-center justify-center '>
       {!profileImage ? <Skeleton circle={true} count={1} height={160} width={160}/>:(
        <img
          className='rounded-full w-40 object-cover h-40 flex text-center '
          alt={`${profileUsername} profile pic`}
          src={profileImage}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src="/images/default.png";
          }}  
          />
       )} 
      </div>

      <div className='flex items-center justify-center flex-col col-span-2'>

        <div className='container flex items-center flex-wrap justify-start'>
          <p className='text-3xl mr-4 font-light'>{profileUsername}</p>
          {isLoggedInUserProfile ? (
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
          ) : (
            <button className='border border-gray-primary rounded  py-0.5 mt-2 font-semibold' onClick={()=> setSettingsModal(true)}>Редактировать профиль</button>
            )}

        </div> 

        <div className='container flex compHidden mt-4'>
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
              </button>
              <button onClick={()=>setFollowingModalActive(true)}>
                <p className='mr-10'>
                  <span className='font-bold'>{following.length}</span> following
                </p>
              </button>
            </>
          )}
        </div>
        <div className='container mt-4'>
          <p className='font-medium'>{!fullName ? (<Skeleton count={1} height={24} width={300}/>) : fullName}</p>
        </div>
      </div>

      <div className='container flex mobileHidden items-center justify-around py-4 border-t border-gray-primary' style={{ gridArea: "2 / 1 / 3 / 4" }}>
          {followers === undefined || following === undefined ? (
            <Skeleton count={1} width={677} height={24}/>
          ) : (
            <>
              <p className=''>
                <span className='font-bold'>{photosCount}</span> photos
              </p>

              <button onClick={()=>setFollowersModalActive(true)}>
                <p className=''>
                  <span className='font-bold'>{followerCount}</span> {` `} {followerCount === 1 ? "follower" : "followers"}
                </p>
              </button>
              
              <button onClick={()=>setFollowingModalActive(true)}>
                <p className=''>
                  <span className='font-bold'>{following.length}</span> following
                </p>
              </button>
            </>
          )}
        </div>
    </div>
    </>
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






