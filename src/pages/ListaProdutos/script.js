async function getData() {
  const url = "http://localhost:8080/products/allProduct";
  var products = [];
  await fetch(url)
    .then((res) => res.json())
    .then((resp) => (products = resp))
    .catch((err) => console.log(err));

  populateTable(products);
}

const populateTable = (products) => {
  const tb = document.querySelector("#userTableBody");
  const formatPrice = new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  })
  products.map(({ id, name, price, rating, stock, status }) => {
    tb.innerHTML += `
       <td>${id}</td>
       <td>${name}</td>
       <td>${rating}</td>
       <td>${formatPrice.format(price)}</td>
       <td>${stock}</td>
       <td>${status}</td>
       <td>
             <button onclick="updateStatus(${id})">Desativar/Ativar</button>
       </td>
        <td>
          <button disabled="true">  <a href="../AtualizarProduto/AtualizarProduto.html?id=${id}" target="_blank">Alterar Produto</a></button>
        </td>
         <td>
          <button disabled="true">  <a href="../Carrinho/Carrinho.html?id=${id}" target="_blank">Visualizar Produto</a></button>
        </td>
       `;
  });
};
const updateStatus = (id) => {
  const url = `http://localhost:8080/products/status/${id}`;
  fetch(url, {
    method: "PUT",
    "Content-Type": "application/json",
  })
    .then((res) => {
      if (res.status == 403) {
        alert("Acesso negado!");
      }
      if (res.status == 200) {
        alert("Status atualizado! ");
      }
    })
    .catch((err) => {
      alert("Erro ao atualizar status");
    });
};
