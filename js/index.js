import { fetchProducts } from "./api.js";

const productsContainer = document.querySelector("#products");
const loader = document.querySelector("#loader");
const errorContainer = document.querySelector("#error");
const genreFilter = document.querySelector("#genreFilter");

let allProducts = [];

async function init() {
  try {
    allProducts = await fetchProducts();
    renderGenreOptions(allProducts);
    renderProducts(allProducts);
  } catch (error) {
    errorContainer.textContent = "Something went wrong while loading.";
  } finally {
    loader.style.display = "none";
  }
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
      <article class="product-card">
        <img src="${product.image.url}" alt="${product.image.alt}" />
        <h2>${product.title}</h2>
        <p>${product.genre}</p>
        <p>$${product.discountedPrice}</p>
        <a href="/product/index.html?id=${product.id}">View product</a>
      </article>
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