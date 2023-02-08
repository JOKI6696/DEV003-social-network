import logoBlanco from '../media/logo-blanco-fems-viajando-juntas.png';
import logoColores from '../media/logo-fems-viajando-juntas.png';
import logoGoogle from '../media/logo-google.png';
import background1 from '../media/background-1.jpg';
import { loginWithGoogle } from '../firebase/auth.js';
import { doc } from 'firebase/firestore';

export const Welcome = (onNavigate) => {
  const div = document.createElement('div');
  const logo = document.createElement('img');
  const div2 = document.createElement('div');
  const logoColor = document.createElement('img');
  const buttonLogin = document.createElement('button');
  const buttonSignup = document.createElement('button');
  const buttonGoogle = document.createElement('div');
  const imgGoogle = document.createElement('img');
  const txtGoogle = document.createElement('span');

  div.setAttribute('class', 'containerWelcome');
  div2.setAttribute('class', 'div2');
  logo.setAttribute('src', logoBlanco);
  logo.setAttribute('alt', 'logo-fems');
  logo.setAttribute('class', 'logo-fems');
  logoColor.setAttribute('src', logoColores);
  logoColor.setAttribute('class', 'logo-color');
  buttonLogin.setAttribute('class', 'none');
  buttonSignup.setAttribute('class', 'none');
  buttonGoogle.setAttribute('class', 'google none');
  imgGoogle.setAttribute('src', logoGoogle);

  div2.append(logoColor, buttonLogin, buttonSignup, buttonGoogle);

  buttonLogin.textContent = 'Iniciar sesión';
  buttonLogin.addEventListener('click', () => {
    onNavigate('/login');
  });

  buttonSignup.textContent = 'Crear cuenta';
  buttonSignup.addEventListener('click', () => {
    onNavigate('/signup');
  });

  txtGoogle.textContent = 'Continuar con Google';
  buttonGoogle.append(imgGoogle, txtGoogle);
  buttonGoogle.addEventListener('click', () => {
    loginWithGoogle()
      .then(() => {
        onNavigate('/home');
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        alert(error.message);
      });
  });

  // MODAL
  const descriptionContainerModal = document.createElement('div');
  const descriptionContentModal = document.createElement('div');
  const closeModal = document.createElement('div');
  const iconModal = document.createElement('i');

  descriptionContainerModal.setAttribute('class', 'modalContainer');
  descriptionContentModal.setAttribute('class', 'modalContent');
  closeModal.setAttribute('class', 'closeModal');
  iconModal.setAttribute('class', 'fa-solid fa-arrow-right');
  closeModal.addEventListener('click', () => {
    descriptionContainerModal.style.display = 'none';
    buttonLogin.style.display = 'block';
    buttonSignup.style.display = 'block';
    buttonGoogle.style.display = 'block';
  });

  descriptionContentModal.textContent = 'Fems es un espacio seguro solo para mujeres donde podrás compartir experiencias e información sobre viajes.';
  closeModal.append(iconModal);
  descriptionContainerModal.append(descriptionContentModal, closeModal);

  // cambiando el background de root
  document.getElementById('root').style.backgroundImage = `linear-gradient(rgba(154,84,160,0.5), rgba(255, 168, 0, 0.5)), url(${background1})`;
  document.getElementById('root').style.backgroundRepeat = 'no-repeat';
  document.getElementById('root').style.backgroundSize = 'cover';
  document.getElementById('root').style.backgroundPositionX = '35%';

  div.append(logo, descriptionContainerModal, div2);
  return div;
};
