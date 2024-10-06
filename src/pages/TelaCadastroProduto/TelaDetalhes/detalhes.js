const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const NomeProduto = document.querySelector("#nomeProduto");
const valorProduto = document.querySelector("#valorProduto");
const avaliacao = document.querySelector("#avaliacao");
const descricao = document.querySelector("#descricao");
const imagemSelecionada = document.querySelector("#imagemSelecionada");
const miniaturas = document.querySelector("#miniaturas");

fetch(`http://localhost:8080/products/${id}`, {
    method: "GET"
})
.then((res) => {
    return res.json();
})
.then((data) => {
    console.log(data); // Verifique a estrutura dos dados
    NomeProduto.innerHTML = `<h2> Nome: ${data.name}</h2>`;
    valorProduto.innerHTML = `${data.price.toFixed(2)}`; // Formata para duas casas decimais
    avaliacao.innerHTML = `<strong>Avaliação:</strong> ${data.rating} estrelas`;
    descricao.innerHTML = `<strong>Descrição: ${data.description}</strong>`;

})

function redirecionarParaDetalhes() {
    window.location.href = "TelaDetalhes/detalhes.html";
}