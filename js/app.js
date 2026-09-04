// ============================================
// VIPER CLOTHING - E-commerce JavaScript
// ============================================

// ---------- Product Data ----------
const products = [
  {
    id: 1,
    name: 'Viper Oversized Tee',
    category: 'camisetas',
    price: 189.90,
    oldPrice: null,
    sizes: ['P', 'M', 'G', 'GG'],
    badge: 'NOVO',
    description: 'Camiseta oversized com estampa exclusiva da coleção Viper. Tecido 100% algodão penteado fio 30. Corte oversized com caimento perfeito.',
    gradient: 'linear-gradient(145deg, #1a1a1a 0%, #252525 100%)'
  },
  {
    id: 2,
    name: 'Snake Logo Tee',
    category: 'camisetas',
    price: 159.90,
    oldPrice: 199.90,
    sizes: ['P', 'M', 'G', 'GG', 'XG'],
    badge: '-20%',
    description: 'Camiseta com logo da marca em silk screen de alta qualidade. Estilo clean e versátil para o dia a dia.',
    gradient: 'linear-gradient(145deg, #1f1f1f 0%, #2a2a2a 100%)'
  },
  {
    id: 3,
    name: 'Viper Essential Hoodie',
    category: 'moletons',
    price: 329.90,
    oldPrice: null,
    sizes: ['M', 'G', 'GG', 'XG'],
    badge: 'BESTSELLER',
    description: 'Moletom essential com capuz e bolsos frontais. Fleecedupla face para máximo conforto e durabilidade.',
    gradient: 'linear-gradient(145deg, #181818 0%, #222 100%)'
  },
  {
    id: 4,
    name: 'Venom Hoodie',
    category: 'moletons',
    price: 399.90,
    oldPrice: 499.90,
    sizes: ['P', 'M', 'G', 'GG'],
    badge: '-20%',
    description: 'Moletom com estampa serigrafada e detalhes em verde neon. Estilo agressivo e autêntico.',
    gradient: 'linear-gradient(145deg, #1a1a1a 0%, #1f1f1f 100%)'
  },
  {
    id: 5,
    name: 'Viper Cargo Pants',
    category: 'calcas',
    price: 299.90,
    oldPrice: null,
    sizes: ['P', 'M', 'G', 'GG'],
    badge: 'NOVO',
    description: 'Calça cargo com 6 bolsos funcionais. Tecido ripstop resistente com elastano para mobilidade.',
    gradient: 'linear-gradient(145deg, #1c1c1c 0%, #262626 100%)'
  },
  {
    id: 6,
    name: 'Underground Tee',
    category: 'camisetas',
    price: 149.90,
    oldPrice: 189.90,
    sizes: ['P', 'M', 'G'],
    badge: '-21%',
    description: 'Camiseta com arte exclusiva inspirada em graffiti e cultura urbana. Edição limitada.',
    gradient: 'linear-gradient(145deg, #1a1a1a 0%, #202020 100%)'
  },
  {
    id: 7,
    name: 'Viper Cap',
    category: 'acessorios',
    price: 129.90,
    oldPrice: null,
    sizes: ['U'],
    badge: null,
    description: 'Boné estruturado com bordado da marca. Ajuste traseiro e aba curva. Algodão premium.',
    gradient: 'linear-gradient(145deg, #1f1f1f 0%, #282828 100%)'
  },
  {
    id: 8,
    name: 'Snake Chain',
    category: 'acessorios',
    price: 249.90,
    oldPrice: 299.90,
    sizes: ['U'],
    badge: '-17%',
    description: 'Corrente em aço inoxidável com pingente de cobra estilizado. Design exclusivo e durável.',
    gradient: 'linear-gradient(145deg, #1a1a1a 0%, #252525 100%)'
  }
];

// ---------- State ----------
let cart = JSON.parse(localStorage.getItem('viperCart') || '[]');
let favorites = JSON.parse(localStorage.getItem('viperFavorites') || '[]');
let currentFilters = { category: 'all', size: 'all', sort: 'relevance' };
let searchQuery = '';

