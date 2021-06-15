import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css'
class Sidebar extends React.Component {
   clearCacheToken() {
      localStorage.removeItem('cacheToken')
      localStorage.removeItem('cacheRefreshToken')
   }
   render() {
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
               <NavLink onClick={this.clearCacheToken} to="/logout">LOGOUT</NavLink>
               </li>
            </ul>
         </nav>
      )
   }
}
export default Sidebar;