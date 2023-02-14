import { auth, logout } from '../firebase/auth.js';
import {
  deletePost, onGetPosts, savePost, getPost, updatePost, removeLikePost, addLikePost,
} from '../firebase/firestore.js';

export const Home = (onNavigate) => {
  const menuBg = document.createElement('div');
  const divIconMenu = document.createElement('div');
  const iconMenu = document.createElement('i');
  const header = document.createElement('header');
  const title = document.createElement('p');
  const nav = document.createElement('nav');
  const buttonHome = document.createElement('button');
  const buttonProfile = document.createElement('button');
  const buttonLogout = document.createElement('button');
  const home = document.createElement('div');
  const formNewPost = document.createElement('form');
  const inputPost = document.createElement('input');
  const buttonPost = document.createElement('button');
  const divAllPost = document.createElement('div');

  home.setAttribute('class', 'home');
  menuBg.setAttribute('class', 'menuBg');
  divIconMenu.setAttribute('id', 'btn-menu');
  iconMenu.setAttribute('class', 'fa-sharp fa-solid fa-bars');
  header.setAttribute('class', 'header');
  nav.setAttribute('class', 'hide');
  buttonHome.setAttribute('class', 'buttonHome');
  buttonProfile.setAttribute('class', 'buttonProfile');
  buttonLogout.setAttribute('class', 'buttonLogout');
  formNewPost.setAttribute('id', 'formNewPost');
  formNewPost.setAttribute('class', 'containerNewPost home');
  divAllPost.setAttribute('id', 'allPost');
  divAllPost.setAttribute('class', 'containerAllPost home');
  inputPost.setAttribute('placeholder', 'Comparte tu experiencia aqui');
  inputPost.setAttribute('id', 'inputPost');
  buttonPost.setAttribute('id', 'buttonPost');

  title.textContent = 'FEMS';
  buttonHome.textContent = 'Inicio';
  buttonProfile.textContent = 'Mi Perfil';
  buttonLogout.textContent = 'Cerrar sesión';
  buttonPost.textContent = 'Publicar';

  // // opción 2
  // informationUser();

  // el botón ejecuta la fx logout para cerrar sesión
  buttonLogout.addEventListener('click', logout);
  // el botón ejecuta la fx que nos lleva a Welcome
  buttonLogout.addEventListener('click', () => {
    onNavigate('/');
  });

  // Escucha todo el tiempo...
  // para crear post
  let editStatus = false;
  let id = '';
  // trae los datos de la base de datos y luego ejecuta el querySnapshot
  onGetPosts((querySnapshot) => {
    let html = '';
    // querySnapshot realizamos la impresion y escucha en tiempo real.
    querySnapshot.forEach((doc) => { // se ejecuta en cada post...
      const inputPosts = doc.data(); // doc.data = c/u de los post con su id
      // const likeNumber = inputPosts.like.length;
      // 92>> <p class='countLike' data-id='${doc.id}'>${likeNumber}</p>
      // console.log(likeNumber);
      const currentUserUid = auth.currentUser.uid;
      const postUserUid = inputPosts.userUid;
      // console.log(currentUserUid, postUserUid);
      const postDate = inputPosts.createdAt.toDate();
      const formattedDate = postDate.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
      if (currentUserUid === postUserUid) {
        html += `
        <div class = 'containerPost home'>
          <div>
          <div class="info">   
            <p>${inputPosts.user}</p>
            <p>${formattedDate}</p>
         </div>
            <div class="optionsMenu">   
              <button class='btn-delete' data-id="${doc.id}"> <i class="fa-solid fa-trash"></i> Eliminar</button>
              <button class='btn-edit' data-id="${doc.id}"> <i class="fa-solid fa-pen"></i> Editar</button>
            </div>
          </div>
        <p>${inputPosts.post}</p>
        <button data-id="${doc.id}" class="buttonLike">Like</button>
        </div>
  `;
      } else {
        html += `
        <div class = 'containerPost home'>
        <div class="info">   
            <p>${inputPosts.user}</p>
            <p>${formattedDate}</p>
        </div>
        <p>${inputPosts.post}</p>
        <button  data-id="${doc.id}" class = "buttonLike">Like</button>
      </div>
      `;
      }
    });

    // la fx del botón para eliminar post
    divAllPost.innerHTML = html;

    // funcionalidad del botón like
    const btnLikes = divAllPost.querySelectorAll('.buttonLike');
    console.log(btnLikes);
    btnLikes.forEach((btnLike) => {
      btnLike.addEventListener('click', () => {
        const likedButton = btnLike.dataset.id; // undefined
        console.log(likedButton);
        const userUid = auth.currentUser.uid; // OK
        console.log(userUid);
        getPost(likedButton)
          .then((doclike) => {
            const userLike = doclike.data().like;
            // const userLikes = justOne.like;
            if (userLike.includes(userUid)) {
              removeLikePost(likedButton, userUid);
            } else {
              addLikePost(likedButton, userUid);
            }
          }).catch((error) => {
            console.log(error);
          });
      });
    });

    // la fx se aplica a c/u de los botones de los post
    const btnsDelete = divAllPost.querySelectorAll('.btn-delete');
    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        /* eslint-disable no-alert, no-restricted-globals */
        const confirmDelete = confirm('¿Segura que deseas eliminar este post?');
        /* eslint-disable no-alert, no-restricted-globals */
        // si el usuario confirma...
        if (confirmDelete) {
          deletePost(dataset.id); // se elimina con la fx q se trae de f/firestore
        }
      });
    });

    // la fx del botón para editar post
    // la fx se aplica a c/u de los botones de los post
    const btnsEdit = divAllPost.querySelectorAll('.btn-edit');
    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', async (e) => { // se escucha la promesa del e...
        const doc = await getPost(e.target.dataset.id); // se trae la publicacion segun su id
        const post = doc.data();
        // se trae el texto del post a editar en el input para actualizar
        formNewPost.inputPost.value = post.post;
        editStatus = true;
        id = doc.id;
        formNewPost.buttonPost.innerText = 'Actualizar';
      });
    });
  });

  // ejecutando lo que se desee hacer (crear o editar post)
  formNewPost.addEventListener('submit', (e) => {
    e.preventDefault();
    // restrigimos que el input este vacio (no se ejecuta la fx)
    if (inputPost.value !== '') {
      // si el status es falseo entoces...
      if (!editStatus) {
        // se publica un nuevo post
        savePost(inputPost.value);
      } else {
        // sino, se actualizará el post existente
        updatePost(id, {
          post: inputPost.value,
        });
        editStatus = false;
        id = '';
        formNewPost.buttonPost.innerText = 'Publicar';
      }
      formNewPost.reset(); // formatea formulario
    }
  });

  // Menu hamburguesa
  function showMenu() {
    menuBg.style.display = 'block';
    nav.classList.replace('hide', 'nav');
  }

  function hideMenu() {
    nav.classList.replace('nav', 'hide');
    menuBg.style.display = 'none';
  }

  divIconMenu.addEventListener('click', showMenu);
  menuBg.addEventListener('click', hideMenu);

  // mostrando elementos
  formNewPost.append(inputPost, buttonPost);
  divIconMenu.append(iconMenu);
  header.append(divIconMenu, title, nav);
  nav.append(buttonHome, buttonProfile, buttonLogout);

  // divAllPost.append(divPost);
  home.append(menuBg, header, formNewPost, divAllPost);
  return home;
};
