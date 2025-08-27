document.addEventListener("DOMContentLoaded", () => {
  const cartLink = document.querySelector('.fa-shopping-cart');
  if (cartLink && !document.getElementById("cartCount")) {
    const badge = document.createElement("span");
    badge.id = "cartCount";
    badge.style.position = "absolute";
    badge.style.top = "5px";
    badge.style.right = "10px";
    badge.style.background = "red";
    badge.style.color = "white";
    badge.style.fontSize = "12px";
    badge.style.fontWeight = "bold";
    badge.style.padding = "2px 6px";
    badge.style.borderRadius = "50%";
    badge.style.display = "none"; 
    cartLink.parentElement.style.position = "relative";
    cartLink.parentElement.appendChild(badge);
  }

  updateCartCount();
});

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const cartCountElem = document.getElementById("cartCount");
  if (cartCountElem) {
    cartCountElem.textContent = count;
    cartCountElem.style.display = count > 0 ? "inline-block" : "none";
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const backToTopBtn = document.getElementById("backToTopBtn");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
