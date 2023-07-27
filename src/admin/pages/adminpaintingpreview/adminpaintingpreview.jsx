import { useParams } from 'react-router-dom';
import useFetch from '../../../assets/hooks/usefetch';
import './adminpaintingpreview.css'
import { Link } from 'react-router-dom';

 



const Adminpaintingpreview = () => {
    
    
      const { id } = useParams();

    const { data:painting, preloader, error } = useFetch('https://rugrebelsdb.onrender.com/paintings/' + id); 
 
 
    return (

        <div>
  
    <h2> Preview Painting</h2>
     { error && <div>{ error }</div>}

    {/* preloader  */}
     { preloader && <div  className='preloader'>...Loading </div> }                                                                     

 
      { painting && (
              <div>
            <h2>{painting.title}</h2>
            <img src={painting.img} alt="painting" />
            <p>{painting.about}</p>
            <span>{painting.artist}</span>
            <h5>{painting.artist}</h5>
         <Link to={`/editpaintings/${painting.id}`}>  Edit</Link>
           </div>
      )}

  







        </div>

);
}

export default Adminpaintingpreview;
