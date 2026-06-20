const API_BASE = "https://v2.api.noroff.dev/gamehub";

export async function fetchProducts() {
  const response = await fetch(API_BASE);

  if (!response.ok) {
    throw new Error("Could not load products.");
  }

  const json = await response.json();
  return json.data;
}

export async function fetchProduct(id) {
  const response = await fetch(`${API_BASE}/${id}`);

  if (!response.ok) {
    throw new Error("Could not load product.");
  }

  const json = await response.json();
  return json.data;
}