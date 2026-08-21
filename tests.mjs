import assert from 'node:assert/strict';
import { addToCart, cartTotal, filterProducts, findProduct, getSavedCart, products, removeFromCart } from './app.mjs';

assert.equal(filterProducts('Casa').length, 1);
assert.equal(filterProducts('Todos').length, 3);
assert.equal(cartTotal([products[0], products[2]]), 115);
assert.equal(findProduct('caderno').name, 'Caderno modular');
assert.equal(findProduct('nao-existe'), null);

const cart1 = addToCart([], 'caderno');
assert.equal(cart1.length, 1);
assert.equal(cartTotal(cart1), 39);

const cart2 = addToCart(cart1, 'caneca');
assert.equal(cart2.length, 2);
assert.equal(cartTotal(cart2), 97);

const cart3 = removeFromCart(cart2, 0);
assert.equal(cart3.length, 1);
assert.equal(cart3[0].id, 'caneca');

assert.deepEqual(getSavedCart({ getItem: () => '[{"id":"invalido"}]' }), []);
assert.deepEqual(getSavedCart({ getItem: () => '[{"id":"caderno"}]' }), [{ id: 'caderno', name: 'Caderno modular', category: 'Papelaria', price: 39, description: 'Folhas substituíveis, capa rígida e marcadores coloridos. Variação padrão demonstrativa.', variants: ['Azul', 'Verde', 'Preto'] }]);

console.log('storefront-catalog-demo: testes aprovados');
