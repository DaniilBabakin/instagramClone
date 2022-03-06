import {firebase,FieldValue} from '../lib/firebase'

export async function doesUsernameExist(username){
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.length > 0
}

export async function getUserByUsername(username){
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();
  return result.docs.map((item)=>({
    ...item.data(),
    docId:item.id
  }))
  
}

export async function getUserByUserId(userId) {
  const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
  return user;
}
export async function getSuggestedProfiles(userId,following) {
  const result = await firebase.firestore().collection('users').limit(10).get();
  
  return result.docs
      .map((user)=> ({...user.data(),docId:user.id}))
      .filter((profile)=>profile.userId !== userId && !following.includes(profile.userId))
}


export async function updateLoggedInUserFollowing(loggedInUserDocId,profileId,isFollowingProfile) {
  return firebase
  .firestore()
  .collection('users')
  .doc(loggedInUserDocId)
  .update({
  following: isFollowingProfile ? FieldValue.arrayRemove(profileId) :
  FieldValue.arrayUnion(profileId)
  })
}
export async function updateFollowedUserFollowers(profileDocId,loggedInUserDocId,isFollowingProfile) {
  return firebase
  .firestore()
  .collection('users')
  .doc(profileDocId)
  .update({
  followers: isFollowingProfile ? FieldValue.arrayRemove(loggedInUserDocId) :
  FieldValue.arrayUnion(loggedInUserDocId)
  })
}

export async function getPhotos(userId,following){
  
  const result = await firebase
      .firestore()
      .collection('photos')
      .where('userId', 'in', following)
      .get()
  
  const userFollowedPhotos = result.docs.map((photo)=>({
    ...photo.data(),
    docId:photo.id
  }))
  
  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async(photo) => {
      let userLikedPhoto = false;
      if(photo.likes.includes(userId)){
        userLikedPhoto = true;
      }

      const user = await getUserByUserId(photo.userId);
      const {username} = user[0]
      return{username,...photo,userLikedPhoto}
    })
  )
  return photosWithUserDetails
}



export async function getUserPhotosByUsername(username){
  const [user] = await getUserByUsername(username)
  const result = await firebase
          .firestore()
          .collection('photos')
          .where('userId', '==', user.userId)
          .get()
  return result.docs.map((item)=> ({
    ...item.data(),
    docId:item.id
  }))
}

export async function isUserFollowingProfile(loggedInUserUsername,profileUserId){
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username','==',loggedInUserUsername) // yantara(active logged in user)
    .where('following','array-contains',profileUserId)
    .get()

    const [response = {}] = result.docs.map((item)=>({
      ...item.data(),
      docId:item.id
    }))
    
    return response.userId
}

export async function toggleFollow(
    isFollowingProfile, 
    activeUserDocId, 
    profileDocId, 
    profileUserId, 
    followingUserId
  ) {

  // 1st param: yantara's doc id
  // 2nd param: raphael's user id
  // 3rd param: is the user following this profile? e.g. does yantara follow raphael? (true/false)
  await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);

  // 1st param: yantara's user id
  // 2nd param: raphael's doc id
  // 3rd param: is the user following this profile? e.g. does yantara follow raphael? (true/false)
  await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}