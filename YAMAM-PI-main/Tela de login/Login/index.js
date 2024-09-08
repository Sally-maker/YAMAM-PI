const fetchAPI = () => {
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;
  
    const json = JSON.stringify({
      email: email,
      password: password,
    });
    loginUser(json);
  };
  const loginUser = (data) => {
    const url = "http://localhost:8080/auth/login";
  
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  