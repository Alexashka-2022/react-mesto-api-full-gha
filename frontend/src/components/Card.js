import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    
    /*Проверка, является ли текущий пользователь владельцем карточки*/
    const isOwn = props.card.owner._id === currentUser._id;

    /*Проверка ставил ли текущий пользователь лайк карточке*/
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (`element__like ${isLiked ? "element__like_active" : ""}`);

    function handleCardClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDeleteClick(props.card);
    }

    return (
        <li className="element">
            {isOwn && <button type="button" className="element__delete" onClick={handleDeleteClick} />}
            <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleCardClick} />
            <div className="element__caption">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__likes">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="element__likes-count">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;