// ---------- DOM Elements ----------
const productsGrid = document.getElementById('productsGrid');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const cartFooter = document.getElementById('cartFooter');
const searchOverlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const productModal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');
const mobileMenu = document.getElementById('mobileMenu');
const header = document.getElementById('header');
const countDays = document.getElementById('countDays');
const countHours = document.getElementById('countHours');
const countMinutes = document.getElementById('countMinutes');
const countSeconds = document.getElementById('countSeconds');

// ---------- Helpers ----------
function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function saveCart() {
  localStorage.setItem('viperCart', JSON.stringify(cart));
  updateCartUI();
}

function saveFavorites() {
  localStorage.setItem('viperFavorites', JSON.stringify(favorites));
}

function getProductSVG(gradient) {
  return `<div class="product-img-inner" style="width:100%;height:100%;background:${gradient};display:flex;align-items:center;justify-content:center;">
    <img src="images/street-waer.webp" alt="Streetwear" style="width:100%;height:100%;object-fit:cover;opacity:0.85;" loading="lazy" />
  </div>`;
}

function getCategorySVG(category) {
  const icons = {
    camisetas: `<svg viewBox="0 0 120 150" fill="none"><rect x="20" y="25" width="80" height="80" rx="3" stroke="#c8ff00" stroke-width="1.5"/><path d="M35 25V15C35 8 42 2 50 2H70C78 2 85 8 85 15V25" stroke="#c8ff00" stroke-width="1.5"/><path d="M20 40H10L15 30H20V40Z" stroke="#c8ff00" stroke-width="1.5"/><path d="M100 40H110L105 30H100V40Z" stroke="#c8ff00" stroke-width="1.5"/></svg>`,
    moletons: `<svg viewBox="0 0 120 150" fill="none"><rect x="22" y="28" width="76" height="72" rx="4" stroke="#c8ff00" stroke-width="1.5"/><path d="M38 28V18C38 10 45 4 53 4H67C75 4 82 10 82 18V28" stroke="#c8ff00" stroke-width="1.5"/><path d="M22 45H10L15 32H22V45Z" stroke="#c8ff00" stroke-width="1.5"/><path d="M98 45H110L105 32H98V45Z" stroke="#c8ff00" stroke-width="1.5"/><path d="M35 72H85" stroke="#c8ff00" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    calcas: `<svg viewBox="0 0 120 150" fill="none"><path d="M35 28H85V82C85 90 78 96 70 96H50C42 96 35 90 35 82V28Z" stroke="#c8ff00" stroke-width="1.5"/><path d="M35 28L28 18H45V28H35Z" stroke="#c8ff00" stroke-width="1.5"/><path d="M85 28L92 18H75V28H85Z" stroke="#c8ff00" stroke-width="1.5"/><path d="M45 55H75" stroke="#c8ff00" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    acessorios: `<svg viewBox="0 0 120 150" fill="none"><rect x="25" y="30" width="70" height="70" rx="6" stroke="#c8ff00" stroke-width="1.5"/><circle cx="60" cy="65" r="22" stroke="#c8ff00" stroke-width="1.5"/><circle cx="60" cy="65" r="7" fill="#c8ff00" fill-opacity="0.3"/><path d="M48 55L60 40L72 55" stroke="#c8ff00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  };
  return icons[category] || icons.camisetas;
}

// ---------- Product Rendering ----------
function renderProducts() {
  let filtered = [...products];

  if (currentFilters.category !== 'all') {
    filtered = filtered.filter(p => p.category === currentFilters.category);
  }
  if (currentFilters.size !== 'all') {
    filtered = filtered.filter(p => p.sizes.includes(currentFilters.size));
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }

  if (currentFilters.sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  if (currentFilters.sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  if (currentFilters.sort === 'newest') filtered.sort((a, b) => b.id - a.id);

  productsGrid.innerHTML = filtered.map(p => {
    const isFav = favorites.includes(p.id);
    return `
      <div class="product-card" data-id="${p.id}">
        <div class="product-img" onclick="openProductModal(${p.id})">
          ${getProductSVG(p.gradient)}
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
          <div class="product-actions">
            <button class="product-action-btn" onclick="event.stopPropagation(); toggleFavorite(${p.id})" aria-label="Favoritar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </button>
            <button class="product-action-btn" aria-label="Visualização rápida" onclick="event.stopPropagation(); openProductModal(${p.id})">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
        <div class="product-info">
          <div class="product-name">${p.name}</div>
          <div class="product-category">${p.category.toUpperCase()}</div>
          <div class="product-price">
            <span class="product-price-current">${formatPrice(p.price)}</span>
            ${p.oldPrice ? `<span class="product-price-old">${formatPrice(p.oldPrice)}</span>` : ''}
          </div>
          <div class="product-sizes">
            ${p.sizes.map(s => `<button class="size-btn" onclick="selectSize(this)">${s}</button>`).join('')}
          </div>
          <button class="product-add-btn" onclick="addToCart(${p.id})">ADICIONAR AO CARRINHO</button>
        </div>
      </div>
    `;
  }).join('');

  if (filtered.length === 0) {
    productsGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--text-muted);">Nenhum produto encontrado.</div>`;
  }
}

