import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'https://viruswatch.herokuapp.com/api/users/login/',
      data: {
        email,
        password
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

//===========================================LOGOUT PUBLIC=============================================

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'https://viruswatch.herokuapp.com/api/users/logout/'
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged out successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }
  } catch (err) {
    showAlert('error', 'Error logging out, Try again!');
  }
};

//=========================================================================================================
