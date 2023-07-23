import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ card, onClose, onConfirm, onLoading }) {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirm();
  }

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      isOpen={card}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={"Да"}
      onLoading={onLoading}
      disableValidation={true}
    >
    </PopupWithForm>
  );
}

export default DeleteCardPopup;
