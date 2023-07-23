const selectors = {
  popupEditProfile: '.popup_type_profile-edit',
  popupUpdateAvatar: '.popup_type_update-avatar',
  popupAddCard: '.popup_type_add-card',
  popupExpandPic: '.popup_type_expand-image',
  popupDeleteCard: '.popup_type_delete-card',
  inputUsername: '.form__input_type_username',
  inputJob: '.form__input_type_job',
  inputImgName: '.form__input_type_name',
  inputImgLink: '.form__input_type_link',
  userName: '.profile__title',
  userJob: '.profile__description',
  userAvatar: '.profile__avatar',
  buttonEdit: '.profile__edit-button',
  buttonUpdateAvatar: '.profile__avatar-button',
  buttonAdd: '.profile__add-button',
  buttonClose: '.popup__close',
  buttonLike: '.card__like-button',
  buttonDel: '.card__delete-button',
  form: '.popup__form',
  cardsList: '.cards__list',
  cardElement: '.card',
  cardImg: '.card__image',
  cardName: '.card__title',
  cardTemplate: '.card-tmp',
  fullSizeImg: '.popup__image',
  fullSizeImgCaption: '.popup__caption',
  popup: '.popup_opened',
  like: 'card__like-button_active',
  popupOpenClose: 'popup_opened',
  likesCounter: '.card__likes-counter'
};

const validationConfig = {
  form: '.form',
  formInput: '.form__input',
  formSubmit: '.form__submit',
  formSet: '.form__set',
  inputError: 'form__input_type_error',
  inputErrorActive: 'form__input-error_active'
};

const popupEditProfile = document.querySelector(selectors.popupEditProfile);
const popupEditProfileButton = document.querySelector(selectors.buttonEdit);
const formEditProfileSubmit = popupEditProfile.querySelector(selectors.form);
const nameInput = popupEditProfile.querySelector(selectors.inputUsername);
const jobInput = popupEditProfile.querySelector(selectors.inputJob);
const popupUpdateAvatar = document.querySelector(selectors.popupUpdateAvatar);
const buttonUpdateAvatar = document.querySelector(selectors.buttonUpdateAvatar);
const formUpdateAvatar = popupUpdateAvatar.querySelector(selectors.form);
const avatar = document.querySelector(selectors.userAvatar);
const popupAddCard = document.querySelector(selectors.popupAddCard);
const popupAddCardButton = document.querySelector(selectors.buttonAdd);
const formAddCardSubmit = popupAddCard.querySelector(selectors.form);
const cardsList = document.querySelector(selectors.cardsList);
const cardTemplate = document.querySelector(selectors.cardTemplate).content;


export {
  selectors,
  validationConfig,
  popupEditProfile,
  popupEditProfileButton,
  formEditProfileSubmit,
  nameInput,
  jobInput,
  popupUpdateAvatar,
  buttonUpdateAvatar,
  formUpdateAvatar,
  avatar,
  popupAddCard,
  popupAddCardButton,
  formAddCardSubmit,
  cardsList,
  cardTemplate
};
