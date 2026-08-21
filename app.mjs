export const CART_STORAGE_KEY = 'storefront-demo-cart';

export const products = [
  { id: 'caderno', name: 'Caderno modular', category: 'Papelaria', price: 39, description: 'Folhas substituíveis, capa rígida e marcadores coloridos. Variação padrão demonstrativa.', variants: ['Azul', 'Verde', 'Preto'] },
  { id: 'caneca', name: 'Caneca térmica', category: 'Casa', price: 58, description: 'Parede dupla com vedação hermética. Mantém temperatura por até 6 horas em condições ideais. Variação padrão demonstrativa.', variants: ['300 ml', '500 ml'] },
  { id: 'bolsa', name: 'Bolsa compacta', category: 'Acessórios', price: 76, description: 'Compartimentos organizados, alça regulável e fecho magnético. Variação padrão demonstrativa.', variants: ['Natural', 'Grafite'] },
];

export function findProduct(id) {
  return products.find((product) => product.id === id) ?? null;
}

export function filterProducts(category) {
  return category === 'Todos' ? products : products.filter((product) => product.category === category);
}

export function cartTotal(cart) {
  return cart.reduce((total, item) => total + item.price, 0);
}

export function addToCart(cart, id) {
  const product = findProduct(id);
  return product ? [...cart, product] : [...cart];
}

export function removeFromCart(cart, index) {
  return cart.filter((_, position) => position !== index);
}

export function getSavedCart(storage) {
  try {
    const data = JSON.parse(storage?.getItem(CART_STORAGE_KEY) || '[]');
    return Array.isArray(data) ? data.map((item) => findProduct(item?.id)).filter(Boolean) : [];
  } catch {
    return [];
  }
}

export function saveCart(storage, cart) {
  if (!storage?.setItem) return false;
  try {
    storage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    return true;
  } catch {
    return false;
  }
}

function getBrowserStorage() {
  try {
    return typeof window === 'undefined' ? null : window.localStorage;
  } catch {
    return null;
  }
}

function formatPrice(price) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(price);
}

