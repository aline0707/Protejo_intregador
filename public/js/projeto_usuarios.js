function listarUsuarios() {
    fetch("http://https://protejo-intregador.onrender.com/usuarios")
        .then(res => res.json())
        .then(dados => {
            const lista = document.getElementById("listaUsuarios");
            lista.innerHTML = dados.map(u => `
                <tr>
                    <td>#${u.id}</td>
                    <td>${u.nome}</td>
                    <td>${u.email}</td>
                    <td class="perfil-${u.perfil}">${u.perfil}</td>
                    <td class="${u.ativo ? 'status-ativo' : 'status-inativo'}">
                        ${u.ativo ? '● Ativo' : '● Inativo'}
                    </td>
                    <td>
                        <button class="btn btn-secondary" onclick="editarUsuario(${u.id},'${u.nome}','${u.email}')">Editar</button>
                        <button class="btn ${u.ativo ? 'btn-danger' : 'btn-success'}" onclick="toggleUsuario(${u.id}, ${u.ativo})">
                            ${u.ativo ? 'Desativar' : 'Ativar'}
                        </button>
                    </td>
                </tr>`).join('');
        });
}

function criarUsuario() {
    const payload = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
        perfil: document.getElementById("perfil").value,
        ativo: true
    };

    fetch("http://https://protejo-intregador.onrender.com/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }).then(() => {
        alert("Usuário Cadastrado!");
        listarUsuarios();
    });
}
function editarUsuario(id, nomeAtual, emailAtual) {
    const novoNome = prompt("Novo nome:", nomeAtual);
    if (novoNome === null) return;

    const novoEmail = prompt("Novo e-mail:", emailAtual);
    if (novoEmail === null) return;

    if (!novoNome.trim() || !novoEmail.trim()) {
        alert("Nome e e-mail não podem ser vazios!");
        return;
    }

    fetch(`http://https://protejo-intregador.onrender.com/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: novoNome, email: novoEmail })
    })
    .then(() => {
        alert("Usuário atualizado!");
        listarUsuarios();
    })
    .catch(err => console.error("Erro ao editar usuário:", err));
}
function toggleUsuario(id, ativo) {
    fetch(`http://https://protejo-intregador.onrender.com/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ativo: !ativo })
    }).then(() => listarUsuarios());
}

listarUsuarios();