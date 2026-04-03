function listarUsuarios() {
    fetch("http://localhost:3000/usuarios")
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

    fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }).then(() => {
        alert("Usuário Cadastrado!");
        listarUsuarios();
    });
}

function toggleUsuario(id, ativo) {
    fetch(`http://localhost:3000/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ativo: !ativo })
    }).then(() => listarUsuarios());
}

listarUsuarios();