import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app as firebase } from './firebase/firebase-config.js';
import { Welcome } from './components/Welcome.js';
import { Login } from './components/Login.js';
import { Signup } from './components/Signup.js';
import { Home } from './components/Home.js';

const auth = getAuth(firebase);

// ruteado
const root = document.getElementById('root');
const routes = {
  '/': Welcome,
  '/login': Login,
  '/signup': Signup,
  '/home': Home,
};

// sirve para cambiar la URL de la web
export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  root.removeChild(root.firstChild);
  root.appendChild(routes[pathname](onNavigate));
};

const component = routes[window.location.pathname];

// sirve para cargar el contenido de root
window.onpopstate = () => {
  root.removeChild(root.firstChild);
  root.append(component(onNavigate));
};

root.appendChild(component(onNavigate));

// opción 1
function showUserInformation(user) {
  console.log(user.displayName, user.email, user.uid);
}

// fx de firebase que nos permite reconocer si hay un usuario logueado...
onAuthStateChanged(auth, (user) => {
  if (user) { // si hay usuario lo lleva al home y no le permite revolver
    if (user.emailVerified) {
      showUserInformation(user);
      onNavigate('/home');
    } else {
      onNavigate('/');
    }
  } else { // si no lo mantiene o lleva a la página welcome (no se puede ir a otras páginas)
    onNavigate('/');
  }
});
