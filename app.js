const products = [
  {
    id: 1,
    name: "Pulse X Pro",
    platform: "android",
    price: 899,
    rating: 4.9,
    storage: "512GB",
    color: "Midnight",
    badge: "Best seller",
  },
  {
    id: 2,
    name: "Orion Fold",
    platform: "android",
    price: 1199,
    rating: 4.7,
    storage: "1TB",
    color: "Sage",
    badge: "Foldable",
  },
  {
    id: 3,
    name: "Lumen 14",
    platform: "ios",
    price: 999,
    rating: 4.8,
    storage: "512GB",
    color: "Frost",
    badge: "New",
  },
  {
    id: 4,
    name: "Astra Mini",
    platform: "ios",
    price: 699,
    rating: 4.6,
    storage: "256GB",
    color: "Rose",
    badge: "Compact",
  },
  {
    id: 5,
    name: "Nova Lite",
    platform: "android",
    price: 499,
    rating: 4.4,
    storage: "128GB",
    color: "Sky",
    badge: "Budget",
  },
  {
    id: 6,
    name: "Zenith Max",
    platform: "android",
    price: 1099,
    rating: 4.8,
    storage: "512GB",
    color: "Graphite",
    badge: "Camera king",
  },
  {
    id: 7,
    name: "Echo SE",
    platform: "ios",
    price: 579,
    rating: 4.3,
    storage: "128GB",
    color: "Sunset",
    badge: "Value",
  },
  {
    id: 8,
    name: "Mirage Ultra",
    platform: "android",
    price: 949,
    rating: 4.7,
    storage: "512GB",
    color: "Platinum",
    badge: "Pro video",
  },
];

const categories = [
  { id: "all", label: "All" },
  { id: "android", label: "Android" },
  { id: "ios", label: "iOS" },
  { id: "budget", label: "Budget" },
  { id: "foldable", label: "Foldable" },
  { id: "flagship", label: "Flagship" },
];

const productGrid = document.getElementById("productGrid");
const filters = document.getElementById("filters");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const cartCount = document.getElementById("cartCount");
const toast = document.getElementById("toast");

let activeFilter = "all";
let cartItems = 0;

const isBudget = (p) => p.price <= 600;
const isFoldable = (p) => p.name.toLowerCase().includes("fold");
const isFlagship = (p) => p.price >= 900;

function renderFilters() {
  filters.innerHTML = "";
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = `filter-btn ${cat.id === activeFilter ? "active" : ""}`;
    btn.textContent = cat.label;
    btn.addEventListener("click", () => {
      activeFilter = cat.id;
      renderFilters();
      renderProducts();
    });
    filters.appendChild(btn);
  });
}

function matchesFilter(product) {
  if (activeFilter === "all") return true;
  if (activeFilter === "android" || activeFilter === "ios") {
    return product.platform === activeFilter;
  }
  if (activeFilter === "budget") return isBudget(product);
  if (activeFilter === "foldable") return isFoldable(product);
  if (activeFilter === "flagship") return isFlagship(product);
  return true;
}

function sortProducts(list) {
  const mode = sortSelect.value;
  const sorted = [...list];
  if (mode === "price-asc") sorted.sort((a, b) => a.price - b.price);
  if (mode === "price-desc") sorted.sort((a, b) => b.price - a.price);
  if (mode === "rating") sorted.sort((a, b) => b.rating - a.rating);
  return sorted;
}

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = products.filter((p) => {
    const matchesSearch = [p.name, p.color, p.storage, p.badge]
      .join(" ")
      .toLowerCase()
      .includes(query);
    return matchesFilter(p) && matchesSearch;
  });

  const finalList = sortProducts(filtered);

  productGrid.innerHTML = "";
  finalList.forEach((p) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <span class="badge">${p.badge}</span>
      <h3>${p.name}</h3>
      <p>${p.storage} · ${p.color}</p>
      <div class="meta">
        <span>$${p.price}</span>
        <span>${p.rating} ★</span>
      </div>
      <div class="card-actions">
        <button class="primary add-cart" data-id="${p.id}">Add to cart</button>
        <button class="icon-btn wishlist" data-id="${p.id}">♡ Save</button>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

productGrid.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("add-cart")) {
    cartItems += 1;
    cartCount.textContent = cartItems;
    showToast("Added to cart");
  }
  if (target.classList.contains("wishlist")) {
    target.classList.toggle("active");
    target.textContent = target.classList.contains("active") ? "♥ Saved" : "♡ Save";
    showToast(target.classList.contains("active") ? "Saved to wishlist" : "Removed from wishlist");
  }
});

searchInput.addEventListener("input", renderProducts);
sortSelect.addEventListener("change", renderProducts);

renderFilters();
renderProducts();
