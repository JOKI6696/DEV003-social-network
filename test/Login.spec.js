import { Login } from '../src/components/Login.js';
import { loginWithEmail } from '../src/firebase/auth.js';
import { allInputs } from '../src/lib/validate-inputs.js';

jest.mock('../src/firebase/auth');

describe('Tests del componente Login', () => {
  let divRoot;
  let inputEmail;
  let errorEmail;
  let inputPassword;
  let buttonLogin;
  let onNavigateMock;

  beforeEach(() => {
    onNavigateMock = jest.fn();
    divRoot = document.createElement('div');
    divRoot.id = 'root';
    document.body.appendChild(divRoot);
    divRoot.appendChild(Login(onNavigateMock));
    inputEmail = document.getElementById('inputEmail');
    errorEmail = document.getElementById('erroremail');
    inputPassword = document.getElementById('inputPassword');
    buttonLogin = document.getElementById('buttonLogin');
  });

  it('Debería mostrar mensaje de email invalido cuando el formato del email sea incorrecto', () => {
    inputEmail.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }));
    expect(errorEmail.className).toEqual('error-display');
  });

  it('al hacer click en el boton con los campos correctos y verificados debe llamar la funcion onnavigate ', () => {
    loginWithEmail
      .mockImplementationOnce(() => Promise.resolve({ user: { emailVerified: true } }));
    inputEmail.value = 'h@h.com';
    inputPassword.value = 'Hola.123';
    allInputs.email = true;
    allInputs.password = true;

    buttonLogin.click();
    setTimeout(() => expect(onNavigateMock).toHaveBeenCalled(), 0);
  });

  it('al hacer click en el boton sin el Email verificado debe ejecutarse un alert con el mensaje"Email no verificado, se le envió un correo de verificación"', () => {
    loginWithEmail
      .mockImplementationOnce(() => Promise.resolve({ user: { emailVerified: false } }));
    window.alert = jest.fn();
    inputEmail.value = 'h@h.com';
    inputPassword.value = 'Hola.123';
    allInputs.email = true;
    allInputs.password = true;

    buttonLogin.click();
    setTimeout(() => expect(window.alert).toHaveBeenCalled(), 0);
  });
});
