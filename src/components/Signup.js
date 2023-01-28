export const Signup = (onNavigate) => {
  const form = document.createElement('form');
  const button = document.createElement('button');
  const labelUser = document.createElement('label');
  const inputUser = document.createElement('input');
  const labelName = document.createElement('label');
  const inputName = document.createElement('input');
  const labelCountry = document.createElement('label');
  const selectCountry = document.createElement('select');
  const labelEmail = document.createElement('label');
  const inputEmail = document.createElement('input');
  const labelPassword = document.createElement('label');
  const inputPassword = document.createElement('input');

  form.setAttribute('class', 'container secondView');
  inputUser.setAttribute('placeholder', '@nombre_usuario');
  inputUser.setAttribute('name', 'usuario');
  labelUser.setAttribute('for', 'usuario');
  inputName.setAttribute('placeholder', 'Nombre Apellido');
  inputName.setAttribute('name', 'name');
  labelName.setAttribute('for', 'name');
  selectCountry.setAttribute('name', 'country');
  labelCountry.setAttribute('for', 'country');

  inputEmail.setAttribute('placeholder', 'xxxxxx@gmail.com');
  inputEmail.setAttribute('type', 'email');
  inputEmail.setAttribute('required', '');
  inputEmail.setAttribute('name', 'email');
  labelEmail.setAttribute('for', 'email');
  inputPassword.setAttribute('placeholder', '*********');
  inputPassword.setAttribute('type', 'password');
  inputPassword.setAttribute('required', '');
  inputPassword.setAttribute('name', 'password');
  labelPassword.setAttribute('for', 'password');
  button.setAttribute('type', 'submit');

  button.textContent = 'Crear';
  labelUser.textContent = 'Usuario';
  labelName.textContent = 'Nombre y Apellido';
  labelCountry.textContent = 'Pais';
  labelEmail.textContent = 'E-mail';
  labelPassword.textContent = 'Contraseña';

  form.append(labelUser, inputUser, labelName, inputName, labelCountry, selectCountry, labelEmail, inputEmail, labelPassword, inputPassword, button);

  return form;
};
