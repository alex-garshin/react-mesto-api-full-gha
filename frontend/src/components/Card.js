import { useContext } from "react";

import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwner = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = "card__delete-button";
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card._id);
  }

  return (
    <li className="card">
      <div
        className="card__image"
        style={{ backgroundImage: `url(${card.link})` }}
        alt={card.name}
        onClick={handleClick}
      ></div>
      <div className="card__wrapper">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__likes">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Нравится"
            onClick={handleLikeClick}
          />
          <span className="card__likes-counter">{card.likes.length}</span>
        </div>
      </div>
      {isOwner && (
        <button
          className={cardDeleteButtonClassName}
          type="button"
          aria-label="Удалить"
          onClick={handleDeleteClick}
        />
      )}
    </li>
  );
}

export default Card;
