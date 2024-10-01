let navbar = document.querySelector(".fa-user");
document.querySelector("#user-btn").onclick = () => {
  navbar.classList.toggle("active");
  seachForm.classList.remove("active");
  cartItem.classList.remove("active");
};

let seachForm = document.querySelector(".search-form");
document.querySelector("#search-btn").onclick = () => {
  seachForm.classList.toggle("active");
  navbar.classList.remove("active");
  cartItem.classList.remove("active");
};

let cartItem = document.querySelector(".cart-items-container");
document.querySelector("#cart-btn").onclick = () => {
  cartItem.classList.toggle("active");
  navbar.classList.remove("active");
  seachForm.classList.remove("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");
  seachForm.classList.remove("active");
  cartItem.classList.remove("active");
};

