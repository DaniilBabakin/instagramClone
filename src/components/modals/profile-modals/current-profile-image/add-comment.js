import { useState,useContext } from "react";
import PropTypes from "prop-types";
import UserContext from "../../../../context/user";
import FirebaseContext from "../../../../context/firebase";

export default function AddCommentInProfileImage({docId,comments,setComments,commentInput}){
  const [comment,setComment] = useState('')
  const {firebase,FieldValue} = useContext(FirebaseContext)
  const {
    user: {displayName}
  } = useContext(UserContext)

  const handleSubmitComment = (event) => {
    event.preventDefault()
    setComments([{displayName,comment},...comments])
    setComment("")
    
    return firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({comment,displayName})
      })
  }
  
  return (
    <div className="">
      <form
        className="flex justify-between"
        method="POST"
        onSubmit={(event)=> 
          comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()}
      >
      <input  
        aria-label="Add a comment"
        autoComplete="off"
        className="text-sm text-gray-base w-full mr-3 py-3 px-1"
        type="text"
        placeholder="Add a comment ..."
        value={comment}
        onChange={({target})=> setComment(target.value)}
        ref={commentInput}
      />
      <button
        className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25' }`}
        type="button"
        disabled={comment.length < 1}
        onClick={handleSubmitComment}>
      Post</button>
      </form>
    </div>
  )
}
