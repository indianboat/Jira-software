import React, { useState,useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import JRlogo from "../../public/jira-logo2.png";
import "font-awesome/css/font-awesome.min.css";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import profileimg from "../../public/jiraImages/profile.jpg";
import styles from "./Navbar.module.scss";
import CreateIssueModal from "../modals/CreateIssueModal";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import medium from '../../public/jiraImages/medium.svg';
import bugLogo from '../../public/jiraImages/Buglogo.svg';



function Navbar(props)
{
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const signOutSession = async () => {
    signOut();
  };

  const [sprintData, setSprintData] = useState([]);

  const fetchData = async () => {
    const res = await fetch(`${process.env.NODE_ENV=="production"?"https://jira-software.vercel.app/api/fetchIssuesApi":"http://localhost:3000/api/fetchIssuesApi"}`);
    const data = await res.json();
    setSprintData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  let flag=[];

  for (let i = 0; i < sprintData.length; i++) {
    if(sprintData[i].assignee.email.toLowerCase() === session.user.email.toLowerCase()){
      flag.push(sprintData[i]);
    }
  }

  return (
    <>
      <nav
        className="navbar navbar-expand-lg "
        style={{
          boxShadow: "rgb(33 35 38 / 21%) 0px 10px 5px -10px",
          position: "fixed",
          zIndex: "5",
          backgroundColor: "#fff",
        }}
      >
        <div className="container-fluid">
          <BsFillGrid3X3GapFill
            className=""
            style={{ "marginRight": "10px" }}
          />
          <a
            className="navbar-brand"
            style={{
              color: "gray",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: "400",
              marginRight: "30px",
            }}
            href="#"
          >
            <Image src={JRlogo} alt="Vercel Logo" width={15} height={15} />
            <span
              className="navbar-title ps-1"
              style={{ color: "#253858", fontSize: "16px", fontWeight: 500 }}
            >
              Jira Software{" "}
            </span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className={`nav-link dropdown-toggle`}
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "rgb(52,69,99)",
                  }}
                >
                  Your Work
                </a>
                <ul className="dropdown-menu p-0 yourwork-dropdown">
              
                  {
                    flag.length > 0 ? flag.map((filteredTicket, index) => {
                      return (
                        <li key={index} className="" style={{cursor:'pointer',width:'max-content'}}>
                    <Link className="dropdown-item" href={`/viewissue/${filteredTicket.projectId}`}>
                    <div className='subtask-details d-flex justify-content-between p-2' style={{"boxShadow":"0 1px 1px rgba(9,30,66,0.25),0 0 1px 1px rgba(9,30,66,0.13)","borderRadius":"3px"}}>
                            <div className='left-details'>
                                <Image src={bugLogo} alt="subtask" />
                                <a href='' style={{ "textDecoration": "none" }}>
                                    <span style={{ "fontSize": "12px", "padding": "0 5px" }}>
                                        RECHARGE-{filteredTicket.projectId.toString().padStart(4,0)}
                                    </span>
                                </a>
                                <span className='align-self-center' style={{ "fontSize": "12px", "padding": "0 2px", "color": "#5e6c84" }}>
                                    {filteredTicket.summary}
                                </span>
                            </div>
                            <div className='rigth-details d-flex align-items-center ps-1'>
                                <Image src={medium} alt="priority-medium px-1" />
                                <div className='status px-1' style={{ "borderRadius": "2px", "backgroundColor": "#E3FCEF","fontSize": "10px", "fontWeight": "700", "color": "#006644" }}>
                                    {filteredTicket.ticketStatus}
                                </div>
                            </div>
                        </div>
                    </Link>
                  </li>
                      )
                    }) : <li>You dont have any ticket</li>
                  }

                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "rgb(52,69,99)",
                  }}
                >
                  Project
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider"></hr>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "rgb(52,69,99)",
                  }}
                >
                  Filters
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider"></hr>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "rgb(52,69,99)",
                  }}
                >
                  Dashboards
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider"></hr>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "rgb(52,69,99)",
                  }}
                >
                  People
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" href="/createteam">
                      Create Team
                    </Link>
                  </li>
                  {/* <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"></hr></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                </ul>
              </li>
              <li className="nav-item dropdown">
                {session ? (
                  <button onClick={signOutSession}>Logout</button>
                ) : (
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "rgb(52,69,99)",
                    }}
                  >
                    Plans
                  </a>
                )}

                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider"></hr>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "rgb(52,69,99)",
                  }}
                >
                  Apps
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider"></hr>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <button
                type="button"
                className="btn btn-primary btn-sm py-0"
                style={{
                  backgroundColor: "rgba(0,82,204,0.9)",
                  height: "28px",
                  marginTop: "5px",
                  boxShadow: "none",
                  border: "none",
                }}
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Create
              </button>
            </ul>
            <form className="m-0" role="search">
              <input
                className="form-control  py-0 m-0"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ border: "2px solid #DFE1E6", width: "90%" }}
              ></input>
            </form>
            {/* <div className='account-icons d-flex g-3'> */}
            <div
              className="navbar-notification"
              style={{ position: "relative" }}
            >
              <svg
                className="mx-1"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                role="presentation"
              >
                <path
                  d="M6.485 17.669a2 2 0 002.829 0l-2.829-2.83a2 2 0 000 2.83zm4.897-12.191l-.725.725c-.782.782-2.21 1.813-3.206 2.311l-3.017 1.509c-.495.248-.584.774-.187 1.171l8.556 8.556c.398.396.922.313 1.171-.188l1.51-3.016c.494-.988 1.526-2.42 2.311-3.206l.725-.726a5.048 5.048 0 00.64-6.356 1.01 1.01 0 10-1.354-1.494c-.023.025-.046.049-.066.075a5.043 5.043 0 00-2.788-.84 5.036 5.036 0 00-3.57 1.478z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>
              <div
                className="notification-count"
                style={{
                  position: "absolute",
                  backgroundColor: "#DE350B",
                  color: "#fff",
                  fontSize: "12px",
                  top: "-5px",
                  left: "12px",
                  borderRadius: "5px",
                }}
              >
                <div className="notification-indicator">
                  <span>9+</span>
                </div>
              </div>
            </div>
            <svg
              className="mx-1"
              width="24"
              style={{ color: "#fff" }}
              height="24"
              viewBox="0 0 24 24"
              role="presentation"
            >
              <g fillRule="evenodd">
                <circle fill="currentColor" cx="12" cy="12" r="10"></circle>
                <circle fill="inherit" cx="12" cy="18" r="1"></circle>
                <path
                  d="M15.89 9.05a3.975 3.975 0 00-2.957-2.942C10.321 5.514 8.017 7.446 8 9.95l.005.147a.992.992 0 00.982.904c.552 0 1-.447 1.002-.998a2.004 2.004 0 014.007-.002c0 1.102-.898 2-2.003 2H12a1 1 0 00-1 .987v2.014a1.001 1.001 0 002.004 0v-.782c0-.217.145-.399.35-.472A3.99 3.99 0 0015.89 9.05"
                  fill="inherit"
                ></path>
              </g>
            </svg>
            <svg
              className="ms-1 me-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              role="presentation"
            >
              <path
                d="M11.701 16.7a5.002 5.002 0 110-10.003 5.002 5.002 0 010 10.004m8.368-3.117a1.995 1.995 0 01-1.346-1.885c0-.876.563-1.613 1.345-1.885a.48.48 0 00.315-.574 8.947 8.947 0 00-.836-1.993.477.477 0 00-.598-.195 2.04 2.04 0 01-1.29.08 1.988 1.988 0 01-1.404-1.395 2.04 2.04 0 01.076-1.297.478.478 0 00-.196-.597 8.98 8.98 0 00-1.975-.826.479.479 0 00-.574.314 1.995 1.995 0 01-1.885 1.346 1.994 1.994 0 01-1.884-1.345.482.482 0 00-.575-.315c-.708.2-1.379.485-2.004.842a.47.47 0 00-.198.582A2.002 2.002 0 014.445 7.06a.478.478 0 00-.595.196 8.946 8.946 0 00-.833 1.994.48.48 0 00.308.572 1.995 1.995 0 011.323 1.877c0 .867-.552 1.599-1.324 1.877a.479.479 0 00-.308.57 8.99 8.99 0 00.723 1.79.477.477 0 00.624.194c.595-.273 1.343-.264 2.104.238.117.077.225.185.302.3.527.8.512 1.58.198 2.188a.473.473 0 00.168.628 8.946 8.946 0 002.11.897.474.474 0 00.57-.313 1.995 1.995 0 011.886-1.353c.878 0 1.618.567 1.887 1.353a.475.475 0 00.57.313 8.964 8.964 0 002.084-.883.473.473 0 00.167-.631c-.318-.608-.337-1.393.191-2.195.077-.116.185-.225.302-.302.772-.511 1.527-.513 2.125-.23a.477.477 0 00.628-.19 8.925 8.925 0 00.728-1.793.478.478 0 00-.314-.573"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
            <Image
              className=""
              src={profileimg}
              alt="profile-image"
              width={20}
              height={20}
              style={{ borderRadius: "50%" }}
            />
            {/* </div> */}
          </div>
        </div>
      </nav>


      <CreateIssueModal
        isVisible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      />
    </>
  );
}

