let imagensSelecionadas = [];
let images = [];
function abrirModal() {
  document.getElementById("modalImagens").style.display = "block";
}

function selecionarImagens(event) {
  const files = event.target.files;
  const galeriaImagens = document.getElementById("galeriaImagens");
  galeriaImagens.innerHTML = "";

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

  if (qtdEstoque <= 0 || preco <= 0 || avaliacao <= 0 || avaliacao > 5) {
    alert("Campos invalidos ");
  } else {
    salvarProduto();
  }

  function salvarProduto() {
    const url = "http://localhost:8080/products";

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
      method: "POST",
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
    images.forEach((index) => {
      formData.append("img", index);
    });
    await fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        alert("Produto adicionado!" )
        window.location.replace("../ListaProdutos/listaProdutos.html");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
