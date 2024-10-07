const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const NomeProduto = document.querySelector("#nomeProduto");
const valorProduto = document.querySelector("#valorProduto");
const avaliacao = document.querySelector("#avaliacao");
const descricao = document.querySelector("#descricao");
const imagemSelecionada = document.querySelector("#imagemSelecionada");
const miniaturas = document.querySelector("#miniaturas");

fetch(`http://localhost:8080/product/${id}`, {
    method: "GET"
})
.then((res) => {
    return res.json();
})
.then((data) => {
    carregarImagens();
    NomeProduto.innerHTML = `<h2> Nome: ${data.name}</h2>`;
    valorProduto.innerHTML = `${data.price.toFixed(2)}`; 
    avaliacao.innerHTML = `<strong>Avaliação:</strong> ${data.rating} estrelas`;
    descricao.innerHTML = `<strong>Descrição: ${data.description}</strong>`;

})
async function carregarImagens() {
    const url = `http://localhost:8080/images/product/${id}`
    var images = [];
    await fetch(url)
    .then((resp) => resp.json()) 
    .then((res) => images = res)
    .catch((err) => console.log(err)) 
    imagemSelecionada.src= `../../../../Teste_spring_security/src/main/resources/static/images/${images[0]}`

}
function redirecionarParaDetalhes() {
    window.location.href = "TelaDetalhesProdutos/DetalhesProdutos.html";
}

