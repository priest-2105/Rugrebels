import React, { useState, useEffect } from 'react';
import { sendPasswordResetEmail, updateEmail, deleteUser } from 'firebase/auth';
import './settings.css';
import { auth, db } from '../../../backend/config/fire';
import {collection, doc, getDoc, setDoc,addDoc, getDocs, updateDoc } from 'firebase/firestore';
import {getStorage, ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage';
import { Link } from 'react-router-dom';




 

const Settings = () => {
  const [user, setUser] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [profileImages, setProfileImages] = useState([]);
  const storage = getStorage();
  const storageRef = ref(storage, 'users');
  const [selectedImage, setSelectedImage] = useState('');
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');


  const handleAddCategory = async () => {
    if (newCategory.trim() !== '') {
      const categoryDocRef = doc(db, 'paintingcategories', 'productcategorydoc');
      const categoryDocSnap = await getDoc(categoryDocRef);

      if (categoryDocSnap.exists()) {
        const existingData = categoryDocSnap.data();
        const updatedCategories = [...existingData.categories, newCategory.trim()];
        await updateDoc(categoryDocRef, { categories: updatedCategories });
      } else {
        // If the document doesn't exist, create it
        const initialData = { categories: [newCategory.trim()] };
        await setDoc(categoryDocRef, initialData);
      }
    }
  };


  const getCategoryData = async () => {
    try {
      const categoryDocRef = doc(db, 'paintingcategories', 'productcategorydoc');
      const categoryDocSnap = await getDoc(categoryDocRef);
  
      if (categoryDocSnap.exists()) {
        const categoryData = categoryDocSnap.data();
        const categories = categoryData.categories;
        return categories;
      } else {
        console.log('Document does not exist');
        return [];
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
      return [];
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      const categoryData = await getCategoryData();
      setCategories(categoryData);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      const userRef = doc(db, 'adminusers', user.uid);

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
          setError('An error occurred while deleting your account. Please try again later.');
        });
    }
  }, [user]);

  const handleChangeEmail = async () => {
    try {
      await updateEmail(user, newEmail);
      const userRef = doc(db, 'adminusers', user.uid);
      await updateDoc(userRef, { email: newEmail });
      setUserData({ ...userData, email: newEmail });
      setIsEditing(false);
      alert('Email address updated successfully.');
    } catch (error) {
      console.error('Error updating email address:', error.message);
      alert('An error occurred while updating the email address. Please try again later.');
    }
  };

  const handleSaveChanges = async () => {
    try {
      const userRef = doc(db, 'adminusers', user.uid);
      await updateDoc(userRef, userData);
      setIsEditing(false);
      alert('Changes saved successfully.');
    } catch (error) {
      console.error('Error saving changes:', error.message);
      alert('An error occurred while saving changes. Please try again later.');
      setError('An error occurred while deleting your account. Please try again later.');
    }
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, user.email);
      alert('Password reset email sent. Please check your Email.');
    } catch (error) {
      console.log('Error sending password reset email:', error.message);
      alert('An error occurred while sending the password reset email. Please try again later.');
    }
  };


  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteUser(user);
        alert('Your account has been deleted successfully.');
      } catch (error) {
        console.log('Error deleting account:', error.message);
        setError('An error occurred while deleting your account. Please try again later.');
      }
    }
  };



 


