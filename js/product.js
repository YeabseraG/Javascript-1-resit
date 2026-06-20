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
      <div>
        <h1>${product.title}</h1>
        <p>${product.description}</p>
        <p><strong>Genre:</strong> ${product.genre}</p>
        <p><strong>Age rating:</strong> ${product.ageRating}</p>
        <p><strong>Released:</strong> ${product.released}</p>
        <p><strong>Price:</strong> $${product.discountedPrice}</p>
        <button id="addToCart">Add to cart</button>
      </div>
    </article>
  `;

  const addToCartButton = document.querySelector("#addToCart");

  addToCartButton.addEventListener("click", () => {
    addToCart(product);
    addToCartButton.textContent = "Added to cart";
  });
}

function showError(message) {
  errorContainer.textContent = message;
  loader.style.display = "none";
}

init();