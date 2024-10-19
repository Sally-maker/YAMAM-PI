function fetchAddress() {
    const cep = $('#cep').val();
    $.getJSON(`https://viacep.com.br/ws/${cep}/json/`, function(data) {
        if (!data.erro) {
            $('#logradouro').val(data.logradouro);
            $('#bairro').val(data.bairro);
            $('#cidade').val(data.localidade);
            $('#uf').val(data.uf);
        } else {
            alert('CEP inválido!');
        }
    });
}

function validateCPF() {
    const cpf = $('#cpf').val();
    // Implementar a validação do CPF aqui.
}

function validatePassword() {
    const senha = $('#senha').val();
    const confirmSenha = $('#confirmSenha').val();
    if (senha !== confirmSenha) {
        alert('As senhas não coincidem!');
        return false;
    }
    return true;
}

function addUser() {
    if (!validatePassword()) return false;

    const nome = $('#nome').val().trim();
    if (nome.split(' ').length < 2 || nome.split(' ').some(word => word.length < 3)) {
        alert('Nome completo deve ter pelo menos 2 palavras com 3 letras cada.');
        return false;
    }

    // Enviar dados para o backend (exemplo: via AJAX)
    alert('Usuário cadastrado com sucesso! Redirecionando para o login...');
    window.location.href = "../Login/login.html";
    return false;  // Impedir recarregamento da página
}