const Modal = ({modalShowing, setModalShowing, imgUrl, imgTitle}) => {

    const handleClick = e => {
        if (e.target.classList.contains('modal-wrapper')) setModalShowing(false)
    }

    if (!modalShowing) return null;
    else {
        return ( 
            <div className='modal-wrapper' onClick={ e => handleClick(e) }>
                <img src={ imgUrl } alt= { imgTitle } />    
            </div> 
        );
    }
}
 
export default Modal;