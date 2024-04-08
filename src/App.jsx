import './App.css';
import { BrowserRouter,  Route} from 'react-router-dom';
import Auth from './backend/auth/auth/auth';
import Dashboard from './router/dashboard';
import Public from './router/public';
import { Routes} from 'react-router-dom';
import Dashboardauth from './router/dashboardauth';


 
function App() { 



  
  return (
   
   
     <div className="App">


  
    <BrowserRouter> 
   
    {/* <div className="new-preloader-container">
   <svg id="preloader-svg" width="71" height="102" viewBox="0 0 271 402" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="271" height="402" fill="transparent"/>
      <g filter="url(#filter0_f_0_1)">
      <g filter="url(#filter1_ddd_0_1)">
      <path d="M81.7157 100.714L76.825 46.7906L92.8528 27.8964L127.158 10.0267L172.083 21.2099L193.909 36.9095L210.856 52.5931L212.627 72.1244L214.206 89.5327L200.148 105.694L182.134 132.029L163.448 155.854L141.677 170.098L167.222 197.464L190.799 227.562L213.511 253.027L262 308.406" stroke="#140E0E" stroke-width="8"/>
      </g>
      <g filter="url(#filter2_ddd_0_1)">
      <path d="M190.935 298.286L195.826 352.209L179.798 371.104L145.493 388.973L100.568 377.79L78.7417 362.091L61.7955 346.407L60.0241 326.876L58.4452 309.467L72.5032 293.306L90.5173 266.971L109.203 243.146L130.975 228.902L105.429 201.536L81.8526 171.438L59.1403 145.973L10.6511 90.5945" stroke="#140E0E" stroke-width="8"/>
      </g>
      <path d="M201.269 264.124L8 40.4145" stroke="black" stroke-width="6"/>
      <path d="M261.344 349.367L63.6729 126.029" stroke="black" stroke-width="6"/>
      </g>
      <defs>
      <filter id="filter0_f_0_1" x="0.732727" y="0.781311" width="269.273" height="397.437" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="2.5" result="effect1_foregroundBlur_0_1"/>
      </filter>
      <filter id="filter1_ddd_0_1" x="68.6884" y="5.78131" width="200.317" height="313.246" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="effect1_dropShadow_0_1" result="effect2_dropShadow_0_1"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="effect2_dropShadow_0_1" result="effect3_dropShadow_0_1"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow_0_1" result="shape"/>
      </filter>
      <filter id="filter2_ddd_0_1" x="3.64572" y="87.973" width="200.317" height="313.246" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="effect1_dropShadow_0_1" result="effect2_dropShadow_0_1"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="2"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="effect2_dropShadow_0_1" result="effect3_dropShadow_0_1"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow_0_1" result="shape"/>
      </filter>
      </defs>
  </svg>
  </div>   */}

    
      <div className="contents">
 

      <Routes>

      {/* Frontend ROUTE  */}
      <Route exact path="/publicpath/*" element={<Public/>}/>


      {/* AUTH ROuTE  */}
      <Route exact path="/auth/*" element={<Auth/>}/>


      {/* Dashboard ROUTE */}
      <Route exact path="/admin/*" element={<Dashboard/>}/>


      <Route exact path="/adminauth/*" element={<Dashboardauth/>}/>


    </Routes>



         </div>   

</BrowserRouter>
    </div>
   
  );
}

export default App;