export function mount(root) {
  const storage = getBrowserStorage();
  let cart = getSavedCart(storage);
  let category = 'Todos';
  let detailId = null;
  let checkoutStep = null;
  let feedback = '';

  const render = () => {
    const visible = filterProducts(category);
    const total = cartTotal(cart);
    const detailProduct = detailId ? findProduct(detailId) : null;

    root.innerHTML = `<section class="hero"><article class="hero-card"><p class="eyebrow">Vitrine demonstrativa</p><h1>Catálogo claro, decisões simples e carrinho local.</h1><p class="lede">Produtos, valores e variações são itens fictícios para demonstrar a interface. Não há checkout com pagamento, entrega ou dados de terceiros.</p></article><aside class="hero-card"><p class="eyebrow">Carrinho local</p><h2>${cart.length} item(ns)</h2><p class="muted">Total: ${formatPrice(total)}</p>${cart.length ? `<button class="button" type="button" data-checkout>Revisar pedido</button>` : ''}</aside></section><section class="row" style="margin-bottom:18px"><label class="field">Categoria<select id="category">${['Todos', 'Papelaria', 'Casa', 'Acessórios'].map((item) => `<option value="${item}" ${item === category ? 'selected' : ''}>${item}</option>`).join('')}</select></label></section><section class="grid">${visible.map((product) => `<article class="card product-card"><span class="pill">${product.category}</span><h2>${product.name}</h2><p class="muted">${product.variants.join(' · ')}</p><p><b>${formatPrice(product.price)}</b></p><div class="row"><button class="button" type="button" data-add="${product.id}">Adicionar ao carrinho</button><button class="button secondary" type="button" data-detail="${product.id}">Ver detalhes</button></div></article>`).join('') || '<p class="empty">Nenhum produto encontrado.</p>'}</section>${cart.length ? `<section class="card" style="margin-top:18px"><p class="eyebrow">Carrinho</p><h2>Itens adicionados</h2><div class="list">${cart.map((item, index) => `<div class="item"><div class="row"><span>${item.name}</span><span class="muted">${formatPrice(item.price)}</span><button class="button secondary remove-button" type="button" data-remove="${index}" aria-label="Remover ${item.name}">Remover</button></div></div>`).join('')}</div><p class="cart-total">Total: <b>${formatPrice(total)}</b></p></section>` : ''}${detailProduct ? `<div class="modal-overlay" role="dialog" aria-modal="true" aria-label="Detalhes de ${detailProduct.name}"><div class="modal-card"><p class="eyebrow">${detailProduct.category}</p><h2>${detailProduct.name}</h2><p>${detailProduct.description}</p><p class="muted">Variações: ${detailProduct.variants.join(', ')}</p><p><b>${formatPrice(detailProduct.price)}</b></p><div class="row"><button class="button" type="button" data-add="${detailProduct.id}" data-close>Adicionar ao carrinho</button><button class="button secondary" type="button" data-close>Fechar</button></div></div></div>` : ''}${checkoutStep ? `<div class="modal-overlay" role="dialog" aria-modal="true" aria-label="Revisão do pedido demonstrativo"><div class="modal-card"><p class="eyebrow">Pedido demonstrativo</p><h2>${checkoutStep === 'confirm' ? 'Pedido registrado localmente' : 'Revisar pedido'}</h2>${checkoutStep === 'confirm' ? '<p class="result" role="status">Este é um pedido demonstrativo. Nenhum dado foi enviado, cobrado ou processado.</p><button class="button" type="button" data-clear-cart>Limpar carrinho</button>' : `<div class="list">${cart.map((item) => `<div class="item"><div class="row"><span>${item.name}</span><span class="muted">${formatPrice(item.price)}</span></div></div>`).join('')}</div><p class="cart-total">Total: <b>${formatPrice(total)}</b></p><p class="muted">Esta é uma demonstração. Não há pagamento, cobrança ou envio de dados.</p><div class="row"><button class="button" type="button" data-confirm>Confirmar pedido local</button><button class="button secondary" type="button" data-close>Cancelar</button></div>`}</div></div>` : ''}${feedback ? `<p class="result" role="status" style="margin-top:14px">${feedback}</p>` : ''}`;

    root.querySelector('#category')?.addEventListener('change', (event) => {
      category = event.target.value;
      render();
    });

    root.querySelectorAll('[data-add]').forEach((button) => button.addEventListener('click', () => {
      cart = addToCart(cart, button.dataset.add);
      saveCart(storage, cart);
      if (button.hasAttribute('data-close')) { detailId = null; checkoutStep = null; }
      feedback = `${findProduct(button.dataset.add)?.name ?? 'Item'} adicionado ao carrinho.`;
      render();
    }));

    root.querySelectorAll('[data-remove]').forEach((button) => button.addEventListener('click', () => {
      cart = removeFromCart(cart, Number(button.dataset.remove));
      saveCart(storage, cart);
      feedback = 'Item removido do carrinho.';
      render();
    }));

    root.querySelectorAll('[data-detail]').forEach((button) => button.addEventListener('click', () => {
      detailId = button.dataset.detail;
      checkoutStep = null;
      feedback = '';
      render();
    }));

    root.querySelectorAll('[data-close]').forEach((button) => button.addEventListener('click', () => {
      detailId = null;
      checkoutStep = null;
      feedback = '';
      render();
    }));

    root.querySelector('[data-checkout]')?.addEventListener('click', () => {
      checkoutStep = 'review';
      detailId = null;
      feedback = '';
      render();
    });

    root.querySelector('[data-confirm]')?.addEventListener('click', () => {
      checkoutStep = 'confirm';
      render();
    });

    root.querySelector('[data-clear-cart]')?.addEventListener('click', () => {
      cart = [];
      saveCart(storage, cart);
      checkoutStep = null;
      feedback = 'Carrinho limpo. Nenhum pedido foi processado.';
      render();
    });

    root.querySelector('.modal-overlay')?.addEventListener('click', (event) => {
      if (event.target === event.currentTarget) { detailId = null; checkoutStep = null; feedback = ''; render(); }
    });
  };

  render();
}
