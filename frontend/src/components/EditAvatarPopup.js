import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  const inputRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name='update'
      title='Обновить аватар'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onCloseByOverlay={props.onCloseByOverlay}
      isShowStatus={props.isShowStatus}
      showStatusText='Сохранение...'
      buttonText='Сохранить'
      onSubmit={handleSubmit}
    >
      <input className="popup__input popup__input_avatar"
       type="url"
       id="avatar-link"
       name="avatar-link"
       placeholder="Ссылка на фото"
       ref={inputRef} required />
      <span className="popup__error" id="avatar-link-error"></span>
    </PopupWithForm>
  );

}

export default EditAvatarPopup;