import './App.css';
import Home from './frontend/pages/homepage/home';
import { BrowserRouter,  Route} from 'react-router-dom';
import Navbar from './frontend/layout/navbar/navbar';
import Paintingdetails from './backend/component/paintingdetails/paintingdetails';
import AddPainting from './admin/pages/addPainting/addPainting';
import Admindashboard from './admin/pages/admindashboard/admindashboard';
import Adminpaintinglist from './admin/pages/adminpaintinglist/adminpaintinglist';
import Editpaintings from './admin/pages/editpaintings/editpaintings';
import Adminpaintingpreview from './admin/pages/adminpaintingpreview/adminpaintingpreview';
import Pagenotfound from './frontend/pages/errorpages/pagenotfound';
import Privateroute from './backend/auth/privateroute/privateroute'; 
import Login from './backend/auth/login/login';   
import Register from './backend/auth/register/register';
import Profile from './backend/profile/profile'; 
import Cart from './backend/cart/carts/cart'; 
import Shop from './frontend/pages/shop/shop'; 
import Footer from './frontend/layout/footer/footer';
import About from './frontend/pages/about/about';
import Contact from './frontend/pages/contact/contact';




function App() { 


  
  return (
   
   <div className="App">
    <BrowserRouter> 
    <div className="contents">

  

 
    <Navbar/>

    {/* <Switch> */}

   
      {/* register page  */}
      <Route path="/Register" component={Register}/>  

      {/* login page  */}
      <Route  path="/login"  component={Login}/>  


      {/* error page  */}
      <Route path="*" component={Pagenotfound} /> 
    
      <Route exact path="/" component={Home} />

      <Route exact path="/shop" component={Shop} />

      <Route exact path="/about" component={About} />

      <Route exact path="/contact" component={Contact} />






    
      <Privateroute path="/addPainting" component={AddPainting} />
      <Privateroute path="/paintings/:id" component={Paintingdetails} />
      <Privateroute path="/admindashboard" component={Admindashboard} />
      <Privateroute path="/adminpaintinglist" component={Adminpaintinglist} />
      <Privateroute path="/editpaintings/:id" component={Editpaintings} />
      <Privateroute path="/adminpaintingpreview/:id" component={Adminpaintingpreview} />
      <Privateroute path="/profile" component={Profile} />
      <Privateroute path="/cart" component={Cart} />
  
  

      <a  className="chatbox" href="https://wa.link/fxm4ew">
  <div  className="chatbox-container">
  LETS CHAT <i className="bi bi-chat-left-dots-fill"></i> 
</div></a>


        </div>
        <Footer/>
 {/* </Switch> */} 
</BrowserRouter>
  
    </div>
  );
}

export default App;
