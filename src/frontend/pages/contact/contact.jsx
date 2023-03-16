import React from 'react'; 
import './contact.css'

const Contact = () => {
    return (
        <div>
            
 
<div className="contact">

<div className="map">
<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7926.975880214083!2d3.3440181956176573!3d6.586106741070622!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b921ffae3b2c3%3A0x20bd2789bdec4e5e!2sArchdeacon%20Ogunbiyi!5e0!3m2!1sen!2sng!4v1678912496100!5m2!1sen!2sng" width="100%" height="100%" style={{border:"0"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

</div>

<div className="enquiries">
<h4>PERRYACE</h4>
<p> NO 123 Time Square LN New York, United States </p>

<li>Preeyace@gmail.com</li>
<li>Tel : +2349012914046</li>
<li>Tel : +2349012914046</li> 
</div>


<div className="quickletter">

<div className="card-header mb-3">Say HI To Us :&#41;</div>
<div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder=""/>
</div>



<div className="mb-3 pt-5">
  <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder=""/>
</div>


<div className="mb-3">
  <label htmlFor="exampleFormControlInput1" className="form-label">Subject</label>
  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder=""/>
</div>


<div className="mb-3">
  <label htmlFor="exampleFormControlTextarea1" className="form-label">Message</label>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>

</div>

</div>

 
        </div>
    );
}

export default Contact;
