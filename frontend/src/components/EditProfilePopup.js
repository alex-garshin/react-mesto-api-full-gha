import { useEffect, useContext } from "react";

import PopupWithForm from "./PopupWithForm";

import useForm from "../hooks/useForm";

import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const { enteredValues, errors, handleChange, isFormValid, resetForm } =
    useForm();

  useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [resetForm, isOpen, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser(enteredValues);
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={"Сохранить"}
      onLoading={onLoading}
      isFormValid={isFormValid}
    >
      <fieldset className="form__set">
        <input
          className="form__input form__input_type_username"
          type="text"
          name="name"
          id="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          value={enteredValues.name || ""}
          onChange={handleChange}
          required
        />
        <span id="username-error" className="form__input-error">
          {errors.name}
        </span>

        <input
          className="form__input form__input_type_about"
          type="text"
          name="about"
          id="about"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          value={enteredValues.about ?? ""}
          onChange={handleChange}
          required
        />
        <span id="about-error" className="form__input-error">
          {errors.about}
        </span>

      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
