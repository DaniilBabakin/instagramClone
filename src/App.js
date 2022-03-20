import { lazy, Suspense, useState } from 'react';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import * as ROUTES from './constants/routes'
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';

import ProtectedRoute from './helpers/protected-route';


const Login = lazy(()=> import ('./pages/login'))
const SignUp = lazy(()=> import ('./pages/sign-up'))
const Dashboard = lazy(()=> import ('./pages/dashboard'))
const Profile = lazy(()=> import ('./pages/profile'))
const NotFound = lazy(()=> import ('./pages/not-found'))
const FollowersModal = lazy(()=> import ('./components/modals/followers'))

export default function App() {
  const {user} = useAuthListener()
  const result = "gosdgosd"
  return (
  <UserContext.Provider value={{user}}>
   <Router>
    <Suspense fallback={<p>Loading...</p>}>
     <Routes>
       <Route path={ROUTES.LOGIN} element={<Login/>
       }/>
       <Route path={ROUTES.SIGN_UP} element={<SignUp/>
       }/>
       <Route path={ROUTES.PROFILE} element={<Profile/>}/>
       <Route path={ROUTES.DASHBOARD} element={
         <ProtectedRoute user={user}>
           <Dashboard result={result}/>
         </ProtectedRoute>
       }
       />
       <Route path="/*" element={<NotFound/>}/>
     </Routes>
    </Suspense>
   </Router>
   </UserContext.Provider>
  );
}

