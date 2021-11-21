import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form  textarea'),
  input: document.querySelector('.feedback-form  input'),
};

let formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

// вызываем функцию для проверки данных в хранилище при каждой перезагрузке
populateTextarea();

function onFormSubmit(evt) {
  //  Останавливаем поведение по умолчанию
  evt.preventDefault();

  //  Очищаем форму
  evt.currentTarget.reset();
  //  Убираем сообщение из хранилища
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
}

function onTextareaInput(evt) {
  //  Получаем значение поля
  formData[evt.target.name] = evt.target.value;
  // Сохраняем его в хранилище
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateTextarea() {
  // Получаем значение из хранилища
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parsedMessage = JSON.parse(savedMessage);
  formData = parsedMessage;
  // Если там что - то было, обновляем DOM
  if (savedMessage) {
    (refs.input.value = parsedMessage.email || ''),
      (refs.textarea.value = parsedMessage.message || '');
  }
}
