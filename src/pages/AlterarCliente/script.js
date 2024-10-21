const id = localStorage.getItem("id_client");
console.log(`id aqui: ${id}`);

async function getUser() {
  const url = `http://localhost:8080/client/${id}`;
  await fetch(url)
    .then((res) => res.json())
    .then((resp) => {
      document.querySelector("#nome").value = resp.name;
      document.querySelector("#dataNascimento").value = resp.birthDate;
      document.querySelector("#genero").value = resp.gender;
      getAddresses(resp.id);
    })
    .catch((err) => console.log(err));
}
async function getAddresses(id) {
  let addresses = [];
  const url = `http://localhost:8080/address/${id}`;
  await fetch(url)
    .then((res) => res.json())
    .then((resp) => {
      addresses = resp;
    })
    .catch((err) => console.log(err));

  document.querySelector(`#cep0`).value = addresses[0].cep;
  document.querySelector(`#endereco0-logradouro`).value =
    addresses[0].logradouro;
  document.querySelector(`#endereco0-numero`).value = addresses[0].number;
  document.querySelector(`#endereco0-cidade`).value = addresses[0].state;
  document.querySelector(`#endereco0-uf`).value = addresses[0].uf;

  document.querySelector(`#cep1`).value = addresses[1].cep;
  document.querySelector(`#endereco1-logradouro`).value =
    addresses[1].logradouro;
  document.querySelector(`#endereco1-numero`).value = addresses[1].number;
  document.querySelector(`#endereco1-cidade`).value = addresses[1].state;
  document.querySelector(`#endereco1-uf`).value = addresses[1].uf;
}

const AlterUser = async () => {
    const url = `http://localhost:8080/client/altera/${id}`;

    const birthDateInput = document.querySelector("#dataNascimento").value;
    const passwordInput = document.querySelector("#senha").value;

    
    let birthDate = ""; 
    if (birthDateInput) {
      birthDate = birthDateInput; 
      console.log(birthDate); 
    } else {
      console.error("Data de nascimento não pode estar vazia!"); 
    }
 
  
    const data = {
      name: document.querySelector("#nome").value,
      birthDate: birthDate, 
      gender: document.querySelector("#genero").value,
      password: passwordInput,
      addresses: [
        {
          cep: document.querySelector("#cep0").value,
          logradouro: document.querySelector("#endereco0-logradouro").value,
          number: document.querySelector("#endereco0-numero").value,
          state: document.querySelector("#endereco0-cidade").value,
          uf: document.querySelector("#endereco0-uf").value,
        },
        {
          cep: document.querySelector("#cep1").value,
          logradouro: document.querySelector("#endereco1-logradouro").value,
          number: document.querySelector("#endereco1-numero").value,
          state: document.querySelector("#endereco1-cidade").value,
          uf: document.querySelector("#endereco1-uf").value,
        },
      ],
    };
  
    console.log(data); 
  
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => {
        
        if (!resp.ok) {
          throw new Error(`Erro na atualização: ${resp.status}`);
        }
        return resp.text(); 
      })
      .then(() => {
        alert("Cliente atualizado com sucesso!");
        document.querySelector("#botaoAlterar").onclick = () => {
          window.open(`../../pages/Carrinho/Carrinho.html?id=${id}`, "_blank");
        };
      })
      .catch((err) => {
        alert(`Erro ao alterar cliente: ${err}`);
      });
  };
  