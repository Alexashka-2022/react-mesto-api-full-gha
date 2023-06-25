import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    /*Стейты имени и описания пользователя*/
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name='edit'
            title='Редактировать профиль'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onCloseByOverlay={props.onCloseByOverlay}
            onSubmit={handleSubmit}
            isShowStatus={props.isShowStatus}
            showStatusText='Сохранение...'
            buttonText='Сохранить'
        >
            <input className="popup__input popup__input_name"
                type="text"
                id="user"
                name="userName"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                value={name || ""}
                onChange={handleChangeName} required />
            <span className="popup__error" id="user-error"></span>
            <input className="popup__input popup__input_specialization"
                type="text"
                id="specialization"
                name="userData"
                placeholder="Специальность"
                minLength="2"
                maxLength="200"
                value={description || ""}
                onChange={handleChangeDescription} required />
            <span className="popup__error" id="specialization-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;