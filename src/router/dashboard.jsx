import {Route, Link, useParams } from 'react-router-dom';  
import { Routes } from 'react-router-dom';
import AddPainting from '../admin/pages/addPainting/addPainting';
import Admindashboard from '../admin/pages/admindashboard/admindashboard';
import Adminpaintinglist from '../admin/pages/adminpaintinglist/adminpaintinglist';
import Editpaintings from '../admin/pages/editpaintings/editpaintings';
import '../admin/admin-styles.css'
import Settings from '../admin/pages/adminsettings/settings';
import Notification from '../admin/pages/notification/notification';
import Customers from '../admin/pages/customers/customers';
import Feedback from '../admin/pages/feedback/feedback';
import { signOut} from 'firebase/auth';
import { auth, db } from '../backend/config/fire';
import { useEffect, useState } from 'react';
import Orders from '../admin/pages/orders/orders';
import AdminCustomerDetails from '../admin/pages/customers/customerdetails';
import AdminOrderDetails from '../admin/pages/orderdetails/orderdetails';
import AdminFeedbackDetails from '../admin/pages/feedback/feedbackdetails';
import TodayDate from '../backend/component/date/todaysdate'
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import AdminUserDetails from '../admin/pages/adminuserdetails/adminuserdetails';
import PaintingsByCategory from '../admin/pages/categories/categories';





