document.addEventListener('DOMContentLoaded', function() {
    const corpoTabelaUsuarios = document.getElementById('userTableBody');

    fetch('http://localhost:8080/user/all')
        .then(resposta => resposta.json())
        .then(usuarios => {
            corpoTabelaUsuarios.innerHTML = '';

            usuarios.forEach(usuario => {
                const linha = document.createElement('tr');

                const celulaNome = document.createElement('td');
                celulaNome.textContent = usuario.nome;
                linha.appendChild(celulaNome);

                const celulaEmail = document.createElement('td');
                celulaEmail.textContent = usuario.email;
                linha.appendChild(celulaEmail);

                const celulaStatus = document.createElement('td');
                celulaStatus.textContent = usuario.status;
                linha.appendChild(celulaStatus);

                const celulaAcoes = document.createElement('td');
                const linkAcao = document.createElement('a');
                linkAcao.textContent = usuario.status === 'Ativo' ? 'Desabilitar' : 'Habilitar';
                linkAcao.href = '#';
                celulaAcoes.appendChild(linkAcao);
                linha.appendChild(celulaAcoes);

                const celulaAlterar = document.createElement('td');
                const linkAlterar = document.createElement('a');
                linkAlterar.textContent = 'Alterar Dados';
                linkAlterar.href = '#';
                celulaAlterar.appendChild(linkAlterar);
                linha.appendChild(celulaAlterar);

                corpoTabelaUsuarios.appendChild(linha);
            });
        })
        .catch(erro => {
            console.error('Erro ao carregar usuários:', erro);
        });
});
