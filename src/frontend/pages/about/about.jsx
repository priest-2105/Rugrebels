import React from 'react';
import { Link } from 'react-router-dom';
import './about.css'



const About = () => {
    return (

<div>
             
    <main className='mt-5'>
         <h2>About Us</h2>
          <section className="about">
            <p>Welcome to Inside PerryACe, where art and creativity meet. Our team is made up of passionate individuals who share a love for all things artistic. We believe in the power of art to inspire, provoke, and move us, and we are dedicated to bringing that power to our community.
        Our team consists of number individuals with diverse backgrounds and experiences, all united by a shared passion for art. We are adjectives that describe your team, such as creative, knowledgeable, passionate, and friendly, and we are committed to providing our visitors with an unforgettable art experience.
        Our team is passionate about describe what your team is passionate about in regards to art, such as supporting emerging artists, promoting diversity in the arts, or preserving traditional art forms. We are dedicated to creating a welcoming and inclusive environment where everyone can appreciate and engage with art.
        We invite you to visit us at Inside PerryACe and explore our collections. Our team is always here to answer any questions and share our knowledge and love of art with you.</p>
     <img src="images/ben-mater-qzEfkgSTIAc-unsplash.jpg" alt="About-sceneic-image"/>
        </section>
      
      
       <section className="inspiration justify-content-center">
       <h2>Inspiration</h2> 
        <img  className='ms-auto me-auto' src="images/mohamed-nohassi-odxB5oIG_iA-unsplash.jpg" alt="Inspiration Image"/>
        
        <p>Art has always been a source of inspiration and wonder for me. From the vibrant colors of a sunset to the intricate
             details of a sculpture, art has the power to evoke emotions and transport us to another world. As an art gallery, 
             my passion for art drives me to create a space where artists and art enthusiasts can come together and share their love 
             for creativity. By showcasing the works of talented artists and exposing visitors to new and diverse perspectives, I hope 
             to contribute to the growth and enrichment of the art community. There is something truly special about experiencing art in person,
             and I am honored to be able to provide a platform for artists to showcase their incredible talents.</p>
      </section>
        
        
         <h2 className='team-header'>Get To Know Us</h2>
         
           <section className='team'>
   
        <div className="team-member">
          <img src="images/IMG-20230315-WA0046(1).jpg" alt="TeamMember"/>
          <h3>Oluwapelumi Adekoya</h3>
          <p>CEO InsidePerryAce</p>
          <p>lorem ipsium dorothy iya alamala lorem ipsium dorothy iya alamala lor
            em ipsium do
            rothy iya alamala lorem ipsium dorothy iya alamala lorem 
            ipsium dorothy iya alamala lorem ipsium dorothy iya alamala lor
            em ipsium do
            rothy iya alamala lorem ipsium dorothy iya alamala </p>
        </div>
       
      </section>
    
   
    </main>





        </div>
    );
}

export default About;
