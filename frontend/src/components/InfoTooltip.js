import imageStatusSuccess from '../images/infoTooltip-success.svg';
import imageStatusFail from '../images/infoTooltip-fail.svg';


function InfoTooltip(props) {
    const messageStatusSuccess = "Вы успешно зарегистрировались!";
    const messageStatusFail = "Что-то пошло не так! Попробуйте ещё раз.";
    return (
        <div className={`popup popup_${props.name} ${props.isOpen ? "popup_opened" : ""}`} onMouseDown={props.onCloseByOverlay}>
            <div className="popup__container">
                <button className={`popup__closed popup__closed-${props.name}`} type="button" onClick={props.onClose} />
                <img className="popup__image-info" src={props.statusTooltip ? imageStatusSuccess : imageStatusFail} alt={props.statusTooltip ? messageStatusSuccess : messageStatusFail} />
                <h2 className="popup__title popup__title_info">{props.statusTooltip ? messageStatusSuccess : messageStatusFail}</h2>
            </div>
        </div>
    );
}

export default InfoTooltip; 