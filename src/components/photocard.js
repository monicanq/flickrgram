import apiKey from '../config/flickrKeys';
import useFetch from "../hooks/useFetch";
import Loader from './Loader';
import { useState } from 'react';
import Modal from './Modal';
import { motion } from 'framer-motion';

const PhotoCard = ({ photo }) => {
    // Fetch the info for each photo
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${apiKey}&photo_id=${photo.id}&format=json&nojsoncallback=1`;
    const { data, isPending } = useFetch(url);
    const [modalShowing, setModalShowing] = useState(false);

    // Create an object with all the relevant information for each photo
    const image = {
        'id': photo.id,
        'farm': photo.farm,
        'title': photo.title,
        'server': photo.server,
        'secret': photo.secret
    };
    // Populate the rest of the fields when we get the data from the last fetch
    if (data) {
        image.author = data.photo.owner.username;
        image.desc = data.photo.description._content;
        image.tags = data.photo.tags.tag;
        image.url = data.photo.urls.url[0]._content;

        const ownerUrl = `https://www.flickr.com/photos/${ data.photo.owner.nsid }/`;
        image.ownerurl = ownerUrl;
    }

    const imgUrl =`https://farm${ image.farm }.staticflickr.com/${ image.server }/${ image.id }_${ image.secret }.jpg`;

    return (
        <div className="photo-card">
            { isPending && <Loader />}
            {data && 
                <motion.div
                    layout>
                    <div className="img-wrap" onClick={() => setModalShowing(true)}>
                        <motion.img 
                            whileHover={ {scale: 1.05} }
                            initial={{ opacity : 0 }}
                            animate={{ opacity : 1 }}
                            src={ imgUrl } 
                            alt={image.title}/>
                    </div>
                    <div className="info-wrap">
                        <h2><span onClick={() => window.open(image.url, "_blank")}>
                                { image.title }
                            </span> by <span onClick={() => window.open(image.ownerurl, "_blank")}>
                                { image.author }
                            </span>
                        </h2>
                        {image.desc ? <p> Description: { image.desc }</p>
                            : <p>This image does not have a description</p>}
                        
                        <div>Tags: {image.tags.map(tag => ( 
                            <li className='tag' key={ tag.id }><span>{ tag._content }</span> </li>
                        ))
                        }</div>
                    </div>
                    
                </motion.div> 
            } 
            <Modal modalShowing={ modalShowing } setModalShowing={ setModalShowing } imgUrl= { imgUrl } imgTitle={ image.title } />
        </div>
        );
}

export default PhotoCard;