import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { useForm } from "../hooks/useForm.js";

function AddPlacePopup(props) {

  const { values, handleChange, setValues } = useForm({ name: "", link: "" });
  const { name, link } = values;

  /*Очистим значение инпутов при открытии попапа*/
  React.useEffect(() => {
    if (props.isOpen) {
      setValues({ name: "", link: "" })
    }
  }, [props.isOpen, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({ name, link });
  }

  return (
    <PopupWithForm
      name='add'
      title='Новое место'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onCloseByOverlay={props.onCloseByOverlay}
      isShowStatus={props.isShowStatus}
      showStatusText='Сохранение...'
      onSubmit={handleSubmit}
      buttonText='Создать'
    >
      <input className="popup__input popup__input_place"
        type="text"
        id="place"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={name || ""}
        onChange={handleChange} required />
      <span className="popup__error" id="place-error"></span>
      <input className="popup__input popup__input_link"
        type="url"
        id="link"
        name="link"
        placeholder="Ссылка на картинку"
        value={link || ""}
        onChange={handleChange} required />
      <span className="popup__error" id="link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;