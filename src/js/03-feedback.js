import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const saveFormState = throttle(() => {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
}, 500);

const loadFormState = () => {
  const storedState = localStorage.getItem('feedback-form-state');
  if (storedState !== null) {
    const formState = JSON.parse(storedState);
    emailInput.value = formState.email;
    messageInput.value = formState.message;
  }
};

const clearFormState = () => {
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
};

form.addEventListener('input', saveFormState);
form.addEventListener('submit', event => {
  event.preventDefault();
  const postDataObj = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(postDataObj);
  clearFormState();
});

loadFormState();