export default Navbar;




//tailwind version



// import React, { useState,useEffect } from "react";
// import Head from "next/head";
// import Image from "next/image";
// import JRlogo from "../../public/jira-logo2.png";
// import "font-awesome/css/font-awesome.min.css";
// import { BsFillGrid3X3GapFill } from "react-icons/bs";
// import profileimg from "../../public/jiraImages/profile.jpg";
// import styles from "./Navbar.module.scss";
// import CreateIssueModal from "../modals/CreateIssueModal";
// import { useSession, signOut } from "next-auth/react";
// import Link from "next/link";
// import medium from '../../public/jiraImages/medium.svg';
// import bugLogo from '../../public/jiraImages/Buglogo.svg';



// function Navbar(props)
// {
//   const { data: session } = useSession();
//   const [showModal, setShowModal] = useState(false);
//   const signOutSession = async () => {
//     signOut();
//   };

//   const [sprintData, setSprintData] = useState([]);

//   const fetchData = async () => {
//     const res = await fetch(`${process.env.NODE_ENV=="production"?"https://jira-software.vercel.app/api/fetchIssuesApi":"http://localhost:3000/api/fetchIssuesApi"}`);
//     const data = await res.json();
//     setSprintData(data);
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   let flag=[];

//   for (let i = 0; i < sprintData.length; i++) {
//     if(sprintData[i].assignee.toLowerCase() === 'govind'){
//       flag.push(sprintData[i]);
//     }
//   }

