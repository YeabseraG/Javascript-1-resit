import { fetchProducts } from "./api.js";

const productsContainer = document.querySelector("#products");
const loader = document.querySelector("#loader");
const errorContainer = document.querySelector("#error");
const genreFilter = document.querySelector("#genreFilter");

let allProducts = [];

async function init() {
  try {
    allProducts = await fetchProducts();
    renderHero(allProducts[0]);
    renderGenreOptions(allProducts);
    renderProducts(allProducts);
  } catch (error) {
    errorContainer.textContent = "Something went wrong while loading games.";
  } finally {
    loader.style.display = "none";
  }
}

function renderHero(product) {
  const hero = document.createElement("section");
  hero.classList.add("hero");

  hero.innerHTML = `
    <div class="hero-content">
      <p class="eyebrow">Featured Game</p>
      <h1>${product.title}</h1>
      <p>${product.description}</p>
      <a href="/product/index.html?id=${product.id}">View Featured Game</a>
    </div>
    <img src="${product.image.url}" alt="${product.image.alt}" />
  `;

  document.querySelector("main").prepend(hero);
}

function renderGenreOptions(products) {
  const genres = [...new Set(products.map((product) => product.genre))];

  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreFilter.append(option);
  });
}

function renderProducts(products) {
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    productsContainer.innerHTML += `
  <a
    class="product-card"
    href="/product/index.html?id=${product.id}"
  >
    <img src="${product.image.url}" alt="${product.image.alt}" />

    <div class="product-card-content">
      <p class="genre">${product.genre}</p>
      <h2>${product.title}</h2>
      <p class="description">${product.description}</p>
      <p class="price">$${product.discountedPrice}</p>
    </div>
  </a>
`;
  });
}

genreFilter.addEventListener("change", () => {
  const selectedGenre = genreFilter.value;

  if (selectedGenre === "all") {
    renderProducts(allProducts);
  } else {
    const filteredProducts = allProducts.filter(
      (product) => product.genre === selectedGenre
    );

    renderProducts(filteredProducts);
  }
});

init();