import {Route, Link } from 'react-router-dom';  
import { Routes } from 'react-router-dom';
import AddPainting from '../admin/pages/addPainting/addPainting';
import Admindashboard from '../admin/pages/admindashboard/admindashboard';
import Adminpaintinglist from '../admin/pages/adminpaintinglist/adminpaintinglist';
import Adminpaintingpreview from '../admin/pages/adminpaintingpreview/adminpaintingpreview';
import Editpaintings from '../admin/pages/editpaintings/editpaintings';
import Messages from '../admin/pages/messages/messages';
import '../admin/admin-styles.css'

const Dashboard = () => {
  
  
    return (
        <div>

  <div className='dashboard--layout'>
 
   


 {/* <!--**********************************
    Main wrapper start 
***********************************--> */}
<div id="main-wrapper">

{/* <!--********************************** 
        Nav header start
    ***********************************--> */}
    <div className="nav-header">
        {/* <Link to="index.html" className="brand-logo"> */}
        <img src="images/327614953_1009264350035658_5769637390323480968_n-removebg-preview.png" className='ms-5' height="70px" width="50px"  alt="" />
        {/* </Link> */}
        <div className="nav-control">
            <div className="hamburger">
                <span className="line"></span><span className="line"></span><span className="line"></span>
            </div>
        </div>
    </div>
    {/* <!--**********************************
        Nav header end
    ***********************************--> */}

    
    {/* <!--**********************************
        Header start
    ***********************************--> */}
    <div className="header">
        <div className="header-content">
            <nav className="navbar navbar-expand">
                <div className="collapse navbar-collapse justify-content-between">
                    <div className="header-left">
                        <div className="dashboard_bar">
                            Dashboard
                        </div>
                    </div>
                    <ul className="navbar-nav header-right">
                        <li className=" dropdown notification_dropdown">
                            <Link className="nav-link bell-link " to="#">
                           <i className="bi bi-chat-fill"></i>
                                <span className="badge light text-white bg-primary rounded-circle">76</span>
                            </Link>
                        </li>	
                        
                        
                        <li className=" dropdown notification_dropdown">
                            <Link className="nav-link " to="#" data-bs-toggle="dropdown">
                                 <i className="bi bi-bell-fill"></i>

                                <span className="badge light text-white bg-primary rounded-circle">15</span>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-end">
                                <div id="DZ_W_TimeLine02" className="widget-timeline dlab-scroll style-1 ps ps--active-y p-3 height370">
                                <ul className="timeline">
                                    <li>
                                        <div className="timeline-badge primary"></div>
                                        <Link className="timeline-panel text-muted" to="#">
                                            <span>10 minutes ago</span>
                                            <h6 className="mb-0">Youtube, a video-sharing website, goes live <strong className="text-primary">$500</strong>.</h6>
                                        </Link>
                                    </li>
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
                               
                            </div>   <Link className="all-notification" to="/dashboard/notifications">See all notifications <i className="ti-arrow-end"></i></Link>
                              
                            </div>
                        </li>
                        <li className="  dropdown header-profile">
                            <Link className="nav-link" to="#" role="button" data-bs-toggle="dropdown">
                                <img src="/UI-ASSETS/images/images/avatar/1.jpg" width="20" alt=""/>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-end">
                                <Link to="/dashboard/profile" className="dropdown-item ai-icon">
                                    <svg id="icon-user2" xmlns="http://www.w3.org/2000/svg" className="text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    <span className="ms-2">Profile </span>
                                </Link>
                                <Link to="/dashboard/account/settings" className="dropdown-item ai-icon">
                                    <svg id="icon-inbox1" xmlns="http://www.w3.org/2000/svg" className="text-success" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                    <span className="ms-2">Settings</span>
                                </Link>
                                <Link to="#" className="dropdown-item ai-icon" data-bs-toggle="modal" data-bs-target=".logout-modal">
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
    <div className="dlabnav">
        <div className="dlabnav-scroll">
            <div className="dropdown header-profile2 ">
                <Link className="nav-link">
                    <div className="header-info2 d-flex align-items-center">
                        <img src="/UI-ASSETS/images/images/avatar/1.jpg" alt=""/>
                        <div className="d-flex align-items-center sidebar-info">
                            <div>
                                <span className="font-w400 d-block">John Doe </span>
                                {/* <small className="text-end font-w400">Superadmin</small> */}
                            </div>	
                        </div>
                        
                    </div>
                </Link>
            </div>
            <ul className="metismenu" id="menu">
                <li><Link className="has-arrow " to="/dashboard/create" aria-expanded="false">
                <i className="bi bi-pencil-square"></i>
                        <span className="nav-text">Create</span>
                    </Link>
                </li>
                <li><Link className="has-arrow " to="/dashboard/portfolio" aria-expanded="false">
                <i className="bi bi-folder-fill"></i>
                        <span className="nav-text">Portfolio</span>
                    </Link>
                </li>

                <li><Link className="has-arrow " to="/dashboard/profile" aria-expanded="false">
                  <i className="bi bi-person-circle"></i>
                        <span className="nav-text">Profile</span>
                    </Link>
               
                </li>


                <li><Link className="has-arrow " to="/dashboard/invitefriends" aria-expanded="false">
                          <i className="bi bi-people"></i>
                        <span className="nav-text">Invite Friends</span>
                    </Link>
                        </li>

            
                <li><Link className="has-arrow " to="/dashboard/createbot" aria-expanded="false">
                <i className="bi bi-robot"></i>
                        <span className="nav-text">Create a Bot</span>
                    </Link>
                </li>
            
                
        
                    <li className='widget mt-4'> 
                        <span className="nav-text">Others</span>
                </li>
        
                    <li><Link className="has-arrow " to="/dashboard/help" aria-expanded="false">
                    <i className="bi bi-telephone-inbound"></i>
                        <span className="nav-text">Help and Support</span>
                    </Link>
                </li>

                <li><Link className="has-arrow " to="/dashboard/account/settings" aria-expanded="false">
                <i className="bi bi-gear-wide-connected"></i>
                        <span className="nav-text">Settings</span>
                    </Link>
                </li>
                
                <li>
                <Link to="#" className="has-arrow " data-bs-toggle="modal" data-bs-target=".logout-modal">
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
        <div className="container-fluid">
          
        <div className="dashboard-inner">

        <Routes>



                <Route exact path="/addPainting" element={<AddPainting/>} />
                
                
                {  /* <Route exact path="/paintings/:id" element={<Paintingdetails/>} /> */}
                
                
                <Route exact path="/admindashboard" element={<Admindashboard/>} />
                
                <Route exact path="/adminpaintinglist" element={<Adminpaintinglist/>} />
                
                <Route exact path="/editpaintings/:id" element={<Editpaintings/>} />
                
                
                <Route exact path="/adminpaintingpreview/:id" element={<Adminpaintingpreview/>} />
                

                <Route exact path="/messages" element={<Messages/>} />


                </Routes>





         </div> 
        </div>
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
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title text-primary">Are you sure you want to Log out?</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal">
                </button>
            </div>
            <div className="modal-body">
              
              <p>Egestas vitae accumsan mollis posuere curabitur. Id lobortis auctor nulla ipsum in. Ornare pellentesque vitae.</p>
            </div>
            <div className="modal-footer">
                 <button type="button" className="btn" data-bs-dismiss="modal">Cancel</button>
                 <button type="button" className="btn btn-primary" >Logout</button>
               
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

            


