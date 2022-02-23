import {useEffect} from "react"



export default function NotFound(){
  useEffect(() => {
      document.title = "Not Found - Instagram"
  },[])
  
  return(
    <div className="flex justify-center mt-3 bg-gray-background h-screen">
      <div className=" mx-auto max-w-screen-lg">
        <p className="text-center text-2xl">Not Found!</p>
      </div>

    </div>
  )
}