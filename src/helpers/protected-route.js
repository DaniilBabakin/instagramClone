import PropTypes from 'prop-types'
import {Route,Navigate} from 'react-router-dom'
import * as ROUTES from '../constants/routes'

export default function ProtectedRoute({user,children,...rest}){
  
        if(user){
          return children
        }
        if(!user){
          return(
            <Navigate to={ROUTES.LOGIN} 
            />
          )
        }

       
}

ProtectedRoute.propTypes = {
  user:PropTypes.object,
  children:PropTypes.object.isRequired
}