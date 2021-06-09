import React from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {
   render() {
      return (
         <nav className="menu">
            <ul>
               <li>SERVERS</li>
               <li>USERS</li>
               <li>LOGOUT</li>
            </ul>
         </nav>
      )
   }
}
export default Sidebar;