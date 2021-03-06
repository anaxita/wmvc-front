import React from 'react';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';
import './style.css'

import { useGlobalRedirect } from '../../store';
import { getUserInfo } from '../../Constants/Constants';


export const Sidebar = () => {   
   const userInfo = getUserInfo()
   const clearCacheToken = () => {
      localStorage.removeItem('cacheToken')
      localStorage.removeItem('cacheRefreshToken')
      localStorage.removeItem('cacheUserInfo')
   }
   const {isRedirect} = useGlobalRedirect()

   if(userInfo === null || userInfo === undefined) {
      return <Redirect to="/signin" />
   }

   if(isRedirect) {
      <Redirect to="/servers" />
   }

   return (
      <nav className="menu">
         <div className="user-info">
            <div className="menu_email">{userInfo.name}</div>
            <div className="menu_email">{userInfo.email}</div>
         </div>
         <ul>
            <li>
            <NavLink to="/servers">SERVERS</NavLink>
            </li>
            {userInfo.role ? 
               <li>
               <NavLink to="/users">USERS</NavLink>
               </li>
            : null
            }
            <li>
            <NavLink onClick={clearCacheToken} to="/signin">LOGOUT</NavLink>
            </li>
         </ul>
      </nav>
   )
}