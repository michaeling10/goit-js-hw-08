'use strict';

import throttle from 'lodash.throttle';

const loginForm = document.querySelector('.feedback-form');
const emailInput = loginForm.elements.email;
const messageTextarea = loginForm.elements.message;

getInformationForm();

window.addEventListener('load', function () {
  getInformationForm();
});

const saveInformationFormThrottled = throttle(saveInformationForm, 500);

loginForm.addEventListener('input', function (e) {
  e.preventDefault();
  saveInformationFormThrottled();
});

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if (emailInput.value.trim() === '' || messageTextarea.value.trim() === '') {
    alert(
      'Please enter the complete information before submitting. Check the email address and the message are correct.'
    );
    return;
  } else {
    alert('This form has been successfully submitted!');
  }

  console.log('Email : ' + emailInput.value);
  console.log('Message : ' + messageTextarea.value);

  loginForm.reset();
  localStorage.removeItem('feedback-form-state');
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
