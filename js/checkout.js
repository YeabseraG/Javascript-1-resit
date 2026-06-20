import { getCart, removeFromCart } from "./cart.js";

const cartContainer = document.querySelector("#cart");

function init() {
  renderCart();
}

function renderCart() {
  const cart = getCart();

  if (!cart.length) {
    cartContainer.innerHTML = `
      <p>Your cart is empty.</p>
      <a href="../index.html">Continue shopping</a>
    `;
    return;
  }

  const totalPrice = cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const cartItemsHtml = cart
    .map((product) => {
      return `
        <article class="cart-item">
          <a
            class="cart-product-link"
            href="/Javascript-1-resit/product/index.html?id=${product.id}"
          >
            <img src="${product.image.url}" alt="${product.image.alt}" />
          </a>

          <div>
            <a
              class="cart-title-link"
              href="/Javascript-1-resit/product/index.html?id=${product.id}"
            >
              <h2>${product.title}</h2>
            </a>

            <p>Price: $${product.price}</p>
            <p>Quantity: ${product.quantity}</p>

            <button class="remove-button" data-id="${product.id}">
              Remove
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  cartContainer.innerHTML = `
    <div class="cart-items">
      ${cartItemsHtml}
    </div>

    <section class="cart-summary">
      <h2>Order summary</h2>
      <p><strong>Total:</strong> $${totalPrice.toFixed(2)}</p>

      <a
        class="checkout-button"
        href="/Javascript-1-resit/checkout/confirmation/index.html"
      >
        Complete checkout
      </a>
    </section>
  `;

  document.querySelectorAll(".remove-button").forEach((button) => {
    button.addEventListener("click", handleRemoveClick);
  });
}

function handleRemoveClick(event) {
  const productId = event.currentTarget.dataset.id;

  removeFromCart(productId);
  renderCart();
}

init();