let imagensSelecionadas = [];
let images = [];
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

function abrirModal() {
  document.getElementById("modalImagens").style.display = "block";
  document.getElementById("etapaGaleria").style.display = "block";
  document.getElementById("etapaSelecao").style.display = "none";
}

async function carregarProduto() {
  const url = `http://localhost:8080/products/${id}`;
  const nome = document.querySelector("#nomeProduto");
  const preco = document.querySelector("#preco");
  const estoque = document.querySelector("#qtdEstoque");
  const descricao = document.querySelector("#descricao");
  const avaliacao = document.querySelector("#avaliacao");
  var produto;
  await fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((resp) => (produto = resp))
    .catch((err) => console.log(err));

  nome.value = produto.name;
  preco.value = produto.price;
  estoque.value = produto.stock;
  descricao.value = produto.description;
  avaliacao.value = produto.rating;
}
function selecionarImagens(event) {
  const files = event.target.files;
  const galeriaImagens = document.getElementById("galeriaImagens");
  galeriaImagens.innerHTML = "";
  imagensSelecionadas = [];
  images = [];

  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagensSelecionadas.push(e.target.result);
      galeriaImagens.innerHTML += `<img src="${e.target.result}" style="max-width: 150px; margin: 10px;">`;
    };
    images.push(files[i]);
    reader.readAsDataURL(files[i]);
  }
}

function avancarParaSelecao() {
  document.getElementById("etapaGaleria").style.display = "none";
  document.getElementById("etapaSelecao").style.display = "block";

  const opcoesImagemPrincipal = document.getElementById(
    "opcoesImagemPrincipal"
  );
  opcoesImagemPrincipal.innerHTML = "";

  imagensSelecionadas.forEach((imagem, index) => {
    opcoesImagemPrincipal.innerHTML += `<img src="${imagem}" style="max-width: 150px; margin: 10px; cursor: pointer;" onclick="definirImagemPrincipal(${index})">`;
  });
}

function definirImagemPrincipal(index) {
  document.getElementById("imgPrincipal").src = imagensSelecionadas[index];
  document.getElementById("modalImagens").style.display = "none";

  let temp = images[0];
  images[0] = images[index];
  images[index] = temp;
}

function validarCampos() {
  var qtdEstoque = document.querySelector("#qtdEstoque").value;
  var preco = document.querySelector("#preco").value;
  var avaliacao = document.querySelector("#avaliacao").value;

  if (qtdEstoque <= 0 || preco <= 0 || avaliacao <= 0) {
    alert("Campos inválidos!");
  } else {
    AtualizarProduto();
  }
}

function AtualizarProduto() {
  const url = `http://localhost:8080/products/atualizarProduct/${id}`;

  var nomeProduto = document.querySelector("#nomeProduto").value;
  var preco = document.querySelector("#preco").value;
  var avaliacao = document.querySelector("#avaliacao").value;
  var qtdEstoque = document.querySelector("#qtdEstoque").value;
  var descricao = document.querySelector("#descricao").value;

  var json = JSON.stringify({
    name: nomeProduto,
    description: descricao,
    price: preco,
    rating: avaliacao,
    stock: qtdEstoque,
  });

  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  })
    .then((resp) => resp.json())
    .then((res) => uploadImagens(res))
    .catch((err) => console.log(err));
}

async function uploadImagens(produto) {
  const url = `http://localhost:8080/images/${produto.id}`;
  var formData = new FormData();

  images.forEach((file) => {
    formData.append("img", file);
  });

  await fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      alert("Produto atualizado! ")
    })
    .catch((err) => {
      console.log("Erro ao enviar imagens:", err);
    });
}
