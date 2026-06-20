import { fetchProduct } from "./api.js";
import { addToCart } from "./cart.js";

const productContainer = document.querySelector("#product");
const loader = document.querySelector("#loader");
const errorContainer = document.querySelector("#error");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function init() {
  if (!productId) {
    showError("No product ID was found.");
    return;
  }

  try {
    const product = await fetchProduct(productId);
    renderProduct(product);
  } catch (error) {
    showError("Something went wrong while loading the product.");
  } finally {
    loader.style.display = "none";
  }
}

function renderProduct(product) {
  document.title = `GameHub | ${product.title}`;

  productContainer.innerHTML = `
  <article class="product-detail">
    <img src="${product.image.url}" alt="${product.image.alt}" />

    <div class="product-info">
      <p class="genre">${product.genre}</p>
      <h1>${product.title}</h1>

      <p class="product-description">${product.description}</p>

      <div class="product-meta">
        <div>
          <span>Age rating</span>
          <strong>${product.ageRating}</strong>
        </div>
        <div>
          <span>Released</span>
          <strong>${product.released}</strong>
        </div>
        <div>
          <span>Genre</span>
          <strong>${product.genre}</strong>
        </div>
      </div>

      <div class="purchase-box">
        <p>Price</p>
        <strong>$${product.discountedPrice}</strong>
        <button id="addToCart">Add to cart</button>
      </div>
    </div>
  </article>
`;

  const addToCartButton = document.querySelector("#addToCart");

  addToCartButton.addEventListener("click", () => {
    addToCart(product);
    showToast(`${product.title} added to cart`);
});
}

function showToast(message) {
  const toast = document.querySelector("#toast");

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function showError(message) {
  errorContainer.textContent = message;
  loader.style.display = "none";
}

init();