//   return (
//     <>
//       <nav
//         className="navbar navbar-expand-lg "
//         style={{
//           boxShadow: "rgb(33 35 38 / 21%) 0px 10px 5px -10px",
//           position: "fixed",
//           zIndex: "5",
//           backgroundColor: "#fff",
//         }}
//       >
//         <div className="container-fluid">
//           <BsFillGrid3X3GapFill
//             className=""
//             style={{ "marginRight": "10px" }}
//           />
//           <a
//             className="navbar-brand"
//             style={{
//               color: "gray",
//               fontSize: "14px",
//               lineHeight: "20px",
//               fontWeight: "400",
//               marginRight: "30px",
//             }}
//             href="#"
//           >
//             <Image src={JRlogo} alt="Vercel Logo" width={15} height={15} />
//             <span
//               className="navbar-title ps-1"
//               style={{ color: "#253858", fontSize: "16px", fontWeight: 500 }}
//             >
//               Jira Software{" "}
//             </span>
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <li className="nav-item dropdown">
//                 <a
//                   className={`nav-link dropdown-toggle`}
//                   href="#"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                   style={{
//                     fontSize: "14px",
//                     fontWeight: "500",
//                     color: "rgb(52,69,99)",
//                   }}
//                 >
//                   Your Work
//                 </a>
//                 <ul className="dropdown-menu p-0 yourwork-dropdown">
              
