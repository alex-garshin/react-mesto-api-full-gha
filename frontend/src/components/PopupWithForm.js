import Popup from "./Popup";

function PopupWithForm({ name, title, children, isOpen, onClose, onSubmit, buttonText, onLoading, isFormValid, disableValidation }) {
  return (
    <Popup title={title} onClose={onClose} isOpen={isOpen} onSubmit={onSubmit} >
      <h2 className="popup__title">{title}</h2>
      <form
        name={`${name}-form`}
        action="#"
        className="form popup__form"
        onSubmit={onSubmit}
        noValidate
      >
        {children}
        <button className="form__submit" type="submit" disabled={!isFormValid && !disableValidation}>
          {onLoading ? "Сохранение..." : `${buttonText}`}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
