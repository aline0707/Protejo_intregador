// VARIÁVEIS GLOBAIS (Não podem estar comentadas!)
let graficoStatus;
let graficoCriticidade;

function atualizarGraficos(dados) {
    // Contagem de dados para os gráficos
    const counts = {
        aberto: dados.filter(i => i.status === "aberto").length,
        analise: dados.filter(i => i.status === "analise").length,
        resolvido: dados.filter(i => i.status === "resolvido").length,
        baixa: dados.filter(i => i.criticidade === "baixa").length,
        media: dados.filter(i => i.criticidade === "media").length,
        alta: dados.filter(i => i.criticidade === "alta").length,
        critica: dados.filter(i => i.criticidade === "critica").length
    };

    // Destrói os gráficos anteriores para não bugar ao atualizar
    if (graficoStatus) graficoStatus.destroy();
    if (graficoCriticidade) graficoCriticidade.destroy();

    // Gráfico de Barras (Status)
    const ctxStatus = document.getElementById("graficoStatus");
    if (ctxStatus) {
        graficoStatus = new Chart(ctxStatus, {
            type: "bar",
            data: {
                labels: ["Abertos", "Em análise", "Resolvidos"],
                datasets: [{
                    label: "Quantidade",
                    data: [counts.aberto, counts.analise, counts.resolvido],
                    backgroundColor: ["#ef4444", "#f59e0b", "#10b981"]
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y' }
        });
    }

    // Gráfico de Rosca (Criticidade)
    const ctxCrit = document.getElementById("graficoCriticidade");
    if (ctxCrit) {
        graficoCriticidade = new Chart(ctxCrit, {
            type: "doughnut",
            data: {
                labels: ["Baixa", "Média", "Alta", "Crítica"],
                datasets: [{
                    data: [counts.baixa, counts.media, counts.alta, counts.critica],
                    backgroundColor: ["#94a3b8", "#3b82f6", "#f97316", "#ef4444"],
                    borderWidth: 0
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
}

function carregarDados() {
    fetch("http://localhost:3000/incidentes")
        .then(res => {
            if (!res.ok) throw new Error("Erro na rede");
            return res.json();
        })
        .then(dados => {
            // Atualiza a tabela (Top 5 incidentes)
            const lista = document.getElementById("listaIncidentes");
            if (lista) {
                lista.innerHTML = dados.slice(0, 5).map(i => `
                    <tr>
                        <td>#${i.id}</td>
                        <td>${i.titulo}</td>
                        <td><span class="badge ${i.criticidade === 'critica' ? 'badge-critica' : ''}">${i.criticidade}</span></td>
                        <td><span class="badge">${i.status}</span></td>
                        <td>${i.cliente || 'N/A'}</td>
                    </tr>
                `).join('');
            }

            // Atualiza os contadores no topo do dashboard
            const elCriticos = document.getElementById("num-criticos");
            const elTotal = document.getElementById("num-total");
            
            if (elCriticos) elCriticos.innerText = dados.filter(i => i.criticidade === "critica").length;
            if (elTotal) elTotal.innerText = dados.length;

            // Chama a atualização dos gráficos
            atualizarGraficos(dados);
        })
        .catch(err => console.error("Erro ao buscar dados do servidor:", err));
}

// Inicializa a primeira carga
carregarDados();

// Atualiza automaticamente a cada 5 segundos
setInterval(carregarDados, 5000);