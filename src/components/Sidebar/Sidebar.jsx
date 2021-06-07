import React from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {
   render() {
      return (
         <div className="col-12 col-sm-3 col-xl-1 px-sm-2 px-0 bg-dark d-flex sticky-top">
            <div
               className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start px-3 pt-2 text-white">
               <a href="./index.html"
                  className="d-flex align-items-center pb-sm-3 mb-md-0 me-md-auto text-white text-decoration-none">
                  <span className="fs-5 text-muted">KMSystems</span>
               </a>
               <ul className="nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start"
                  id="menu">
                  <li className="nav-item">
                  <Link to='/servers' className="nav-link px-sm-0 px-2 text-info"><i className="fs-5 bi-house"></i><span className="ms-1 p-1 d-none d-sm-inline ">SERVERS</span></Link> 
                  </li>
                  <li>
                  <Link to='/users' className="nav-link px-sm-0 px-2 text-info"><i className="fs-5 bi-speedometer2"></i><span className="ms-1 p-1 d-none d-sm-inline ">USERS</span></Link>
                  </li>
               </ul>
               {/* <div className="dropdown py-sm-4 mt-sm-auto ms-auto ms-sm-0 flex-shrink-1">
                  <a href="#"className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                     id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                     <img src="https://github.com/mdo.png" alt="hugenerd" width="28" height="28"
                        className="rounded-circle" />
                     <span className="d-none d-sm-inline mx-1">Joe</span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                     <li><a className="dropdown-item" href="#">New project...</a></li>
                     <li><a className="dropdown-item" href="#">Settings</a></li>
                     <li><a className="dropdown-item" href="#">Profile</a></li>
                     <li>
                        <hr className="dropdown-divider" />
                     </li>
                     <li><a className="dropdown-item" href="#">Sign out</a></li>
                  </ul>
               </div> */}
            </div>
         </div>
      )
   }
}
export default Sidebar;