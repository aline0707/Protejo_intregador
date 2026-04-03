const form = document.getElementById("formLogin");
const erroDiv = document.getElementById("erro");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const usuario = document.getElementById("usuario").value;
        const senha = document.getElementById("senha").value;

        erroDiv.innerText = "Autenticando...";

        // CORREÇÃO: Enviando para /login, como definido no seu server.js
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, senha })
        })
        .then(res => res.json())
        .then(data => {
            if (data.autenticado) {
                localStorage.setItem("usuario", JSON.stringify(data.usuario));
                window.location.href = "painel_noc.html";
            } else {
                erroDiv.innerText = data.mensagem || "Usuário ou senha incorretos.";
            }
        })
        .catch(() => erroDiv.innerText = "Erro: Servidor Offline.");
    });
}

function logout() {
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
}