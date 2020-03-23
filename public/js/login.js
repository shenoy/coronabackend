//==============================ALERT=======================================================================
const showAlert = (type, msg) => {
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
};

//==================================LOGIN================================================================

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/users/login/',
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
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};

//===========================================LOGOUT PUBLIC=============================================

const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/users/logout/'
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
document.querySelector('.login').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  console.log('hello from login script');
  login(email, password);
});

// document.querySelector('.logout').addEventListener('click', logout);

//========================================================================================================
