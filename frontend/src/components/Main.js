import React from "react";
import Card from './Card.js';
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__image" style={{ backgroundImage: `url(${currentUser.avatar})` }} onClick={props.onEditAvatar}>
                    <button type="button" className="profile__image-edit" ></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <p className="profile__text">{currentUser.about}</p>
                    <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}>
                </button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {props.cards.map((card) => {
                        return (<Card
                            key={card._id}
                            card={card}
                            onCardClick={props.onCardClick}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                            onCardDeleteClick={props.onCardDeleteClick}
                        />)
                    })}
                </ul>
            </section>
        </main>
    );
}

export default Main;