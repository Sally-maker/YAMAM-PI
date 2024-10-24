function loginUser() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  if (email.length > 0 && password.length > 0) {
    const body = JSON.stringify({
      email,
      password
    })

    const url = "http://localhost:8080/client/login";
    fetch(url, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((resp) => {
        console.log(resp)
        if (resp.status == 200) {
          return resp.json()
        }
        else {
          alert("Usuário incorreto!");
        }

      })
      .then((resp) => {
        localStorage.setItem("id_client", resp);
        alert("Usuário logado")
        window.location.replace("../../Home/index.html");

      })
      .catch((err) => console.log(err))
  }

  else {
    alert("Preencha todos os campos")
  }



}