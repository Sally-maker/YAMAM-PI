async function loadData() {
  var products;
  const url = "http://localhost:8080/products/allProduct";

  await fetch(url)
    .then((resp) => resp.json())
    .then((res) => (products = res))
    .catch((err) => console.log(err));

  populateCards(products);
}

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
const populateCards = async (products) => {
  const container = document.querySelector(".box-container");
  var images = [];
  const pathImages = await loadPathImages().then((res) => (images = res));
  let index = 0;

  products.map(({ id, name, price }) => {
    container.innerHTML += `
        <div class="box">
            <div class="icons">
                <a href="#" class="fas fa-shopping-cart" onclick="addToCart('${name}', ${price})"></a>
                <a href="#" class="fas fa-heart"></a>
                <a href="../TelaCadastroProduto/Detalhes/Detalhe.html?id=${id}" target="_blank" class="fas fa-eye"></a>
            </div>
             <a href="../TelaDetalhesProdutos/DetalhesProdutos.html?id=${id}" target="_blank">
              <div class="image">
                <img src="../../main/resources/static/images/banheiro2.jpg" alt="" id="imageProduct">
              </div>
            </a>
            <div class="content">
                <h3>${name}</h3>
                <div class="price">R$ ${price} <span>R$20.99</span></div>
                <button type="button" onclick="addToCart('${name}', ${price})">Comprar</button> <!-- Redireciona para o carrinho -->
            </div>
        </div>
    `;
    index++;
  });
};

const loadPathImages = async () => {
  const url = "http://localhost:8080/images/main";
  var images = [];
  await fetch(url)
    .then((res) => res.json())
    .then((resp) => (images = resp))
    .catch((err) => console.log(err));

  return images;
};
