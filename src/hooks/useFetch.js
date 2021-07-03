import { useState, useEffect } from 'react';

const useFetch = (url) =>  {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        //AbortController is not compatible with Internet explorer and it makes the app crash
        // const abortCont = new AbortController();

        fetch(url)
            .then(res => {
                if(!res.ok){
                    throw Error('Error: ' + res.status);
                }
                return res.json();
            })
            .then(res => {
                setData(res);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError'){
                    console.log('fetch aborted');
                } else {
                    setIsPending(false);
                    setError(err.message);
                }
            });
            // return () => abortCont.abort();       
        }, [url]);

    return { data, isPending, error }
}

export default useFetch;
