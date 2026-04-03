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
    fetch("http://localhost:3000/incidentes")
        .then(res => res.json())
        .then(dados => {
            const lista = document.getElementById("listaIncidentes");
            lista.innerHTML = dados.map(i => `
                <tr>
                    <td>#${i.id}</td>
                    <td><strong>${i.titulo}</strong></td>
                    <td class="${i.criticity === 'critica' ? 'badge-critica' : ''}">${i.criticidade.toUpperCase()}</td>
                    <td class="status-${i.status}">${i.status}</td>
                    <td>${i.status !== 'resolvido' ? `<button onclick="resolver(${i.id})">Resolver</button>` : '✅'}</td>
                </tr>
            `).join('');
        });
}

// Inicia a listagem ao carregar a página
if(document.getElementById("listaIncidentes")) listarIncidentes();