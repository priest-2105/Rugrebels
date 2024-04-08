import React from 'react';
import { Link } from 'react-router-dom';



const Pagenotfound = () => {


    return (
        <div className='errorpagemessagecontainer'>

            <div className="errorpagemessage">
              page not found
          <br/>
                <Link to="/">go back </Link>
             
            </div>
         </div>
    );
}

export default Pagenotfound;
