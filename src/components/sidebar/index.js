import React,{ memo } from "react";
import useUser from "../../hooks/use-user"
import User from './user';
import Suggestions from './suggestions';

export default function Sidebar({avatars}) {
  console.log(avatars)
  const {
    user: {
      docId,
      fullName,
      username,
      userId,
      following
    }
  } = useUser();

return (
  <div className="p-4 hidden lg:block ">
  {avatars !== null && (<User username={username} fullName={fullName} imageSrc={avatars.filter( user => user.userId == userId).map(item=>item.imageSrc)}/>)}
    <Suggestions userId={userId} following={following} loggedInUserDocId={docId} avatars={avatars}/>
  </div>
 )
}
