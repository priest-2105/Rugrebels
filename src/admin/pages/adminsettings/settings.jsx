import  { useState, useEffect } from 'react';
import { sendPasswordResetEmail, updateEmail, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth, db } from '../../../backend/config/fire';
import {collection, doc, getDoc, setDoc,addDoc, getDocs, updateDoc } from 'firebase/firestore';
import {getStorage, ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';




 

const Settings = () => {


  const history = useNavigate();
  const [user, setUser] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const storage = getStorage();
  const [savechangesLoading, setSavechangesLoading] = useState(false);
  const storageRef = ref(storage, 'users');
  const [resetemailloading, setResetemailLoading] = useState(false);
  const [resetpasswordloading, setResetpasswordLoading] = useState(false);
  // const [businessName, setBusinessName] = useState('');
  // const [businessPhoneNumber, setBusinessPhoneNumber] = useState('');
  // const [businessWhatsappNumber, setBusinessWhatsappNumber] = useState('');
  // const [businessEmail, setBusinessEmail] = useState('');
  // const [businessAddress, setBusinessAddress] = useState('');
  // const [facebookLink, setFacebookLink] = useState('');
  // const [instagramLink, setInstagramLink] = useState('');
  // const [youtubeLink, setYoutubeLink] = useState('');


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      const userRef = doc(db, 'admins', user.uid);

      getDoc(userRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            setUserData(userData);
          } else {
            console.error('User document does not exist');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error.message);
          toast.error('An error occurred while deleting your account. Please try again later.');
        });
    }
  }, [user]);

  const handleChangeEmail = async () => {
    try {
      await updateEmail(user, newEmail);
      const userRef = doc(db, 'admins', user.uid);
      await updateDoc(userRef, { email: newEmail });
      setUserData({ ...userData, email: newEmail });
      setIsEditing(false);
      toast.success('Email address updated successfully.');
    } catch (error) {
      console.error('Error updating email address:', error.message);
      toast.error('An error occurred while updating the email address. Please try again later.');
    }
  };

  const handleSaveChanges = async () => {
    try {
      setSavechangesLoading(true);
      const userRef = doc(db, 'admins', user.uid);
      await updateDoc(userRef, userData);
      setIsEditing(false);
      toast.success('Changes saved successfully.');
    } catch (error) {
      console.error('Error saving changes:', error.message);    
      setTimeout(() => {
         toast.error('An error occurred while saving changes. Please try again later.');
     }, 3000); 
    }finally {
      setSavechangesLoading(false);
    }  
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, user.email);
      toast.success('Password reset email sent. Please check your Email.');
    } catch (error) {
      console.log('Error sending password reset email:', error.message);
      toast.error('An error occurred while sending the password reset email. Please try again later.');
    }
  };



  
  const [password, setPassword] = useState('');

  const handleDeleteAccount = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        console.error('User not logged in.');
        return;
      }

      // Reauthenticate the user with their current password
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);

      // If reauthentication is successful, proceed with account deletion
      await deleteUser(user);

      // Delete the corresponding document in the "admins" collection
      const adminDocRef = doc(db, 'admins', user.uid);
      await deleteDoc(adminDocRef);

      console.log('Account deleted successfully!');
      toast.success('Account deleted successfully!');
      // You may want to redirect the user to a different page or show a success message
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('Incorrect password. Please try again.');
    }
  };


 

  

 
 

        // Admin Settings config 


         
  const [ adminuserlist, setAdminuserlist ] = useState([]);
  const currentMonth = new Date().getMonth(); // Get the current month (0-indexed)
   const [searchTerm, setSearchTerm] = useState('');
  const [filteredAdminuserlist, setFilteredAdminuserlist] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [sortField, setSortField] = useState(null);
 
    
  
      useEffect(() => {
          const fetchadminuserlist = async () => {
            const adminuserlistCollection = collection(db, 'admins');
            const snapshot = await getDocs(adminuserlistCollection);
            const adminuserlistData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAdminuserlist(adminuserlistData);
          };
      
          fetchadminuserlist();
        }, []);

        

