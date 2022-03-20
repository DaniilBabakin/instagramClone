import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import usePhotos from '../hooks/use-photos';
import Post from './post';
import { collection, doc,setDoc} from "firebase/firestore"; 
import { storage,firebase } from '../lib/firebase';

export default function Timeline({avatars}){
  const {photos} = usePhotos()
  return (
    <div className="container col-span-2 mx-auto" >
      {!photos ? (
        <>
          {[...new Array(4)].map((_,index)=>
            <Skeleton key={index} count={1} width={640} height={500} className="mb-5"/>)}
        </>
      ) : photos?.length > 0 ? (
        photos.map((content)=> <Post 
            key={content.docId} 
            content={content} 
            profileImageSrc={avatars.filter( user => user.userId == content.userId).map(item=>item.imageSrc)}
          />)
      ) :(
        <p className='text-center text-2xl'>Follow people to see photos</p>
      )} 
    </div>
  )
}