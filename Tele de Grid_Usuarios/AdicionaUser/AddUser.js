// document.getElementById('userForm').addEventListener('submit', function(event) {
//     event.preventDefault(); 

//     const formData = new FormData(this);
//     const data = Object.fromEntries(formData);

//     fetch('http://localhost:8080/auth/register', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(data => {
//         alert(data.message);
//         if (data.message === 'Usuário adicionado com sucesso!') {
    
//             window.location.href = '../Tela de login/Login/AddUser.html';
//         }
//     })
//     .catch(error => {
//         console.error('Erro:', error);
//         alert('Ocorreu um erro ao adicionar o usuário.');
//     });
// });
