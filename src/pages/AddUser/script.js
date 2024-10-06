function addUser() {
  const name = document.querySelector("#nome").value;
  const email = document.querySelector("#email").value;
  const cpf = document.querySelector("#cpf").value;
  const password = document.querySelector("#senha").value;
  const groupRole = document.querySelector("#grupo").value;

  const json = JSON.stringify({
    name,
    email,
    cpf,
    password,
    role: groupRole,
  });

  fetchAPI(json);
}
const fetchAPI = (data) => {
  const url = "http://localhost:8080/auth/register";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then((res) => {
      if (res.status == 200) {
        alert("Usuário cadastrado!");
        window.location.replace("../Login/login.html");
      }
    })
    .catch((err) => alert("Ocorreu um erro ao cadastrar o usuário:  " + err));
};

const validatePassword = () => {
  var password = document.querySelector("#senha").value;
  var confirmPassword = document.querySelector("#confirmSenha").value;
  if (password != confirmPassword) {
    alert("As senhas não conferem!");
    document.querySelector("#senha").value = "";
    document.querySelector("#confirmSenha").value = "";

  }
}
const validateCPF = () => {

let cpfInput = document.getElementById('cpf').value;
let cpf = cpfInput.replace(/[^\d]+/g, ''); 

if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
  exibirResultado(false);
  return;
}


let soma = 0;
for (let i = 0; i < 9; i++) {
  soma += parseInt(cpf.charAt(i)) * (10 - i);
}
let primeiroDigito = 11 - (soma % 11);
primeiroDigito = primeiroDigito >= 10 ? 0 : primeiroDigito;


soma = 0;
for (let i = 0; i < 10; i++) {
  soma += parseInt(cpf.charAt(i)) * (11 - i);
}
let segundoDigito = 11 - (soma % 11);
segundoDigito = segundoDigito >= 10 ? 0 : segundoDigito;


if (cpf.charAt(9) == primeiroDigito && cpf.charAt(10) == segundoDigito) {
  exibirResultado(true); 
} else {
  exibirResultado(false); 
}
}
function exibirResultado(isValid) {
  const cpfInput = document.getElementById("cpf")
  if(isValid == false){
    alert("CPF invalido!")
    cpfInput.value = ""
  }
}