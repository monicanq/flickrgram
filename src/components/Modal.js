import { motion } from 'framer-motion';

const Modal = ({modalShowing, setModalShowing, imgUrl, imgTitle}) => {

    const handleClick = e => {
        if (e.target.classList.contains('modal-wrapper')) setModalShowing(false)
    }

    if (!modalShowing) return null;
    else {
        return ( 
            <motion.div 
                initial={{ opacity : 0 }}
                animate={{ opacity : 1 }}
                className='modal-wrapper' 
                onClick={ e => handleClick(e) }
                >
                <img src={ imgUrl } alt= { imgTitle } />    
            </motion.div> 
        );
    }
}
 
export default Modal;