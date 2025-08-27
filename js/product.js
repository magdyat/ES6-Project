
const product = JSON.parse(localStorage.getItem("selectedProduct"));

if (product) {
  document.getElementById("productImg").src = product.img;
  document.getElementById("productName").textContent = product.name;
  document.getElementById("productPrice").textContent = `$${product.price}`;
  document.getElementById("productCategory").textContent = product.category;
}

document.getElementById("addToCartBtn").addEventListener("click", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  window.location.href = "cart.html";
});

document.getElementById("logoutLink").addEventListener("click", function(e) {
  e.preventDefault();
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});
