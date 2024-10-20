async function getUser(){
    const url = "http://localhost:8080/client/1";
    await fetch(url)
    .then((res) => res.json())
    .then((resp) =>{
        document.querySelector("#nome").value = resp.name;
        document.querySelector("#dataNascimento").value = resp.birthDate
        document.querySelector("#genero").value = resp.gender
        getAddresses(resp.id)

    })
    .catch((err) => console.log(err))
}
async function getAddresses(id){
    let addresses = [];
    const url = `http://localhost:8080/address/${id}`
    await fetch(url)
    .then((res) => res.json())
    .then((resp) => {
        addresses = resp
    })
    .catch((err) => console.log(err));
    console.log(addresses[0])

        document.querySelector(`#cep0`).value = addresses[0].cep
        document.querySelector(`#endereco0-logradouro`).value = addresses[0].logradouro
        document.querySelector(`#endereco0-numero`).value = addresses[0].number
        document.querySelector(`#endereco0-cidade`).value = addresses[0].state
        document.querySelector(`#endereco0-uf`).value = addresses[0].uf

        document.querySelector(`#cep1`).value = addresses[1].cep
        document.querySelector(`#endereco1-logradouro`).value = addresses[1].logradouro
        document.querySelector(`#endereco1-numero`).value = addresses[1].number
        document.querySelector(`#endereco1-cidade`).value = addresses[1].state
        document.querySelector(`#endereco1-uf`).value = addresses[1].uf
    
   
 

  
    
}