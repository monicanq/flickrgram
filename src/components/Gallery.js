import apiKey from '../config/flickrKeys';
import useFetch from '../hooks/useFetch';
import PhotoCard from "./PhotoCard";
import Loader from "./Loader";
import { useState, useEffect } from 'react';

 
const Gallery = ({ tag }) => {
    
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);

    const numImages = 10; //Number of images fetched per page

    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ apiKey }&text=${ tag }&sort=relevance&safe_search=1&content_type=1&per_page=${ numImages }&page=${ page }&format=json&nojsoncallback=1`;

    const { data, isPending, error } = useFetch(url);

    useEffect(() => {
        setList([]);
    }, [tag])
    
    useEffect(() => {
        let update =[];
        if (data){
            data.photos.photo.map(item => update.push(item))
        }
        setList(list => [...list, ...update])
    }, [data])
    
    useEffect(() => {
        //Function for infinite scroll
        const isScrolling =() => {
            if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight){
                return;
            }
            setPage(page => page + 1);
        }
        window.addEventListener("scroll", isScrolling);
        return () => window.removeEventListener("scroll", isScrolling);    
    }, []);

    return ( 
        <div className='container ie10up'>
            { error && <div> The photos cannot be fetched :( { error } </div>}
            { isPending && <Loader /> }
            {list && list.map(photo => (
                <PhotoCard id={ photo.id } key={ photo.id } />
            )) }
        </div>
     );
}
 
export default Gallery;
