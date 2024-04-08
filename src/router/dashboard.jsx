import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Admindashboard from '../admin/pages/admindashboard/admindashboard';
import EditPaintings from '../admin/pages/editPaintings/editpaintings';
import Feedback from '../admin/pages/feedback/feedback';
import AdminFeedbackDetails from '../admin/pages/feedback/feedbackdetails';
import RecentOrders from '../admin/pages/orders/recentorders';
import Orders from '../admin/pages/orders/orders';
import Notification from '../admin/pages/notification/notification';
import AdminOrderDetails from '../admin/pages/orderdetails/orderdetails';
import Customers from '../admin/pages/customers/customers';
import AdminCustomerDetails from '../admin/pages/customers/customerdetails';
import AddPainting from '../admin/pages/addPainting/addPainting';
import Settings from '../admin/pages/adminsettings/settings';
import Forgotpassword from '../admin/auth/forgotpassword/forgotpassword';
import AdminUserDetails from '../admin/pages/adminuserdetails/adminuserdetails';
import { useAuth } from './useauth';
import { auth, db } from '../backend/config/fire';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState, useParams } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import PreviewPainting from '../admin/pages/previewPainting/previewPainting';
import Editpaintings from '../admin/pages/editPaintings/editpaintings';
import { useDocument } from 'react-firebase-hooks/firestore';
import TodayDate from '../backend/component/date/todaysdate'
import '../admin/admin-styles.css';
import Adminpaintinglist from '../admin/pages/adminPaintinglist/adminpaintinglist';





const ProtectedRoute = ({ element, ...props }) => {
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            // Check if the user document exists in the 'admins' collection
            const adminDocRef = doc(db, 'admins', user.uid);
            const adminDocSnapshot = await getDoc(adminDocRef);
  
            if (adminDocSnapshot.exists()) {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          } catch (error) {
            console.error('Error fetching admin data:', error.message);
            setIsAdmin(false);
          }
        } else {
          // No user is logged in
          setIsAdmin(false);
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    if (isAdmin === null) {
      // Still checking if user is admin, return loading or null
      return null;
    }
  
    return isAdmin ? (
     element
    ) : (
      <Navigate to="/adminauth/login" replace />
    );
  };




const Dashboard = () => {

  const history = useNavigate();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
//   const { category } = useParams();



    const logOut = async () => {
        await signOut(auth);
      };
  
 
        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
              if (user) {
                setUser(user);
        
                try {
                  // Check if the user document exists in the 'admins' collection
                  const adminDocRef = db.collection('admins').doc(user.uid);
                  const adminDocSnapshot = await adminDocRef.get();
        
                  if (adminDocSnapshot.exists) {
                    // Admin document exists, get the user's name from the document
                    const adminData = adminDocSnapshot.data();
                    console.log('Admin Data:', adminData);
        
                    // Here, you can access the user's name using adminData.name or a relevant property
                    // For example, if the name is stored in the 'name' field, you can use adminData.name
                  } else {
                    // The user is not an admin
                    console.log('User is not an admin');
                  }
                } catch (error) {
                  console.error('Error fetching admin data:', error.message);
                }
              }
            });
        
            return () => unsubscribe();
          }, []);
        

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
                   {user && user ? ( 
                     <div className="header-info2 d-flex align-items-center">
                    <img className='rounded'  src={user.img} alt={user.name} height="40px" width="45px" />     
                        <div className="d-flex align-items-center sidebar-info">
                            <div>
                                <h5 style={{fontWeight:"700",lineHeight:"4px"}} className="ms-2 mt-4 font-w400 d-block">{user.name}</h5>
                                <p style={{fontSize:"10px"}} className="ms-2 d-block">{user.email}</p>
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
                        <h5 style={{fontWeight:"900", fontSize:"13px", color:"aliceblue"}}><TodayDate/> </h5>
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
                                            <h6 className="mb-0">john just buy your Painting <strong className="text-warning">Sell $250</strong></h6>
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
                            {user && user ? (<div>
                         <img className='rounded'  src={user.img} alt={user.name} height="40px" width="45px" />
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
                <li><Link className="has-arrow mb-2" to="/admin/paintings" aria-expanded="false">
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


                <Route exact path="/dashboard" element={<ProtectedRoute element={<Admindashboard/>} />} />


                <Route exact path="/paintings" element={<ProtectedRoute element={<Adminpaintinglist/>} />} />


                <Route exact path="/previewpainting/:id" element={<ProtectedRoute element={<PreviewPainting/>} />} />


                <Route exact path="/addpainting" element={<ProtectedRoute element={<AddPainting/>} />} />


                <Route exact path="/customers" element={<ProtectedRoute element={<Customers/>} />} />


                <Route exact path="/customers/:id" element={<ProtectedRoute element={<AdminCustomerDetails/>} />} />


                <Route exact path="/editpainting/:id" element={<ProtectedRoute element={<Editpaintings/>} />} />


                <Route exact path="/notification" element={<ProtectedRoute element={<Notification/>} />} />


                <Route exact path="/orders" element={<ProtectedRoute element={<Orders/>} />} />


                <Route exact path="/:customerId/orderdetails/:id" element={<ProtectedRoute element={<AdminOrderDetails/>} />} />


                <Route exact path="/recentorders" element={<ProtectedRoute element={<RecentOrders/>} />} />

                    
                <Route exact path="/feedback" element={<ProtectedRoute element={<Feedback/>} />} />


                <Route exact path="/feedback/:id" element={<ProtectedRoute element={<AdminFeedbackDetails/>} />} />


                <Route exact path="/settings" element={<ProtectedRoute element={<Settings/>} />} />


                <Route exact path="/adminuserdetails/:id" element={<ProtectedRoute element={<AdminUserDetails/>} />} />


                <Route path="*" element={<Navigate to="/admin/dashboard" />} />


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

            


