import { allInputs, validFormLogin } from '../lib/validate-inputs.js';
import { loginWithEmail } from '../firebase/auth.js';

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
  divAll.setAttribute('id', 'divAll');
  divImage.setAttribute('class', 'divImage');
  divImage.setAttribute('src', 'https://github.com/alextina/DEV003-social-network/blob/main/src/media/login-img.png?raw=true');
  divImage.setAttribute('id', 'divImage');
  divContent.setAttribute('class', 'divContent');
  divContent.setAttribute('id', 'divContent');
  form.setAttribute('id', 'form');
  form.setAttribute('class', 'containerForm login');
  title.id = 'title';
  divEmail.setAttribute('id', 'divEmail');
  labelEmail.setAttribute('for', 'email');
  labelEmail.id = 'labelEmail';
  inputEmail.setAttribute('name', 'email');
  inputEmail.setAttribute('type', 'text');
  inputEmail.setAttribute('placeholder', 'xxxxxx@gmail.com');
  inputEmail.setAttribute('required', '');
  inputEmail.id = 'inputEmail';
  errorEmail.setAttribute('id', 'erroremail');
  errorEmail.setAttribute('class', 'error');
  labelPassword.setAttribute('for', 'password');
  labelPassword.id = 'labelPassword';
  inputPassword.setAttribute('name', 'password');
  inputPassword.setAttribute('type', 'password');
  inputPassword.setAttribute('placeholder', '*********');
  inputPassword.setAttribute('required', '');
  inputPassword.id = 'inputPassword';
  errorPassword.setAttribute('id', 'errorpassword');
  errorPassword.setAttribute('class', 'error');
  buttonLogin.setAttribute('name', 'login');
  buttonLogin.setAttribute('type', 'submit');
  buttonLogin.id = 'buttonLogin';

  title.textContent = 'Iniciar sesión';
  labelEmail.textContent = 'E-mail';
  errorEmail.textContent = 'El email debe tener un formato valido.';
  labelPassword.textContent = 'Contraseña';
  errorPassword.textContent = 'La contraseña debe tener de 8 a 16 dígitos, mayúscula, minúscula, número, caracter especial y no acepta espacios.';
  buttonLogin.textContent = 'Iniciar sesión';

  divEmail.append(labelEmail, inputEmail, errorEmail);
  divPassword.append(labelPassword, inputPassword, errorPassword);
  divContent.append(divEmail, divPassword);
  form.append(title, divContent, buttonLogin);
  divAll.append(divImage, form);

  inputEmail.addEventListener('keyup', validFormLogin);
  inputEmail.addEventListener('blur', validFormLogin);
  inputPassword.addEventListener('keyup', validFormLogin);
  inputPassword.addEventListener('blur', validFormLogin);

  // fx para iniciar sesión
  function userLogin() {
    const email = inputEmail.value;
    const password = inputPassword.value;
    // trayendo fx desde f/auth para iniciar sesión
    loginWithEmail(email, password)
      // si se cumple la promesa entonces...
      .then((result) => {
        const user = result.user;
        // revisa si el correo no esta verificado
        if (user.emailVerified === false) {
          // entonces se alerta al usuario
          alert('Email no verificado, se le envió un correo de verificación');
        } else {
          // si no (si esta verificado) se envia al usuario al home
          onNavigate('/home');
        }
      }) // si no logra iniciar sesión, envía una alerta de error
      .catch((error) => {
        alert(error); // ej. no existe el correo
      });
  }

  // Fx que valida los inputs y permite iniciar sesión si...
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // El valor de los inputs es verdadero
    if (allInputs.email && allInputs.password) {
      userLogin();
    } else {
      // Si es falso, se envía una alerta
      alert('Por favor, revisa tus datos.');
    }
  });

  // cambiando el background de root
  document.getElementById('root').style.backgroundImage = 'linear-gradient(rgba(154,84,160,0.5), rgba(255, 168, 0, 0.5)), url(https://github.com/alextina/DEV003-social-network/blob/main/src/media/background-2.png?raw=true)';
  document.getElementById('root').style.backgroundRepeat = 'repeat';
  document.getElementById('root').style.backgroundSize = '300px';

  return divAll;
};
