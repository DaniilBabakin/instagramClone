import {useEffect} from "react"
import Header from "../components/header"
import MobileHeader from "../components/mobile-header"
import Sidebar from "../components/sidebar"
import Timeline from "../components/timeline"


export default function Dashboard(){
  useEffect(() => {
    document.title = "Instagram"
  }, [])
  
  return(
    <div className="bg-gray-background w-full">
      <Header/>
      <div className="lg:grid grid-cols-3 gap-4 justify-between max-w-xl lg:max-w-screen-lg mx-auto">
        <Timeline/>
        <Sidebar/>
      </div>
      <div >
        <MobileHeader/>
      </div>
    </div>
  )
}