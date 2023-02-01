import { loginWithGoogle } from '../auth.js';

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
  logo.setAttribute('src', './media/logo-blanco-fems-viajando-juntas.png');
  logo.setAttribute('alt', 'logo-fems');
  logo.setAttribute('class', 'logo-fems');
  logoColor.setAttribute('src', './media/logo-fems-viajando-juntas.png');
  logoColor.setAttribute('class', 'logo-color');
  buttonLogin.setAttribute('class', 'none');
  buttonSignup.setAttribute('class', 'none');
  buttonGoogle.setAttribute('class', 'google none');
  imgGoogle.setAttribute('src', './media/logo-google.png');

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
  const descriptionContentModal = document.createElement('p');
  const closeModalspan = document.createElement('span');

  descriptionContainerModal.setAttribute('class', 'modalContainer');
  descriptionContentModal.setAttribute('class', 'modalContent');
  closeModalspan.setAttribute('class', 'modalSpan');
  closeModalspan.addEventListener('click', () => {
    descriptionContainerModal.style.display = 'none';
    buttonLogin.style.display = 'block';
    buttonSignup.style.display = 'block';
    buttonGoogle.style.display = 'block';
  });

  descriptionContentModal.textContent = 'Fems es un espacio seguro solo para mujeres donde podrás compartir experiencias e información sobre viajes.';
  closeModalspan.textContent = '>';

  descriptionContainerModal.append(descriptionContentModal, closeModalspan);

  // cambiando el background de root
  document.getElementById('root').style.backgroundImage = 'linear-gradient(rgba(154,84,160,0.5), rgba(255, 168, 0, 0.5)), url(./media/background-1.jpg)';
  document.getElementById('root').style.backgroundRepeat = 'no-repeat';
  document.getElementById('root').style.backgroundSize = 'cover';
  document.getElementById('root').style.backgroundPositionX = '35%';

  div.append(logo, descriptionContainerModal, div2);
  return div;
};
