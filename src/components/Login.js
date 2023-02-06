import loginImg from '../media/login-img.png';
import { expresions, allInputs, validateInput } from '../lib/index.js';
import background2 from '../media/background-2.png';
import { loginWithEmail } from '../auth.js';

export const Login = (onNavigate) => {
  const divAll = document.createElement('div');
  const divImage = document.createElement('img');
  const form = document.createElement('form');
  const divContent = document.createElement('div');
  const title = document.createElement('h2');
  const divEmail = document.createElement('div');
  const inputEmail = document.createElement('input');
  const labelEmail = document.createElement('label');
  const errorEmail = document.createElement('p');
  const divPassword = document.createElement('div');
  const inputPassword = document.createElement('input');
  const labelPassword = document.createElement('label');
  const errorPassword = document.createElement('p');
  const buttonLogin = document.createElement('button');

  divAll.setAttribute('class', 'divAll');
  divImage.setAttribute('class', 'divImage');
  divImage.setAttribute('src', loginImg);
  divContent.setAttribute('class', 'divContent');
  form.setAttribute('id', 'form');
  form.setAttribute('class', 'containerForm login');
  labelEmail.setAttribute('for', 'email');
  inputEmail.setAttribute('name', 'email');
  inputEmail.setAttribute('type', 'text');
  inputEmail.setAttribute('placeholder', 'xxxxxx@gmail.com');
  inputEmail.setAttribute('required', '');
  errorEmail.setAttribute('id', 'erroremail');
  errorEmail.setAttribute('class', 'error');
  labelPassword.setAttribute('for', 'password');
  inputPassword.setAttribute('name', 'password');
  inputPassword.setAttribute('type', 'password');
  inputPassword.setAttribute('placeholder', '*********');
  inputPassword.setAttribute('required', '');
  errorPassword.setAttribute('id', 'errorpassword');
  errorPassword.setAttribute('class', 'error');
  buttonLogin.setAttribute('name', 'login');
  buttonLogin.setAttribute('type', 'submit');

  title.textContent = 'Iniciar sesión';
  labelEmail.textContent = 'E-mail';
  errorEmail.textContent = 'El email debe tener un formato valido. ';
  labelPassword.textContent = 'Contraseña';
  errorPassword.textContent = 'La contraseña debe tener de 8 a 16 dígitos, mayúscula, minúscula, número, caracter especial y no acepta espacios.';
  buttonLogin.textContent = 'Iniciar sesión';

  divEmail.append(labelEmail, inputEmail, errorEmail);
  divPassword.append(labelPassword, inputPassword, errorPassword);
  divContent.append(divEmail, divPassword);
  form.append(title, divContent, buttonLogin);
  divAll.append(divImage, form);

  const validFormLogin = (e) => {
    switch (e.target.name) {
      case 'email':
        validateInput(expresions.email, e.target, 'email');
        break;
      case 'password':
        validateInput(expresions.password, e.target, 'password');
        break;
      default:
        // console.log('default');
    }
  };

  inputEmail.addEventListener('keyup', validFormLogin);
  inputEmail.addEventListener('blur', validFormLogin);
  inputPassword.addEventListener('keyup', validFormLogin);
  inputPassword.addEventListener('blur', validFormLogin);

  function userLogin() {
    const email = inputEmail.value;
    const password = inputPassword.value;

    loginWithEmail(email, password)
      .then((result) => {
        const user = result.user;
        if (user.emailVerified === false) {
          alert('Email no verificado, se le envió un correo de verificación');
        } else {
          // console.log('verificado');
          onNavigate('/home');
        }
      })
      .catch((error) => {
        // console.log(error.code);
        // console.log(error.message);
        alert(error.message);
      });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (allInputs.email && allInputs.password) {
      userLogin();
    } else {
      // console.log('Revisa tus datos');
    }
  });

  // cambiando el background de root
  // export const background2 = () => document.getElementById('root')
  // .classList.replace('root-background1', 'root-background2');
  document.getElementById('root').style.backgroundImage = `linear-gradient(rgba(154,84,160,0.5), rgba(255, 168, 0, 0.5)), url(${background2})`;
  document.getElementById('root').style.backgroundRepeat = 'repeat';
  document.getElementById('root').style.backgroundSize = '300px';

  return divAll;
};
