import React from 'react';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';
import './style.css'

import { useGlobalRedirect } from '../../store';


export const Sidebar = () => {   
   const clearCacheToken = () => {
      localStorage.removeItem('cacheToken')
      localStorage.removeItem('cacheRefreshToken')
   }
   // useGlobalRedirect
   const {isRedirect} = useGlobalRedirect()
   if(isRedirect) {
      return <Redirect to="/" />
   }
   return (
      <nav className="menu">
         <ul>
            <li>
            <NavLink to="/servers">SERVERS</NavLink>
            </li>
            <li>
            <NavLink to="/users">USERS</NavLink>
            </li>
            <li>
            <NavLink onClick={clearCacheToken} to="/logout">LOGOUT</NavLink>
            </li>
         </ul>
      </nav>
   )
}