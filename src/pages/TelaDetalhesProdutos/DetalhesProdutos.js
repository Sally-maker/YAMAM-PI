function buscarDetalhesProsutos(produtoId) {
    fetch('/api/produtos/${produtoId}')
    .then(reponse => response.json())
    then(produto => {
        document.getElementById('nomeProduto').textContent = produto.nome;
        document.getElementById('desricao').textContent = produto.descricao;
        document.getElementById('valor').textContent = produto.valor.toFixed(2);
        document.getElementById('avaliacao').textContent = produto.avaliacao;
        //Exibir imagem padão
        if(produto.imagem.length > 0) {
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

document.getElementById('botaoComprar').addEventListener('click', function() {
    const produtoId = /* pegue o ID do produto dinamicamente */;
    
    fetch(`/carrinho/adicionar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'produtoId': produtoId
        })
    })
    .then(response => response.text())
    .then(data => {
        alert('Produto adicionado ao carrinho!');
        exibirOpcoes();
    })
    .catch(error => console.error('Erro ao adicionar ao carrinho:', error));
});

function exibirOpcoes() {
    if (confirm('Deseja continuar comprando?')) {
        // Redirecionar para a página inicial ou lista de produtos
        window.location.href = '/produtos';
    } else {
        // Redirecionar para a página do carrinho
        window.location.href = '/carrinho';
    }
}