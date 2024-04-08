import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { db } from '../../../backend/config/fire';
import { collection, getDocs } from 'firebase/firestore';
import'./feedback.css';



const Feedback = () => {



  const [ messages, setMessages ] = useState([]);
  const [messagedelete, setMessagedelete] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [sortField, setSortField] = useState(null);
  





  
function formatFirebaseTimestamp(timestamp) {
  const dateObject = timestamp.toDate();
  return dateObject.toLocaleDateString(); // Adjust format as needed
}


  useEffect(() => {
      const fetchMessages = async () => {
        const messagesCollection = collection(db, 'feedbacks');
        const snapshot = await getDocs(messagesCollection);
        const messagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMessages(messagesData);
      };
  
      fetchMessages();
    }, []);

    const handleDeletemessage = async (id) => {
      try {
        const messageRef = db.collection('feedbacks').doc(id);
        await messageRef.delete();
    
        console.log('Message Deleted');
      } catch (error) {
        console.error('Error removing message:', error);
      }
    };
  
  
  

  const handleViewmessage = (date) => {
    setSelectedDate(date);
  };

  const handleClearDate = () => {
    setSelectedDate(null);
  };



  
useEffect(() => {
  const filtered = messages.filter(message => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return (
      ( message.name && message.name.toLowerCase().includes(lowerCaseTerm))||
      ( message.email && message.email.toLowerCase().includes(lowerCaseTerm))||
      ( message.subject && message.subject.toLowerCase().includes(lowerCaseTerm))|| 
      ( message.message && message.message.toString().toLowerCase().includes(lowerCaseTerm))||
      ( message.date && message.date.toString().toLowerCase().includes(lowerCaseTerm))

      // Add more checks as needed
    );
  });
  setFilteredMessages(filtered);
  setShowResults(true); // Show results after initializing
}, [searchTerm, messages]);


const handleInputChange = (e) => {
const term = e.target.value;
setSearchTerm(term);

const filtered = messages.filter(message => {
  const lowerCaseTerm = term.toLowerCase();
  return (
    ( message.name && message.name.toLowerCase().includes(lowerCaseTerm)) ||
    ( message.email && message.email.toLowerCase().includes(lowerCaseTerm)) ||
    ( message.subject && message.subject.toLowerCase().includes(lowerCaseTerm)) || 
    ( message.message && message.message.toString().toLowerCase().includes(lowerCaseTerm)) ||
    ( message.date && message.date.toString().toLowerCase().includes(lowerCaseTerm))   
    // Add more checks as needed
  );
});

setFilteredMessages(filtered);
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
  
    const sortedMessages = [...filteredMessages].sort((a, b) => {
      if (field === 'name') {
        return a.name.localeCompare(b.name);
      } else if (field === 'date') {
        return new Date(a.date) - new Date(b.date);
      }
      return 0;
    });
  
    if (order === 'desc') {
      sortedMessages.reverse();
    }
  
    setFilteredMessages(sortedMessages);
  };
  

 


useEffect(() => {
  // Sorting logic based on sortOrder
  const sortedMessages = [...messages].sort((a, b) => {
    if (sortOrder.name) {
      return sortOrder.name === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    if (sortOrder.date) {
      return sortOrder.date === 'asc' ? Date.parse(a.date) - Date.parse(b.date) : Date.parse(b.date) - Date.parse(a.date);
    }      
    return 0; // No sorting applied
  });

  setFilteredMessages(sortedMessages);
}, [messages, sortOrder]);



    return ( 
      <div className="dashboard-message-outer-container">
        <h4>Feedbacks </h4>
      <div className="message-preview-container">

      <div className="dashboard-feedback-header d-flex mb-5">
        <Link to="#" type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal">
            <h3>Filter <i className="bi bi-funnel"></i></h3></Link>

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

          <div className="message-table-container"> 
            
            <table className="message-table ms-auto me-auto rounded border-2">
              <thead>
                <tr className="">
                  <th> <button onClick={() => handleSort('name')}> Name  <i className="bi-arrow-down-up"></i></button> </th>
                  <th> <button onClick={() => handleSort('name')}> Email  <i className="bi-arrow-down-up"></i></button></th>
                  <th> <button onClick={() => handleSort('name')}>Subject   <i className="bi-arrow-down-up"></i></button></th>  
                  <th> <button onClick={() => handleSort('date')}>Date  <i className="bi-arrow-down-up"></i></button></th>
                  <th>Actions</th>
                </tr> 
              </thead>
              <tbody>
              {filteredMessages.length === 0 && showResults && (
            <tr>
              <td colSpan="9" className="text-center">No results found</td>
            </tr>
          ) }
            {filteredMessages.map((message) => ( 
                  <tr key={message.id}>
                    <td>{message.name}</td>
                    <td>{message.email}</td>
                    <td>{message.subject}</td> 
                    <td>{formatFirebaseTimestamp(message.date)}</td> 
                    <td>
                    <Link to={`/admin/feedback/${message.id}`}> View Info</Link>
                    <button className="d-none decoy-button"></button></td>
                      {/* Delete Message Modal */}
                   

                   
          
                          </tr>
  
                 ))}</tbody>
                  </table>
                      </div>
      
         </div>
  
  
  
  
  
  
  
  
  
          </div>    );
}

export default Feedback;
