import { useEffect, useState } from 'react';

 const useFetch = (url) => {

    const [ data, setData]  = useState(null);
    const  [ preloader, setPreloader] = useState(true);
    const [error, setError] = useState(null) 
    
  useEffect(() => {

    const abortCont = new AbortController();


    // time out for preloader 
    setTimeout(() => {
        // fething data from json 
        fetch(url, {signal: abortCont.signal })
        .then(res => {
            console.log(res);
            if(!res.ok){
              throw Error('Could not fetch Portrait')
            }
          return res.json();
        })
        .then(data => {
            setData(data);
            setPreloader(false);
           setError(null);
        })
        .catch(err =>{
          if(err.name === 'AbortError'){
            console.log('fetch Aborted');
          }else{
           setPreloader(false);
           setError(err.message)                
          }
        })
    }, 1000);

    return () => abortCont.abort();
  }, [url]);
  

return { data, preloader, error}
}


export default useFetch;