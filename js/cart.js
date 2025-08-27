document.getElementById("logoutLink").addEventListener("click", function(e) {
  e.preventDefault();
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalElem = document.getElementById("cartTotal");
const checkoutAlert = document.getElementById("checkoutAlert"); 

function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalElem.textContent = "0";
    if (typeof updateCartCount === "function") updateCartCount();
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const quantity = item.quantity || 1;
    total += parseFloat(item.price) * quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="info">
        <h3>${item.name}</h3>
        <p>$${item.price}</p>
        <span class="category">${item.category}</span>
      </div>
      <div class="quantity-controls">
        <button class="decrease" data-index="${index}">-</button>
        <span>${quantity}</span>
        <button class="increase" data-index="${index}">+</button>
      </div>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  cartTotalElem.textContent = total.toFixed(2);

  document.querySelectorAll(".increase").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = btn.dataset.index;
      cart[idx].quantity = (cart[idx].quantity || 1) + 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      if (typeof updateCartCount === "function") updateCartCount();
    });
  });

  document.querySelectorAll(".decrease").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = btn.dataset.index;
      if (cart[idx].quantity > 1) {
        cart[idx].quantity--;
      } else {
        cart.splice(idx, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      if (typeof updateCartCount === "function") updateCartCount();
    });
  });

  if (typeof updateCartCount === "function") updateCartCount();
}

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    return; 
  }

  checkoutAlert.style.display = "block";

  setTimeout(() => {
    checkoutAlert.style.display = "none";
  }, 4000);

  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  if (typeof updateCartCount === "function") updateCartCount();
});

renderCart();