const Dashboard = () => {

  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const { category } = useParams();



    const logOut = async () => {
        await signOut(auth);
      };
  

        useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            });
            return unsubscribe;
        }, []);

        useEffect(() => {
          if (user) {
            const userRef = doc(db, 'adminusers', user.uid);
        
            const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
              if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                setUserData(userData);
              } else {
                console.error('User document does not exist');
              }
            }, (error) => {
              console.error('Error fetching user data:', error.message);
              setError('An error occurred while deleting your account. Please try again later.');
            });
        
            // Cleanup the listener when the component is unmounted or when user changes
            return () => unsubscribe();
          }
        }, [user]);
        

    return (
        <div>

  <div className='dashboard--layout' style={{color:"#0f0f13"}}>
 
   


 {/* <!--**********************************
    Main wrapper start 
***********************************--> */}
<div id="main-wrapper">

{/* <!--********************************** 
        Nav header start
    ***********************************--> */}
   
    <div className="nav-header ps-2" style={{backgroundColor:"#0f0f13"}}>
        {/* <Link to="index.html" className="brand-logo"> */}
        <div  className="d-flex align-items-center pt-2"><img src="/images/327614953_1009264350035658_5769637390323480968_n-removebg-preview.png" height="70px" width="45px"  alt="" />
        <h4 className='mt-2'>RugRebels</h4>
            <div className="nav-control">
            <div className="hamburger">
                <span className="line"></span><span className="line"></span><span className="line"></span>
            </div> </div>
        {/* </Link> */}
       
        </div>
    </div>
    {/* <!--**********************************
        Nav header end
    ***********************************--> */}

    
    {/* <!--**********************************
        Header start
    ***********************************--> */}
    <div className="header">
        <div className="header-content"  style={{backgroundColor:"#0F0F0F"}}>
            <nav className="navbar navbar-expand" style={{ background:"linear-gradient( 160deg, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0) 100%)!important "}}>
                <div className="collapse navbar-collapse justify-content-between">
                    <div className="header-left">
                        <div className="dashboard_bar">
                          
            <div className="dropdown header-profile2">
                <Link className="nav-link">
                   {user && userData ? ( 
                     <div className="header-info2 d-flex align-items-center">
                    <img className='rounded'  src={userData.img} alt={userData.name} height="40px" width="45px" />     
                        <div className="d-flex align-items-center sidebar-info">
                            <div>
                                <h5 style={{fontWeight:"700",lineHeight:"4px"}} className="ms-2 mt-4 font-w400 d-block">{userData.name}</h5>
                                <p style={{fontSize:"10px"}} className="ms-2 d-block">{userData.email}</p>
                                {/* <small className="text-end font-w400">Superadmin</small> */}  
                            </div>	
                        </div>  
                    </div>) : ( <p>You are not logged in</p>)}
                </Link>
            </div>
                        </div>
                    </div>
                    <ul className="navbar-nav header-right mt-5">


                    <li className="mt-2 dropdown notification_dropdown">
                        <h5 style={{fontWeight:"900", fontSize:"13px", color:"aliceblue"}}><TodayDate /> </h5>
                        </li>	
                        


                        <li className=" dropdown notification_dropdown">
                            <Link className="nav-link bell-link " to="#">
                           <i className="bi bi-moon-fill"></i>
                            </Link>
                        </li>	
                        
                        
                        <li className=" dropdown notification_dropdown">
                            <Link className="nav-link " to="#" data-bs-toggle="dropdown">
                                 <i className="bi bi-bell-fill"></i>

                                <span className="badge light text-white bg-primary rounded-circle">15</span>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-end" style={{backgroundColor:"#0f0f13", color:"aliceblue"}}>
                                <div id="DZ_W_TimeLine02" className="widget-timeline dlab-scroll style-1 ps ps--active-y p-3 height370">
                                <ul className="timeline">
                                  <li>
                                        <div className="timeline-badge info">
                                        </div>
                                        <Link className="timeline-panel text-muted" to="#">
                                            <span>20 minutes ago</span>
                                            <h6 className="mb-0">New order placed <strong className="text-info">XF-2356.</strong></h6>
                                            <p className="mb-0">Quisque a consequat ante Sit amet magna at volutapt...</p>
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="timeline-badge danger">
                                        </div>
                                        <Link className="timeline-panel text-muted" to="#">
                                            <span>30 minutes ago</span>
                                            <h6 className="mb-0">john just buy your product <strong className="text-warning">Sell $250</strong></h6>
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="timeline-badge success">
                                        </div>
                                        <Link className="timeline-panel text-muted" to="#">
                                            <span>15 minutes ago</span>
                                            <h6 className="mb-0">StumbleUpon is acquired by eBay. </h6>
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="timeline-badge warning">
                                        </div>
                                        <Link className="timeline-panel text-muted" to="#">
                                            <span>20 minutes ago</span>
                                            <h6 className="mb-0">Mashable, a news website and blog, goes live.</h6>
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="timeline-badge dark">
                                        </div>
                                        <Link className="timeline-panel text-muted" to="#">
                                            <span>20 minutes ago</span>
                                            <h6 className="mb-0">Mashable, a news website and blog, goes live.</h6>
                                        </Link>
                                    </li>
                               </ul>
                               
                            </div>   <Link className="all-notification" to="/admin/notifications">See all notifications <i className="ti-arrow-end"></i></Link>
                              
                            </div>
                        </li>
                        <li className="dropdown header-profile">
                            <Link className="nav-link" to="/admin/account/profile" role="button" data-bs-toggle="dropdown">
                            {user && userData ? (<div>
                         <img className='rounded'  src={userData.img} alt={userData.name} height="40px" width="45px" />
                            </div>) : ( <p>You are not logged in</p>)}
                            </Link>
                            <div className="dropdown-menu dropdown-menu-end" style={{backgroundColor:"#0f0f13"}}>
                             
                                <Link to="/admin/messages" className="dropdown-item ai-icon">
                                    <svg id="icon-inbox1" xmlns="http://www.w3.org/2000/svg" className="text-success" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                    <span className="ms-2">Feedbacks</span>
                                </Link>
                                  <Link to="/admin/account/profile" className="dropdown-item ai-icon">
                                    <svg id="icon-settings" xmlns="http://www.w3.org/2000/svg" className="text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    <span className="ms-2">Settings </span>
                                </Link>
                                 <Link to="#" className="dropdown-item ai-icon" data-bs-toggle="modal" data-bs-target=".logout-modal">
                                <i className="bi bi-box-arrow-right"></i>
                                    <span className="ms-2">Logout </span>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
    {/* <!--**********************************
        Header end ti-comment-alt
    ***********************************--> */}

    {/* <!--**********************************
        Sidebar start
    ***********************************--> */}
    <div className="dlabnav" style={{backgroundColor:"#0f0f13"}}>
        <div className="dlabnav-scroll">

 

            <ul className="metismenu pt-5" id="menu">
               
                    <li><Link className="has-arrow mb-2" to="/admin/admindashboard" aria-expanded="false">
                    <i className="bi bi-speedometer"></i>
                        <span className="nav-text">Dashboard</span>
                    </Link>
                </li>
                
                <li><Link className="has-arrow mb-2" to="/admin/orders" aria-expanded="false">
                 <i className="bi bi-basket-fill"></i>
                        <span className="nav-text">Orders</span>
                    </Link>
                </li>

                 <li><Link className="has-arrow mb-2" to="/admin/customers" aria-expanded="false">
                 <i className="bi bi-people-fill"></i>
                        <span className="nav-text">Customers</span>
                    </Link>
                </li>
                <li><Link className="has-arrow mb-2" to="/admin/adminpaintinglist" aria-expanded="false">
                <i className="bi bi-folder-fill"></i>
                        <span className="nav-text">Arts</span>
                    </Link>
                </li>


                <li><Link className="has-arrow mb-2" to="/admin/messages" aria-expanded="false">
                          <i className="bi bi-envelope-arrow-down-fill"></i>
                        <span className="nav-text">Feedbacks</span>
                    </Link>
                        </li>
                    <li><Link className="has-arrow mb-2" to="/admin/notifications" aria-expanded="false">
                    <i className="bi bi-bell-fill"></i>
                        <span className="nav-text">Notification</span>
                    </Link>
                </li>

    
                <li><Link className="has-arrow mb-2" to="/admin/account/settings" aria-expanded="false">
                <i className="bi bi-gear-wide-connected"></i>
                        <span className="nav-text">Settings</span>
                    </Link>
                </li>
                
                <li>
                <Link to="#" className="has-arrow" data-bs-toggle="modal" data-bs-target=".logout-modal">
                 <i className="bi bi-box-arrow-right"></i>
                  <span className="nav-text">Logout</span>
            </Link>
                </li>
            </ul> 
        </div>
    </div>
    {/* <!--**********************************
        Sidebar end
    ***********************************--> */}
    
    {/* <!--**********************************
        Content body start
    ***********************************--> */}
    <div className="content-body">
        {/* <!-- row --> */}
       <div style={{backgroundAttachment:'fixed', minHeight:"100vh", backgroundPosition:"center", backgroundSize:"contain" , backgroundImage:"url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjg4Mi1zYXNpLTIyLmpwZw.jpg')"}}>

        <div className="container-fluid" style={{backgroundColor:"rgba(0,0,0,0.7)", minHeight:"100vh", paddingBottom:"100px"}}>
          
        <div className="dashboard-inner">
        <Routes>



                <Route exact path="/addPainting" element={<AddPainting/>} />
                
                
                {  /* <Route exact path="/paintings/:id" element={<Paintingdetails/>} /> */}
                
                
                <Route exact path="/admindashboard" element={<Admindashboard/>} />
                
             
                <Route exact path="/adminpaintinglist" element={<Adminpaintinglist/>} />


                <Route exact path="/adminpaintingpreview/:id" element={<Editpaintings/>} />
                
                
                <Route exact path="/admincustomerdetails/:id" element={<AdminCustomerDetails/>} />


                <Route exact path="/adminuserdetails/:id" element={<AdminUserDetails/>} />


                <Route exact path="/adminorderdetails/:id" element={<AdminOrderDetails/>} />


                <Route exact path="/adminfeedbackdetails/:id" element={<AdminFeedbackDetails/>} />


                <Route exact path="/paintingcategory/:category" element={<PaintingsByCategory/>} />


                <Route exact path="/orders" element={<Orders/>} />


                <Route exact path="/messages" element={<Feedback/>} />


                <Route exact path="/customers" element={<Customers />} />
               
               
                <Route exact path="/notifications" element={<Notification/>} />
               


                <Route exact path="/account/settings" element={<Settings/>} />


               




                </Routes>





         </div> 
        </div>   </div>
    </div>
    {/* <!--**********************************
        Content body end
    ***********************************--> */}
    
    
    

</div>
{/* <!--**********************************
    Main wrapper end
***********************************--> */}


 {/* <!-- Modal --> */}


            {/* logout modal  */}
        
                     <div className="modal fade logout-modal" tabIndex="-1" role="dialog" aria-hidden="true">    
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                    
                      <div className="modal-body">
                         <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-primary">Logout</h5>
                            <button type="button" className="btn-close" data-bs-dismiss=".logout-modal">
                            </button>
                        </div>
                          
                        <p>Are You Sure You Want to Logout ?</p>
                        </div>
                       <div className="modal-footer">
                            <button type="button" className="btn-secondary" data-bs-dismiss=".logout-modal">Cancel</button>
                            <button type="button"  onClick={logOut} className="btn-danger" >Logout</button>
                        </div>
                    </div> 
                </div>
            </div>   
  
{/* end of logout modal */}





<div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-hidden="true">
    <div className="modal-dialog modal-lg">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal">
                </button>
            </div>
            <div className="modal-body">
                <div className="row">
                                <div className="col-xl-6  col-md-6 mb-4">
                                  <label  className="form-label font-w600">Company Name<span className="text-danger scale5 ms-2">*</span></label>
                                    <input type="text" className="form-control solid" placeholder="Name" aria-label="name"/>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                  <label  className="form-label font-w600">Position<span className="text-danger scale5 ms-2">*</span></label>
                                    <input type="text" className="form-control solid" placeholder="Name" aria-label="name"/>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                    <label  className="form-label font-w600">Job Category<span className="text-danger scale5 ms-2">*</span></label>
                                    <select  className="nice-select default-select wide form-control solid">
                                      <option selected>Choose...</option>
                                      <option>QA Analyst</option>
                                       <option>IT Manager</option>
                                        <option>Systems Analyst</option>
                                    </select>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                    <label  className="form-label font-w600">Job Type<span className="text-danger scale5 ms-2">*</span></label>
                                    <select  className="nice-select default-select wide form-control solid">
                                      <option selected>Choose...</option>
                                      <option>Part-Time</option>
                                       <option>Full-Time</option>
                                        <option>Freelancer</option>
                                    </select>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                  <label  className="form-label font-w600">No. of Vancancy<span className="text-danger scale5 ms-2">*</span></label>
                                    <input type="text" className="form-control solid" placeholder="Name" aria-label="name"/>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                    <label  className="form-label font-w600">Select Experience<span className="text-danger scale5 ms-2">*</span></label>
                                    <select  className="nice-select default-select wide form-control solid">
                                      <option selected>1 yr</option>
                                      <option>2 Yr</option>
                                       <option>3 Yr</option>
                                        <option>4 Yr</option>
                                    </select>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                    <label  className="form-label font-w600">Posted Date<span className="text-danger scale5 ms-2">*</span></label>
                                    <div className="input-group">
                                         <div className="input-group-text"><i className="far fa-clock"></i></div>
                                        <input type="date" name="datepicker" className="form-control" placeholder="DD/MM/YY"/>
                                    </div>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                    <label  className="form-label font-w600">Last Date To Apply<span className="text-danger scale5 ms-2">*</span></label>
                                    <div className="input-group">
                                         <div className="input-group-text"><i className="far fa-clock"></i></div>
                                        <input type="date" name="datepicker" className="form-control" placeholder="DD/MM/YY"/>
                                    </div>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                    <label  className="form-label font-w600">Close Date<span className="text-danger scale5 ms-2">*</span></label>
                                    <div className="input-group">
                                         <div className="input-group-text"><i className="far fa-clock"></i></div>
                                        <input type="date" name="datepicker" className="form-control" placeholder="DD/MM/YY"/>
                                    </div>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                    <label  className="form-label font-w600">Select Gender:<span className="text-danger scale5 ms-2">*</span></label>
                                    <select  className="nice-select default-select wide form-control solid">
                                      <option selected>Choose...</option>
                                      <option>Male</option>
                                       <option>Female</option>
                                    </select>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                  <label  className="form-label font-w600">Salary Form<span className="text-danger scale5 ms-2">*</span></label>
                                    <input type="text" className="form-control solid" placeholder="$" aria-label="name"/>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                  <label  className="form-label font-w600">Salary To<span className="text-danger scale5 ms-2">*</span></label>
                                    <input type="text" className="form-control solid" placeholder="$" aria-label="name"/>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                  <label  className="form-label font-w600">Enter City:<span className="text-danger scale5 ms-2">*</span></label>
                                    <input type="text" className="form-control solid" placeholder="$" aria-label="name"/>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                  <label  className="form-label font-w600">Enter State:<span className="text-danger scale5 ms-2">*</span></label>
                                    <input type="text" className="form-control solid" placeholder="State" aria-label="name"/>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                  <label  className="form-label font-w600">Enter Counter:<span className="text-danger scale5 ms-2">*</span></label>
                                    <input type="text" className="form-control solid" placeholder="State" aria-label="name"/>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                  <label  className="form-label font-w600">Enter Education Level:<span className="text-danger scale5 ms-2">*</span></label>
                                    <input type="text" className="form-control solid" placeholder="Education Level" aria-label="name"/>
                                </div>
                                <div className="col-xl-12 mb-4">
                                      <label  className="form-label font-w600">Description:<span className="text-danger scale5 ms-2">*</span></label>
                                      <textarea className="form-control solid" aria-label="With textarea"></textarea>
                                </div>
                            </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-danger light" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>

 {/* <!-- Modal --> */}
<div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-hidden="true">
    <div className="modal-dialog modal-lg">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal">
                </button>
            </div>
            <div className="modal-body">
                <div className="row">
                                <div className="col-xl-6  col-md-6 mb-4">
                                  <label  className="form-label font-w600">Company Name<span className="text-danger scale5 ms-2">*</span></label>
                                    <input type="text" className="form-control solid" placeholder="Name" aria-label="name"/>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                  <label  className="form-label font-w600">Position<span className="text-danger scale5 ms-2">*</span></label>
                                    <input type="text" className="form-control solid" placeholder="Name" aria-label="name"/>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                    <label  className="form-label font-w600">Job Category<span className="text-danger scale5 ms-2">*</span></label>
                                    <select  className="nice-select default-select wide form-control solid">
                                      <option selected>Choose...</option>
                                      <option>QA Analyst</option>
                                       <option>IT Manager</option>
                                        <option>Systems Analyst</option>
                                    </select>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                    <label  className="form-label font-w600">Job Type<span className="text-danger scale5 ms-2">*</span></label>
                                    <select  className="nice-select default-select wide form-control solid">
                                      <option selected>Choose...</option>
                                      <option>Part-Time</option>
                                       <option>Full-Time</option>
                                        <option>Freelancer</option>
                                    </select>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                  <label  className="form-label font-w600">No. of Vancancy<span className="text-danger scale5 ms-2">*</span></label>
                                    <input type="text" className="form-control solid" placeholder="Name" aria-label="name"/>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                    <label  className="form-label font-w600">Select Experience<span className="text-danger scale5 ms-2">*</span></label>
                                    <select  className="nice-select default-select wide form-control solid">
                                      <option selected>1 yr</option>
                                      <option>2 Yr</option>
                                       <option>3 Yr</option>
                                        <option>4 Yr</option>
                                    </select>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                    <label  className="form-label font-w600">Posted Date<span className="text-danger scale5 ms-2">*</span></label>
                                    <div className="input-group">
                                         <div className="input-group-text"><i className="far fa-clock"></i></div>
                                        <input size="16" type="date" value="2012-06-15" readOnly className="form-control form_datetime solid"/>
                                    </div>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                    <label  className="form-label font-w600">Last Date To Apply<span className="text-danger scale5 ms-2">*</span></label>
                                    <div className="input-group">
                                         <div className="input-group-text"><i className="far fa-clock"></i></div>
                                        <input size="16" type="date" value="2012-06-15" readOnly className="form-control form_datetime solid"/>
                                    </div>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                    <label  className="form-label font-w600">Close Date<span className="text-danger scale5 ms-2">*</span></label>
                                    <div className="input-group">
                                         <div className="input-group-text"><i className="far fa-clock"></i></div>
                                        <input size="16" type="date" value="2012-06-15" readOnly className="form-control form_datetime solid"/>
                                    </div>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                    <label  className="form-label font-w600">Select Gender:<span className="text-danger scale5 ms-2">*</span></label>
                                    <select  className="nice-select default-select wide form-control solid">
                                      <option selected>Choose...</option>
                                      <option>Male</option>
                                       <option>Female</option>
                                    </select>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                  <label  className="form-label font-w600">Salary Form<span className="text-danger scale5 ms-2">*</span></label>
                                    <input type="text" className="form-control solid" placeholder="$" aria-label="name"/>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                  <label  className="form-label font-w600">Salary To<span className="text-danger scale5 ms-2">*</span></label>
                                    <input type="text" className="form-control solid" placeholder="$" aria-label="name"/>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                  <label  className="form-label font-w600">Enter City:<span className="text-danger scale5 ms-2">*</span></label>
                                    <input type="text" className="form-control solid" placeholder="$" aria-label="name"/>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                  <label  className="form-label font-w600">Enter State:<span className="text-danger scale5 ms-2">*</span></label>
                                    <input type="text" className="form-control solid" placeholder="State" aria-label="name"/>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                  <label  className="form-label font-w600">Enter Counter:<span className="text-danger scale5 ms-2">*</span></label>
                                    <input type="text" className="form-control solid" placeholder="State" aria-label="name"/>
                                </div>
                                <div className="col-xl-6  col-md-6 mb-4">
                                  <label  className="form-label font-w600">Enter Education Level:<span className="text-danger scale5 ms-2">*</span></label>
                                    <input type="text" className="form-control solid" placeholder="Education Level" aria-label="name"/>
                                </div>
                                <div className="col-xl-12 mb-4">
                                      <label  className="form-label font-w600">Description:<span className="text-danger scale5 ms-2">*</span></label>
                                      <textarea className="form-control solid" aria-label="With textarea"></textarea>
                                </div>
                            </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-danger light" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>



        </div>
        </div>
    );
}

export default Dashboard;

            


