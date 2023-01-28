export const Login = (onNavigate) => {
  const form = document.createElement('form');
  const button = document.createElement('button');
  const buttonBack = document.createElement('button');
  const inputEmail = document.createElement('input');
  const labelEmail = document.createElement('label');
  const inputpass = document.createElement('input');
  const labelPassword = document.createElement('label');

  form.setAttribute('class', 'container secondView');
  inputEmail.setAttribute('placeholder', 'xxxxxx@gmail.com');
  inputEmail.setAttribute('required', '');
  inputEmail.setAttribute('name', 'email');
  labelEmail.setAttribute('for', 'email');
  inputpass.setAttribute('placeholder', '*********');
  inputpass.setAttribute('required', '');
  inputpass.setAttribute('name', 'password');
  labelPassword.setAttribute('for', 'password');

  labelEmail.textContent = 'E-mail';
  labelPassword.textContent = 'Contraseña';

  button.textContent = 'Iniciar sesión';
  buttonBack.textContent = 'Retroceder';
  buttonBack.addEventListener('click', () => {
    onNavigate('/');
  });

  form.append(labelEmail, inputEmail, labelPassword, inputpass, button, buttonBack);

  return form;
};
