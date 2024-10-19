function addUser() {
    if (validarFormulario()) {
        const nameUser = document.querySelector("#nome").value
        const birthDate = document.querySelector("#dataNascimento").value;
        const gender = document.querySelector("#genero").value
        const email = document.querySelector("#email").value
        const cpf = document.querySelector("#cpf").value
        const password = document.querySelector("#senha").value
        var address = getAddresses();

        const jsonUser = JSON.stringify({
            name: nameUser,
            cpf,
            email,
            birthDate,
            gender,
            password,
            address
        })
        fecthUser(jsonUser)
    }



}
function fecthUser(user) {
    const url = "http://localhost:8080/client";
    console.log(user)
    fetch(url, {
        method: "POST",
        body: user,
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((resp) => {
            alert("Cadastro realizado com sucesso! ")
            window.location.replace("../LoginCliente/loginCliente.html")

        })
        .catch((err) => console.log(err))
}

async function loadCEP(cep, idAddress) {
    const url = `https://viacep.com.br/ws/${cep}/json/`
    let data = [];
    await fetch(url)
        .then((resp) => resp.json())
        .then((res) => {
            document.querySelector(`#${idAddress}-logradouro`).value = res.logradouro
            document.querySelector(`#${idAddress}-bairro`).value = res.bairro
            document.querySelector(`#${idAddress}-cidade`).value = res.estado
            document.querySelector(`#${idAddress}-uf`).value = res.uf

        })

        .catch(() => alert("CEP invalido"))
}
function getAddresses() {
    var arrAddress = [];
    const cepEnt = document.getElementById("cepEnt").value;
    const logradouroEnt = document.getElementById(`endereco2-logradouro`).value;
    const numberEnt = document.getElementById(`endereco2-numero`).value;
    const stateEnt = document.getElementById(`endereco2-cidade`).value;
    const ufEnt = document.getElementById(`endereco2-uf`).value;

    const cepFat = document.getElementById("cepFat").value;
    const logradouroFat = document.getElementById(`endereco1-logradouro`).value;
    const numberFat = document.getElementById(`endereco1-numero`).value;
    const stateFat = document.getElementById(`endereco1-cidade`).value;
    const ufFat = document.getElementById(`endereco1-uf`).value;
    const jsonDelivery = {
        cep: cepEnt,
        logradouro: logradouroEnt,
        number: numberEnt,
        state: stateEnt,
        uf: ufEnt,
        typeAddress: "DELIVERY"
    }
    const jsonFat = {
        cep: cepFat,
        logradouro: logradouroFat,
        number: numberFat,
        state: stateFat,
        uf: ufFat,
        typeAddress: "INVOICING"
    }
    arrAddress.push(jsonFat);
    arrAddress.push(jsonDelivery);

    return arrAddress;
}

function validarFormulario() {
    // Pegando os elementos do formulário
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const genero = document.getElementById('genero').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;

    // Endereço de Faturamento
    const cepFat = document.getElementById('cepFat').value;
    const logradouroFat = document.getElementById('endereco1-logradouro').value;
    const numeroFat = document.getElementById('endereco1-numero').value;
    const bairroFat = document.getElementById('endereco1-bairro').value;
    const cidadeFat = document.getElementById('endereco1-cidade').value;
    const ufFat = document.getElementById('endereco1-uf').value;

    // Endereço de Entrega
    const cepEnt = document.getElementById('cepEnt').value;
    const logradouroEnt = document.getElementById('endereco2-logradouro').value;
    const numeroEnt = document.getElementById('endereco2-numero').value;
    const bairroEnt = document.getElementById('endereco2-bairro').value;
    const cidadeEnt = document.getElementById('endereco2-cidade').value;
    const ufEnt = document.getElementById('endereco2-uf').value;

    // Senhas
    const senha = document.getElementById('senha').value;
    const confirmSenha = document.getElementById('confirmSenha').value;

    // Verificando se os campos estão preenchidos
    if (!nome || !dataNascimento || !genero || !email || !cpf || !cepFat || !logradouroFat || !numeroFat || !bairroFat || !cidadeFat || !ufFat || !cepEnt || !logradouroEnt || !numeroEnt || !bairroEnt || !cidadeEnt || !ufEnt || !senha || !confirmSenha) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return false; // Impede o envio do formulário
    }

    // Verificação de senhas correspondentes
    if (senha !== confirmSenha) {
        alert("As senhas não coincidem.");
        return false; // Impede o envio do formulário
    }

    // Se tudo estiver preenchido e as senhas corresponderem, retorna verdadeiro
    return true;
}