const fetchAPI = async() => {
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;
  
    const json = JSON.stringify({
      email: email,
      password: password,
    });
    loginUser(json);
  };
  const loginUser = async(data) => {
    const url = "http://localhost:8080/auth/login";
  
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Usuário logado");
        localStorage.setItem("token", res.token)
        localStorage.setItem("role", res.role)
        window.location.replace("../Home/index.html");
      })
      .catch((err) => alert("Login incorreto!"));
  };
  