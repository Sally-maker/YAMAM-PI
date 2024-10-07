const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const NomeProduto = document.querySelector("#nomeProduto");
const valorProduto = document.querySelector("#valorProduto");
const avaliacao = document.querySelector("#avaliacao");
const descricao = document.querySelector("#descricao");
const imagemSelecionada = document.querySelector("#imagemSelecionada");
const miniaturas = document.querySelector("#miniaturas");

function loadData() {
  fetch(`http://localhost:8080/products/${id}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      carregarImagens();
      NomeProduto.innerHTML = `<h2> Nome: ${data.name}</h2>`;
      valorProduto.innerHTML = `${data.price.toFixed(2)}`; // Formata para duas casas decimais
      avaliacao.innerHTML = `<strong>Avaliação:</strong> ${data.rating} estrelas`;
      descricao.innerHTML = `<strong>Descrição: ${data.description}</strong>`;

      document.querySelector('.botaoComprar').onclick = () => {
      window.open(`../../pages/Carrinho/Carrinho.html?id=${id}`, '_blank');
};

    });
}

async function carregarImagens() {
  const url = `http://localhost:8080/images/product/${id}`;
  const carrosel = document.querySelector("#miniaturas");
  var images = [];
  await fetch(url)
    .then((resp) => resp.json())
    .then((res) => (images = res))
    .catch((err) => console.log(err));

  images.map((index) => {
    const img = document.createElement("img");
    imagemSelecionada.src = `../../../Teste_spring_security/src/main/resources/static/images/${images[0]}`;
    img.src = `../../../Teste_spring_security/src/main/resources/static/images/${index}`;
    img.classList.add("miniatura-img");
    img.addEventListener("click", () => {
      imagemSelecionada.src = `../../../Teste_spring_security/src/main/resources/static/images/${index}`;
    });
    carrosel.appendChild(img);
  });
}
