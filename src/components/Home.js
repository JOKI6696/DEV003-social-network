import { logout } from '../auth.js';
import {
  deletePost, onGetPosts, savePost, getPost, updatePost,
} from '../firestore.js';

export const Home = (onNavigate) => {
  const menuBg = document.createElement('div');
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
  iconMenu.setAttribute('id', 'btn-menu');
  iconMenu.setAttribute('class', 'fa-solid fa-bars');
  header.setAttribute('class', 'header');
  nav.setAttribute('class', 'nav-none');
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
  buttonLogout.addEventListener('click', logout);
  buttonLogout.addEventListener('click', () => {
    onNavigate('/');
  });

  let editStatus = false;
  let id = '';
  // window.addEventListener('DOMContentLoaded', async () => {
  onGetPosts((querySnapshot) => {
    let html = '';

    querySnapshot.forEach((doc) => {
      const inputPosts = doc.data();
      html += `
        <div class = 'containerPost home'>
          <p>${inputPosts.post}</p>
          <button class='btn-delete' data-id="${doc.id}">Eliminar</button>
          <button class='btn-edit' data-id="${doc.id}">Editar</button>
        </div>
  `;
    });
    divAllPost.innerHTML = html;
    const btnsDelete = divAllPost.querySelectorAll('.btn-delete');
    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', async ({ target: { dataset } }) => {
        try {
          await deletePost(dataset.id);
        } catch (error) {
          // console.log(error);
        }
      });
    });
    const btnsEdit = divAllPost.querySelectorAll('.btn-edit');
    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        try {
          const doc = await getPost(e.target.dataset.id);
          const post = doc.data();
          formNewPost.inputPost.value = post.post;

          editStatus = true;
          id = doc.id;
          formNewPost.buttonPost.innerText = 'Update';
        } catch (eror) {
          // console.log(error);
        }
      });
    });
  });
  // });

  formNewPost.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
      if (!editStatus) {
        await savePost(inputPost.value);
      } else {
        await updatePost(id, {
          post: inputPost.value,
        });

        editStatus = false;
        id = '';
        formNewPost.buttonPost.innerText = 'Guardar';
      }

      formNewPost.reset();
    } catch (error) {
      // console.log(error);
    }
  });

  // Menu hamburguesa
  function showMenu() {
    nav.style.right = '0px';
    menuBg.style.display = 'block';
    nav.classList.replace('nav-none', 'nav');
  }
  function hideMenu() {
    nav.style.right = '-250px';
    menuBg.style.display = 'none';
  }
  iconMenu.addEventListener('click', showMenu);
  menuBg.addEventListener('click', hideMenu);

  formNewPost.append(inputPost, buttonPost);
  header.append(iconMenu, title, nav);
  nav.append(buttonHome, buttonProfile, buttonLogout);

  // divAllPost.append(divPost);
  home.append(menuBg, header, formNewPost, divAllPost);
  return home;
};
