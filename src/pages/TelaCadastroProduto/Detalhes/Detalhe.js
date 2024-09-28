function buscarDetalhesProsutos(produtoId) {
    fetch('/api/produtos/${produtoId}')
        .then(reponse => response.json())
    then(produto => {
        document.getElementById('nomeProduto').textContent = produto.nome;
        document.getElementById('desricao').textContent = produto.descricao;
        document.getElementById('valor').textContent = produto.valor.toFixed(2);
        document.getElementById('avaliacao').textContent = produto.avaliacao;
        //Exibir imagem padão
        if (produto.imagem.length > 0) {
            document.getElementById('imagemSelecionada').src = produto.imagens[0];
        }
        //imagens carrossel
        const miniaturaDiv = document.getElementById('miniaturas');
        miniaturaDiv.innerHTML = '';

        produto.imagens.forEach(imagem => {
            const imgElement = document.createElement('img');
            imgElement.src = imagem;
            imgElement.style.width = '100px';
            imgElement.style.margin = '5px';
            imgElement.style.cursor = 'pointer';
            imgElement.onclick = () => mostrarImagemMaior(imagem);
            miniaturaDiv.appendChild(imgElement);
        });
    })
        .catch(error => console.error('Erro ao buscar detalhes do produto:', error));
}
//exibir imagem maior
function mostrarImagemMaior(imagemSrc) {
    const imagemPrincipal = document.getElementById('imagemSelecionada');
    imagemPrincipal.src = imagemSrc;
}
//função carregar pagina
document.addEventListener('DOMContentLoaded', () => {
    const produtoId = 1;
    buscarDetalhesProsutos(produtoId);
})
async function carregarDados() {
    var product = [];
    const url = "http://localhost:8080/products/1";

    await fetch(url)
        .then((res) => res.json())
        .then((resp) => {
            product = resp
            carregarImagens();
        })
        .catch((err) => console.log(err))


    document.querySelector("#nomeProduto").innerHTML = `Nome produto: ${product.name}`;
    document.querySelector("#descricao").innerHTML = `Descrição detalhada: ${product.description}`;
    document.querySelector("#valor").innerHTML = `Valor: R$ ${product.price}`;
    document.querySelector("#avaliacao").innerHTML = `${product.rating}`;


}
async function carregarImagens() {
    const url = "http://localhost:8080/images/1"
    var image = "";
    await fetch(url)
        .then((res) => res.json())
        .then((response) =>image = response.imagePath)
        .catch((err) => console.log(err))
        
    document.querySelector("#imagemSelecionada").src = `../../../../Teste_spring_security/src/main/resources/static/images/${image}`;
}
