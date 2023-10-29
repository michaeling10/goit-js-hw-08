'use strict';

import throttle from 'lodash.throttle';

const loginForm = document.querySelector('.feedback-form');
const emailInput = loginForm.elements.email;
const messageTextarea = loginForm.elements.message;

getInformationForm();

loginForm.addEventListener('input', function (e) {
  e.preventDefault();
  saveInformationForm();
});

function saveInformationForm() {
  const formInfo = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formInfo));
}

function getInformationForm() {
  const formInfoSaved = localStorage.getItem('feedback-form-state');
  if (formInfoSaved) {
    const formInfo = JSON.parse(formInfoSaved);
    emailInput.value = formInfo.email;
    messageTextarea.value = formInfo.message;
  }
}
