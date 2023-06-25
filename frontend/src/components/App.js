import React from "react";
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import api from "../utils/Api.js";
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import ProtectedRoute from "./ProtectedRoute.js";
import Register from "./Register.js";
import Login from './Login.js';
import InfoTooltip from "./InfoTooltip.js";
import auth from "../utils/Auth.js";
import { usePopupClose } from "../hooks/usePopupClose.js";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});

  /*Стейты состояния открытия попапов*/
  const [isEditAvatarPopupOpen, setEditAvatarOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfileOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);

  const isOpen = (isEditProfilePopupOpen || isEditAvatarPopupOpen || isAddPlacePopupOpen || isImagePopupOpen || isConfirmDeletePopupOpen || isInfoTooltipOpen);

  const navigate = useNavigate();
  const [headerEmail, setHeaderEmail] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);

  /*Стейт статуса для попапа информации*/
  const [statusTooltip, setStatusTooltip] = React.useState(false);

  /*Вызываем универсальный хук 'usePopupClose' здесь,
  чтобы в каждом компоненте не делать импорт и вызов. 
  Передаем его пропсом в каждый компонент.*/
  const closeAllPopupsByEscOverlay = usePopupClose(isOpen, closeAllPopups);

  /*Стейт вывода текста кнопок*/
  const [isShowStatus, setShowStatus] = React.useState(false);

  /*Получаем информацию о текущем пользавателе*/
  React.useEffect(() => {
    if (loggedIn) {
      api.getUserInfo().then((userInfo) => {
        setCurrentUser(userInfo);
      }).catch((err) => {
        console.log(err);
      })
    }
  }, [loggedIn]);

  /*Получаем список карточек*/
  React.useEffect(() => {
    if (loggedIn) {
      api.getInitialCards().then((cardData) => {
        setCards(cardData);
      }).catch((err) => {
        console.log(err);
      })
    }
  }, [loggedIn]);

  /*Проверяем токен*/
  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getToken(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          setHeaderEmail(res.data.email);
          navigate("/");
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }, [navigate]);

  function handleEditAvatarClick() {
    setEditAvatarOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardDeleteClick(card) {
    setConfirmDeletePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarOpen(false);
    setEditProfileOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setConfirmDeletePopupOpen(false);
    setInfoTooltipOpen(false)
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  /*Обработка лайков карточек*/
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (isLiked) {
      api.deleteLike(card._id)
        .then((res) => {
          setCards((currentState) => currentState.map((item) => (item._id === card._id ? res : item)));
        }).catch((err) => {
          console.log(err);
        })
    } else {
      api.addLike(card._id)
        .then((res) => {
          setCards((currentState) => currentState.map((item) => (item._id === card._id ? res : item)));
        }).catch((err) => {
          console.log(err);
        })
    }
  }

  /*Обработка удаление карточек*/
  function handleCardDelete(card) {
    setShowStatus(true);
    api.deleteCard(card._id)
      .then((res) => {
        setCards((currentState) => currentState.filter((item) => item._id !== card._id));
        closeAllPopups();
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setShowStatus(false);
      })
  }

  /*Обработка обновление информации о пользователе*/
  function handleUpdateUser(userInfo) {
    setShowStatus(true);
    api.editUserInfo(userInfo["name"], userInfo["about"])
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setShowStatus(false);
      });
  }

  /*Обработка изменения аватара*/
  function handleUpdateAvatar(userInfo) {
    setShowStatus(true);
    api.editUserAvatar(userInfo["avatar"])
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        setShowStatus(false);
      })
  }

  /*Обработка сабмита создания новой карточки*/
  function handleAddPlaceSubmit(newCard) {
    setShowStatus(true);
    api.addNewCard(newCard["name"], newCard["link"])
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        setShowStatus(false);
      });

  }

  /*Обработчик регистрации пользователя*/
  function handleRegistration(userData) {
    auth.registrate(userData)
      .then(() => {
        navigate("/sign-in");
        setStatusTooltip(true);
      }).catch((err) => {
        setStatusTooltip(false);
        console.log(err);
      }).finally(() => {
        setInfoTooltipOpen(true);
      })
  }
  /*Обработчик авторизации пользователя*/
  function handleLogin(userData) {
    auth.autorize(userData)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          setHeaderEmail(userData.email);
          navigate("/");
        }
      }).catch((err) => {
        setStatusTooltip(false);
        setInfoTooltipOpen(true);
        console.log(err);
      })
  }

  /* Обработчик выхода из системы*/
  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setHeaderEmail("");
    navigate("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header linkTitle="Выйти" email={headerEmail} signOut={handleSignOut} loggedIn={loggedIn} />
                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={Main}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onCardDeleteClick={handleCardDeleteClick}
                />
                <Footer />
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <Header linkTitle="Войти" redirectPath="/sign-in" />
                <Register handleRegistration={handleRegistration} />
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Header linkTitle="Регистрация" redirectPath="/sign-up" />
                <Login handleLogin={handleLogin} />
              </>
            }
          />
          <Route
            path="/"
            element={loggedIn ? <Navigate to="/" /> : <Navigate to="sign-up" />}
          />
        </Routes>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onCloseByOverlay={closeAllPopupsByEscOverlay}
          onUpdateUser={handleUpdateUser}
          isShowStatus={isShowStatus}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCloseByOverlay={closeAllPopupsByEscOverlay}
          onAddPlace={handleAddPlaceSubmit}
          isShowStatus={isShowStatus}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          onCloseByOverlay={closeAllPopupsByEscOverlay}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onCloseByOverlay={closeAllPopupsByEscOverlay}
          onUpdateAvatar={handleUpdateAvatar}
          isShowStatus={isShowStatus}
        />
        <PopupWithConfirmation
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onCloseByOverlay={closeAllPopupsByEscOverlay}
          onCardDelete={handleCardDelete}
          card={selectedCard}
          isShowStatus={isShowStatus}
        />
        <InfoTooltip
          name='info'
          statusTooltip={statusTooltip}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          onCloseByOverlay={closeAllPopupsByEscOverlay}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
