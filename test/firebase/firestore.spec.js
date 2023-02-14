import { deletePost } from '../../src/firebase/firestore.js';

// importamos la funcion que vamos a testear
// import { myFunction } from '../src/lib/index';

// describe('myFunction', () => {
//   it('debería ser una función', () => {
//     expect(typeof myFunction).toBe('function');
//   });
// });

// describe('savePost', () => {
//   it('Debería poder agregar un post', () => {
//     return savePost('Me encanta viajar!').then((data) => {
//         expect(data).toBe('Me encanta viajar');
//     })
//   });
// });

describe('deletePost', () => {
  it('Debería poder eliminar un post', () => deletePost('abc123').then((data) => {
    expect(data).toBe(undefined);
  }));
});
