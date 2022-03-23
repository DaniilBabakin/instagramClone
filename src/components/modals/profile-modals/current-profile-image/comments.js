import {useState} from 'react'
import PropTypes from 'prop-types'
import {format, formatDistance} from 'date-fns'
import {Link} from 'react-router-dom'
import AddCommentInProfileImage from './add-comment'

export default function CommentsInProfilePhoto ({docId,commentsInProfile:allComments,posted,commentInput}){
  const [profileComments,setProfileComments] = useState(allComments)
  console.log(profileComments)
  return (
    <>
      <div className='p-4 pl-5 pt-1 pb-4'>
      <p className='font-light italic mb-2'>Comments</p>
      {allComments !== null && (
        allComments.map((item)=>
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            <Link to={`/p/${item.displayName}`}>
              <span className='mr-1 font-bold'>
                {item.displayName}
              </span>
              <span>{item.comment}</span>
            </Link>
          </p>
        )
      )}
       
      </div>
      <AddCommentInProfileImage
        docId={docId}
        comments={profileComments}
        setComments={setProfileComments}
        commentInput={commentInput}/>
    </>
  )
}
