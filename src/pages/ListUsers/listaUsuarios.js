
const token = localStorage.getItem("token");
document.addEventListener("DOMContentLoaded", function () {
  const corpoTabelaUsuarios = document.getElementById("userTableBody");
  console.log(token)
  fetch("http://localhost:8080/user/all", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((res) => populateTable(res))
    .catch((err) => {
      console.log(err);
      alert("Acesso negado!");
      window.location.replace("../Home/Admin/telaPrincipal.html ")
    });
});
const populateTable = (data) => {
  const table = document.querySelector("#userTableBody");
  console.log(data);
  data.map(({ id, name, cpf, email, status, role }) => {
    table.innerHTML += `
        <td>
            ${name}
        </td>
          <td>
            ${email}
        </td>
        <td >
            ${role}
        </td>
        <td>
            ${status}
        </td>
        <td>
            <button onclick="updateStatus(${id})">Desativar/Ativar</button>
        </td>
         <td>
          <button disabled="true">  <a href="../AtualizarCadastro/AtualizarUser.html?id=${id}" target="_blank">Alterar usuário</a></button>
        </td>
    `;
  });
};

const updateStatus = (id) => {
  console.log(token)
  const url = `http://localhost:8080/user/status/${id}`;
  fetch(url, {
    method: "PUT",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  })
    .then((res) => {
      if (res.status == 403) {
        alert("Acesso negado!")
      }
      if (res.status == 200) {
        alert("Status atualizado! ");
      }
    })
    .catch((err) => {

      alert("Erro ao atualizar status");
    });
};
