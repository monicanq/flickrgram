import apiKey from '../config/flickrKeys';
import useFetch from '../hooks/useFetch';
import PhotoCard from "./photocard";
import { useEffect, useState } from 'react';

 
const Gallery = ({tag}) => {
    
    // Get list with all results from the search
    const numImages = 6;
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${tag}&sort=relevance&safe_search=1&content_type=1&per_page=${numImages}&page=1&format=json&nojsoncallback=1`;
    const { data, error } = useFetch(url);
    const [display, setdisplay] = useState(3);
    const increment = display;

    return ( 
        <div className='container'>
            { error && <div> The photos cannot be fetched :( { error } </div>}
            {data && data.photos.photo.map(photo => (
                <PhotoCard photo = { photo } key={ photo.id } />
            )) }

            {data && <button>Load More</button>}

        </div>
     );
}
 
export default Gallery;