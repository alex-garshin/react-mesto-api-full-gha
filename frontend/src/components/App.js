import { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import HeaderMenuMobile from "./HeaderMenuMobile";

import CurrentUserContext from "../contexts/CurrentUserContext";

import api from "../utils/api";
import auth from "../utils/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedForDeleteCard, setSelectedForDeleteCard] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [email, setEmail] = useState("");
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const history = useHistory();
  useEffect(() => {
    if (isLoggedIn) {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        return;
      }

      api
        .getInitialCards(jwt)
        .then((initialCards) => {
          setCards(initialCards);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });

      api
        .getUserData(jwt)
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [isLoggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
    setSelectedForDeleteCard("");
  }

  function handleUpdateUser(userData) {
    setIsLoading(true);
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }

    api
      .changeUserData(userData, jwt)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(userAvatar) {
    setIsLoading(true);

    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }

    api
      .updateAvatar(userAvatar, jwt)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }

    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked, jwt)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((card) => (card._id === newCard._id ? newCard : card))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleAddPlaceSubmit(newPlace) {
    setIsLoading(true);

    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }

    api
      .addCard(newPlace, jwt)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardDelete(card) {
    setSelectedForDeleteCard(card);
  }

  function handleConfirmDel() {
    setIsLoading(true);

    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }

    api
      .deleteCard(selectedForDeleteCard, jwt)
      .then(() => {
        setCards((cards) =>
          cards.filter((card) => card._id !== selectedForDeleteCard)
        );
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onRegister(data) {
    return auth
      .register(data)
      .then(() => {
        setIsRegistrationSuccess(true);
        setIsInfoTooltipOpen(true);
        history.push("/");
      })
      .catch((err) => {
        setIsRegistrationSuccess(false);
        setIsInfoTooltipOpen(true);
        console.log(`Ошибка: ${err}`);
      });
  }

  function onLogin(data) {
    console.log(data);
    return auth
      .authorize(data)
      .then((res) => {
        setIsLoggedIn(true);
        localStorage.setItem("jwt", res.token);
        history.push("/");
        handleTokenCheck();
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleTokenCheck() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .checkToken(jwt)
        .then((res) => {
          setEmail(res.email);
          setIsLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

  function onSignOut() {
    setIsLoggedIn(false);
    setEmail("");
    setIsMobileMenuOpen(false);
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  }

  function handleChangeMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  const openedPopup =
    isInfoTooltipOpen ||
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard ||
    selectedForDeleteCard;

  useEffect(() => {
    function closePopupByEscapePress(e) {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }

    if (openedPopup) {
      document.addEventListener("keydown", closePopupByEscapePress);
      return () => {
        document.removeEventListener("keydown", closePopupByEscapePress);
      };
    }
  }, [openedPopup]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={email}
          loggedIn={isLoggedIn}
          onSignOut={onSignOut}
          isOpen={isMobileMenuOpen}
          setIsOpen={handleChangeMenu}
        >
          <HeaderMenuMobile
            email={email}
            onSignOut={onSignOut}
            isOpen={isMobileMenuOpen}
            changeMenu={handleChangeMenu}
          />
        </Header>

        <Switch>
          <Route path="/sign-in">
            <Login onLogin={onLogin} />
          </Route>

          <Route path="/sign-up">
            <Register onRegister={onRegister} />
          </Route>

          <ProtectedRoute
            path="/"
            loggedIn={isLoggedIn}
            component={Main}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </Switch>

        <Footer />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isLoading}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
        />
        <DeleteCardPopup
          card={selectedForDeleteCard}
          onClose={closeAllPopups}
          onConfirm={handleConfirmDel}
          onLoading={isLoading}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={selectedCard.link}
          onClose={closeAllPopups}
          name="expand-image"
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          name="auth"
          isSuccessfulAction={isRegistrationSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
