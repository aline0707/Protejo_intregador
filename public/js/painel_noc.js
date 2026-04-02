{/* <script> */}
let graficoStatus;
let graficoCriticidade;

// Configuração Global do Chart.js para cores brancas nos textos
Chart.defaults.color = '#94a3b8';

function atualizarGraficos(dados) {
    const counts = {
        aberto: dados.filter(i => i.status === "aberto").length,
        analise: dados.filter(i => i.status === "analise").length,
        resolvido: dados.filter(i => i.status === "resolvido").length,
        baixa: dados.filter(i => i.criticidade === "baixa").length,
        media: dados.filter(i => i.criticidade === "media").length,
        alta: dados.filter(i => i.criticidade === "alta").length,
        critica: dados.filter(i => i.criticidade === "critica").length
    };

    if (graficoStatus) graficoStatus.destroy();
    if (graficoCriticidade) graficoCriticidade.destroy();

    // Gráfico de Status
    graficoStatus = new Chart(document.getElementById("graficoStatus"), {
        type: "bar",
        data: {
            labels: ["Abertos", "Em análise", "Resolvidos"],
            datasets: [{
                label: "Incidentes por Status",
                data: [counts.aberto, counts.analise, counts.resolvido],
                backgroundColor: ["#ef4444", "#f59e0b", "#10b981"]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: { legend: { display: false } }
        }
    });

    // Gráfico de Criticidade
    graficoCriticidade = new Chart(document.getElementById("graficoCriticidade"), {
        type: "doughnut", // Mudei para Rosca para variar o visual!
        data: {
            labels: ["Baixa", "Média", "Alta", "Crítica"],
            datasets: [{
                data: [counts.baixa, counts.media, counts.alta, counts.critica],
                backgroundColor: ["#94a3b8", "#3b82f6", "#f97316", "#ef4444"],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } }
            
        }
    });
}

function carregarDados() {
    fetch("http://localhost:3000/incidentes")
        .then(res => res.json())
        .then(dados => {
            const lista = document.getElementById("listaIncidentes");
            lista.innerHTML = "";

            let nCriticos = 0, nAnalise = 0, nResolvidos = 0;

            dados.forEach(i => {
                if(i.criticidade === "critica") nCriticos++;
                if(i.status === "analise") nAnalise++;
                if(i.status === "resolvido") nResolvidos++;

                const classeCriticidade = i.criticidade === "critica" ? "badge badge-critica" : (i.criticidade === "alta" ? "badge badge-alta" : "badge");

                lista.innerHTML += `
                    <tr>
                        <td>#${i.id}</td>
                        <td>${i.titulo}</td>
                        <td><span class="${classeCriticidade}">${i.criticidade}</span></td>
                        <td><span class="badge ${i.status === 'resolvido' ? 'badge-resolvido' : ''}">${i.status}</span></td>
                        <td>${i.cliente}</td>
                    </tr>
                `;
            });

            document.getElementById("num-criticos").innerText = nCriticos;
            document.getElementById("num-analise").innerText = nAnalise;
            document.getElementById("num-resolvidos").innerText = nResolvidos;
            document.getElementById("num-total").innerText = dados.length;

            atualizarGraficos(dados);
        })
        .catch(err => console.error("Erro ao carregar dados NOC:", err));
}

function logout() {
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
}

// Inicialização
carregarDados();
setInterval(carregarDados, 5000); // Atualiza a cada 5 segundos
{/* </script> */}