const handleUpdateImageSelection = async (imageUrl) => {
  try {
    const userRef = doc(db, 'adminusers', user.uid);

    // Upload the image to Firebase Storage
    const storage = getStorage();
    const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
    await uploadBytes(storageRef, await (await fetch(imageUrl)).blob());

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(storageRef);

    // Update the user document in Firestore with the new image URL
    await updateDoc(userRef, { img: downloadURL });

    // Update the local state
    setUserData({ ...userData, img: downloadURL });
    setIsEditing(false);
  } catch (error) {
    console.error('Error updating profile image:', error.message);
  }
};


  



  const handleImageSelection = (imageUrl) => {
    setSelectedImage(imageUrl);
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
            const adminuserlistCollection = collection(db, 'adminusers');
            const snapshot = await getDocs(adminuserlistCollection);
            const adminuserlistData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAdminuserlist(adminuserlistData);
          };
      
          fetchadminuserlist();
        }, []);

        
  
      
  const updateOrderStatus = async (orderId, newStatus) => {
      try {
        const orderRef = doc(db, 'adminusers', orderId);
        await updateDoc(orderRef, {
          status: newStatus,
        });
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    };
    
  
  const handleApproveOrder = async (orderId) => {
      try {
        await updateOrderStatus(orderId, 'Delivered');
        // Update the state with the new data after the status change
        setAdminuserlist(prevOrders => 
          prevOrders.map(order => 
            order.id === orderId ? {...order, status: 'Delivered'} : order
          )
        );
      } catch (error) {
        console.error('Error approving order:', error);
      }
    };
    



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




        // end of admin settings config 




  return (
        <div> 
             
     
        <div className="admin-dashboard-profile">

           
     
     
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



    <div className="tab-content pt-5" id="myTabContent">



          {/* general setting tab container  */}
      <div className="tab-pane fade show active" id="general-settings-pane" role="tabpanel" aria-labelledby="general-settings" tabindex="0">



   
      <div className="general-settings-tab-input-group d-block">
      <h5>Dark Mode</h5>
      <br />
    
    </div>




      <div className="general-settings-tab-input-group d-block">
      <h5>Add New Categories</h5>
      <br />
      <input
        className='input'
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <button className='btn ms-4' onClick={handleAddCategory}>Add Category</button>
       <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <Link to={`/admin/paintingcategory/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </div>


      
        
              </div>





          {/* profile tab container  */}
          <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">    <div className="admin-dashboard-profile-container">
      
          
                <h3>Profile Information</h3>

                <h6> <i className="bi bi-exclamation-circle"></i> This account was created 11-09-2022</h6>
                  {user && userData ? (
        
                <div className="dashboard-profile-pic-change">
                  
                  <h4>Profile Picture Change</h4>

                  <img src={userData.img} alt={userData.name} /> 

                  <button  
                  type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#changeprofileimagemodal">Change</button>
              </div>) : ( <p>You are not logged in</p>)}
                

              {user && userData ? (
                <> <div className="dashboard-profile-account-information">

              <h4>Profile Information</h4>

              <div className="dashboard-profile-account-information-input-group">
            <input
              type="text"
              name="FullName"
              value={userData?.name || ''}
          className='input'
          placeholder='Full Name'
          id="FullName"
          disabled={!isEditing}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          className='input'
          placeholder='Email Address'
          id="email"
          disabled
        />
      </div>


        <div className="dashboard-profile-account-information-input-group">

        <input
          type="text"
          name="phonenumber"
          value={userData?.phonenumber || ''}
          className='input'
          placeholder='Phone Number'
          id="phonenumber"
          disabled={!isEditing}
          onChange={(e) => setUserData({ ...userData, phonenumber: e.target.value })}
        />
        <input
          type="date"
          name="dateofbirth"
          value={userData?.dateofbirth || ''}
          className='input'
          id="dateofbirth"
          disabled={!isEditing}
          onChange={(e) => setUserData({ ...userData, dateofbirth: e.target.value })}
        />
         
          </div>


          
          <div className="dashboard-profile-account-information-input-group">
          {isEditing && (
        <div className="dashboard-profile-account-information-input-group">
          <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
      )}

      <div className="ms-3 dashboard-profile-account-information-input-group">
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel Editing' : 'Edit Details'}
      </button></div>
      </div>

          </div>  </> ) : (
            <p>You are not logged in</p>
          )}


        <div className="dashboard-profile-account-security">
        
        <h4>Account Security</h4>

        <div className="dashboard-profile-account-security-inner d-block">
          {user ? (
            <>
             <div>
               <form> <input
                  type="email"
                  value={newEmail}
                  className='input'
                  required
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new email"
                />
                <button type="button" className='dashboard-change-email-adress pt-3 pb-3 ms-2' onClick={handleChangeEmail}>
                  Change Email Address
                </button>
                {error && <div>{error}</div>}
              </form></div>
        <div className="d-flex mt-5">
              
               <button type="button" className='bg-success' onClick={handleResetPassword}>
                Reset Password
              </button>
              
              <button type="button" className='bg-danger ms-auto' data-bs-toggle="modal" data-bs-target="#delete-account-modal">
                Delete Account
              </button> 
              </div>




            </>
          ) : (
            <p>You are not logged in</p>
          )}
        </div>
              
        </div>
        </div>
    
         </div>



       <div className="tab-pane fade" id="admin-settings-pane" role="tabpanel" aria-labelledby="admin-settings" tabindex="0">
        
                <div className="dashboard-customers-container">
           
          <div className="dashboard-customers" style={{backgroundColor:"transparent"}}>

          <div className="dashboard-customers-header d-flex mb-5">
          <h3>Admin List</h3>

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
                border: '2px solid aliceblue',
                backgroundColor: 'transparent',
                width: '200px',
                color:'aliceblue',
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
       
             
        



                    {/* Delete Account modal  */}
                      

                    <div className="modal fade delete-account-modal" id="delete-account-modal" tabindex="-1" aria-labelledby="delete-account-modalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="delete-account-modalLabel">Are You Sure You Want to Delete Account ?</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="delete-account-modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p> Input your password to delete you Account </p>
                        <input type="text" name="textpwd" id="textpwd" />
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn-light" data-bs-dismiss="delete-account-modal">Close</button>
                      <button  type="button" className="bg-danger"  onClick={handleDeleteAccount}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
                                      
                
                    {/* end of Delete Account modal */}
    



                {/* change profile image modal  */}
  
            

      {/* <!-- Modal --> */}
      <div className="modal fade" id="changeprofileimagemodal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="changeprofileimagemodalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content profile-image-modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="changeprofileimagemodalLabel">Select Profile Image</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
                <div className="modal-body">
                <div className='profile-image-modal-selected-image'> <img src={selectedImage} alt=""/>
              <h5>Current Image</h5> </div>
      
                 <h1 className="modal-title mt-5 fs-5" id="changeprofileimagemodalLabel">Select Profile Image</h1>
                <div className="profile-images-modal">
                <button onClick={() => handleImageSelection("/images/avatar/acistbear.png")}> <img src="/images/avatar/acistbear.png" alt=""/> </button>
                <button onClick={() => handleImageSelection("/images/avatar/bear on red dress.png")}> <img src="/images/avatar/bear on red dress.png" alt=""/> </button>
                <button onClick={() => handleImageSelection("/images/avatar/cheeatah bear.png")}> <img src="/images/avatar/cheeatah bear.png" alt=""/> </button>
                <button onClick={() => handleImageSelection("/images/avatar/coolking bear.png")}> <img src="/images/avatar/coolking bear.png" alt=""/> </button>
                <button onClick={() => handleImageSelection("/images/avatar/dragonbear.png")}> <img src="/images/avatar/dragonbear.png" alt=""/> </button>
                <button onClick={() => handleImageSelection("/images/avatar/eerbear.png")}> <img src="/images/avatar/eerbear.png" alt=""/> </button>
                <button onClick={() => handleImageSelection("/images/avatar/explorerbear.png")}> <img src="/images/avatar/explorerbear.png" alt=""/> </button>
                <button onClick={() => handleImageSelection("/images/avatar/garfeild bear.png")}> <img src="/images/avatar/garfeild bear.png" alt=""/> </button>
                <button onClick={() => handleImageSelection("/images/avatar/gaybear.png")}> <img src="/images/avatar/gaybear.png" alt=""/> </button>
                <button onClick={() => handleImageSelection("/images/avatar/jewel bear.png")}> <img src="/images/avatar/jewel bear.png" alt=""/> </button>
                <button onClick={() => handleImageSelection("/images/avatar/koalabear.png")}> <img src="/images/avatar/koalabear.png" alt=""/> </button>
                <button onClick={() => handleImageSelection("/images/avataroriginal-3e9d42fc813402fcccb4f37a547f5fc8.png/")}> <img src="/images/avatar/original-3e9d42fc813402fcccb4f37a547f5fc8.png" alt=""/> </button>
                <button onClick={() => handleImageSelection("/images/avatar/original-6b26043042bdaa3281a54ffba25525d3.png")}> <img src="/images/avatar/original-6b26043042bdaa3281a54ffba25525d3.png" alt=""/> </button>
                <button onClick={() => handleImageSelection("/images/avatar/original-ad501e6b4a103b0ab335611317724356.png")}> <img src="/images/avatar/original-ad501e6b4a103b0ab335611317724356.png" alt=""/> </button>
                <button onClick={() => handleImageSelection("/images/avatar/pervbear.png")}> <img src="/images/avatar/pervbear.png" alt=""/> </button>
                <button onClick={() => handleImageSelection("/images/avatar/purg bear.png")}> <img src="/images/avatar/purg bear.png" alt=""/> </button>
                <button onClick={() => handleImageSelection("/images/avatar/purgbear2.png")}> <img src="/images/avatar/purgbear2.png" alt=""/> </button>
                <button onClick={() => handleImageSelection("/images/avatar/samuraibear.png")}> <img src="/images/avatar/samuraibear.png" alt=""/> </button>
                <button onClick={() => handleImageSelection("/images/avatar/sandwich.png")}> <img src="/images/avatar/sandwich.png" alt=""/> </button>
                <button onClick={() => handleImageSelection("/images/avatar/tattoo bear.png")}> <img src="/images/avatar/tattoo bear.png" alt=""/> </button>
                <button onClick={() => handleImageSelection("/images/avatar/tiger.png")}> <img src="/images/avatar/tiger.png" alt=""/> </button>
                <button onClick={() => handleImageSelection("/images/avatar/wig bear.png")}> <img src="/images/avatar/wig bear.png" alt=""/> </button>
                <button onClick={() => handleImageSelection("/images/avatar/sherrif bear.png")}> <img src="/images/avatar/sherrif bear.png" alt=""/> </button>
              </div>
            </div>
              <div className="modal-footer">
              <button type="button" className="btn btn-secondary me-3" data-bs-dismiss="modal">Close</button>
              <button  onClick={() =>  handleUpdateImageSelection(selectedImage)} className="btn">Update</button>
            </div>
          </div>
        </div>
      </div>

    </div>
</div>
      </div>
  );
};

export default Settings;