useEffect(() => {
  const filtered = adminuserlist.filter(userlist => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return (
     ( userlist.name && userlist.name.toLowerCase().includes(lowerCaseTerm)) ||
     ( userlist.email && userlist.email.toLowerCase().includes(lowerCaseTerm)) ||
     ( userlist.location && userlist.location.toLowerCase().includes(lowerCaseTerm)) || 
     ( userlist.amountspent && userlist.amountspent.toLowerCase().includes(lowerCaseTerm)) || 
     ( userlist.phonenumber && userlist.phonenumber.toLowerCase().includes(lowerCaseTerm)) || 
     ( userlist.date && userlist.date.toString().toLowerCase().includes(lowerCaseTerm)) 

      // Add more checks as needed
    );
  });
  setFilteredAdminuserlist(filtered);
  setShowResults(true); // Show results after initializing
}, [searchTerm, adminuserlist]);


const handleInputChange = (e) => {
const term = e.target.value;
setSearchTerm(term);

const filtered = adminuserlist.filter(userlist => {
  const lowerCaseTerm = term.toLowerCase();
  return (
   ( userlist.name && userlist.name.toLowerCase().includes(lowerCaseTerm)) ||
   ( userlist.email && userlist.email.toLowerCase().includes(lowerCaseTerm)) ||
   ( userlist.location && userlist.location.toLowerCase().includes(lowerCaseTerm)) || 
   ( userlist.amountspent && userlist.amountspent.toLowerCase().includes(lowerCaseTerm)) || 
   ( userlist.phonenumber && userlist.phonenumber.toLowerCase().includes(lowerCaseTerm)) || 
   ( userlist.date && userlist.date.toString().toLowerCase().includes(lowerCaseTerm)) 
  );
});

setFilteredAdminuserlist(filtered);
setShowResults(true); // Show results when there is a search term
};



    // table sorting      
  
const [sortOrder, setSortOrder] = useState({
  name: null,
  price: null,
  date: null
});
    

