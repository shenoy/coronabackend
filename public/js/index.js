import '@babel/polyfill';
import { login, logout } from './login';
import { displayMap } from './mapbox';
import { signup } from './signup';

//DOM ELEMENTS
const mapbox = document.getElementById('map');
const loginForm = document.querySelector('.login');
const logoutBtn = document.querySelector('.logout');
const signupForm = document.querySelector('.signup');

//DELEGATION

if (signupForm) {
  signupForm.addEventListener('submit', e => {
    console.log('hello from signup');
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(name, email, password, passwordConfirm);
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    console.log('hello from login');
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (mapbox) {
  const locations = JSON.parse(document.getElementById('map').dataset.location);
  console.log(locations);
  displayMap(locations);
}

if (logoutBtn) logoutBtn.addEventListener('click', logout);
