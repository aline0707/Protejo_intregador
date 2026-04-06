function sugerirSolucao(texto) {
    texto = texto.toLowerCase();
    if(texto.includes("servidor")) return "Reinicie o serviço ou verifique o status do host.";
    if(texto.includes("banco") || texto.includes("mysql")) return "Verifique a conexão no db.js ou status do serviço MySQL.";
    if(texto.includes("rede") || texto.includes("link")) return "Verifique o roteador de borda e conectividade externa.";
    return "Analise os logs detalhados do sistema.";
}

function analisarIncidente() {
    const t = document.getElementById("titulo").value;
    const d = document.getElementById("descricao").value;
    document.getElementById("sugestaoIA").innerText = "💡 " + sugerirSolucao(t + " " + d);
}

function listarIncidentes() {
    fetch("/incidentes")
        .then(res => res.json())
        .then(dados => {
            const lista = document.getElementById("listaIncidentes");
            lista.innerHTML = dados.map(i => `
                <tr>
                    <td>#${i.id}</td>
                    <td><strong>${i.titulo}</strong></td>
                    <td class="${i.criticidade === 'critica' ? 'badge-critica' : ''}">${i.criticidade.toUpperCase()}</td>
                    <td class="status-${i.status}">${i.status}</td>
                    <td>${i.status !== 'resolvido' ? `<button onclick="resolver(${i.id})">Resolver</button>` : '✅'}</td>
                </tr>
            `).join('');
        })
        .catch(err => console.error("Erro ao listar incidentes:", err));
}

function criarIncidente() {
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;

    if (!titulo.trim()) {
        alert("Preencha o título do incidente!");
        return;
    }

    const payload = {
        titulo,
        descricao,
        criticidade: document.getElementById("criticidade").value,
        status: document.getElementById("status").value,
        cliente: document.getElementById("cliente").value,
        usuario_id: JSON.parse(localStorage.getItem("usuario"))?.id || 1
    };

    fetch("/incidentes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("sugestaoIA").innerText = "💡 " + (data.sugestaoIA || "Incidente registrado com sucesso!");
        listarIncidentes();
    })
    .catch(err => console.error("Erro ao criar incidente:", err));
}

function resolver(id) {
    fetch(`/incidentes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            status: "resolvido",
            usuario_id: JSON.parse(localStorage.getItem("usuario"))?.id || 1
        })
    })
    .then(() => listarIncidentes())
    .catch(err => console.error("Erro ao resolver incidente:", err));
}

// Inicia a listagem ao carregar a página
if(document.getElementById("listaIncidentes")) listarIncidentes();