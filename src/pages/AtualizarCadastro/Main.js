const input = document.querySelector("#cpf");
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

input.addEventListener("keypress", () => {
  let inputLength = input.value.length;

  if (inputLength == 3 || inputLength == 7) {
    input.value += ".";
  } else if (inputLength == 11) {
    input.value += "-";
  }
});

<<<<<<< HEAD
async function getData() {
=======
function getData() {
>>>>>>> a48de40 (adicionado barra de navegacao nas telas)
  
  const url = `http://localhost:8080/user/${id}`;
  const name = document.querySelector("#name");
  const cpf = document.querySelector("#cpf");
  const password = document.querySelector("#password");

<<<<<<< HEAD
   fetch(url)
=======
  fetch(url)
>>>>>>> a48de40 (adicionado barra de navegacao nas telas)
    .then((res) => res.json())
    .then((response) => {
      name.value = response.name;
      cpf.value = response.cpf;
    })
    .catch((err) => console.log(err));
}
function updateUser() {

 
  const name = document.querySelector("#name").value;
  const cpf = document.querySelector("#cpf").value;
  const password = document.querySelector("#password").value;
  const role = document.querySelector("#group").value

  const json = JSON.stringify({ 
    name,
    cpf,
    password,
    role
  });

  const url = `http://localhost:8080/user/${id}`;

  fetch(url, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },

    body: json,
  })
    .then((resp) => {
      console.log(resp)
      if(resp.status === 200){
        alert("Dados atualizados! ");
      }
      if(resp.status === 403){
        alert("Dados já existentes");
      }
    })
  
    .catch((err) => {
      console.log(err)
      alert("Erro ao atualizar os dados")
    });
}
