import React from 'react';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';
import './style.css'

import { useGlobalRedirect } from '../../store';
import { getUserInfo } from '../../Constants/Constants';


export const Sidebar = () => {   
   const { email, role } = getUserInfo()
   const clearCacheToken = () => {
      localStorage.removeItem('cacheToken')
      localStorage.removeItem('cacheRefreshToken')
      localStorage.removeItem('cacheUserInfo')
   }
   const {isRedirect} = useGlobalRedirect()
   if(isRedirect) {
      return <Redirect to="/" />
   }
   return (
      <nav className="menu">
         <ul>
            <li className="menu_email">{email}</li>
            <li>
            <NavLink to="/servers">SERVERS</NavLink>
            </li>
            {role ? 
               <li>
               <NavLink to="/users">USERS</NavLink>
               </li>
            : null
            }
            <li>
            <NavLink onClick={clearCacheToken} to="/logout">LOGOUT</NavLink>
            </li>
         </ul>
      </nav>
   )
}