function selectSize(btn) {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

// ---------- Cart ----------
function addToCart(productId, size = null) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const availableSizes = product.sizes;
  if (availableSizes.length === 1 && availableSizes[0] === 'U') {
    size = 'U';
  } else if (!size) {
    const selected = document.querySelector('.product-card.selected .size-btn.selected, .product-card[data-id="' + productId + '"] .size-btn.selected');
    size = selected ? selected.textContent : availableSizes[0];
  }

  const existing = cart.find(item => item.id === productId && item.size === size);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, size, quantity: 1 });
  }

  saveCart();
}

function addToCartFromModal(productId) {
  const modalContent = document.getElementById('productModalContent');
  const selectedSizeBtn = modalContent.querySelector('.size-btn.selected');
  const size = selectedSizeBtn ? selectedSizeBtn.textContent : null;
  addToCart(productId, size);
  closeProductModal();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
}

function updateCartUI() {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.textContent = totalItems;
  if (totalItems > 0) cartCount.classList.add('show');
  else cartCount.classList.remove('show');

  if (cart.length === 0) {
    cartEmpty.style.display = 'flex';
    cartItems.innerHTML = '';
    cartFooter.style.display = 'none';
  } else {
    cartEmpty.style.display = 'none';
    cartFooter.style.display = 'flex';
    cartItems.innerHTML = cart.map((item, index) => {
      const product = products.find(p => p.id === item.id);
      if (!product) return '';
      return `
        <div class="cart-item">
          <div class="cart-item-img">${getProductSVG(product.gradient)}</div>
          <div class="cart-item-details">
            <div>
              <div class="cart-item-name">${product.name}</div>
              <div class="cart-item-meta">TAM: ${item.size} | QTD: ${item.quantity}</div>
            </div>
            <div class="cart-item-bottom">
              <span class="cart-item-price">${formatPrice(product.price * item.quantity)}</span>
              <button class="cart-item-remove" onclick="removeFromCart(${index})">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                Remover
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    const total = cart.reduce((acc, item) => {
      const p = products.find(pr => pr.id === item.id);
      return acc + (p ? p.price * item.quantity : 0);
    }, 0);
    cartTotal.textContent = formatPrice(total);
  }
}

function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ---------- Favorites ----------
function toggleFavorite(productId) {
  const index = favorites.indexOf(productId);
  if (index === -1) favorites.push(productId);
  else favorites.splice(index, 1);
  saveFavorites();
  renderProducts();
}

// ---------- Search ----------
function openSearch() {
  searchOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => searchInput.focus(), 100);
}

function closeSearch() {
  searchOverlay.classList.remove('open');
  document.body.style.overflow = '';
  searchInput.value = '';
  searchResults.innerHTML = '';
}

function performSearch(query) {
  searchQuery = query;
  if (!query.trim()) {
    searchResults.innerHTML = '';
    renderProducts();
    return;
  }

  const q = query.toLowerCase();
  const results = products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));

  if (results.length === 0) {
    searchResults.innerHTML = '<div class="search-no-results">Nenhum produto encontrado.</div>';
  } else {
    searchResults.innerHTML = results.map(p => `
      <div class="search-result-item" onclick="closeSearch(); openProductModal(${p.id})">
        <div class="search-result-img">${getProductSVG(p.gradient)}</div>
        <div class="search-result-info">
          <div class="search-result-name">${p.name}</div>
          <div class="search-result-price">${formatPrice(p.price)}</div>
        </div>
      </div>
    `).join('');
  }

  renderProducts();
}

// ---------- Product Modal ----------
function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const isFav = favorites.includes(product.id);
  modalBody.innerHTML = `
    <div class="modal-img">${getProductSVG(product.gradient)}</div>
    <div class="modal-details">
      <div class="modal-category">${product.category.toUpperCase()}</div>
      <h2 class="modal-name">${product.name}</h2>
      <div class="modal-price">
        <span class="modal-price-current">${formatPrice(product.price)}</span>
        ${product.oldPrice ? `<span class="modal-price-old">${formatPrice(product.oldPrice)}</span>` : ''}
      </div>
      <p class="modal-desc">${product.description}</p>
      <div class="modal-sizes">
        <div class="modal-sizes-label">TAMANHO</div>
        <div class="modal-sizes-grid">
          ${product.sizes.map((s, i) => `<button class="size-btn ${i===0?'selected':''}" onclick="selectSize(this); this.parentElement.querySelectorAll('.size-btn').forEach(b=>b.classList.remove('selected')); this.classList.add('selected');">${s}</button>`).join('')}
        </div>
      </div>
      <button class="modal-add-btn" onclick="addToCartFromModal(${product.id}); closeProductModal();">ADICIONAR AO CARRINHO</button>
    </div>
  `;
  productModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  productModal.classList.remove('open');
  document.body.style.overflow = '';
}

// ---------- Countdown ----------
function startCountdown() {
  const target = new Date();
  target.setDate(target.getDate() + 14);
  target.setHours(0, 0, 0, 0);

  function update() {
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) {
      countDays.textContent = '00';
      countHours.textContent = '00';
      countMinutes.textContent = '00';
      countSeconds.textContent = '00';
      return;
    }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);
    countDays.textContent = String(d).padStart(2, '0');
    countHours.textContent = String(h).padStart(2, '0');
    countMinutes.textContent = String(m).padStart(2, '0');
    countSeconds.textContent = String(s).padStart(2, '0');
  }
  update();
  setInterval(update, 1000);
}

// ---------- Animations on Scroll ----------
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.category-card, .product-card, .benefit-card, .about-grid > *').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
}

// ---------- Header Scroll ----------
function initHeaderScroll() {
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 50) {
      header.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
      header.style.background = 'rgba(10, 10, 10, 0.8)';
    }
    lastScroll = current;
  });
}

// ---------- Event Listeners ----------
function initEventListeners() {
  document.getElementById('cartToggle').addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  document.getElementById('searchToggle').addEventListener('click', openSearch);
  document.getElementById('searchClose').addEventListener('click', closeSearch);
  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearch();
  });
  searchInput.addEventListener('input', (e) => performSearch(e.target.value));

  document.getElementById('menuToggle').addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  document.getElementById('modalClose').addEventListener('click', closeProductModal);
  productModal.addEventListener('click', (e) => {
    if (e.target === productModal) closeProductModal();
  });

  document.getElementById('categoryFilter').addEventListener('change', (e) => {
    currentFilters.category = e.target.value;
    renderProducts();
  });
  document.getElementById('sizeFilter').addEventListener('change', (e) => {
    currentFilters.size = e.target.value;
    renderProducts();
  });
  document.getElementById('sortFilter').addEventListener('change', (e) => {
    currentFilters.sort = e.target.value;
    renderProducts();
  });

  document.getElementById('newsletterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('.newsletter-input');
    if (input.value) {
      alert('Obrigado por se inscrever! Bem-vindo ao universo Viper.');
      input.value = '';
    }
  });

  // Category anchor links
  document.querySelectorAll('a[href^="#camisetas"], a[href^="#moletons"], a[href^="#calcas"], a[href^="#acessorios"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      const category = hash.replace('#', '');
      if (['camisetas', 'moletons', 'calcas', 'acessorios'].includes(category)) {
        e.preventDefault();
        currentFilters.category = category;
        document.getElementById('categoryFilter').value = category;
        renderProducts();
        const shopSection = document.getElementById('shop');
        if (shopSection) {
          shopSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  // Close cart on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeSearch();
      closeProductModal();
    }
  });
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  startCountdown();
  initScrollAnimations();
  initHeaderScroll();
  initEventListeners();
});
