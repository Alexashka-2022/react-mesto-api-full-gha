function ImagePopup(props) {
    return (
        <div className={`popup popup_scale ${props.isOpen ? "popup_opened" : ""}`} onMouseDown={props.onCloseByOverlay}>
            <div className="popup__container-big">
                <button className="popup__closed popup__closed-image" type="button" onClick={props.onClose}></button>
                <figure className="popup__image-wrapper">
                    <img className="popup__image" src={props.card ? props.card.link : ""} alt={props.card ? props.card.name : ""} />
                    <figcaption className="popup__image-title">{props.card ? props.card.name : ""}</figcaption>
                </figure>
            </div>
        </div>
    );
}

export default ImagePopup;