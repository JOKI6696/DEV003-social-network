// constante que contiene las expresiones regulares para validar inputs
export const expresions = {
  user: /^[a-zA-Z0-9\-_]{4,16}$/, // Letras, numeros, guion y guion_bajo
  name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^(?=(?:.*\d))(?=.*[A-Z])(?=.*[a-z])(?=.*[.,*!?¿¡/#$%&])\S{8,16}$/, // De 8 a 16 dig., al menos un número,una mayúscula, minúscula y especial, sin espacios.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

// Se establece el valor predeterminado de los inputs
export const allInputs = {
  user: false,
  name: false,
  email: false,
  password: false,
};

// Fx que valida el input si cumple con el formato de la expresión, si...
export const validateInput = (expresion, input, element) => {
  // Se compara la expresión con el contenido del input
  if (expresion.test(input.value)) {
    // Entonces se llama al msj de error por ID, para cambiar su clase y ocultarlo
    document.querySelector(`#error${element}`).classList.replace('error-display', 'error');
    // El valor del input cambia a verdadero
    allInputs[element] = true;
  } else {
    // Si el contenido del input no cumple con la expresión
    // Entonces se llama al msj de error por ID, para cambiar su clase y mostrarlo
    document.querySelector(`#error${element}`).classList.replace('error', 'error-display');
    // El valor del input cambia a falso
    allInputs[element] = false;
  }
};

// fx para validar que la contraseña y su confirmación coincidan
export const validatePassword2 = () => {
  // Traemos los inputs a través del ID
  const inputPassword1 = document.getElementById('password');
  const inputPasswordConfirm = document.getElementById('password2');
  // Si los valores son diferentes...
  if (inputPassword1.value !== inputPasswordConfirm.value) {
    // Entonces se coloca la clase que muestra el error
    document.querySelector('#errorpassword2').classList.replace('error', 'error-display');
    allInputs.password = false;
  } else {
    // Entonces se coloca la clase que oculta el error
    document.querySelector('#errorpassword2').classList.replace('error-display', 'error');
    allInputs.password = true;
  }
};
