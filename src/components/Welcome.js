import { login } from '../auth.js';

export const Welcome = (onNavigate) => {
  const div = document.createElement('div');
  const logo = document.createElement('img');
  const buttonLogin = document.createElement('button');
  const buttonRegister = document.createElement('button');
  const buttonGoogle = document.createElement('button');

  logo.setAttribute('src', '../media/logo-blanco-fems-viajando-juntas.png');
  div.setAttribute('class', 'container');
  buttonLogin.textContent = 'Iniciar sesión';
  buttonRegister.textContent = 'Crear cuenta';
  buttonGoogle.textContent = 'Continuar con Google';
  buttonGoogle.addEventListener('click', login);

  buttonLogin.addEventListener('click', () => {
    onNavigate('/login');
  });

  buttonRegister.addEventListener('click', () => {
    onNavigate('/signup');
  });

  div.append(logo, buttonLogin, buttonRegister, buttonGoogle);

  return div;
};