//                   {
//                     flag.length > 0 ? flag.map((filteredTicket, index) => {
//                       return (
//                         <li key={index} className="" style={{cursor:'pointer',width:'max-content'}}>
//                     <Link className="dropdown-item" href={`/viewissue/${filteredTicket.projectId}`}>
//                     <div className='subtask-details d-flex justify-content-between p-2' style={{"boxShadow":"0 1px 1px rgba(9,30,66,0.25),0 0 1px 1px rgba(9,30,66,0.13)","borderRadius":"3px"}}>
//                             <div className='left-details'>
//                                 <Image src={bugLogo} alt="subtask" />
//                                 <a href='' style={{ "textDecoration": "none" }}>
//                                     <span style={{ "fontSize": "12px", "padding": "0 5px" }}>
//                                         RECHARGE-{filteredTicket.projectId.toString().padStart(4,0)}
//                                     </span>
//                                 </a>
//                                 <span className='align-self-center' style={{ "fontSize": "12px", "padding": "0 2px", "color": "#5e6c84" }}>
//                                     {filteredTicket.summary}
//                                 </span>
//                             </div>
//                             <div className='rigth-details d-flex align-items-center ps-1'>
//                                 <Image src={medium} alt="priority-medium px-1" />
//                                 <div className='status px-1' style={{ "borderRadius": "2px", "backgroundColor": "#E3FCEF","fontSize": "10px", "fontWeight": "700", "color": "#006644" }}>
//                                     {filteredTicket.ticketStatus}
//                                 </div>
//                             </div>
//                         </div>
//                     </Link>
//                   </li>
//                       )
//                     }) : <li>You dont have any ticket</li>
//                   }

//                 </ul>
//               </li>
//               <li className="nav-item dropdown">
//                 <a
//                   className="nav-link dropdown-toggle"
//                   href="#"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                   style={{
//                     fontSize: "14px",
//                     fontWeight: "500",
//                     color: "rgb(52,69,99)",
//                   }}
//                 >
//                   Project
//                 </a>
//                 <ul className="dropdown-menu">
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Action
//                     </a>
//                   </li>
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Another action
//                     </a>
//                   </li>
//                   <li>
//                     <hr className="dropdown-divider"></hr>
//                   </li>
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Something else here
//                     </a>
//                   </li>
//                 </ul>
//               </li>
//               <li className="nav-item dropdown">
//                 <a
//                   className="nav-link dropdown-toggle"
//                   href="#"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                   style={{
//                     fontSize: "14px",
//                     fontWeight: "500",
//                     color: "rgb(52,69,99)",
//                   }}
//                 >
//                   Filters
//                 </a>
//                 <ul className="dropdown-menu">
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Action
//                     </a>
//                   </li>
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Another action
//                     </a>
//                   </li>
//                   <li>
//                     <hr className="dropdown-divider"></hr>
//                   </li>
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Something else here
//                     </a>
//                   </li>
//                 </ul>
//               </li>
//               <li className="nav-item dropdown">
//                 <a
//                   className="nav-link dropdown-toggle"
//                   href="#"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                   style={{
//                     fontSize: "14px",
//                     fontWeight: "500",
//                     color: "rgb(52,69,99)",
//                   }}
//                 >
//                   Dashboards
//                 </a>
//                 <ul className="dropdown-menu">
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Action
//                     </a>
//                   </li>
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Another action
//                     </a>
//                   </li>
//                   <li>
//                     <hr className="dropdown-divider"></hr>
//                   </li>
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Something else here
//                     </a>
//                   </li>
//                 </ul>
//               </li>
//               <li className="nav-item dropdown">
//                 <a
//                   className="nav-link dropdown-toggle"
//                   href="#"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                   style={{
//                     fontSize: "14px",
//                     fontWeight: "500",
//                     color: "rgb(52,69,99)",
//                   }}
//                 >
//                   People
//                 </a>
//                 <ul className="dropdown-menu">
//                   <li>
//                     <Link className="dropdown-item" href="/createteam">
//                       Create Team
//                     </Link>
//                   </li>
//                   {/* <li><a className="dropdown-item" href="#">Another action</a></li>
//             <li><hr className="dropdown-divider"></hr></li>
//             <li><a className="dropdown-item" href="#">Something else here</a></li> */}
//                 </ul>
//               </li>
//               <li className="nav-item dropdown flex items-center">
//                 {session ? (
//                   <button className="bg-blue-500 text-white rounded px-1" onClick={signOutSession}>Logout</button>
//                 ) : (
//                   <a
//                     className="nav-link dropdown-toggle"
//                     href="#"
//                     role="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                     style={{
//                       fontSize: "14px",
//                       fontWeight: "500",
//                       color: "rgb(52,69,99)",
//                     }}
//                   >
//                     Plans
//                   </a>
//                 )}

