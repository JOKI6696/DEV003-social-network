import { expresions, allInputs, validateInput } from '../lib/index.js';
import background2 from '../media/background-2.png';
import { registerNewUser, verifyEmail } from '../auth.js';

export const Signup = (onNavigate) => {
  const form = document.createElement('form');
  const title = document.createElement('h2');
  const divContent = document.createElement('div');
  const divUser = document.createElement('div');
  const labelUser = document.createElement('label');
  const inputUser = document.createElement('input');
  const errorUser = document.createElement('p');
  const divName = document.createElement('div');
  const labelName = document.createElement('label');
  const inputName = document.createElement('input');
  const errorName = document.createElement('p');
  const divEmail = document.createElement('div');
  const labelEmail = document.createElement('label');
  const inputEmail = document.createElement('input');
  const errorEmail = document.createElement('p');
  const divPassword = document.createElement('div');
  const labelPassword = document.createElement('label');
  const inputPassword = document.createElement('input');
  const errorPassword = document.createElement('p');
  const divPassword2 = document.createElement('div');
  const labelPassword2 = document.createElement('label');
  const inputPassword2 = document.createElement('input');
  const errorPassword2 = document.createElement('p');
  const divButton = document.createElement('div');
  const button = document.createElement('button');
  const correctMessage = document.createElement('p');
  const errorMessage = document.createElement('p');

  divUser.append(labelUser, inputUser, errorUser);
  divName.append(labelName, inputName, errorName);
  divEmail.append(labelEmail, inputEmail, errorEmail);
  divPassword.append(labelPassword, inputPassword, errorPassword);
  divPassword2.append(labelPassword2, inputPassword2, errorPassword2);
  divButton.append(button, correctMessage, errorMessage);

  divContent.append(divUser, divName, divEmail, divPassword, divPassword2);

  form.setAttribute('id', 'form');
  form.setAttribute('class', 'containerForm');
  divContent.setAttribute('class', 'divContent');
  labelUser.setAttribute('for', 'user');
  inputUser.setAttribute('name', 'user');
  inputUser.setAttribute('type', 'text');
  inputUser.setAttribute('placeholder', '@nombre_usuario');
  inputUser.setAttribute('required', '');
  errorUser.setAttribute('id', 'erroruser');
  errorUser.setAttribute('class', 'error');
  labelName.setAttribute('for', 'name');
  inputName.setAttribute('name', 'name');
  inputName.setAttribute('type', 'text');
  inputName.setAttribute('placeholder', 'Nombre Apellido');
  inputName.setAttribute('required', '');
  errorName.setAttribute('id', 'errorname');
  errorName.setAttribute('class', 'error');
  labelEmail.setAttribute('for', 'email');
  inputEmail.setAttribute('name', 'email');
  inputEmail.setAttribute('type', 'email');
  inputEmail.setAttribute('placeholder', 'xxxxxx@gmail.com');
  inputEmail.setAttribute('required', '');
  errorEmail.setAttribute('id', 'erroremail');
  errorEmail.setAttribute('class', 'error');
  labelPassword.setAttribute('for', 'password');
  inputPassword.setAttribute('id', 'password');
  inputPassword.setAttribute('name', 'password');
  inputPassword.setAttribute('type', 'password');
  inputPassword.setAttribute('placeholder', '*********');
  inputPassword.setAttribute('required', '');
  errorPassword.setAttribute('id', 'errorpassword');
  errorPassword.setAttribute('class', 'error');
  inputPassword2.setAttribute('id', 'password2');
  labelPassword2.setAttribute('for', 'password');
  inputPassword2.setAttribute('name', 'password');
  inputPassword2.setAttribute('type', 'password');
  inputPassword2.setAttribute('placeholder', '*********');
  inputPassword2.setAttribute('required', '');
  errorPassword2.setAttribute('id', 'errorpassword2');
  errorPassword2.setAttribute('class', 'error');
  correctMessage.setAttribute('id', 'correctMessage');
  correctMessage.setAttribute('class', 'correctMessage');
  errorMessage.setAttribute('id', 'errorMessage');
  errorMessage.setAttribute('class', 'errorMessage');
  button.setAttribute('type', 'submit');

  title.textContent = 'Crear cuenta';
  button.textContent = 'Crear';
  labelUser.textContent = 'Usuario';
  errorUser.textContent = 'El usuario tiene que ser de 4 a 16 dígitos y solo puede contener numeros, letras y guion bajo.';
  labelName.textContent = 'Nombre y Apellido';
  errorName.textContent = 'El usuario tiene que ser de 4 a 16 dígitos y solo puede contener letras. ';
  labelEmail.textContent = 'E-mail';
  errorEmail.textContent = 'El email debe tener un formato valido. ';
  labelPassword.textContent = 'Contraseña';
  errorPassword.textContent = 'La contraseña debe tener de 8 a 16 dígitos, mayúscula, minúscula, número, caracter especial y no acepta espacios.';
  labelPassword2.textContent = 'Confirmar contraseña';
  errorPassword2.textContent = 'Ambas contraseñas deben ser iguales.';
  correctMessage.textContent = 'Formulario enviado, verifica tu email e inicia sesión.';
  errorMessage.textContent = 'Por favor verifica que tus datos sean válidos.';

  // export const expresions = {
  //   user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  //   name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  //   password: /^.{4,12}$/, // 4 a 12 digitos.
  //   email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  // };
  // export const allInputs = {
  //   user: false,
  //   name: false,
  //   email: false,
  //   password: false,

  // };

  // export const validateInput = (expresion, input, element) => {
  //   if (expresion.test(input.value)) {
  //     document.querySelector(`#error${element}`).classList.replace('error-display', 'error');
  //     allInputs[element] = true;
  //   } else {
  //     document.querySelector(`#error${element}`).classList.replace('error', 'error-display');
  //     allInputs[element] = false;
  //   }
  // };

  const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('password');
    const inputPasswordConfirm = document.getElementById('password2');

    if (inputPassword1.value !== inputPasswordConfirm.value) {
      document.querySelector('#errorpassword2').classList.replace('error', 'error-display');
      allInputs.password = false;
    } else {
      document.querySelector('#errorpassword2').classList.replace('error-display', 'error');
      allInputs.password = true;
    }
  };

  const validForm = (e) => {
    switch (e.target.name) {
      case 'user':
        validateInput(expresions.user, e.target, 'user');
        break;
      case 'name':
        validateInput(expresions.name, e.target, 'name');
        break;
      case 'email':
        validateInput(expresions.email, e.target, 'email');
        break;
      case 'password':
        validateInput(expresions.password, e.target, 'password');
        validarPassword2();
        break;
      case 'password2':
        validarPassword2();
        break;
      default:
        // console.log('default');
    }
  };

  inputUser.addEventListener('keyup', validForm);
  inputUser.addEventListener('blur', validForm);
  inputName.addEventListener('keyup', validForm);
  inputName.addEventListener('blur', validForm);
  inputEmail.addEventListener('keyup', validForm);
  inputEmail.addEventListener('blur', validForm);
  inputPassword.addEventListener('keyup', validForm);
  inputPassword.addEventListener('blur', validForm);
  inputPassword2.addEventListener('keyup', validForm);
  inputPassword2.addEventListener('blur', validForm);

  function register() {
    const email = inputEmail.value;
    const password = inputPassword.value;
    registerNewUser(email, password)
      .then(() => {
        verifyEmail()
          .then(() => {
            onNavigate('/login');
          })
          .catch((error) => {
            // console.log(error);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (allInputs.user && allInputs.name && allInputs.email && allInputs.password) {
      // form.reset();
      document.getElementById('correctMessage').style.display = 'block';
      document.getElementById('errorMessage').style.display = 'none';
      setTimeout(() => {
        register();
      }, 5000);
    } else {
      document.getElementById('errorMessage').style.display = 'block';
      document.getElementById('correctMessage').style.display = 'none';
    }
  });

  // cambiando el background de root
  document.getElementById('root').style.backgroundImage = `linear-gradient(rgba(154,84,160,0.5), rgba(255, 168, 0, 0.5)), url(${background2})`;
  document.getElementById('root').style.backgroundRepeat = 'repeat';
  document.getElementById('root').style.backgroundSize = '300px';

  form.append(
    title,
    divContent,
    divButton,
  );

  return form;
};
