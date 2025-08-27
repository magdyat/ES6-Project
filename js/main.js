
document.getElementById("logoutLink").addEventListener("click", function(e) {
  e.preventDefault();
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});


let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");


function showSlide(n) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === n);
    dots[i].classList.toggle("active", i === n);
  });
  slideIndex = n;
}


function nextSlide() {
  let newIndex = (slideIndex + 1) % slides.length;
  showSlide(newIndex);
}


let autoPlay = setInterval(nextSlide, 4000);

function resetAutoPlay() {
  clearInterval(autoPlay);
  autoPlay = setInterval(nextSlide, 4000);
}

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    showSlide(i);
    resetAutoPlay();
  });
});

showSlide(0);

const priceFilter = document.getElementById("priceFilter");
const categoryFilter = document.getElementById("categoryFilter");
const productsContainer = document.querySelector(".products");

function filterProducts() {
  let products = Array.from(document.querySelectorAll(".product-card"));
  
  const selectedCategory = categoryFilter.value;
  products.forEach(product => {
    if (selectedCategory === "all" || product.dataset.category === selectedCategory) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });

  if (priceFilter.value !== "default") {
    products.sort((a, b) => {
      let priceA = parseInt(a.dataset.price);
      let priceB = parseInt(b.dataset.price);
      return priceFilter.value === "asc" ? priceA - priceB : priceB - priceA;
    });
    products.forEach(p => productsContainer.appendChild(p));
  }
}

priceFilter.addEventListener("change", filterProducts);
categoryFilter.addEventListener("change", filterProducts);


document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target && e.target.matches(".add-to-cart-btn")) {
        e.stopPropagation();

        const product = {
          name: card.querySelector("h3").textContent,
          price: card.dataset.price,
          category: card.dataset.category,
          img: card.querySelector("img").src,
          quantity: 1
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existing = cart.find(item => item.name === product.name);

        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        if (typeof updateCartCount === "function") updateCartCount();

        return; 
      }

      const product = {
        name: card.querySelector("h3").textContent,
        price: card.dataset.price,
        category: card.dataset.category,
        img: card.querySelector("img").src
      };
      localStorage.setItem("selectedProduct", JSON.stringify(product));
      window.location.href = "product.html";
    });
  });
});