const [filterOptions, setFilterOptions] = useState({
  dateRange: {
    startDate: null,
    endDate: null,
  },
  priceRange: {
    minPrice: null,
    maxPrice: null,
  },
  status: {
    inStock: false,
    outOfStock: false,
    notActive: false,
  },
});


    

  const [sortConfig, setSortConfig] = useState({ field: null, order: 'asc' });

  const handleSort = (field) => {
    let order = 'asc';
    if (sortConfig.field === field && sortConfig.order === 'asc') {
      order = 'desc';
    }
    setSortConfig({ field, order });
  
    const sortedAdminuserlist = [...filteredAdminuserlist].sort((a, b) => {
      if (field === 'name') {
        return a.name.localeCompare(b.name);
      } else if (field === 'date') {
        return new Date(a.date) - new Date(b.date);
      }
      return 0;
    });
  
    if (order === 'desc') {
      sortedAdminuserlist.reverse();
    }
  
    setFilteredAdminuserlist(sortedAdminuserlist);
  };
  

 


      useEffect(() => {
        // Sorting logic based on sortOrder
        const sortedAdminuserlist = [...adminuserlist].sort((a, b) => {
          if (sortOrder.name) {
            return sortOrder.name === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
          }
          if (sortOrder.date) {
            return sortOrder.date === 'asc' ? Date.parse(a.date) - Date.parse(b.date) : Date.parse(b.date) - Date.parse(a.date);
          }      
          return 0; // No sorting applied
        });

        setFilteredAdminuserlist(sortedAdminuserlist);
      }, [adminuserlist, sortOrder]);
 
    // end of table sorting config 
 
 
 
 
    const [businessInfo, setBusinessInfo] = useState({
        businessName: '',
        businessPhoneNumber: '',
        businessWhatsappNumber: '',
        businessEmail: '',
        businessAddress: '',
        facebookLink: '',
        instagramLink: '',
        youtubeLink: '',
        xLink: '',
        privacyPolicy: '',
        termsOfService: '',
      });
    
      useEffect(() => {
        const fetchBusinessInfo = async () => {
          try {
            const businessInfoCollectionRef = collection(db, 'businessInfo');
            const querySnapshot = await getDocs(businessInfoCollectionRef);
    
            // Assuming you want to get the first document
            const firstDocument = querySnapshot.docs[0];
    
            if (firstDocument) {
              setBusinessInfo(firstDocument.data());
            }
          } catch (error) {
            console.error('Error fetching business information:', error);
          }
        };
    
        fetchBusinessInfo();
      }, []);
    
      const updateBusinessInfo = async () => {
        try {
          // Use a specific document reference to update the existing document
          const businessInfoDocRef = doc(db, 'businessInfo', 'businessInfo');
          await setDoc(businessInfoDocRef, businessInfo);
    
          console.log('Business information updated successfully!');
          toast.success('Business information updated successfully!');
        } catch (error) {
          console.error('Error updating business information:', error);
          toast.error('Error updating business information');
        }
      };
    

  return (

        <div> 
             
     
        <div className="admin-dashboard-profile bg-transparent">

           
     
     
                <ul className="nav nav-tabs" id="myTab" role="tablist">
      <li className="nav-item me-3" role="presentation">
        <button className="nav-link active" id="general-settings" data-bs-toggle="tab" data-bs-target="#general-settings-pane" type="button" role="tab" aria-controls="general-settings-pane" aria-selected="true">General Settings</button>
      </li>
      <li className="nav-item me-3" role="presentation">
        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Profile Settings</button>
      </li>
      <li className="nav-item me-3" role="presentation">
        <button className="nav-link" id="admin-settings" data-bs-toggle="tab" data-bs-target="#admin-settings-pane" type="button" role="tab" aria-controls="admin-settings-pane" aria-selected="false">Admin Settings</button>
      </li>
    </ul>



    <div className="tab-content  bg-transparent pt-5" id="myTabContent">

          {/* general setting tab container  */}
      <div className="tab-pane fade show active" id="general-settings-pane" role="tabpanel" aria-labelledby="general-settings" tabIndex="0">
      <div className="col-xl-12 bg-transparent col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card bg-transparent">
              <h5 className="card-header">General Settings</h5>
      
              <div className="general-settings-tab-input-group text-light d-block">
             
              <h5 className="text-light fw-bold pt-3">Business Name</h5>
        <br />
        <div className='form-group d-flex'>
          <input
            className='form-control col-lg-4 col-md-8 text-light bg-transparent col-sm-10 input mb-2'
            type="text"
            value={businessInfo.businessName}
           onChange={(e) => setBusinessInfo({ ...businessInfo, businessName: e.target.value })}
            />
        </div></div>


      <div className="general-settings-tab-input-group text-light d-block">
        <h5 className="text-light fw-bold pt-3">Business Phone Number</h5>
        <br />
        <div className='form-group d-flex'>
          <input
            className='form-control col-lg-4 col-md-8 text-light bg-transparent col-sm-10 input mb-2'
            type="text"
            value={businessInfo.businessPhoneNumber}
           onChange={(e) => setBusinessInfo({ ...businessInfo, businessPhoneNumber: e.target.value })}
            />
        </div>
      </div>

      <div className="general-settings-tab-input-group text-light d-block">
        <h5 className="text-light fw-bold pt-3">Business Whatsapp Number</h5>
        <br />
        <div className='form-group d-flex'>
          <input
            className='form-control col-lg-4 col-md-8 text-light bg-transparent col-sm-10 input mb-2'
            type="text"
            value={businessInfo.businessWhatsappNumber}
           onChange={(e) => setBusinessInfo({ ...businessInfo, businessWhatsappNumber: e.target.value })}
            />
        </div></div>


        <div className="general-settings-tab-input-group text-light d-block">
        <h5 className="text-light fw-bold pt-3">Business Email</h5>
        <br />
        <div className='form-group d-flex'>
          <input
            className='form-control col-lg-4 col-md-8 text-light bg-transparent col-sm-10 input mb-2'
            type="text"
            value={businessInfo.businessEmail}
           onChange={(e) => setBusinessInfo({ ...businessInfo, businessEmail: e.target.value })}
            />
        </div>
      </div>

      <div className="general-settings-tab-input-group text-light d-block">
        <h5 className="text-light fw-bold pt-3">Business Address</h5>
        <br />
        <div className='form-group d-flex'>
          <input
            className='form-control col-lg-4 col-md-8 text-light bg-transparent col-sm-10 input mb-2'
            type="text"
            value={businessInfo.businessAddress}
           onChange={(e) => setBusinessInfo({ ...businessInfo, businessAddress: e.target.value })}
            />
      
        </div>
      </div>

      <div className="general-settings-tab-input-group text-light d-block">
        <h5 className="text-light fw-bold pt-3">Social Media links</h5>
        <br />
        <label className='mt-2' htmlFor="">Facebook</label>
        <div className='form-group d-flex'>
          <input
            className='form-control col-lg-4 col-md-8 text-light bg-transparent col-sm-10 input mb-2'
            type="text"
            value={businessInfo.facebookLink}
           onChange={(e) => setBusinessInfo({ ...businessInfo, facebookLink: e.target.value })}
            />  
      </div>

        <label className='mt-2' htmlFor="">Instagram</label>
        <div className='form-group d-flex'>
          <input
            className='form-control col-lg-4 col-md-8 text-light bg-transparent col-sm-10 input mb-2'
            type="text"
            value={businessInfo.instagramLink}
           onChange={(e) => setBusinessInfo({ ...businessInfo, instagramLink: e.target.value })}
            />
        </div>

        <label className='mt-2' htmlFor="">X</label>
        <div className='form-group d-flex'>
          <input
            className='form-control col-lg-4 col-md-8 text-light bg-transparent col-sm-10 input mb-2'
            type="text"
            value={businessInfo.xLink}
           onChange={(e) => setBusinessInfo({ ...businessInfo, xLink: e.target.value })}
            />
        </div>
  
  
  
        <label className='mt-2' htmlFor="">Youtube</label>
        <div className='form-group d-flex'>
          <input
            className='form-control col-lg-4 col-md-8 text-light bg-transparent col-sm-10 input mb-2'
            type="text"
            value={businessInfo.youtubeLink}
           onChange={(e) => setBusinessInfo({ ...businessInfo, xLink: e.target.value })}
            />
       
      </div>

      <div className="general-settings-tab-input-group text-light d-block">
        <label className='mt-2' htmlFor="">Privacy Policy</label>
        <div className='form-group d-flex'>
          <input
            className='form-control col-lg-4 col-md-8 text-light bg-transparent col-sm-10 input mb-2'
            type="text"
            value={businessInfo.privacyPolicy}
           onChange={(e) => setBusinessInfo({ ...businessInfo, xLink: e.target.value })}
            />
        </div>
  
  
        <label className='mt-2' htmlFor="">Terms of Service</label>
        <div className='form-group d-flex'>
          <input
            className='form-control col-lg-4 col-md-8 text-light bg-transparent col-sm-10 input mb-2'
            type="text"
            value={businessInfo.termsOfService}
           onChange={(e) => setBusinessInfo({ ...businessInfo, xLink: e.target.value })}
            />
        </div>
        <button className='btn col-11 btn-primary ms-4 mt-5 justify-self-center' onClick={updateBusinessInfo}>Update</button>
        </div>

       
    </div>
    

              </div>
      </div>
  </div>




          {/* profile tab container  */}
          <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">    <div className="admin-dashboard-profile-container">
    <div className='card bg-transparent text-light pt-4 pb-5'>
          {user && userData ? (
                <>  
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="user-profile-container col-12">
      
                
            <h3 className='card-header'>Profile Information</h3>    

            <button type="button" className="text-end d-none btn btn-danger logout-button ms-auto"  data-bs-toggle="modal" data-bs-target="#exampleModal">Logout </button>
                    

            <div className="user-profile-account-information d-block">
          
                <h6> <i className="bi bi-exclamation-circle"></i> This account was created {userData.dateJoined}</h6>

          <div className="user-profile-account-information-input-group">
            <div className="profile-input-each"> 
              
                  <label htmlFor="Ful Name"> Full Name</label><br/>
                
            <input
              type="text"
              className='col-sm-12 input'
              name="FullName"
              value={userData?.name || ''}
              placeholder='Full Name'
              id="FullName"
              disabled={!isEditing}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            /></div>


          <div className="profile-input-each"> 
          <label htmlFor="userName"> Username</label><br/> 
                <input
                  autoComplete='on'
                    required
                    className='col-sm-12'
                    type="text"
                    name="userName"
                    id="userName"
                    value={userData?.userName || ''}
                    onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
              disabled={!isEditing}
                  
                  />    </div>
              </div>

              <div className="user-profile-account-information-input-group">
          
          <div className="profile-input-each">
              <label htmlFor="">Phone Number</label><br/> 

              <div className="profile-phonenumberinput">
            {/* <PhoneInput
              international
              countryCallingCodeEditable={true}
              defaultCountry="NG"
              className='col-sm-12'
              value={userData?.phoneNumber || ''}
              name="Phone_Number"
              onChange={(value) => setUserData({ ...userData, phoneNumber: value })}
              readOnly={!isEditing}   
              />  */}
          </div></div>


          <div className="profile-input-each"> 
          <label htmlFor="Whatsapp_Number">Whatsapp Number</label><br/>
          <div className="profile-phonenumberinput">
          
                {/* <PhoneInput
                international
              className='col-sm-12'
                countryCallingCodeEditable={true}
              defaultCountry="NG"
              value={userData?.whatsappNumber || ''}
              name="Whatsapp_Number"
              onChange={(value) => setUserData({ ...userData, whatsappNumber: value })}
              readOnly={!isEditing}
                />  */}
                </div>
        </div>
            </div>
        
      

          <div className="user-profile-account-information-input-group">
            {isEditing && (
          <div className="user-profile-account-information-input-group">
            <button onClick={handleSaveChanges} disabled={savechangesLoading}>
                  {savechangesLoading && (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            )}Save Changes
                  </button>
                </div>
              )}

              <div className="ms-3 user-profile-account-information-input-group">
              <button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel Editing' : 'Edit Details'}
            </button></div>
          </div>




          <div className="user-profile-account-security">
        
        <h4>Account Security</h4>

        <div className="user-profile-account-security-inner d-block">
             <div className='d-flex'>
        
           <input
                  type="email"
                  value={newEmail}
                  required
                  className='form-control col-3'
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new email"
                  disabled={resetemailloading}
                />
                <button type="button" className='btn-sm ms-2' onClick={handleChangeEmail}>
                    {resetemailloading && (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            )}
            Send Verification Email
                </button>
          </div>

        <div className="d-flex mt-5">
              
        <button
        type="button"
        className="btn btn-primary"
        onClick={handleResetPassword}
        disabled={resetpasswordloading}
      >
        {resetpasswordloading && (
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        )}
        Reset Password
      </button>
              
              <button type="button" className='ms-auto' style={{backgroundColor:"red"}} data-bs-toggle="modal" data-bs-target="#delete-account-modal">
                Delete Account
              </button> 
              </div>
            </div> 
            </div>
              </div>
                </div>
                </div>
                </>) : (<div> </div>)}
                </div>
                </div>
                </div>


       <div className="tab-pane fade" id="admin-settings-pane" role="tabpanel" aria-labelledby="admin-settings" tabIndex="0">
        
       <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card bg-transparent text-light p-3">
              <h2 className="card-header">Admin Settings</h2>
        
      
                <div className="dashboard-customers-container mt-4">
           
          <div className="dashboard-customers" style={{backgroundColor:"transparent"}}>

          <div className="dashboard-customers-header d-flex text-light mb-5">
          <h5 className="text-light fw-bold pt-3">Admin List</h5>

          <div style={{
          marginLeft:'auto',
          position: 'relative',
          display: 'inline-block'
          }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
            style={{
                padding: '8px 10px', 
                borderRadius: '8px',
                border: '2px solid black',
                backgroundColor: 'transparent',
                width: '300px',
                color:'black',
                boxSizing: 'border-box',
                outline: 'none'
            }}
          />
          <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16" >
                <path fillRule="evenodd"d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.027.045.055.088.086.13l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.087-.13zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>
          </div>
 

          </div>
 

          <table>
          <thead>
          <th><button onClick={() => handleSort('name')}>Admin Name <i className="bi bi-sort-alpha-up"></i> </button> </th>
          <th><button onClick={() => handleSort('name')}> Email </button>  </th>
          <th><button onClick={() => handleSort('name')}> Phone Number </button>  </th>
          <th>Actions </th>
          </thead>
          <tbody>
          {filteredAdminuserlist.length === 0 && showResults && (
          <tr>          
          <td colSpan="9" className="text-center">No results found</td>
          </tr>
          )} {filteredAdminuserlist.map((userlist) => (        
          <tr key={userlist.id}>
          <td><img src={userlist.img} className='rounded me-2' height="30px" width="30px" alt="" />{userlist.name}</td>
          <td>{userlist.email}</td>
          <td> {userlist.phonenumber} </td>
          <td><Link to={`/admin/adminuserdetails/${userlist.id}`}>  View Profile</Link> </td>
          </tr>))} </tbody>
                                                                                                                     
          </table>

          </div>
          </div>

                </div>
                </div>






       </div>
       
             
            {/* Delete Account modal  */}
                      
            <div className="modal fade delete-account-modal" id="delete-account-modal" tabIndex="-1" aria-labelledby="delete-account-modalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="delete-account-modalLabel">Are You Sure You Want to Delete Account?</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>Input your password to delete your account</p>
            <input
              type="password" // Use password type for sensitive input
              name="textpwd"
              id="textpwd"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-light" data-bs-dismiss="modal">Close</button>
            <button type="button" className="bg-danger" data-bs-dismiss="modal" onClick={handleDeleteAccount}>Delete</button>
          </div>
        </div>
      </div>
    </div> 
                
                    {/* end of Delete Account modal */}
    

 


    </div>
</div>
      </div>
  );
};

export default Settings;
