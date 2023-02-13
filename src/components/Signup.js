import {
  allInputs, validForm, 
} from '../lib/validate-inputs.js';
import background2 from '../media/background-2.png';
import { registerNewUser, verifyEmail } from '../firebase/auth.js';
import { saveUser } from '../firebase/firestore.js';

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

  // fx para registrar nuevo usuario con correo y contraseña
  function register() {
    // datos que el usuario ha introducido en la página de registro
    const email = inputEmail.value;
    const password = inputPassword.value;
    const name = inputName.value;
    const userUser = inputUser.value;
    // trayendo fx desde firebase/firestore para registrar nuevo usuario (promesa)
    registerNewUser(email, password)
      // si la promesa se ejecuta entonces...
      .then((result) => { // se trae un resultado
        const user = result.user; // se accede al usuario del resultado
        // fx desde f/firestore que guarda lo datos del usuario en una colección
        saveUser(user, name, userUser);
        // fx desde f/auth que envía un correo para verificar el email del usario
        verifyEmail()
          .then(() => { // despues de que se envíe el correo de verificación...
            onNavigate('/login'); // se redirige al usuario al Login
          })
          .catch((error) => { // si la promesa no se cumple lanza un alerta con el error
            alert(error);
          });
      })
      // si la promesa no se cumple lanza un alerta con el error
      .catch((error) => {
        alert(error.message);
      });
  }

  // Fx que envía el formulario si...
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // El valor de todos los inputs es verdadero
    if (allInputs.user && allInputs.name && allInputs.email && allInputs.password) {
      // se oculta el mensaje de "error" y se muestra el de "correcto"
      document.getElementById('correctMessage').style.display = 'block';
      document.getElementById('errorMessage').style.display = 'none';
      setTimeout(() => {
        register();
      }, 3000);
    } else {
      // Si el valor de los inputs es falso, no se envía el formulario...
      // y se muestra el mensaje de "error"
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
