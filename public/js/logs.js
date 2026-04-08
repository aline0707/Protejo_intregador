function carregarLogs() {
    fetch("http://https://protejo-intregador.onrender.com/logs")
        .then(res => res.json())
        .then(dados => {
            const lista = document.getElementById("listaLogs");
            lista.innerHTML = dados.map(log => {
                let classeCor = "";
                const acao = log.acao.toLowerCase();
                if (acao.includes("criou")) classeCor = "status-aberto";
                else if (acao.includes("resolveu")) classeCor = "status-resolvido";
                else if (acao.includes("erro")) classeCor = "badge-critica";

                return `
                    <tr>
                        <td>#${log.id}</td>
                        <td><strong>${log.usuario}</strong></td>
                        <td class="${classeCor}">${log.acao}</td>
                        <td>${log.incidente_id ? '#' + log.incidente_id : '---'}</td>
                        <td>${new Date(log.data).toLocaleString('pt-BR')}</td>
                    </tr>`;
            }).join('');
        });
}

carregarLogs();
setInterval(carregarLogs, 10000); // Atualiza a cada 10s