import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import usePhotos from '../hooks/use-photos';
import Post from './post';
export default function Timeline(){

  const {photos} = usePhotos()

  return (
    <div className="container col-span-2">
      {!photos ? (
        <>
          {[...new Array(4)].map((_,index)=>
            <Skeleton key={index} count={1} width={640} height={500} className="mb-5"/>)}
        </>
      ) : photos?.length > 0 ? (
        photos.map((content)=> <Post key={content.docId} content={content}/>)
      ) :(
        <p className='text-center text-2xl'>Follow people to see photos</p>
      )} 
    </div>
  )
}