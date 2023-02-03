import { logout } from '../auth.js';
import { deletePost, onGetPosts, savePost } from '../firestore.js';

export const Home = (onNavigate) => {
  const home = document.createElement('div');
  const title = document.createElement('h2');
  const formNewPost = document.createElement('form');
  const inputPost = document.createElement('input');
  const buttonPost = document.createElement('button');
  const divAllPost = document.createElement('div');
  // const divPost = document.createElement('div');
  const buttonLogout = document.createElement('button');

  home.setAttribute('class', 'home');
  formNewPost.setAttribute('id', 'newPost');
  formNewPost.setAttribute('class', 'containerNewPost home');
  divAllPost.setAttribute('id', 'allPost');
  divAllPost.setAttribute('class', 'containerAllPost home');
  // divPost.setAttribute('id', 'post');
  // divPost.setAttribute('class', 'containerPost home');
  inputPost.setAttribute('placeholder', 'Comparte tu experiencia aqui');

  title.textContent = 'Página de Inicio';
  buttonLogout.textContent = 'Cerrar sesión';
  buttonPost.textContent = 'Publicar';
  buttonLogout.addEventListener('click', logout);
  buttonLogout.addEventListener('click', () => {
    onNavigate('/');
  });

  window.addEventListener('DOMContentLoaded', async () => {
    onGetPosts((querySnapshot) => {
      let html = '';

      querySnapshot.forEach((doc) => {
        const inputPosts = doc.data();
        html += `
          <div>
            <p>${inputPosts.post}</p>
            <button class='btn-delete' data-id="${doc.id}">Eliminar</button>
         </div>
    `;
      });
      divAllPost.innerHTML = html;
      const btnsDelete = divAllPost.querySelectorAll('.btn-delete');
      btnsDelete.forEach((btn) => {
        btn.addEventListener('click', ({ target: { dataset } }) => {
          deletePost(dataset.id);
        });
      });
    });
  });

  formNewPost.addEventListener('submit', (e) => {
    e.preventDefault();
    savePost(inputPost.value);

    formNewPost.reset();
  });

  formNewPost.append(inputPost, buttonPost);
  // divAllPost.append(divPost);
  home.append(title, buttonLogout, formNewPost, divAllPost);
  return home;
};