//                 <ul className="dropdown-menu">
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Action
//                     </a>
//                   </li>
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Another action
//                     </a>
//                   </li>
//                   <li>
//                     <hr className="dropdown-divider"></hr>
//                   </li>
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Something else here
//                     </a>
//                   </li>
//                 </ul>
//               </li>
//               <li className="nav-item dropdown">
//                 <a
//                   className="nav-link dropdown-toggle"
//                   href="#"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                   style={{
//                     fontSize: "14px",
//                     fontWeight: "500",
//                     color: "rgb(52,69,99)",
//                   }}
//                 >
//                   Apps
//                 </a>
//                 <ul className="dropdown-menu">
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Action
//                     </a>
//                   </li>
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Another action
//                     </a>
//                   </li>
//                   <li>
//                     <hr className="dropdown-divider"></hr>
//                   </li>
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Something else here
//                     </a>
//                   </li>
//                 </ul>
//               </li>
//               <button
//                 type="button"
//                 className="btn btn-primary btn-sm py-0"
//                 style={{
//                   backgroundColor: "rgba(0,82,204,0.9)",
//                   height: "28px",
//                   marginTop: "5px",
//                   boxShadow: "none",
//                   border: "none",
//                 }}
//                 onClick={() => {
//                   setShowModal(true);
//                 }}
//               >
//                 Create
//               </button>
//             </ul>
//             <form className="m-0" role="search">
//               <input
//                 className="form-control  py-0 m-0"
//                 type="search"
//                 placeholder="Search"
//                 aria-label="Search"
//                 style={{ border: "2px solid #DFE1E6", width: "90%" }}
//               ></input>
//             </form>
//             {/* <div className='account-icons d-flex g-3'> */}
//             <div
//               className="navbar-notification"
//               style={{ position: "relative" }}
//             >
//               <svg
//                 className="mx-1"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 role="presentation"
//               >
//                 <path
//                   d="M6.485 17.669a2 2 0 002.829 0l-2.829-2.83a2 2 0 000 2.83zm4.897-12.191l-.725.725c-.782.782-2.21 1.813-3.206 2.311l-3.017 1.509c-.495.248-.584.774-.187 1.171l8.556 8.556c.398.396.922.313 1.171-.188l1.51-3.016c.494-.988 1.526-2.42 2.311-3.206l.725-.726a5.048 5.048 0 00.64-6.356 1.01 1.01 0 10-1.354-1.494c-.023.025-.046.049-.066.075a5.043 5.043 0 00-2.788-.84 5.036 5.036 0 00-3.57 1.478z"
//                   fill="currentColor"
//                   fillRule="evenodd"
//                 ></path>
//               </svg>
//               <div
//                 className="notification-count"
//                 style={{
//                   position: "absolute",
//                   backgroundColor: "#DE350B",
//                   color: "#fff",
//                   fontSize: "12px",
//                   top: "-5px",
//                   left: "12px",
//                   borderRadius: "5px",
//                 }}
//               >
//                 <div className="notification-indicator">
//                   <span>9+</span>
//                 </div>
//               </div>
//             </div>
//             <svg
//               className="mx-1"
//               width="24"
//               style={{ color: "#fff" }}
//               height="24"
//               viewBox="0 0 24 24"
//               role="presentation"
//             >
//               <g fillRule="evenodd">
//                 <circle fill="currentColor" cx="12" cy="12" r="10"></circle>
//                 <circle fill="inherit" cx="12" cy="18" r="1"></circle>
//                 <path
//                   d="M15.89 9.05a3.975 3.975 0 00-2.957-2.942C10.321 5.514 8.017 7.446 8 9.95l.005.147a.992.992 0 00.982.904c.552 0 1-.447 1.002-.998a2.004 2.004 0 014.007-.002c0 1.102-.898 2-2.003 2H12a1 1 0 00-1 .987v2.014a1.001 1.001 0 002.004 0v-.782c0-.217.145-.399.35-.472A3.99 3.99 0 0015.89 9.05"
//                   fill="inherit"
//                 ></path>
//               </g>
//             </svg>
//             <svg
//               className="ms-1 me-2"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               role="presentation"
//             >
//               <path
//                 d="M11.701 16.7a5.002 5.002 0 110-10.003 5.002 5.002 0 010 10.004m8.368-3.117a1.995 1.995 0 01-1.346-1.885c0-.876.563-1.613 1.345-1.885a.48.48 0 00.315-.574 8.947 8.947 0 00-.836-1.993.477.477 0 00-.598-.195 2.04 2.04 0 01-1.29.08 1.988 1.988 0 01-1.404-1.395 2.04 2.04 0 01.076-1.297.478.478 0 00-.196-.597 8.98 8.98 0 00-1.975-.826.479.479 0 00-.574.314 1.995 1.995 0 01-1.885 1.346 1.994 1.994 0 01-1.884-1.345.482.482 0 00-.575-.315c-.708.2-1.379.485-2.004.842a.47.47 0 00-.198.582A2.002 2.002 0 014.445 7.06a.478.478 0 00-.595.196 8.946 8.946 0 00-.833 1.994.48.48 0 00.308.572 1.995 1.995 0 011.323 1.877c0 .867-.552 1.599-1.324 1.877a.479.479 0 00-.308.57 8.99 8.99 0 00.723 1.79.477.477 0 00.624.194c.595-.273 1.343-.264 2.104.238.117.077.225.185.302.3.527.8.512 1.58.198 2.188a.473.473 0 00.168.628 8.946 8.946 0 002.11.897.474.474 0 00.57-.313 1.995 1.995 0 011.886-1.353c.878 0 1.618.567 1.887 1.353a.475.475 0 00.57.313 8.964 8.964 0 002.084-.883.473.473 0 00.167-.631c-.318-.608-.337-1.393.191-2.195.077-.116.185-.225.302-.302.772-.511 1.527-.513 2.125-.23a.477.477 0 00.628-.19 8.925 8.925 0 00.728-1.793.478.478 0 00-.314-.573"
//                 fill="currentColor"
//                 fillRule="evenodd"
//               ></path>
//             </svg>
//             <Image
//               className=""
//               src={profileimg}
//               alt="profile-image"
//               width={20}
//               height={20}
//               style={{ borderRadius: "50%" }}
//             />
//             {/* </div> */}
//           </div>
//         </div>
//       </nav>


//       <CreateIssueModal
//         isVisible={showModal}
//         onClose={() => {
//           setShowModal(false);
//         }}
//       />
//     </>
//   );
// }

// export default Navbar;