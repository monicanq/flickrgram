import apiKey from '../config/flickrKeys';
import useFetch from "../hooks/useFetch";
import Loader from './Loader';
import { useState } from 'react';
import Modal from './Modal';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const PhotoCard = ({ id }) => {
    // Fetch the info for each photo
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${apiKey}&photo_id=${id}&format=json&nojsoncallback=1`;
    const { data, isPending } = useFetch(url);
    const [modalShowing, setModalShowing] = useState(false);

    // Create an object with all the relevant information for each photo
    const image = {};
    // Populate the fields when we get the data from the last fetch
    if (data) {
        image.id = data.photo.id;
        image.farm = data.photo.farm;
        image.title = data.photo.title._content;
        image.server = data.photo.server;
        image.secret = data.photo.secret;
        image.author = data.photo.owner.username;
        image.desc = data.photo.description._content;
        image.tags = data.photo.tags.tag;
        image.url = data.photo.urls.url[0]._content;

        const ownerUrl = `https://www.flickr.com/photos/${ data.photo.owner.nsid }/`;
        image.ownerurl = ownerUrl;
    }

    const imgUrl =`https://farm${ image.farm }.staticflickr.com/${ image.server }/${ image.id }_${ image.secret }.jpg`;
    
    if (isPending) <Loader />
    
    return (
        
        <div className="photo-card">
            {data && 
                <motion.div
                layout
                data-testid='photoTest'>
                    <div className="img-wrap" onClick={() => setModalShowing(true)}>
                        <motion.div
                            whileHover={ {scale: 1.05} }
                            initial={{ opacity : 0 }}
                            animate={{ opacity : 1 }}>
                            <LazyLoadImage
                            src={ imgUrl } 
                            alt={image.title}/>
                        </motion.div>
                    </div>
                    <div className="info-wrap">
                        <h2><span onClick={() => window.open(image.url, "_blank")}>
                                { image.title }
                            </span> by <span onClick={() => window.open(image.ownerurl, "_blank")}>
                                { image.author }
                            </span>
                        </h2>
                        {image.desc ? <p className='desc'> Description: { image.desc }</p>
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

 