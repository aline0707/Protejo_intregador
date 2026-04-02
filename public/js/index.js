{/* <script> */}
    const form = document.getElementById("formLogin");
    const erroDiv = document.getElementById("erro");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Impede o recarregamento da página
        efetuarLogin();
    });

    function efetuarLogin() {
        const usuario = document.getElementById("usuario").value;
        const senha = document.getElementById("senha").value;

        erroDiv.innerText = "Autenticando...";

        fetch("http://localhost:3000/index", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ usuario, senha })
        })
        .then(res => {
            if (!res.ok) throw new Error("Erro no servidor");
            return res.json();
        })
        .then(data => {
            if (data.autenticado) {
                // Sucesso! Redireciona para o painel
                window.location.href = "painel_noc.html";
            } else {
                // Erro de credenciais
                erroDiv.innerText = "Usuário ou senha incorretos.";
            }
        })
        .catch(err => {
            // Erro de conexão (ex: servidor Node desligado)
            erroDiv.innerText = "Erro: Não foi possível conectar ao servidor.";
            console.error(err);
        });
    }
{/* </script> */}