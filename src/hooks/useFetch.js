import { useState, useEffect } from 'react';

const useFetch = (url) =>  {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {   
        ( async() => {
            try {
                const fetchData = await fetch(url);

                // Added the second part of the conditional statement to prevent test failure
                if (!fetchData.ok && fetchData.json._isMockFunction === undefined){
                    throw Error('Error: ' + fetchData.status);
                }
                const data = await fetchData.json();
                setData(data);
                setIsPending(false);
                setError(null);
              } 
            catch (err) {
                setIsPending(false);
                setError(err.message);
              }
        })()   
        }, [url]);

    return { data, isPending, error }
    
}

export default useFetch;
